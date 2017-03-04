'use strict';

angular.module('Educ8')
    .controller('studentClassesController', ['Classes', studentClassesController]);

function studentClassesController(Classes) {
    var vm = this;

    angular.extend(vm, {});

    vm.class = {};

    /**
     * Get classes for student
     */
    function getClasses() {
        Classes.getByStudent()
            .then(function (schoolClass) {
                vm.class = schoolClass.data;
            })
            .catch(function () {
                vm.class = null;
            })
    }


    //////////////////////////////////////
    getClasses();

}