'use strict';

angular.module('Educ8')
    .controller('esafetyController', ['$stateParams', 'PDFViewerService', esafetyController]);

function esafetyController($stateParams, pdf) {
    var vm = this;
    var viewer = pdf.Instance("viewer");

    vm.stateId = $stateParams.id;

    vm.planUrl = '/resources/OnlineSafety-Primary' + vm.stateId + '.pdf';
    vm.presentationUrl = getPresentationUrl();

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

    /**
     * Get presentation url depending on state id
     */
    function getPresentationUrl() {
        var url = 'https://docs.google.com/presentation/d/';

        switch (vm.stateId) {
            case 1:
                url += '1stFh1dM7ROU1JFl3mhy0JuVsNWoVg6EjSB6pWPUvDnw';
                break;

            case 2:
                url += '1M0ATZLVOrmQCStdl9x2RbrEMMBy28VD-R2xIeIXIRKE';
                break;

            case 3:
                url += '1MoQ8eonKo12hanKxxJkj57wpio_0Yga8Mhi6McAqTrA';
                break;

            case 4:
                url += '1j6d1SvZjdMPjCCo7W3Q7Z7DjuKMeUQnv2_HOWy8WaEE';
                break;

            case 5:
                url += '1yH1xYCkPMZLBSndQaw3JUO_u4hJa1RCe3xRnn0r9ODc';
                break;

            case 6:
                url += '1OXAvS1Fd7ZK9qFbmYoDRg27p-WF9KJSnsjFTmwzCwm8';
                break;

            default:
                break;
        }

        return url;
    }


}