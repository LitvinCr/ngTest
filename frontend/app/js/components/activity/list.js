'use strict';

angular.module('Educ8')
    .controller('activityController', ['$scope', '$uibModal', 'ngDialogService', 'Schools', 'DataTable', activityController]);

function activityController($scope, $uibModal, ngDialogService, Schools, DataTable) {
    var vm = this;

    vm.teachersValidator = {
        rules: {
            firstName: {
                required: true,
            },
            lastName: {
                required: true,
            },
            email: {
                required: true,
                email: true
            }
        }
    };

    var requestParams = {
        methodName: 'getTeachers'
    };

    DataTable.initialize.apply(vm, [Schools, requestParams]);


    angular.extend(vm, {
        openForm: openForm,
        submit: submit
    });

    /**
     * Open create new teacher modal with form
     * @param $index
     */
    function openForm($index) {
        if ($index || $index === 0) {
            vm.TeacherModel = angular.copy(vm.items[$index]);
        } else {
            vm.TeacherModel = {
                firstName: null,
                lastName: null,
                email: null
            };
        }

        ngDialogService.open({
            template: 'js/components/activity/createModal.html',
            scope: $scope
        });
    }

    /**
     * Submit create/edit teacher form
     * @param form
     * @returns {boolean}
     */
    function submit(form) {
        if (!form.validate()) {
            return false;
        }

        var args = [];
        var method;


        if (vm.TeacherModel.id) {
            args = [vm.TeacherModel.id, vm.TeacherModel];
            method = 'editTeacher';
        } else {
            args  = [vm.TeacherModel];
            method = 'addTeacher';
        }

        Schools[method].apply(Schools, args)
            .then(function () {
                vm.getList();
                ngDialogService.close();
            })
    }

}