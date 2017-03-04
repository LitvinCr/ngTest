'use strict';

angular.module('Educ8')
    .controller('confirmSubscriptionController', ['countrySettings', 'controls', '$scope', confirmSubscriptionController]);

function confirmSubscriptionController(countrySettings, controls, $scope) {

    $scope.countrySettings = countrySettings;

    $scope.cancel = function(){
        controls.cancel();
    };

    $scope.confirm = function(){
        controls.confirm();
    }
}