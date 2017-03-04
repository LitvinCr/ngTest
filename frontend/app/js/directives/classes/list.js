'use strict';

angular.module('Educ8')
    .directive('classesList', function($state, ngDialogService, appConstants, $rootScope) {

        return {
            replace: true,
            restrict: 'EA',
            scope: {
                list: '=classesListData',
                pagination: '=classesListPagination',
                getContent: '&classesListGetContent'
            },
            templateUrl: function() {
                return 'js/directives/classes/list.html';
            },
            link: function (scope, element, attrs) {
                scope.search = function(){
                    scope.getContent();
                };

                scope.userProfile = $rootScope.profile;
            }
        };

    });

