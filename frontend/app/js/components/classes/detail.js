'use strict';

angular.module('Educ8')
    .controller('classDetailController', ['$rootScope', '$stateParams', 'Classes', 'ClassesDetails', 'Students', 'ngDialogService', 'appConstants', ClassDetailController]);

function ClassDetailController($rootScope, $stateParams, Classes, ClassesDetails, Students, ngDialogService, appConstants) {
    var vm = this;

    vm.constants = appConstants;

    vm.class = {};

    vm.activeTemplate = {
        assessmentsByBlocks: []
    };

    vm.downloadAssessmentUrl = '';

    /**
     * list od classParams names
     * @type {{TEACHER_NAME: string, CLASS_YEAR: string, CS: string, DL: string, IT: string}}
     */
    vm.classDetailFields = {
        TEACHER_NAME: 'teacherName',
        CLASS_YEAR: 'classYear',
        CS: 'cs',
        DL: 'dl',
        IT: 'it'
    };

    /**
     * name of classDetail param
     * @param name
     */
    vm.changeClassDetail = function (name) {
        ngDialogService.open({
            controller: 'updateClassDetailsController',
            controllerAs: 'vm',
            template: 'js/components/classes/classesDetails/update.html',
            resolve: {
                getData: function getDataFactory() {
                    return {
                        name: name,
                        oldValue: vm.class.classesDetails[name]
                    };
                },
                controls: function controlsFactory() {
                    return {
                        confirm: function (value, name) {

                            var dataToSave = {
                                teacherName: vm.class.classesDetails.teacherName,
                                classYear: vm.class.classesDetails.classYear,
                                cs: vm.class.classesDetails.cs,
                                dl: vm.class.classesDetails.dl,
                                it: vm.class.classesDetails.it
                            };

                            dataToSave[name] = value;

                            ClassesDetails.update(dataToSave)
                                .then(function (result) {
                                    vm.class.classesDetails = result.data
                                })
                                .finally(function(){
                                    ngDialogService.close();
                                })
                        },
                        close: function () {
                            ngDialogService.close();
                        }
                    }
                }
            }
        });
    };

    /**
     * Get classes
     */
    function getClasses() {
        // no need to show error notification in httpVisualizer interceptor
        $rootScope.disableNotification = true;

        if ( $rootScope.isTeacher() ) {
            getClassesForTeacher();
        }

        if ( $rootScope.isPrincipal() ) {
            getClassesForPrincipal();
        }
    }

    /**
     * Get class list for teacher
     */
    function getClassesForTeacher() {
        Classes.getByTeacher()
            .then(function (schoolClass) {
                initClassData(schoolClass);
            })
            .catch(function () {
                $rootScope.disableNotification = false;

                vm.class = null;
            });
    }

    /**
     * Get class list for principal
     */
    function getClassesForPrincipal() {
        Classes.getOne($stateParams.id)
            .then(function (schoolClass) {
                initClassData(schoolClass);
            })
            .catch(function () {
                $rootScope.disableNotification = false;

                vm.class = null;
            });
    }


    /**
     * Init class data
     * @param classData
     */
    function initClassData(classData){
        initAssessments(classData.data.assessments);
        classData.data.students = Students.formatAssessments(classData.data.students);
        classData.data.classesDetails = classData.data.classesDetails[0];
        vm.class = classData.data;

        vm.downloadAssessmentUrl = appConstants.API_URL + 'classes/' + vm.class.id + '/assessment-document?token=' + $rootScope.profile.token;
    }

    /**
     * Init assessments
     * @param assessments
     */
    function initAssessments(assessments){
        appConstants.COURSE_TYPE.forEach(function(type){
            vm.activeTemplate.assessmentsByBlocks[type.type -1] = {
                assessments: []
            }
        });

        assessments.forEach(function(assessment){
            if(!vm.activeTemplate.assessmentsByBlocks){
                vm.activeTemplate.assessmentsByBlocks = [];
            }

            if(!vm.activeTemplate.assessmentsByBlocks[assessment.type -1] ){
                vm.activeTemplate.assessmentsByBlocks[assessment.type -1] = {
                    assessments: []
                };
            }

            vm.activeTemplate.assessmentsByBlocks[assessment.type -1].assessments.push(assessment)
        })
    }

    /**
     * Set new assessment
     * @param data
     */
    vm.onAssessmentChange = function (data) {
        Students.setAssessment(data.student.id, {
            assessmentId: data.assessment.id,
            value: data.selected.index
        })
            .then(function (result) {
                result.data.data = _.find(vm.constants.ASSESSMENTS_TYPES, {index: result.data.value});

                var students = vm.class.students;
                var index = _.findIndex(students, {id: result.data.studentId});

                students[index].formatAssessments[students[index].id + '_' + result.data.assessmentId] = result.data;
            })
    };

    /**
     * delete class assessment by id
     * @param data
     */
    vm.removeAssessment = function (data) {
        ngDialogService.open({
            controller: 'deleteAssessmentController',
            controllerAs: 'vm',
            template: 'js/components/classes/assessment/delete.html',
            resolve: {
                getId: function getIdFactory() {
                    return vm.activeTemplate.assessmentsByBlocks[data.assessmentsBlock].assessments[data.index].id;
                },
                controls: function controlsFactory() {
                    return {
                        confirm: function (assessmentId) {
                            Classes.deleteAssessments(assessmentId)
                                .then(function (result) {
                                    var index = _.findIndex(vm.activeTemplate.assessmentsByBlocks[data.assessmentsBlock].assessments, {id: result.data.id});
                                    vm.activeTemplate.assessmentsByBlocks[data.assessmentsBlock].assessments.splice(index, 1);
                                })
                                .finally(function () {
                                    ngDialogService.close();
                                })
                        },
                        close: function () {
                            ngDialogService.close();
                        }
                    }
                }
            }
        });
    };

    /**
     * get student assessment value
     * @param student {object}
     * @param assessmentId {integer}
     * @returns {*}
     */
    vm.getStudentAssessmentValue = function (student, assessmentId) {
        var studentAssessments = student.studentAssessments;
        var index = _.findIndex(studentAssessments, {assessmentId: assessmentId});

        if (index == -1) {
            return null;
        }

        return studentAssessments[index].value;
    };

    /**
     * Open modal for create assessment
     */
    vm.createAssessmentModal = function (data, type) {
        ngDialogService.open({
            controller: 'createAssessmentController',
            controllerAs: 'vm',
            template: 'js/components/classes/assessment/create.html',
            resolve: {
                controls: function controlsFactory() {
                    return {
                        create: function (assessment) {

                            assessment.type = type;

                            Classes.createAssessments({
                                assessments: [assessment]
                            })
                                .then(function (schoolClass) {
                                    initClassData(schoolClass);
                                })
                                .finally(function () {
                                    ngDialogService.close();
                                })
                        },
                        close: function () {
                            ngDialogService.close();
                        }
                    }
                }
            }
        });
    };

    /**
     * Open modal with edit assessment
     * @param assBlockIndex
     * @param editedAssessment
     */
    vm.editAssessmentModal = function(assBlockIndex, editedAssessment) {
        ngDialogService.open({
            controller: 'createAssessmentController',
            controllerAs: 'vm',
            template: 'js/components/classes/assessment/edit.html',
            resolve: {
                controls: function controlsFactory() {
                    return {
                        create: function (assessment) {
                            var dataToSave = {
                                title: assessment.title
                            };

                            Classes.editAssessments(assessment.id, dataToSave)
                                .then(function (schoolClass) {
                                    initClassData(schoolClass);
                                })
                                .finally(function () {
                                    ngDialogService.close();
                                })
                        },
                        getAssessment: function() {
                            return editedAssessment;
                        },
                        close: function () {
                            ngDialogService.close();
                        }
                    }
                }
            }
        });
    };

    /**
     * Open modal with complete class confirmation
     */
    vm.openCompleteModal = function() {
        ngDialogService.open({
            controller: 'classDetailController',
            controllerAs: 'vm',
            template: 'js/components/classes/completeModal.html',
            className: 'ngdialog-theme-default complete-class-modal'
        });
    };

    /**
     * Open modal for create student
     */
    vm.createStudentModal = function () {
        ngDialogService.open({
            controller: 'createStudentController',
            controllerAs: 'vm',
            template: 'js/components/classes/student/create.html',
            resolve: {
                controls: function controlsFactory() {
                    return {
                        create: function (student) {
                            student.classId = $rootScope.profile.school.id;

                            Students.create(student)
                                .then(function (schoolClass) {
                                    initClassData(schoolClass);
                                })
                                .finally(function () {
                                    ngDialogService.close();
                                })
                        },
                        close: function () {
                            ngDialogService.close();
                        }
                    }
                }
            }
        });
    };

    /**
     * Submit complete class
     */
    vm.completeClass = function() {
        Classes.complete()
            .then(function (result) {
                ngDialogService.close();

                location.reload();
            });
    };

    /**
     * Close modal dialog
     */
    vm.closeDialog = function () {
        ngDialogService.close();
    };

    ////////////////////////////////////////////////////////////
    getClasses();
}