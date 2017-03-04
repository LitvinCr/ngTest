'use strict';

angular.module('Educ8')
    .controller('createAssessmentController', ['controls', createAssessmentController]);

function createAssessmentController(controls) {
    var vm = this;

    angular.extend(vm, {
        cancel: cancel,
        createAssessment: createAssessment
    });


    vm.assessment = {
        title: ''
    };

    vm.validationOptions = {
        rules: {
            assessmentName: {
                required: true,
                minlength: 3
            }
        }
    };

    /**
     * Close
     * @returns {*}
     */
    function cancel() {
        return controls.close();
    }

    /**
     * Create new assessment
     * @param form
     * @returns {*}
     */
    function createAssessment(form) {
        if (!form.validate()) {
            return false;
        }

        return controls.create(vm.assessment);
    }


    /**
     * Get edited assessment
     */
    function getEditedAssessment() {
        if (controls.getAssessment && typeof controls.getAssessment === 'function') {
            vm.assessment = angular.copy(controls.getAssessment());
        }
    }

    //////////////////////////
    getEditedAssessment();


}