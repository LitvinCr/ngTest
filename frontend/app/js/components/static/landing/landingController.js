'use strict';

angular.module('Educ8')
    .controller('landingController', ['$timeout', '$location', 'userService', 'ngDialogService', 'appConstants', 'Lightbox', LandingController]);

function LandingController($timeout, $location, userService, ngDialogService, appConstants, Lightbox) {
    var vm = this;

    angular.extend(vm, {
        openLightboxModal: openLightboxModal
    });

    vm.constants = appConstants;


    vm.landingGallery = [
        {
            'url': '/images/landing_1.jpeg'
        },
        {
            'url': '/images/landing_2.jpeg'
        },
        {
            'url': '/images/landing_3.jpeg'
        }
    ];


    /**
     * Open modal gallery
     * @param index
     */
    function openLightboxModal(index, gallery) {
        Lightbox.openModal(gallery, index);
    }

    /**
     * Open Discount modal
     */
    function openDiscountModal() {
        ngDialogService.closeAll();

        ngDialogService.open({
            controller: 'discountModalController',
            controllerAs: 'vm',
            template: 'js/components/static/landing/discountModal.html',
            className: 'ngdialog-theme-default discount-modal'
        });
    }


    ///////////////////////////////////////

    $timeout(function() {
        openDiscountModal();
    }, 2000)
}