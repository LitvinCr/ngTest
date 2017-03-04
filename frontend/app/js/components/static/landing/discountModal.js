'use strict';

angular.module('Educ8')
    .controller('discountModalController', ['$http', 'appConstants', DiscountModalController]);

function DiscountModalController($http, appConstants) {
    var vm = this;

    angular.extend(vm, {
        submitDiscount: submitDiscount
    });

    //data for login form
    vm.DiscountModel = {
        email: null,
    };
    vm.discountValidator = {
        rules: {
            email: {
                required: true,
                email: true
            }
        }
    };


    vm.submitted = false;

    /**
     * Submit login form
     * @param form
     * @returns {boolean}
     */
    function submitDiscount(form) {
        if (!form.validate()) {
            return false;
        }

        $http.post(appConstants.API_URL + 'discount-emails', vm.DiscountModel)
            .then(function (user) {
                vm.submitted = true;
            })
    }


}