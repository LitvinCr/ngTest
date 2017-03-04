'use strict';

angular.module('Educ8')
    .directive('assessmentsDetailInfo', function($state, ngDialogService, appConstants, $rootScope) {

        return {
            replace: true,
            restrict: 'EA',
            scope: {
            },
            templateUrl: function() {
                return 'js/directives/assessmentsDetailInfo/assessmentsDetailInfo.html';
            },
            link: function (scope, element, attrs) {
                scope.constants = appConstants;
            }
        };

    });

