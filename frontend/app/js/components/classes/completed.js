'use strict';

angular.module('Educ8')
    .controller('completedController', ['$rootScope', 'appConstants', 'Classes', CompletedController]);

function CompletedController($rootScope, appConstants, Classes) {
    var vm = this;

    angular.extend(vm, {
        getClasses: getClasses
    });

    vm.classesPagination = {
        q: '',
        limit: 10,
        offset: 0,
        pages: 0,
        page: 0
    };

    /**
     * Get list of completed classes
     * @param page
     */
    function getClasses(page) {
        if (!page) {
            page = 0;
        }

        vm.classesPagination.page = page;
        vm.classesPagination.offset = vm.classesPagination.page * vm.classesPagination.limit;

        Classes.getCompleted(vm.classesPagination)
            .then(function (result) {
                vm.classesPagination.pages = Math.ceil(result.data.payload.count / vm.classesPagination.limit);
                vm.classes = result.data.payload.list;
                Classes.formatAssessmentsHistory(vm.classes);
            })
    }

    //////////////////////////////////////////////////
    getClasses();

}