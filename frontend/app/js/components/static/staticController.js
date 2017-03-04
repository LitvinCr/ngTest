'use strict';

angular.module('Educ8')
    .controller('staticController', ['$window', 'userService', 'ngDialogService', 'appConstants', 'Lightbox', 'PDFViewerService', StaticController]);

function StaticController($window, userService, ngDialogService, appConstants, Lightbox, pdf) {
    var vm = this;

    var viewer = pdf.Instance("viewer");

    angular.extend(vm, {
        openLightboxModal: openLightboxModal,
        openVideoModal: openVideoModal,
        logOut: logOut,
        setActiveCountry: setActiveCountry,
        openLoginModal: openLoginModal,
        scrollToSection: scrollToSection,
        pageLoaded: pageLoaded,
        nextPage: nextPage,
        prevPage: prevPage,
    });

    vm.constants = appConstants;

    vm.galleryImages = [
        {
            'url': '/images/home_slide_1.jpeg',
            'thumbUrl': '/images/home_slide_1.jpeg'
        },
        {
            'url': '/images/home_slide_2.jpeg'
        },
        {
            'url': '/images/home_slide_3.jpeg'
        },
        {
            'url': '/images/home_slide_4.jpeg'
        },
        {
            'url': '/images/home_slide_5.jpeg'
        },
        {
            'url': '/images/home_slide_6.jpeg'
        },
        {
            'url': '/images/home_slide_7.jpeg'
        },
        {
            'url': '/images/home_slide_8.png'
        }
    ];

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

    vm.landingVideo = 'DgcVTTJGwSk';
    vm.playerVars = {
        controls: 0,
        autoplay: 1
    };

    vm.activeCountry = null;
    vm.landingCountries = [
        {
            countryName: 'UK',
            prices: ['£300', '£300', '£400']
        },
        {
            countryName: 'Ireland',
            prices: ['€360', '€420', '€480']
        },
        {
            countryName: 'Rest of World',
            prices: ['€360', '€420', '€480']
        }
    ];

    /**
     * Set active country
     * @param country
     */
    function setActiveCountry(country) {
        vm.activeCountry = country;
    }

    /**
     * Logout current user
     */
    function logOut() {

        userService.logout(function(){
            $window.location.reload();
        });
    }


    /**
     * Open modal gallery
     * @param index
     */
    function openLightboxModal(index, gallery) {
        Lightbox.openModal(gallery, index);
    }


    /**
     * Open homepage video
     */
    function openVideoModal() {
        ngDialogService.closeAll();

        ngDialogService.open({
            controller: 'staticController',
            controllerAs: 'vm',
            template: 'js/components/static/landing/videoModal.html',
            className: 'ngdialog-theme-default video-modal'
        });
    }

    /**
     * Pdf doc loaded
     * @param curPage
     * @param totalPages
     */
    function pageLoaded(curPage, totalPages) {
        vm.currentPage = curPage;
        vm.totalPages = totalPages;
    }

    /**
     * pdf next page
     */
    function nextPage() {
        viewer.nextPage();
    }

    /**
     * pdf prev page
     */
    function prevPage() {
        viewer.prevPage();
    }

    /**
     * Open login modal
     */
    function openLoginModal() {
        ngDialogService.closeAll();

        ngDialogService.open({
            controller: 'LoginModalController',
            controllerAs: 'vm',
            template: 'js/components/static/landing/loginModal.html',
            className: 'ngdialog-theme-default login-modal'
        });
    }

    /**
     * Scroll to section
     * @param sectionId
     */
    function scrollToSection(sectionId) {
        angular.element('html,body').animate({
            scrollTop: angular.element('#' + sectionId).offset().top
        }, 'slow');
    }


}