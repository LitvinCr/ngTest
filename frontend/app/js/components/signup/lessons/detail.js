'use strict';

angular.module('Educ8')
    .controller('lessonController', ['$stateParams', 'Users', lessonController]);

function lessonController($stateParams, Users) {
    var vm = this;

    vm.lesson = {};

    getLesson($stateParams.id);

    /**
     * Get detail info for lesson
     * @param id
     */
    function getLesson(id) {
        Users
            .getCurrentLesson(id)
            .then(function(res) {
                vm.lesson.info = res.data;
                vm.lesson.title = $stateParams.course;
            })
    }

}