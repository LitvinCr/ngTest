'use strict';

angular.module('Educ8')
    .controller('settingsController', ['$window', 'appConstants', 'Subscriptions', 'userService', 'Users', 'ngDialogService', settingsController]);

function settingsController($window, appConstants, Subscriptions, userService, Users, ngDialogService) {
    var vm = this;

    angular.extend(vm, {
        openConfirmModal: openConfirmModal,
        openDiscardModal: openDiscardModal
    });

    vm.appConstants = appConstants;
    vm.countrySettings = {};

    vm.currency = null;

    /**
     * Open confirm subscription modal
     */
    function openConfirmModal() {
        ngDialogService.open({
            controller: 'confirmSubscriptionController',
            template: 'js/components/settings/confirmSubscription/template.html',
            resolve: {
                countrySettings: function countrySettingsFactory() {
                    return vm.countrySettings;
                },
                controls: function controlsFactory() {
                    return {
                        confirm: function () {
                            onSubscriptionConfirm();
                        },
                        cancel: closeModal
                    }
                }
            }
        });
    }

    /**
     * Submit confirm subscription
     */
    function onSubscriptionConfirm() {
        Subscriptions.update()
            .then(function (school) {
                closeModal();
                return userService.getCurrent()
            })
            .catch(function (err) {
                // if card already exist
                if (err.status !== 404) {
                    return false;
                }

                closeModal();

                ngDialogService.open({
                    controller: 'paymentCardController',
                    controllerAs: 'vm',
                    template: 'js/components/settings/paymentCard/template.html',
                    resolve: {
                        countrySettings: function countrySettingsFactory() {
                            return vm.countrySettings;
                        },
                        controls: function controlsFactory() {
                            return {
                                confirm: function (dataToSave) {
                                    dataToSave.subscriptionType = vm.appConstants.SUBSCRIPTION_TYPE.FULL;
                                    Subscriptions.add(dataToSave)
                                        .then(function(data){
                                            closeModal();
                                            return userService.getCurrent()
                                        })
                                },
                                cancel: closeModal
                            }
                        }
                    }
                });
            })
    }

    /**
     * Open confirm subscription modal
     */
    function openDiscardModal() {
        ngDialogService.open({
            controller: 'discardController',
            template: 'js/components/settings/discardSubscription/modal.html',
            className: 'ngdialog-theme-default complete-class-modal',
            resolve: {
                controls: function controlsFactory() {
                    return {
                        confirm: function () {
                            discardConfirm();
                        },
                        cancel: closeModal
                    }
                }
            }
        });
    }

    /**
     * Confirm discard subscription
     */
    function discardConfirm() {
        Subscriptions.discard()
            .then(function (result) {
                ngDialogService.close();

                $window.location.reload();
            })
    }

    /**
     * Close subscription modal
     */
    function closeModal() {
        ngDialogService.close()
    }


    /**
     * Get country setting for user
     */
    function getCountrySettings() {
        Users.getCurrUserCountrySettings()
            .then(function (countrySettings) {
                vm.countrySettings = countrySettings.data;
            })
    }
    


    /////////////////////////////////////////////////////////////
    getCountrySettings();

}