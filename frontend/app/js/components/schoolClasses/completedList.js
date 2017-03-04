'use strict';

angular.module('Educ8')
    .controller('completedListController', ['Classes', 'DataTable', CompletedListController]);

function CompletedListController(Classes, DataTable) {
    var vm = this;

    var requestParams = {
        methodName: 'getCompleted',
        formatter: Classes.formatAssessmentsHistory
    };

    DataTable.initialize.apply(vm, [Classes, requestParams]);

}