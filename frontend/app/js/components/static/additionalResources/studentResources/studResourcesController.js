'use strict';

angular.module('Educ8')
    .controller('studResourcesController', ['$stateParams', 'PDFViewerService', studResourcesController]);

function studResourcesController($stateParams, pdf) {
    var vm = this;
    var viewer = pdf.Instance("viewer");



    vm.unpluggedPlanUrl = '/resources/Educ8UnpluggedProgramming.pdf';
    vm.beeBotUrl = '/resources/EL00363_Rechargeable_Bee-Bot_UG_GB_V1.pdf';
    vm.onlineSafetyUrl = '/resources/BeingSocialOnline-ImportancePodium.pdf';

    angular.extend(vm, {
        pageLoaded: pageLoaded,
        nextPage: nextPage,
        prevPage: prevPage,
    });

    /**
     * Load pdf doc
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

}