"use strict";

const _ = require('lodash');
const async = require('async');
const Controller = require('./../../utils/controller');
const Models = require('../../models/v1');
const Password = require('./../../utils/password');
const randomstring = require("randomstring");
const logger = require('./../../utils/logger');
const moment = require('moment');

class UsersController extends Controller {
    constructor(version) {
        super(version);

        this.setPlanReviewStep = [
            this._setPlanReviewStep
        ];

        this.setPlanCreatingStep = [
            this._setPlanCreatingStep
        ];

        this.backToPlanReview = [
            this._backToPlanReview
        ];

        this.getList = [
            this.validateLimits,
            this._createSearchParams,
            this._getAll,
            this.sendResponse
        ];

        this.getOne = [
            this._getOne
        ];

        this.mailDelivery = [
            this.validator.users.sendEmails,
            this._getUsersEmails,
            this._sendMails
        ];

        this.getCountrySettings= [
            this._getCountrySettings
        ];

        this.restorePassword = [
            this.validator.users.email,
            this._getUserByEmail,
            this._restorePassword,
            this.sendResponse
        ];
    }

    /**
     * Set plan creating step
     * @param req
     * @param res
     * @param next
     * @returns {*}
     * @private
     */
    _setPlanCreatingStep (req, res, next) {
        if(req.user.registrationStep !== Models.users.REGISTRATION_STEPS().PAYMENT){
            let err = new Error();
            err.status = 400;
            err.message = 'Current step should be "account creating"!';
            return next(err)
        }

        req.user.update({
            registrationStep: Models.users.REGISTRATION_STEPS().PLAN_CREATING
        })
            .then(function(){
                return res.send();
            })
            .catch(next);
    }

    /**
     * back to plan preview
     * @param req
     * @param res
     * @param next
     * @returns {*}
     * @private
     */
    _backToPlanReview (req, res, next) {
        if(req.user.registrationStep !== Models.users.REGISTRATION_STEPS().PLAN_PREVIEW){
            let err = new Error();
            err.status = 400;
            err.message = 'Current step should be "account creating"!';
            return next(err)
        }

        req.user.update({
            registrationStep: Models.users.REGISTRATION_STEPS().ACCOUNT_CREATION
        })
            .then(function(){
                return res.send();
            })
            .catch(next);
    }

    /**
     * update user registration step - set plan review
     * @param req
     * @param res
     * @param next
     * @private
     */
    _setPlanReviewStep (req, res, next) {
        if(req.user.registrationStep !== Models.users.REGISTRATION_STEPS().ACCOUNT_CREATION){
            let err = new Error();
            err.status = 400;
            err.message = 'Current step should be "account creating"!';
            return next(err)
        }

        req.user.update({
            registrationStep: Models.users.REGISTRATION_STEPS().PLAN_PREVIEW
        })
            .then(function(){
                return res.send();
            })
            .catch(next);
    }

    /**
     * get user country settings
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getCountrySettings (req, res, next) {
        req.user.getCountrySetting()
            .then(function (countrySettings) {
                let formattedData = Models.countrySettings.format().base(countrySettings, req.user, Models);

                res.send(formattedData)
            })
            .catch(next)
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getUsersEmails(req, res, next){
        var where = {};

        if(!req.body.users.length){
            let err = new Error();
            err.status = 401;
            err.message = 'Please select user!';
            return next(err)
        }

        where.id = {
            $in: req.body.users
        };

        Models.users.findAll({
            where: where
        })
            .then(function(result){
                req.emails = [];
                result.forEach(function(item){
                    req.emails.push(item.email)
                });

                next();
            })
            .catch(next)
    }

    /**
     * get all users
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getAll(req, res, next) {
        let params = {
            where : req.searchParams
        };

        if(req.query.selectAll){
            try {
                req.query.selectAll = JSON.parse(req.query.selectAll);
            }
            catch (e) {
                let err = new Error();
                err.status = 401;
                err.message = 'Not valid selectAll!';
                return next(err)
            }
        }

        if(!req.query.selectAll){
            params.limit = req.query.limit;
            params.offset = req.query.offset;
        }

        Models.users.findAndCountAll(params)
            .then(function (result) {
                req.payload = {
                    count: result.count,
                    list: Models.users.format().short(result.rows)
                };

                next();
            })
            .catch(next)
    }

    /**
     * create search params
     * @param req
     * @param res
     * @param next
     * @private
     */
    _createSearchParams(req, res, next){
        req.searchParams = {};

        if(req.query.q){
            req.searchParams['$or'] = [

                {
                    firstName: {
                        $like: '%' + req.query.q + '%'
                    }
                },
                {
                    lastName: {
                        $like: '%' + req.query.q + '%'
                    }
                }

            ]
        }

        req.searchParams.role = {
            $ne: Models.users.ROLE().ADMIN
        };

        next();
    }

    /**
     * get user by id
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getOne(req, res, next) {

        let userId = req.params.id;

        if (userId == 'me') {
            userId = req.user.id;
        }

        Models.users.findById(userId, {
            include: [
                {
                    model: Models.schools,
                    as: 'school'
                },
                {
                    model: Models.classes,
                    as: 'class'
                },
                {
                    model: Models.countrySettings,
                    as: 'countrySetting'
                }
            ]
        })
            .then(function (user) {
                if (!user) {
                    let err = new Error();
                    err.status = 404;
                    err.message = 'User non found!';
                    return next(err)
                }

                res.send(Models.users.format().short(user));
            })
            .catch(next)
    }

    /**
     * Get user by email
     * @param req
     * @param res
     * @param next
     * @private
     */
    _getUserByEmail(req, res, next) {
        Models.users.find({
            where: {
                email: req.body.email
            }
        })
            .then(function (user) {
                if (!user) {
                    let error = new Error();
                    error.status = 404;
                    error.message = 'User not found';
                    return next(error);
                }

                req.local = user;
                next();
            })
            .catch(next)
    }

    /**
     * Generate new user password
     * @param req
     * @param res
     * @param next
     * @private
     */
    _restorePassword(req, res, next) {
        let newPassword = randomstring.generate(10);
        let queryData = {
            password: Password.hash(newPassword)
        };

        Models.users.update(queryData, {
            where: {
                id: req.local.id
            }
        })
            .then(function(user) {
                req.payload = Models.users.format().short(req.local);

                next();
            })
            .catch(next);
    }
}

module.exports = UsersController;
