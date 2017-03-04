'use strict';

angular.module('Educ8')
    .controller('schoolPlanController', ['Plans', schoolPlanController]);

function schoolPlanController(Plans) {
    var vm = this;

    vm.preview = {
        plans: {},
        detailPlan: {}
    };
    vm.term = {};

    getPlan();

    function getPlan() {
        Plans.getBySchool()
            .then(function(plan){
                vm.preview.plans = Plans.sortCourses(plan.data);
            })
    }

}