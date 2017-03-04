'use strict';

angular.module('Educ8')
    .controller('createStudentController', ['controls', createStudentController]);

function createStudentController(controls) {
    var vm = this;

    angular.extend(vm, {
        cancel: cancel,
        createStudent: createStudent
    });

    vm.student = {
        firstName: '',
        lastName: ''
    };

    vm.validationOptions = {
        rules: {
            firstName: {
                required: true,
                minlength: 3
            },
            lastName: {
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
     * Create new student
     * @param form
     * @returns {*}
     */
    function createStudent(form) {
        if (!form.validate()) {
            return false;
        }

        return controls.create(vm.student);
    }

}