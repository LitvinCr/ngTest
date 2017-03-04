'use strict';

angular.module('Educ8')
    .controller('SchoolClassesController', ['$scope', '$state', 'notifyService', SchoolClassesController]);

function SchoolClassesController($scope, $state, notifyService) {
    var vm = this;

    angular.extend(vm, {

    });

    $state.go('index.schoolClasses.completed')

}

