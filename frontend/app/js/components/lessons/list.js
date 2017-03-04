'use strict';

angular.module('Educ8')
    .controller('planLessonsController', [
        '$stateParams',
        'DataTable',
        'Courses',
        planLessonsController
    ]);

function planLessonsController($stateParams, DataTable, Courses) {
    var vm = this;

    var requestParams = {
        methodName: 'getCourseLessons',
        id: $stateParams.id
    };

    vm.currentCourseId = $stateParams.id;

    DataTable.initialize.apply(vm, [Courses, requestParams]);
}