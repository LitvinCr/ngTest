'use strict';
angular.module('Educ8')
    .controller('LoginController', [
        'userService',
        'Users',
        '$state',
        '$rootScope',
        'notifyService',
        'ngDialog',
        loginController
    ]);

function loginController(userService, Users, $state, $rootScope, notifyService, ngDialog) {
    var vm = this;

    angular.extend(vm, {
        submitLogin: submitLogin,
        submitRestore: submitRestore
    });

    //data for login form
    vm.LoginModel = {
        email: null,
        password: null
    };
    vm.loginValidator = {
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            }
        }
    };

    // data for restore password form
    vm.RestoreModel = {
        email: null
    };
    vm.restoreValidator = {
        rules: {
            email: {
                required: true,
                email: true
            }
        }
    };

    /**
     * Restore user password
     * @param form
     * @returns {boolean}
     */
    function submitRestore(form) {
        if (!form.validate()) {
            return false;
        }

        Users.restorePassword(vm.RestoreModel)
            .then(function(result) {
                notifyService({
                    message: 'We send new password to your email, please check it!'
                });
            })
    }

    /**
     * Submit login form
     * @param form
     * @returns {boolean}
     */
    function submitLogin(form) {
        if (!form.validate()) {
            return false;
        }

        userService.login(vm.LoginModel)
            .then(function (user) {
                userService.setAsCurrent(user);

                // student doesn't have dashboard
                if ( $rootScope.isStudent() ) {
                    $state.go('index.studentClasses');
                }
                // teacher/principal go to dashboard
                else {
                    $state.go('home.main')
                }

                ngDialog.closeAll();
            })
    }
}