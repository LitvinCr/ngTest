'use strict';

angular.module('Educ8')
    .controller('planLessonsModalController', [
        '$state',
        '$stateParams',
        'DataTable',
        'Courses',
        'getCourseId',
        'ngDialogService',
        planLessonsModalController
    ]);

function planLessonsModalController($state, $stateParams, DataTable, Courses, getCourseId, ngDialogService) {
    var vm = this;

    angular.extend(vm, {
        openDetailed: openDetailed
    });
    
    var requestParams = {
        methodName: 'getCourseLessons',
        id: getCourseId
    };

    vm.currentCourseId = getCourseId;

    DataTable.initialize.apply(vm, [Courses, requestParams]);


    /**
     * Open lesson detailed view
     * @param lesson
     */
    function openDetailed(lesson) {
        ngDialogService.closeAll();

        $state.go('signup.lesson', {id: lesson.id});
    }
}