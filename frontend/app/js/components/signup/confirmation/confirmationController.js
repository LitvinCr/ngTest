'use strict';

angular.module('Educ8')
    .controller('confirmationController', ['Plans', '$rootScope', '$controller', '$state', '$scope', 'Users', 'userService', 'ngDialogService', confirmationController]);

function confirmationController(Plans, $rootScope, $controller, $state, $scope, Users, userService, ngDialogService) {
    var vm = this;

    var ctrl = $controller(previewController, {$scope: $scope});

    angular.extend(vm, ctrl, {
        goToDashboard: goToDashboard,
        saveSchoolPlan: saveSchoolPlan,
        openConfirmModal: openConfirmModal,
        closeModal: closeModal
    });

    // when user data was updated
    $scope.$on('registrationStepUserDataUpdate', function (e, res) {
        // if confirmation plan already saved to $rootScope
        if (!$rootScope.planToSave) {
            vm.getPlan(res.school.classSetsCombination, function (plan) {
                $rootScope.planToSave = plan;
            });
        }
    });

    /**
     * save school plan
     */
    function saveSchoolPlan() {
        // prepare plan to save
        var plan = $rootScope.planToSave;

        plan.classSets = plan.classSetsCombination.split('').map(function (t) {
            return parseInt(t)
        });

        plan.courses = [];

        Object.keys(plan.coursesByType).forEach(function (item) {
            item = plan.coursesByType[item];

            var course = {
                period: item.coursesToPlans.period,
                course: item,
                courseType: {
                    type: item.coursesToPlans.type
                }
            };

            plan.courses.push(course)
        });

        Plans.create(plan)
            .then(function () {
                return userService.getCurrent();
            })
            .then(function () {
                $state.go('home.main')
            })
            .finally(function () {
                ngDialogService.closeAll();
            })
    }

    /**
     * Submit confirmation step and go to dashboard
     */
    function goToDashboard() {
        Users.passConfirmationStep()
            .then(function () {
                return userService.getCurrent();
            })
            .then(function () {
                // student doesn't have dashboard
                if ( $rootScope.isStudent() ) {
                    $state.go('index.studentClasses');
                }
                // teacher/principal go to dashboard
                else {
                    $state.go('home.main')
                }

                ngDialogService.closeAll();
            })
    }

    /**
     * Open confirm modal
     */
    function openConfirmModal() {
        ngDialogService.closeAll();

        ngDialogService.open({
            controller: 'confirmationController',
            controllerAs: 'vm',
            template: 'js/components/signup/confirmation/confirmationModal.html',
            className: 'ngdialog-theme-default signup-confirmation-modal'
        });
    }

    /**
     * Close modal
     */
    function closeModal() {
        ngDialogService.close();
    }


}