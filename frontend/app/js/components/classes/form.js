'use strict';

angular.module('Educ8')
    .controller('ClassCreateController', ['$state', '$rootScope', 'appConstants', 'Classes', 'notifyService', 'ngDialogService', ClassCreateController]);

function ClassCreateController($state, $rootScope, appConstants, Classes, notifyService, ngDialogService) {
    var vm = this;

    angular.extend(vm, {
        removeCourse: removeCourse,
        createStudentModal: createStudentModal,
        removeAssessment: removeAssessment,
        openSelectCourseModal: openSelectCourseModal,
        submit: submit,
        createAssessmentModal: createAssessmentModal,
        editAssessmentModal: editAssessmentModal,
        setActiveTemplate: setActiveTemplate
    });

    vm.constants = appConstants;

    vm.assessmentDocumentConfig = {
        studentAssessment: true
    };

    vm.activeTemplate = {};

    vm.classValidationRules = {
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirmPassword: {
                equalTo: '#password'
            },
            teacherName: {
                maxlength: 50
            },
            classYear: {
                maxlength: 50
            },
            cs: {
                maxlength: 50
            },
            dl: {
                maxlength: 50
            },
            it: {
                maxlength: 50
            }
        }
    };

    vm.classData = {
        name: '',
        period: '',
        courses: [],
        assessments: [],
        students: [],
        classDetails: {
            teacherName: $rootScope.profile.firstName + ' ' + $rootScope.profile.lastName,
            classYear: '',
            cs: '',
            dl: '',
            it: ''
        }
    };

    vm.action = 'create';

    /**
     * Init active template
     */
    function initTemplates() {
        vm.assTemplates = angular.copy(vm.constants.ASSESSMENTS_TEMPLATES);
        
        // set active button for assessment grades
        vm.assTemplates[0].isActive = true;

        // set active template
        vm.activeTemplate = angular.copy(vm.assTemplates[0]);
    }


    /**
     * Set active assessment template
     * @param tplItem
     */
    function setActiveTemplate(tplItem) {
        vm.assTemplates.forEach(function(item) {
            item.isActive = false;
        });

        tplItem.isActive = true;

        vm.activeTemplate = angular.copy(tplItem);
    }

    /**
     * Get active template
     * @returns {*}
     */
    function getActiveTemplateIndex() {
        var result = 0;

        vm.assTemplates.forEach(function(item, index) {
            if ( item.isActive ) {
                result = index;
            }
        });

        return result;
    }


    /**
     * Remove course
     * @param index
     * @returns {Array.<T>}
     */
    function removeCourse(index) {
        return vm.classData.courses.splice(index, 1)
    }

    /**
     * create student modal
     */
    function createStudentModal() {
        ngDialogService.open({
            controller: 'createStudentController',
            controllerAs: 'vm',
            template: 'js/components/classes/student/create.html',
            resolve: {
                controls: function controlsFactory() {
                    return {
                        create: function (student) {
                            student.classId = $rootScope.profile.school.id;

                            vm.classData.students.push(student);

                            ngDialogService.close();
                        },
                        close: function () {
                            ngDialogService.close();
                        }
                    }
                }
            }
        });
    }

    /**
     * delete class assessment
     * @param data
     */
    function removeAssessment(data) {
        vm.activeTemplate.assessmentsByBlocks[data.assessmentsBlock].assessments.splice(data.index, 1);
    }

    /**
     * init select course modal
     */
    function openSelectCourseModal() {
        ngDialogService.open({
            className: 'set-lesson-modal',
            controller: 'selectCourseForClassController',
            controllerAs: 'vm',
            template: 'js/components/classes/course/select.html',
            resolve: {
                onCourseSelected: function onCourseSelectedFactory() {
                    return function (data) {
                        var currentCourse =_.find(vm.classData.courses, function (item) {
                            return item.course.id == data.course.id;
                        });

                        if (currentCourse) {
                            closeModal();

                            return notifyService({
                                message: 'This Course is already added, please choose another one.'
                            });
                        }

                        var course = data.course;

                        course.assessments = [];
                        vm.classData.courses.push({course: course});

                        closeModal();
                    }
                }
            }
        });
    }

    /**
     * submit create/edit class form
     * @param form
     * @returns {boolean}
     */
    function submit(form) {
        if (!form.validate()) {
            return false;
        }

        var assessments = [];

        vm.activeTemplate.assessmentsByBlocks.forEach(function(assessmentsBlock){
            assessmentsBlock.assessments.forEach(function(assessment){
                assessments.push(assessment)
            })
        });

        vm.classData.assessments = assessments;

        // +1 because index starts with 0
        vm.classData.period = getActiveTemplateIndex() + 1;


        if (vm.classData.courses.length < vm.constants.MAX_COURSES_IN_SCHOOL) {
            return notifyService({
                message: 'Please select ' + vm.constants.MAX_COURSES_IN_SCHOOL + ' courses!',
                status: 400
            })
        }


        var method = vm.action == 'create' ? 'add' : 'edit';
        var args = vm.action == 'create' ? [vm.classData] : [$state.params.id, vm.classData];

        if (vm.action == 'take') {
            return Classes.take(vm.classData)
                .then(function () {
                    $state.go('index.class');
                })
        }

        Classes[method].apply(Classes, args)
            .then(function (data) {
                $state.go('index.class');
            })
    }

    /**
     * Open modal with create assessment
     * @param assBlockIndex
     */
    function createAssessmentModal(assBlockIndex, type) {

        ngDialogService.open({
            controller: 'createAssessmentController',
            controllerAs: 'vm',
            template: 'js/components/classes/assessment/create.html',
            resolve: {
                controls: function controlsFactory() {
                    return {
                        create: function (assessment) {
                            var tplIndex = getActiveTemplateIndex();
                            var activeTpl = vm.assTemplates[tplIndex];

                            assessment.type = type;

                            // push in correct template and correct assessment block
                            vm.assTemplates[tplIndex].assessmentsByBlocks[assBlockIndex].assessments.push(assessment);

                            // refresh active template
                            vm.activeTemplate = angular.copy(vm.assTemplates[tplIndex]);

                            ngDialogService.close();
                        },
                        close: function () {
                            ngDialogService.close();
                        }
                    }
                }
            }
        });
    }

    /**
     * Open modal with edit assessment
     * @param editedAssessment
     */
    function editAssessmentModal(assBlockIndex, editedAssessment) {
        ngDialogService.open({
            controller: 'createAssessmentController',
            controllerAs: 'vm',
            template: 'js/components/classes/assessment/edit.html',
            resolve: {
                controls: function controlsFactory() {
                    return {
                        create: function (assessment) {
                            var tplIndex = getActiveTemplateIndex();
                            var activeTpl = vm.assTemplates[tplIndex];

                            // modify assessment title in template
                            _.each(activeTpl.assessmentsByBlocks[assBlockIndex].assessments, function(item) {
                                if (item.title === editedAssessment.title) {
                                    item.title = assessment.title;
                                }
                            });

                            // refresh active template
                            vm.activeTemplate = angular.copy(activeTpl);

                            ngDialogService.close();
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
    }

    /**
     * close opened modal
     * @returns {*}
     */
    function closeModal() {
        return ngDialogService.close();
    }

    /**
     * check valid method (create or update)
     * and set valid class
     */
    function selectValidMethod() {
        // if teacher already has class
        if ($rootScope.profile.class && $rootScope.profile.class.id) {
            vm.action = 'edit';
            vm.classData = $rootScope.profile.class;
        }
        // if teacher has chosen class from list of confirmed classes
        else if ($state.params.id) {
            vm.action = 'take';

            Classes.getOne($state.params.id)
                .success(function (data) {
                    vm.classData = data;
                    vm.classData.courses = [];
                });
        }
        // teacher need to create new class
        else {
            vm.action = 'create';
        }
    }

    ////////////////////////////////////////////////////////
    initTemplates();
    selectValidMethod();
}