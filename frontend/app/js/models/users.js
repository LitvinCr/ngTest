"use strict";

function UsersService (appConstants, BaseModel, $http) {
    function User () {
        this.url = appConstants.API_URL + 'users'
    }

    User.prototype = Object.create(BaseModel.prototype);

    User.prototype.restorePassword = function (params) {
        var url = this.url + '/password/restore';

        return $http.patch(url, params);
    };

    User.prototype.signUp = function(params) {
        return $http.post(appConstants.API_URL + 'signup/principal', params);
    };

    User.prototype.getClassSet = function() {
        return $http.get(appConstants.API_URL + 'class-sets');
    };

    User.prototype.getPlan = function(query) {
        return $http.get(appConstants.API_URL + 'plans/by-class-sets', {params: {classSets: query}});
    };

    User.prototype.getProspectCourses = function(query) {
        return $http.get(appConstants.API_URL + 'courses/by-type-and-period', {params: {period: query.period, type: query.type}});
    };

    User.prototype.getCurrentLesson = function(id) {
        return $http.get(appConstants.API_URL + 'lessons/' + id);
    };

    User.prototype.checkPromocode = function(data) {
        return $http.post(this.url + '/registration-step/check-promocode', data);
    };

    User.prototype.passPlanReview = function() {
        return $http.patch(this.url + '/registration-step/plan-review');
    };

    User.prototype.passPaymentStep = function(data) {
        return $http.post(this.url + '/registration-step/payment', data);
    };

    User.prototype.passConfirmationStep = function() {
        return $http.patch(this.url + '/registration-step/creating-plan');
    };

    User.prototype.goToPrevStep = function() {
        return $http.patch(this.url + '/registration-step/back-to-plan-review');
    };

    User.prototype.getCountrySettings = function(params) {
        return $http.get(appConstants.API_URL + 'country-settings', params);
    };

    // instead of prev - get setting only for current user
    User.prototype.getCurrUserCountrySettings = function () {
        return $http.get(this.url + '/country-settings');
    };


    return new User();
}

angular.module('Educ8')
    .service('Users', UsersService);

