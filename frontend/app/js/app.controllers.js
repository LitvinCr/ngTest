'use strict';

angular
    .module('Educ8')
    .controller('MainCtrl', ['userService', '$window', '$sce', '$timeout', '$rootScope', 'appConstants', 'ngDialog', '$scope', MainCtrl]);

/**
 * MainCtrl - controller
 */
function MainCtrl(userService, $window, $sce, $timeout, $rootScope, appConstants, ngDialog, $scope) {

    var vm = this;
    $rootScope.uploadedFile = null;

    vm.logOut = function () {
        userService.logout(function () {
            $window.location.reload();
        });
    };

    $rootScope.$watch('uploadedFile', function (avatarNew) {
        if (!avatarNew) {
            return false;
        }

        vm.uploadSchoolAvatar(avatarNew)
    });

    /**
     * show modal with avatar updating functional
     */
    vm.uploadSchoolAvatar = function (avatarNew) {

        ngDialog.open({
            template: 'js/components/schools/schoolAvatar/school-avatar.html',
            className: 'upload-avatar',
            controller: 'schoolAvatarController',
            resolve: {
                getImage: function getImageFactory() {
                    return avatarNew;
                },
                onUpdated: function onUpdatedFactory() {

                }
            },
            preCloseCallback: function () {
                $rootScope.uploadedFile = null;
            }
        });
    };

    $rootScope.trustAsHtml = function (str) {
        return $sce.trustAsHtml(str);
    };

    $rootScope.trustSrc = function (url) {
        return $sce.trustAsResourceUrl(url);
    };

    $rootScope.appConstants = appConstants;

    /**
     * check - is current user principal?
     * @returns {boolean}
     */
    $rootScope.isPrincipal = function () {
        return $rootScope.profile.role == appConstants.ROLES.PRINCIPAL;
    };

    /**
     * check - is current user teacher?
     * @returns {boolean}
     */
    $rootScope.isTeacher = function () {
        return $rootScope.profile.role == appConstants.ROLES.TEACHER;
    };

    /**
     * check - is current user student?
     * @returns {boolean}
     */
    $rootScope.isStudent = function () {
        return $rootScope.profile.role == appConstants.ROLES.STUDENT;
    };

}