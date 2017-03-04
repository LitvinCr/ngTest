"use strict";

function ClassService (appConstants, BaseModel, $http, $rootScope) {
    function SchoolClass () {
        this.url = appConstants.API_URL + 'classes'
    }

    SchoolClass.prototype = Object.create(BaseModel.prototype);
    
    SchoolClass.prototype.getByTeacher = function () {
        var url = this.url + '/by-teacher/';

        return $http.get(url, {});
    };

    SchoolClass.prototype.getCompleted = function (params) {
        var url = this.url + '/completed';

        return $http.get(url, {params: params});
    };

    SchoolClass.prototype.getActive = function (params) {
        var url = this.url + '-active';

        return $http.get(url, {params: params});
    };

    SchoolClass.prototype.formatAssessmentsHistory = function (classes) {
        classes.forEach(function(classItem) {
            if ( classItem.classAssessmentHistory.length ) {

                // add url to pdf for assessment document
                classItem.classAssessmentHistory.forEach(function(assessment) {
                    assessment.downloadUrl = appConstants.API_URL + 'classes/history/assessment-document/' + assessment.id + '?token=' + $rootScope.profile.token;
                });
            }
        });
    };

    SchoolClass.prototype.getByStudent = function () {
        var url = this.url + '/by-student';

        return $http.get(url, {});
    };

    SchoolClass.prototype.getStudents = function (id) {
        var url = this.url + '/' + id + '/students';

        return $http.get(url, {});
    };

    SchoolClass.prototype.createAssessments = function (params) {
        var url = this.url + '/assessments';

        return $http.post(url, params);
    };

    SchoolClass.prototype.editAssessments = function (id, params) {
        var url = this.url + '/assessments/' + id;

        return $http.patch(url, params);
    };

    SchoolClass.prototype.take = function (data) {
        var url = this.url + '/take';

        return $http.post(url, data);
    };

    SchoolClass.prototype.complete = function () {
        var url = this.url + '/complete';

        return $http.patch(url);
    };

    SchoolClass.prototype.deleteAssessments = function (assessmentId) {
        var url = this.url + '/assessments/' + assessmentId;

        return $http.delete(url, {});
    };

    return new SchoolClass();
}

angular.module('Educ8')
    .service('Classes', ClassService);

