'use strict';

angular.module('Educ8')
    .controller('courseController', ['$stateParams', '$rootScope', 'Users', 'typesData', 'ngDialog', courseController]);

function courseController($stateParams, $rootScope, Users, typesData, ngDialog) {
    var vm = this;

    angular.extend(vm, {
        changeCourse: changeCourse
    });

    vm.courses = {};
    vm.courses.list = [];

    /**
     * Change course
     * @param course
     */
    function changeCourse(course) {
        course.coursesToPlans = {
            period: typesData.period,
            type: typesData.type
        };

        $rootScope.planToSave.coursesByType[typesData.period + '_' + typesData.type] = course;

        ngDialog.closeAll();
    }

    /**
     * Get available courses
     */
    function getCourses() {
        vm.courses.title = $stateParams.course;

        Users
            .getProspectCourses(typesData)
            .then(function (res) {
                vm.courses.list = res.data.payload.list;
            })
    }

    /////////////////////////////////////////////////////
    getCourses($stateParams);
}