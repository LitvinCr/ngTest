"use strict";

function SubscriptionsService (appConstants, BaseModel, $http, Upload) {
    function Subscriptions () {
        this.url = appConstants.API_URL + 'subscriptions'
    }

    Subscriptions.prototype = Object.create(BaseModel.prototype);

    /**
     * update school subscription
     * @returns {*}
     */
    Subscriptions.prototype.update = function () {
        var url = this.url;

        return $http.patch(url);
    };

    Subscriptions.prototype.discard = function () {
        var url = this.url + '/discard';

        return $http.patch(url);
    };

    return new Subscriptions();
}

angular.module('Educ8')
    .service('Subscriptions', SubscriptionsService);

