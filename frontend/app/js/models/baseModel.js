function BaseModel (appConstants, $http) {
    function BaseModel () {
        this.url = appConstants.API_URL;
    }

    BaseModel.prototype.getList = function (filters) {
        return $http.get(this.url, {params: filters});
    };

    BaseModel.prototype.getOne = function (id) {
        return $http.get(this.url + '/' + id);
    };

    BaseModel.prototype.add = function (params) {
        return $http.post(this.url, params);
    };

    BaseModel.prototype.edit = function (id, params) {
        return $http.put(this.url + '/' + id, params);
    };

    BaseModel.prototype.delete = function (id) {
        return $http.delete(this.url + '/' + id);
    };

    return BaseModel;
}

angular.module('Educ8')
    .service('BaseModel', BaseModel);

