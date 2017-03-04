"use strict";

function StudentsService (appConstants, BaseModel, $http) {
    function Students () {
        this.url = appConstants.API_URL + 'students'
    }

    Students.prototype = Object.create(BaseModel.prototype);

    /**
     * create new student
     * @param student {object}
     * @returns {promise}
     */
    Students.prototype.create = function (student) {
        var url = this.url;

        return $http.post(url, student);
    };

    /**
     * create or update student assessment
     * @param id {integer}
     * @param data {object}
     * @returns {promise}
     */
    Students.prototype.setAssessment = function (id, data) {
        var url = this.url + '/' + id + '/assessment';

        return $http.post(url, data);
    };

    /**
     * format student assessments fo for quick access
     * @param students
     * @returns {Array}
     */
    Students.prototype.formatAssessments = function(students) {
        var result = [];

        students.forEach(function (student) {
            student.formatAssessments = {};
            student.studentAssessments.forEach(function (assessment) {
                assessment.data = _.find(appConstants.ASSESSMENTS_TYPES, {index: assessment.value});
                student.formatAssessments[student.id + '_' + assessment.assessmentId] = assessment;
            });
            result.push(student);
        });

        return result;
    };

    return new Students();
}

angular.module('Educ8')
    .service('Students', StudentsService);

