'use strict';

angular.module('Educ8')
    .controller('priceController', ['appConstants', '$state', '$timeout', 'notifyService', 'Users', 'userService', priceController]);

function priceController(appConstants, $state, $timeout, notifyService, Users, userService) {
    var vm = this;

    angular.extend(vm, {
        changeVal: changeVal,
        validCard: validCard,
        submitPayment: submitPayment,
        goToPreview: goToPreview,
        changeSchoolSize: changeSchoolSize,
        changeCountrySetting: changeCountrySetting,
        checkPromocode: checkPromocode,
        formatPrice: formatPrice
    });


    vm.appConstants = appConstants;
    vm.price = {};
    vm.cardBox = {};
    vm.term = {};
    vm.countrySettings = {};
    vm.terms = [];

    vm.settings = {
        schoolSize: null,
        countrySetting: null
    };

    vm.currency = null;
    vm.promoApproved = false;
    vm.school = appConstants.SCHOOL;

    vm.paymentValidator = {
        rules: {
            cardNumber: {
                required: true
            },
            expDate: {
                required: true
            },
            CVC: {
                required: true
            },
            classes: {
                required: true
            },
            schoolSize: {
                required: true
            },
            countrySetting: {
                required: true
            },
            terms: {
                required: true
            }
        },
        messages: {
            terms: "Please accept our policy"
        }
    };

    vm.terms = [
        {
            title: 'Free Trial',
            desc: 'Cancel any time within 30 days (totally free)',
            per: 'Automatic upgrade to Full Access after 30 days. See price opposite',
            itemList: ['Get a full preview of site content and functionality. Upgrade or cancel at any time.'],
            price: 0,
            type: appConstants.SUBSCRIPTION_TYPE.TRIAL
        },
        {
            title: 'Full Access',
            desc: 'Instant access to your full plan',
            per: '1 year subscription',
            itemList: ['Full access to all plans and resources; admin, teacher and student dashboards and much more!'],
            price: 0,
            type: appConstants.SUBSCRIPTION_TYPE.FULL
        }
    ];

    /**
     * Check promocode for valid
     */
    function checkPromocode() {
        var dataToCheck = {
            discount: vm.price.discount,
            subscriptionType: appConstants.SUBSCRIPTION_TYPE.FULL
        };

        Users.checkPromocode(dataToCheck)
            .then(function (result) {
                vm.promoPercent = result.data.amount / 100;
                vm.promoApproved = true;

                vm.terms[1].priceOld = angular.copy(vm.terms[1].price);
                vm.terms[1].price = formatPrice(vm.promoPercent, vm.terms[1].price);
            })
    }

    /**
     * Change btn
     * @param val
     */
    function changeSchoolSize(val) {
        vm.settings.schoolSize = val;

        changePrice()
    }

    /**
     * Change country settings
     * @param id
     */
    function changeCountrySetting(id) {
        vm.settings.countrySetting = id;

        changePrice();
    }

    /**
     * Format price that include promocode amount
     * @param price
     */
    function formatPrice(promoPercent, price) {
        // just return price if promocode not approved
        if (!promoPercent) {
            return price;
        }

        var formattedPrice = price - (price * promoPercent);

        return formattedPrice;
    }

    /**
     * Change price for program depending on selected country/school size
     */
    function changePrice() {
        angular.forEach(vm.countrySettings, function (country) {

            if (vm.settings.schoolSize) {
                // small, medium, large
                var size = vm.settings.schoolSize.toLowerCase();

                // find selected country
                if (country.id === vm.settings.countrySetting) {
                    var sizeCapitaized = size.charAt(0).toUpperCase() + size.slice(1);
                    var price = country['price' + sizeCapitaized];

                    // [priceSmall, priceMedium, pricelarge]
                    vm.terms[1].priceOld = angular.copy(price);
                    vm.terms[1].price = formatPrice(vm.promoPercent, price);
                    vm.currency = country.currency;
                }
            }
        });
    }

    /**
     * Get country settings
     */
    function getCountrySettings() {
        Users.getCountrySettings()
            .then(function (result) {
                vm.countrySettings = result.data.payload;
            })
    }

    /**
     * Change value of the card
     * @param val
     * @param className
     */
    function changeVal(val, className) {
        var cardType = angular.element.payment.cardType(angular.element('.cc-number').val());

        switch (className) {
            case 'cc-number':
                if (!angular.element.payment.validateCardNumber(val)) {
                    conditionalVal({
                        val: val,
                        name: 'number',
                        nameLength: 'numberShort',
                        len: 19
                    });
                    break;
                }
                vm.cardBox.number = false;
                vm.cardBox.numberShort = false;
                break;
            case 'cc-exp':
                if (!angular.element.payment.validateCardExpiry(angular.element('.' + className).payment('cardExpiryVal'))) {
                    conditionalVal({
                        val: val,
                        name: 'expDate',
                        nameLength: 'expDateShort',
                        len: 4
                    });
                    break;
                }
                vm.cardBox.expDate = false;
                vm.cardBox.expDateShort = false;
                break;
            case 'cc-cvc':
                if (!angular.element.payment.validateCardCVC(val, cardType)) {
                    conditionalVal({
                        val: val,
                        name: 'cvc',
                        nameLength: 'cvcShort',
                        len: 3
                    });
                    break;
                }
                vm.cardBox.cvc = false;
                vm.cardBox.cvcShort = false;
                break;

            default:
                break;
        }
    }

    /**
     * Check conditions
     * @param data
     */
    function conditionalVal(data) {
        vm.cardBox[data.nameLength] = false;

        if (data.val && data.val.length < data.len) {
            vm.cardBox[data.nameLength] = true;
        }

        vm.cardBox[data.name] = true;
    }

    /**
     * Check valid card
     * @param data
     * @returns {boolean}
     */
    function validCard(data) {
        var result = true;

        for (var key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            if (data[key]) {
                result = false;
                break;
            }
        }

        return result;
    }

    /**
     * Submit payment form
     * @param form
     * @returns {boolean}
     */
    function submitPayment(form) {
        vm.submitted = true;

        var ischeckedAgree = vm.price.conditions;
        var isCheckedType = vm.price.term;

        // not valid form
        if (!form.validate() || !ischeckedAgree || !isCheckedType) {
            return false;
        }

        if (!vm.settings.schoolSize) {
            return notifyService({
                status: 400,
                message: 'Please select school size!'
            })
        }

        if (!vm.settings.countrySetting) {
            return notifyService({
                status: 400,
                message: 'Please select country settings!'
            })
        }



        // if selected full access
        if (vm.price.term === vm.appConstants.SUBSCRIPTION_TYPE.FULL) {
            // not valid card
            if ( !validCard(vm.cardBox) ) {
                return false;
            }

            saveWithCard();
        } else {
            saveWithoutCard();
        }
    }

    /**
     * Save data for premium form
     */
    function saveWithCard() {
        var dataToSave = {};

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
                schoolSize: vm.settings.schoolSize,
                countrySettings: vm.settings.countrySetting,
                card: {
                    token: res.card.id,
                    last4Numbers: res.card.last4,
                    expMonth: res.card.exp_month,
                    expYear: res.card.exp_year,
                    brandName: res.card.brand
                }
            };

            passPaymentStep(dataToSave);
        });
    }

    /**
     * Save data for trial form
     */
    function saveWithoutCard() {
        var dataToSave = {
            subscriptionType: vm.price.term,
            schoolSize: vm.settings.schoolSize,
            countrySettings: vm.settings.countrySetting
        };

        passPaymentStep(dataToSave)
    }

    /**
     * Make request to pass payment
     * @param dataToSave
     */
    function passPaymentStep(dataToSave) {
        Users.passPaymentStep(dataToSave)
            .then(function () {
                return userService.getCurrent();
            })
            .then(function () {
                $state.go('signup.confirmation');
            })
    }

    /**
     * Set validators for payment card
     */
    function setValidators() {

        if (!angular.element('.cc-number').length || !angular.element('.cc-exp').length || !angular.element('.cc-cvc').length) {
            return $timeout(function () {
                setValidators();
            }, 500)
        }
        $timeout(function () {
            angular.element('.cc-number').payment('formatCardNumber');
            angular.element('.cc-exp').payment('formatCardExpiry');
            angular.element('.cc-cvc').payment('formatCardCVC');
        }, 0)

    }

    /**
     * Go go previos step
     */
    function goToPreview() {
        Users.goToPrevStep()
            .then(function () {
                $state.go('signup.preview');
            })
    }


    ////////////////////////////////////////////////
    getCountrySettings();
    setValidators();

}