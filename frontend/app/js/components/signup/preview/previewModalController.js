'use strict';

angular.module('Educ8')
    .controller('previewModalController', ['$sce', 'detail', 'controls', previewModalController]);

function previewModalController($sce, detail, controls) {
    var vm = this;

    vm.detailPlan = detail;

    vm.detailPlan.videoLink = function() {
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + vm.detailPlan.youtubeId)
    };

    vm.addToPlan = function (course, period, type) {
        controls.addToPlan(course, period, type);
    };

    vm.viewLessons = function (course) {
        controls.viewLessons(course);
    };

    vm.viewOtherOptions = function (period, type) {
        controls.viewOtherOptions(period, type);
    };
}