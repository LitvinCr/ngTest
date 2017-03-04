'use strict';

angular.module('Educ8')
    .controller('deleteAssessmentController', ['controls', 'getId', deleteAssessmentController]);

function deleteAssessmentController(controls, getId) {
    var vm = this;

    angular.extend(vm, {
        cancel: cancel,
        deleteAssessment: deleteAssessment
    });

    /**
     * cancel
     * @returns {*}
     */
    function cancel() {
        return controls.close();
    }

    /**
     * delete assessment
     * @returns {*}
     */
    function deleteAssessment() {
        return controls.confirm(getId);
    }

}