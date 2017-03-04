'use strict';

angular.module('Educ8')
    .controller('previewController', ['Plans', '$scope', 'appConstants', '$state', 'ngDialogService', 'Users', 'userService', previewController]);

function previewController(Plans, $scope, appConstants, $state, ngDialogService, Users, userService) {
    var vm = this;

    angular.extend(vm, {
        closeDialog: closeDialog,
        goToPrice: goToPrice,
        updateDataUser: updateDataUser,
        getPlan: getPlan
    });


    var user = JSON.parse(localStorage.getItem('user'));

    vm.preview = {
        plans: {},
        detailPlan: {}
    };
    vm.term = {};

    vm.updateDataUser();

    function closeDialog() {
        ngDialogService.close();
    }

    function goToPrice() {
        if(user.registrationStep === appConstants.PRINCIPAL_REGISTRATION_STEPS.PREVIEW) {
            $state.go('price');
            return;
        }
        Users
            .passPlanReview()
            .then(function() {
                return userService.getCurrent();
            })
            .then(function() {
                $state.go('signup.price');
            })
    }

    function getPlan(query, callback) {
        Users
            .getPlan(query)
            .then(function(result) {
                var plans = Plans.sortCourses(result.data);

                if(!callback){
                    return vm.preview.plans = plans;
                }

                return callback(plans);
            })
    }

    function updateDataUser() {
        userService
            .getCurrent()
            .then(function(res) {
                if(user.registrationStep !== appConstants.PRINCIPAL_REGISTRATION_STEPS.PRICE.step){
                    vm.getPlan(res.school.classSetsCombination);
                }

                $scope.$emit('registrationStepUserDataUpdate', res);
            })
    }
}