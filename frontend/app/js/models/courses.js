"use strict";

function CoursesService (appConstants, BaseModel, $http) {
    function Course () {
        this.url = appConstants.API_URL + 'courses'
    }

    Course.prototype = Object.create(BaseModel.prototype);

    Course.prototype.getCourseLessons = function (filters, id) {
        var url = this.url + '/' + id + '/get-lessons';

        return $http.get(url, {params: filters});
    };

    return new Course();
}

angular.module('Educ8')
    .service('Courses', CoursesService);

