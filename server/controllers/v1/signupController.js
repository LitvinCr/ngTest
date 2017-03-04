'use strict';

var Models = require('./../../models/v1');
var Controller = require('./../../utils/controller');
var Password = require('./../../utils/password');
var Middlewares = require('./../../utils/Middlewares');

class SignupController extends Controller {
    constructor(version) {
        super(version);

        this.signup = [this._chooseStrategy];
    }


    /**
     * choose signup strategy
     * @param req
     * @param res
     * @param next
     * @returns {*}
     * @private
     */
    _chooseStrategy(req, res, next) {
        var self = this;
        var strategies = {
            basic: [
                this.validator.signup.basic,
                self._checkUserExist,
                self._selectRole,
                self._passwordHandler,
                self._saveUser,
                Middlewares.createAndSaveRefreshToken,
                Middlewares.createToken,
                self.sendResponse
            ],

            principal: [
                this.validator.signup.principal,
                self._checkUserExist,
                self._passwordHandler,
                // self._checkSchoolExistByName,
                self._savePrincipal,
                self._setUserToSchool,
                Middlewares.createAndSaveRefreshToken,
                Middlewares.createToken,
                self._getPrincipalFullData
            ]
        };

        if (!strategies[req.params.action]) {
            var error = new Error();
            error.status = 404;
            return next(error);
        }

        var operations = strategies[req.params.action].map(function (middleware) {
            return middleware.bind(self, req, res);
        });

        require('async').series(operations, next);
    }

    /**
     * set user school
     * @param req
     * @param res
     * @param next
     * @private
     */
    _setUserToSchool(req, res, next){
        req.user.setSchool(req.school.id)
            .then(function(user){
                next()
            })
            .catch(next)
    }

    /**
     * select created user role
     * @param req
     * @param res
     * @param next
     * @private
     */
    _selectRole(req, res, next) {
        let adminRole = req.user.role;
        const ROLES = Models.users.ROLE();

        switch (adminRole) {
            case ROLES.ADMIN:
                if (
                    req.body.role &&
                    ([ROLES.TEACHER, ROLES.PRINCIPAL].indexOf(req.body.role) !== -1)
                ) {
                    let error = new Error();
                    error.status = 401;
                    error.message = 'not valid role!';
                    return next(error);
                }

                break;

            case ROLES.PRINCIPAL:
                req.body.role = ROLES.TEACHER;
                break;

            case ROLES.TEACHER:
                req.body.role = ROLES.STUDENT;
                break;

            default:

                let error = new Error();
                error.status = 401;
                error.message = 'Forbidden action!';
                return next(error);
        }

        next();
    }

    /**
     * check if user exist api
     * @param req
     * @param res
     * @param next
     * @private
     */
    _checkUserExist(req, res, next) {
        Models.users.find(
            {
                where: {
                    email: req.body.email
                }
            }
        ).then(
            function (user) {
                if (user) {
                    let error = new Error();
                    error.message = 'User with this email already registered!';
                    error.status = 409;
                    return next(error);
                }
                req.local = {
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };
                next()

            }
        )
    }

    /**
     * Password handler
     * @param req
     * @param res
     * @param next
     * @returns {*}
     * @private
     */
    _passwordHandler(req, res, next) {

        if (req.body.password !== req.body.confirmPassword) {
            let error = new Error();
            error.message = 'Passwords do not match!';
            error.status = 400;
            return next(error);
        }

        req.local.password = Password.hash(req.local.password);

        next();
    }

    /**
     * Crete new user
     * @param req
     * @param res
     * @param next
     * @private
     */
    _saveUser(req, res, next) {

        Models.users.create(req.local)
            .then(function (client) {

                req.user = client;

                next();
            })
            .catch(next);
    }

    /**
     * check school with this name already exist
     * @param req
     * @param res
     * @param next
     * @private
     */
    _checkSchoolExistByName(req, res, next) {
        Models.schools.findOne({
            where: {
                name: req.body.school.name
            }
        })
            .then(function (school) {
                if (school) {
                    let error = new Error();
                    error.message = 'School with this name already registered!';
                    error.status = 409;
                    return next(error);
                }

                next();
            })
            .catch(next)
    }

    /**
     * Crete new user, school and school
     * @param req
     * @param res
     * @param next
     * @private
     */
    _savePrincipal(req, res, next) {
        
        req.local.role = Models.users.ROLE().PRINCIPAL;
        req.local.registrationStep = Models.users.REGISTRATION_STEPS().ACCOUNT_CREATION;

        Models.sequelize.transaction().then(function (t) {
            return Models.users.create(req.local, {transaction: t})
                .then(function (principal) {

                    req.user = principal;

                    let dataToSave = {
                        name: req.body.school.name,
                        classSetsCombination: req.body.school.classSets.sort().join(''),
                        principalId: principal.id
                    };
                    return Models.schools.create(dataToSave, {transaction: t})
                        .then(function (school) {

                            req.school = school;

                            let dataToSave = [];

                            req.body.school.classSets.forEach(function (item) {
                                dataToSave.push({
                                    schoolId: school.id,
                                    classSetId: item
                                })
                            });

                            return Models.schoolsToClassSets.bulkCreate(dataToSave, {transaction: t})
                                .then(function () {
                                    t.commit();
                                    next();
                                })
                                .catch(function (err) {
                                    t.rollback();
                                    next(err)
                                });
                        });
                })
        });
    }

    /**
     * get principal full data and school plan
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getPrincipalFullData(req, res, next) {
        Models.schools.findOne({
            where: {
                principalId: req.payload.id
            },
           include: [
               {
                   model: Models.classSets,
                   as: 'classSets'
               }
           ]
        })
            .then(function(school){
                Models.plans.findOne({
                    where: {
                        classSetsCombination: school.classSetsCombination,
                        schoolId: null
                    },
                    include: [
                        {
                            model: Models.plansTypes,
                            as: 'types'
                        },
                        {
                            model: Models.courses,
                            as: 'courses'
                        }
                    ]
                })
                    .then(function(plan){

                        req.payload.school = Models.schools.format().base(school);
                        req.payload.school.classSets = Models.schoolsToClassSets.format().base(req.payload.school.classSets);

                        if(plan){
                            plan = Models.plans.format().base(plan);
                            plan.courses = Models.courses.format().base(plan.courses);
                        }

                        let dataToSend = {
                            user: req.payload,
                            plan: plan
                        };

                        res.send(dataToSend)
                    })
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = SignupController;