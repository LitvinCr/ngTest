"use strict";

function SchoolsService (appConstants, BaseModel, $http, Upload) {
    function School () {
        this.url = appConstants.API_URL + 'schools'
    }

    School.prototype = Object.create(BaseModel.prototype);

    School.prototype.getTeachers = function (filters) {
        var url = this.url + '/teachers';

        return $http.get(url, {params: filters});
    };


    School.prototype.addTeacher = function (params) {
        var url = this.url + '/teachers';

        return $http.post(url, params);
    };

    School.prototype.editTeacher = function (id, params) {
        var url = this.url + '/teachers';

        return $http.put(url + '/' + id, params);
    };

    School.prototype.deleteTeacher = function (id, params) {
        var url = this.url + '/teachers';

        return $http.delete(url + '/' + id);
    };

    School.prototype.updateAvatar = function (data) {
        var url = this.url + '/avatar';

        return Upload.upload({
            url : url,
            data: data
        })
    };

    return new School();
}

angular.module('Educ8')
    .service('Schools', SchoolsService);

