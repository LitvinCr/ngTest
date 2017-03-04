"use strict";

function ClassesDetailsService (appConstants, BaseModel, $http) {
    function ClassesDetails () {
        this.url = appConstants.API_URL + 'classDetails'
    }

    ClassesDetails.prototype = Object.create(BaseModel.prototype);

    /**
     * update classDetails data by teacher
     * @param data
     */
    ClassesDetails.prototype.update = function(data){
        var url = this.url;

        return $http.put(url, data);
    };

    return new ClassesDetails();
}

angular.module('Educ8')
    .service('ClassesDetails', ClassesDetailsService);

