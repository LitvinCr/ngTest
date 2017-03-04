function LessonsService (appConstants, BaseModel, $http) {
    function Lesson () {
        this.url = appConstants.API_URL + 'lessons'
    }

    Lesson.prototype = Object.create(BaseModel.prototype);

    /**
     *
     * @param params {object}
     * @returns {*}
     */
    Lesson.prototype.getBySchool = function(params){
        var url = appConstants.API_URL +
            'school/' +
            params.schoolId +
            '/course/' +
            params.courseId +
            '/lesson/' +
            params.lessonId;

        return $http.get(url);
    };

    Lesson.prototype.addComment = function(params) {
        var url = appConstants.API_URL +
            'course/' +
            params.courseId +
            '/lessons/' +
            params.lessonId +
            '/comments';

        return $http.post(url, params);
    };

    return new Lesson();
}

angular.module('Educ8')
    .service('Lessons', LessonsService);

