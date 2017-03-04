'use strict';

angular.module('Educ8')
    .controller('signUpController', ['$state', 'Users', 'userService', signUpController]);

function signUpController($state, Users, userService) {
    var vm = this;

    angular.extend(vm, {
        submitSignup: submitSignup,
        checkClass: checkClass,
        getClasses: getClasses
    });

    vm.submitted = false;
    vm.classes = [];

    //data for login form
    vm.signupModel = {
        school: {
            name: '',
            classSets: []
        },
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        confirmEmail: ''
    };
    vm.signupValidator = {
        rules: {
            schoolName: {
                required: true,
                minlength: 3
            },
            firstName: {
                required: true,
                minlength: 3
            },
            lastName: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 30
            },
            confirmPassword: {
                equalTo: '#password'
            },
            confirmEmail: {
                equalTo: '#email'
            }
        }
    };


    /**
     * Submit signup form
     * @param form
     */
    function submitSignup(form) {
        vm.submitted = true;

        if (!form.validate() || !vm.signupModel.school.classSets.length) {
            return false;
        }

        Users
            .signUp(vm.signupModel)
            .then(function (res) {
                userService.setAsCurrent(res.data.user);

                $state.go('signup.preview');
            })
    }

    /**
     * Change class set
     * @param id
     */
    function checkClass(id) {
        var index = vm.signupModel.school.classSets.indexOf(id);

        if (index !== -1) {
            vm.signupModel.school.classSets.splice(index, 1);
            return;
        }

        vm.signupModel.school.classSets.push(id);
    }

    /**
     * Get classes
     */
    function getClasses() {
        Users
            .getClassSet()
            .then(function (res) {
                vm.classes = res.data.payload.list;
            })
    }


    /////////////////////////////////////////////////////////////
    getClasses();
}