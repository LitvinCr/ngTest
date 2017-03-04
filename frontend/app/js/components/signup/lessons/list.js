'use strict';

angular.module('Educ8')
    .controller('lessonListController', ['$stateParams', 'Courses', lessonListController]);

function lessonListController($stateParams, Courses) {
    var vm = this;

    vm.lessons = [];

    getCourse($stateParams.id);
    getLessonList($stateParams.id);

    /**
     * Get course
     * @param id
     */
    function getCourse(id) {
        Courses
            .getOne(id)
            .then(function(res) {
                vm.course = res.data;
            })
    }

    /**
     * Get lessons for course
     * @param id
     */
    function getLessonList(id) {
        Courses
            .getCourseLessons({}, id)
            .then(function(res) {
                vm.lessons = res.data.payload;
            })
    }

}