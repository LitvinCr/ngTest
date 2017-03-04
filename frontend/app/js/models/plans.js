"use strict";

function PlansService (appConstants, BaseModel, $http) {
    function Plan () {
        this.url = appConstants.API_URL + 'plans'
    }

    Plan.prototype = Object.create(BaseModel.prototype);

    Plan.prototype.create = function (data) {
        var url = this.url + '/principal';

        return $http.post(url, data);
    };

    Plan.prototype.getBySchool = function (data) {
        var url = this.url + '/by-school';

        return $http.get(url, data);
    };

    /**
     * create coursesByType array to plan for valid view courses by type and period
     * @param plan
     * @returns {*}
     */
    Plan.prototype.sortCourses = function(plan){
        plan.coursesByType = [];
        plan.courses.forEach(function(course){
            plan.coursesByType[
            course.coursesToPlans.period +
            '_'
            + course.coursesToPlans.type
                ] = course;
        });

        return plan;
    };

    return new Plan();
}

angular.module('Educ8')
    .service('Plans', PlansService);

