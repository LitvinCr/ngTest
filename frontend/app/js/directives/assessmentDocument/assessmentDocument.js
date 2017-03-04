'use strict';

angular.module('Educ8')
    .directive('assessmentDocument', function($state, ngDialogService, appConstants, $rootScope) {

        return {
            replace: true,
            restrict: 'EA',
            scope: {
                activeTemplate: '=assessmentDocumentActiveTpl',
                classData: '=assessmentDocumentClass',
                createStudentModal: '&assessmentDocumentCreateStudent',
                createAssessmentModal: '&assessmentDocumentCreateAssessment',
                editAssessmentModal: '&assessmentDocumentEditAssessment',
                onAssessmentChange: '&assessmentDocumentChangeAssessment',
                removeAssessment: '&assessmentDocumentRemoveAssessment',
                disabledFunctions: '=assessmentDocumentDisabledFunctions'
            },
            templateUrl: function() {
                var tplUrl = 'js/directives/assessmentDocument/documentTeacher.html';

                // change template for principal
                if ( $rootScope.isPrincipal() ) {
                    tplUrl = 'js/directives/assessmentDocument/documentPrincipal.html';
                }

                return tplUrl;
            },
            link: function (scope, element, attrs, ctrl) {
                scope.constants = appConstants;
            }
        };

    });

