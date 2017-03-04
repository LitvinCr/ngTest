'use strict';

angular.module('Educ8')
    .controller('selectCourseForClassController', ['Plans', 'onCourseSelected', selectCourseForClassController]);

function selectCourseForClassController(Plans, onCourseSelected) {
    var vm = this;

    vm.plan = {};

    angular.extend(vm, {
        selectCourse: selectCourse
    });

    /**
     * Get plan by school
     */
    function getPlanBySchool() {
        Plans.getBySchool()
            .then(function (result) {
                vm.plan =  Plans.sortCourses(result.data);
            })
    }

    /**
     * Select course
     * @param course
     */
    function selectCourse(course) {
        onCourseSelected(course);
    }


    ///////////////////////////////////////////////
    getPlanBySchool();
}