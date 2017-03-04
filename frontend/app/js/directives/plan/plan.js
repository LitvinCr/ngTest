'use strict';

angular.module('Educ8')
    .directive('plan', function ($state, ngDialogService, appConstants, $rootScope, notifyService) {

        return {
            replace: true,
            restrict: 'EA',
            scope: {
                plans: '=planData',
                selectCourse: '&planSelectCourse',
                nextStep: '&planNextStep'
            },
            templateUrl: function () {
                var path = '';


                // switch different templates for plan directive
                switch ($state.current.name) {
                    case 'signup.preview':
                        path = 'js/directives/plan/signupPreview.html';
                        break;

                    case 'signup.confirmation':
                        path = 'js/directives/plan/signupConfirmation.html';
                        break;

                    case 'index.classModify':
                    case 'index.classModifyCompleted':
                        path = 'js/directives/plan/selectCourseByPlan.html';
                        break;

                    default:
                        path = 'js/directives/plan/base.html';
                        break;
                }

                return path;
            },
            link: function (scope, element, attrs) {
                var courseModal = null;

                scope.sortedTable = false;
                scope.constants = angular.copy(appConstants);
                // init base url for plan files (download and show)
                scope.planUrl = scope.constants.API_URL +
                    'plans/year-plan-file?token=' + $rootScope.profile.token;

                scope.openDialog = openDialog;
                scope.sortTable = sortTable;
                scope.refreshSort = refreshSort;
                scope.onCourseSelected = selectCourse;
                scope.openCourseModal = openCourseModal;
                scope.openOtherOptsModal = openOtherOptsModal;
                scope.showLessonsModal = showLessonsModal;

                /**
                 * change current course
                 * @param period
                 * @param type
                 */
                function openCourseModal(period, type) {
                    courseModal = ngDialogService.open({
                        scope: scope,
                        className: 'ngdialog-theme-default change-course-modal',
                        controller: 'courseController',
                        controllerAs: 'vm',
                        template: 'js/components/signup/confirmation/course/courseConfirmation.html',
                        resolve: {
                            typesData: function typesDataFactory() {
                                return {
                                    period: period,
                                    type: type
                                }
                            }
                        }
                    });
                }

                /**
                 * show lessons list
                 * @param courseId
                 */
                function showLessonsModal(courseId) {
                    var template = '';

                    // switch different templates for lessons list modal
                    switch ($state.current.name) {
                        case 'signup.confirmation':
                        case 'signup.preview':
                            template = 'js/components/lessons/list_signup.html';
                            break;

                        case 'index.classModify':
                        case 'index.classModifyCompleted':
                            template = 'js/components/lessons/list.html';
                            break;

                        default:
                            template = 'js/components/lessons/list.html';
                            break;
                    }

                    ngDialogService.open({
                        scope: scope,
                        className: 'ngdialog-theme-default set-lesson-modal',
                        controller: 'planLessonsModalController',
                        controllerAs: 'vm',
                        template: template,
                        resolve: {
                            getCourseId: function getCourseIdFactory() {
                                return courseId;
                            }
                        }
                    });
                }

                /**
                 * change current course
                 * @param period
                 * @param type
                 */
                function openOtherOptsModal(period, type) {
                    courseModal = ngDialogService.open({
                        scope: scope,
                        className: 'ngdialog-theme-default change-course-modal',
                        controller: 'courseController',
                        controllerAs: 'vm',
                        template: 'js/components/signup/confirmation/course/coursePreview.html',
                        resolve: {
                            typesData: function typesDataFactory() {
                                return {
                                    period: period,
                                    type: type
                                }
                            }
                        }
                    });
                }

                /**
                 * open detailed course modal
                 * @param plan
                 */
                function openDialog(plan) {
                    if (!(plan.youtubeId && plan.description)) {
                        notifyService({
                            message: 'There\'s no complete information'
                        });

                        return;
                    }

                    ngDialogService.closeAll();

                    ngDialogService.open({
                        controller: 'previewModalController',
                        controllerAs: 'vm',
                        template: 'js/components/schoolPlan/previewModal.html',
                        appendClassName: 'white-theme main-theme',
                        resolve: {
                            detail: function () {
                                // need to prepare coursesToPlans as array
                                if ( angular.isArray(plan.coursesToPlans) && plan.coursesToPlans.length ) {
                                    plan.coursesToPlans = plan.coursesToPlans[0];
                                }

                                return plan
                            },
                            controls: function controlsServiceService () {
                                return {
                                    addToPlan: function (course, period, type) {
                                        if($state.current.name ==='signup.confirmation'){
                                            course.coursesToPlans = {
                                                period: period,
                                                type: type
                                            };

                                            $rootScope.planToSave.coursesByType[period + '_' + type] = course;
                                        }else{
                                            scope.nextStep();
                                        }
                                        return closeDialog()
                                    },
                                    viewLessons: function (course) {

                                        if($state.current.name ==='signup.confirmation'){
                                            return showLessonsModal(course.id)
                                        }else{
                                            scope.nextStep();
                                            return closeDialog();
                                        }
                                    },
                                    viewOtherOptions: function(period, type) {
                                        scope.openOtherOptsModal(period, type);
                                    }
                                }
                            }
                        }
                    });
                }


                /**
                 * Sort table by click on title cells
                 * could reorder cells in header ang first cells in body
                 * @param orderData
                 * @param sortType
                 */
                function sortTable(orderData, sortType) {
                    scope.headerRows = [];
                    scope.bodyRows = [];
                    scope.bodyCells = [];

                    // revert sort type order
                    scope.sortType = sortType === scope.constants.PLAN_SORT.TYPE ?
                        scope.constants.PLAN_SORT.PERIOD :
                        scope.constants.PLAN_SORT.TYPE;

                    if (sortType === scope.constants.PLAN_SORT.TYPE) {
                        scope.headerRows = scope.constants.PERIOD_OF_PLAN;
                        scope.bodyRows.push(orderData);
                    }
                    else if (sortType === scope.constants.PLAN_SORT.PERIOD) {
                        scope.headerRows.push(orderData);
                        scope.bodyRows = scope.constants.COURSE_TYPE;
                    }

                    scope.sortedTable = true;
                }

                /**
                 * Refresh table sort
                 */
                function refreshSort() {
                    scope.sortedTable = false;
                }

                function closeDialog() {
                    ngDialogService.close()
                }

                /**
                 * call callback 'selectCourse' for select course in plans
                 * @param course {object}
                 * @param period {object}
                 * @param type {object}
                 * @returns {*}
                 */
                function selectCourse(course, period, type) {
                    return scope.selectCourse({
                        data: {
                            course: course,
                            period: period.type,
                            type: type.type
                        }
                    });
                }

            }
        };

    });

