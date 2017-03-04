'use strict';

angular.module('Educ8')
    .directive('classes', function($state, ngDialogService, appConstants) {

        return {
            replace: true,
            restrict: 'EA',
            scope: {
                courses: '=coursesData'
            },
            templateUrl: function() {
                return 'js/directives/classes/base.html';
            },
            link: function (scope, element, attrs) {
                scope.constants = angular.copy(appConstants);

            }
        };

    });

