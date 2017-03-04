'use strict';

angular.module('Educ8')
    .controller('updateClassDetailsController', ['controls', 'getData', updateClassDetailsController]);

function updateClassDetailsController(controls, getData) {
    var vm = this;

    var newValue = angular.copy(getData.oldValue);

    var validationOptions = {
        rules: {
            newValue: {
                required: false,
                minlength: 3,
                maxlength: 50
            }
        }
    };

    angular.extend(vm, {
        cancel: cancel,
        update: update,
        validationOptions: validationOptions,
        newValue: newValue
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
    function update(form) {
        if (!form.validate()) {
            return false;
        }
        
        return controls.confirm(vm.newValue, getData.name);
    }

}