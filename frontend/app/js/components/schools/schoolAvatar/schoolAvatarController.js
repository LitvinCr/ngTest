'use strict';

angular.module('Educ8')
    .controller('schoolAvatarController', ['$rootScope', 'ngDialog', '$timeout', 'Schools', '$scope', '$filter', 'getImage', schoolAvatarController]);

function schoolAvatarController($rootScope, ngDialog, $timeout, Schools, $scope, $filter, getImage) {

    $scope.avatarToCrop = null;
    $scope.uploadedFile = null;
    $scope.actionLabels = {
        rotateLeft: ' < ',
        rotateRight: ' > ',
        crop: '[crop and save]'
    };

    var fileReader = new FileReader();

    $scope.onCrop = function (img64) {

        var newFile = $filter('dataURItoBlob')(img64, $rootScope.profile.school.name + '.png');
        Schools.updateAvatar({
            schoolAvatar: newFile
        })
            .then(function (result) {

                var updatedSchool = result.data;

                $timeout(function () {
                    $rootScope.profile.school.avatar = updatedSchool.avatar;
                }, 0);

            })
            .finally(function () {
                ngDialog.closeAll();
            })
    };

    function init() {
        fileReader.readAsDataURL(getImage);
        fileReader.onloadend = function () {
            $scope.$apply(function () {
                $scope.avatarToCrop = fileReader.result;
            })
        };
    }

    init();
}