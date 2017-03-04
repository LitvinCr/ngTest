'use strict';

angular.module('Educ8')
    .controller('paymentCardController', ['controls', '$rootScope', 'Users', '$timeout', '$controller', '$scope', paymentCardController]);

function paymentCardController(controls, $rootScope, Users, $timeout, $controller, $scope) {
    var vm = this;

    angular.extend(vm, $controller('priceController', {$scope: $scope}));

    vm.terms.splice(0, 1);
    vm.currency = $rootScope.profile.countrySetting.currency;
    vm.price.term = vm.terms[0].type;

    /**
     * Check promocode for valid
     */
    vm.checkPromocode = function() {
        var dataToCheck = {
            discount: vm.price.discount,
            subscriptionType: vm.appConstants.SUBSCRIPTION_TYPE.FULL
        };

        Users.checkPromocode(dataToCheck)
            .then(function (result) {
                vm.promoPercent = result.data.amount / 100;
                vm.promoApproved = true;
                vm.terms[0].priceOld = angular.copy(vm.terms[0].price);
                vm.terms[0].price = vm.formatPrice(vm.promoPercent, vm.terms[0].price);
            })
    };

    vm.submitPayment = function (form) {
        vm.submitted = true;
        var dataToSave = {};

        if (!form.validate() || !vm.validCard(vm.cardBox)) {
            return false;
        }

        // expire month/year
        var exp = vm.price.expDate.split(' / ');
        var stripeData = {
            number: vm.price.cardNumber,
            cvc: vm.price.cvc,
            exp_month: exp[0],
            exp_year: exp[1]
        };

        /**
         * get stripe card data
         */
        Stripe.card.createToken(stripeData, function (err, res) {
            if (err !== 200) {
                if (res.error && res.error.message) {
                    notifyService({
                        message: res.error.message
                    })
                }

                return notifyService(err);
            }

            dataToSave = {
                discount: vm.price.discount,
                subscriptionType: vm.price.term,
                customerToken: res.id,
                card: {
                    token: res.card.id,
                    last4Numbers: res.card.last4,
                    expMonth: res.card.exp_month,
                    expYear: res.card.exp_year,
                    brandName: res.card.brand
                }
            };

            return controls.confirm(dataToSave)

        });
    };

    function initPriceData(){
        var schoolSize = _.find(vm.appConstants.SCHOOL, {maxTeachers: $rootScope.profile.school.maxTeachers}) || vm.appConstants.SCHOOL[3];
        var price = $rootScope.profile.countrySetting['price' + _.capitalize(schoolSize.value.toLowerCase())];
        vm.terms[0].price = price;
    }

    initPriceData();
}