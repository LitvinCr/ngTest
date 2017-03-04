'use strict';

angular.module('Educ8')
    .controller('lessonDetailController', [
        '$stateParams',
        '$sce',
        'Lessons',
        'notifyService',
        'appConstants',
        '$rootScope',
        'PDFViewerService',
        '$location',
        lessonDetailController
    ]);

function lessonDetailController($stateParams, $sce, Lessons, notifyService, appConstants, $rootScope, pdf, $location) {
    var viewer = pdf.Instance("viewer");
    var vm = this;

    angular.extend(vm, {
        nextPage: nextPage,
        prevPage: prevPage,
        pageLoaded: pageLoaded,
        submitLesson: submitLesson
    });

    vm.lessonValidator = {};

    vm.lessonData = {
        comment: ''
    };

    vm.$sce = $sce;

    // init base url for plan files (download and show)
    var urlForPlans = appConstants.API_URL +
        'school/' +
        $rootScope.profile.school.id +
        '/course/' +
        $stateParams.courseId +
        '/lesson/' +
        $stateParams.id;

    vm.downloadPlanUrl = urlForPlans + '/plan-file?token=' + $rootScope.profile.token;
    vm.showPlanUrl = urlForPlans + '/plan?token=' + $rootScope.profile.token;

    /**
     * pdf next page
     */
    function nextPage() {
        viewer.nextPage();
    }

    /**
     * pdf prev page
     */
    function prevPage() {
        viewer.prevPage();
    }

    /**
     * Content loaded
     * @param curPage
     * @param totalPages
     */
    function pageLoaded(curPage, totalPages) {
        vm.currentPage = curPage;
        vm.totalPages = totalPages;
    }


    /**
     * Get lesson by school
     */
    function getLesson() {
        Lessons.getBySchool({
            lessonId: $stateParams.id,
            schoolId: $rootScope.profile.school.id,
            courseId: $stateParams.courseId
        })
            .then(function (result) {
                vm.lesson = result.data;

                // add comment to comment form
                if (vm.lesson.additionalInfo[0]) {
                    vm.lessonData.comment = vm.lesson.additionalInfo[0].comment;
                }
            })
            .catch(function() {
                $location.path('index/school-plan');
            });
    }

    /**
     * Save comment for lesson
     * @param form
     * @returns {boolean}
     */
    function submitLesson(form) {
        if (!form.validate()) {
            return false;
        }

        angular.extend(vm.lessonData, {
            courseId: $stateParams.courseId,
            lessonId: $stateParams.id
        });

        Lessons.addComment(vm.lessonData)
            .then(function(comment) {
                notifyService({
                    message: 'Data saved!'
                });
            })
    }

    ////////////////////////////////////////
    getLesson();

}