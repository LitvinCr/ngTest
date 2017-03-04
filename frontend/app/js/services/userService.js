"use strict";

angular.module('Educ8')
    .service('userService', [
        '$q',
        '$location',
        '$http',
        '$rootScope',
        'appConstants',
        function ($q,
                  $location,
                  $http,
                  $rootScope,
                  appConstants) {
            var f = {
                data: {},

                /**
                 * Login user
                 * @param data
                 */
                login: function (data) {
                    var deferred = $q.defer();

                    $http.post(appConstants.API_URL + 'signin/basic', data)
                        .then(function (response) {
                            deferred.resolve(response.data.payload);
                        })
                        .catch(function (err) {
                            deferred.reject(err);
                        });

                    return deferred.promise;
                },

                /**
                 * Set auth token and put to localStorage
                 * @param user
                 */
                setAsCurrent: function (user) {

                    $rootScope.profile = user;
                    f.data = user;

                    $http.defaults.headers.common.Authorization = user.token;
                    $http.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';

                    localStorage.setItem('user', JSON.stringify(user));
                },

                /**
                 * Find user saved in local storage
                 * @returns {Promise}
                 */
                getCurrent: function () {
                    var deferred = $q.defer();
                    var localUser = localStorage.getItem('user');
                    var data = localUser && JSON.parse(localUser) || {};
                    var expiredDate;

                    expiredDate = data.tokenExpiresAt;
                    // Change difference between current time and token expired date
                    if (expiredDate && moment().diff(moment(expiredDate)) >= 0) {
                        f.logout();
                        deferred.reject();

                        return deferred.promise;
                    }

                    if (data.token) {
                        f.setAsCurrent(data);

                        // update data from server
                        f.getUserProfile(data.id)
                            .then(function (user) {
                                user = $.extend(data, user);
                                f.setAsCurrent(user);
                                deferred.resolve(user);
                            })
                            .catch(function (r) {
                                f.logout();
                                deferred.reject();
                            });

                    } else {
                        f.logout();
                        deferred.reject();
                    }

                    return deferred.promise;
                },


                /**
                 * Get info about user by user id
                 * @param id
                 * @returns {Promise}
                 */
                getUserProfile: function (id) {
                    var deferred = $q.defer();

                    $http.get(appConstants.API_URL + 'users/' + id + '/profile')
                        .then(function (response) {
                            var user = response.data;

                            deferred.resolve(user);
                        }, deferred.reject);

                    return deferred.promise;
                },

                /**
                 * Logout user (clear authorization token)
                 * @param callback
                 */
                logout: function (callback) {
                    var data = {};

                    $rootScope.profile = data;
                    localStorage.clear();
                    $http.defaults.headers.common.Authorization = '';

                    if (callback) {
                        callback();
                    }
                }
            };

            return f;
        }]);
