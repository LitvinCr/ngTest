'use strict';

angular.module('Educ8')
    .controller('activeListController', ['Classes', 'DataTable', ActiveListController]);

function ActiveListController(Classes, DataTable) {
    var vm = this;

    var requestParams = {
        methodName: 'getActive'
    };

    DataTable.initialize.apply(vm, [Classes, requestParams]);

}