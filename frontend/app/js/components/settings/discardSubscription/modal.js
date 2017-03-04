'use strict';

angular.module('Educ8')
    .controller('discardController', ['controls', '$scope', discardController]);

function discardController(controls, $scope) {

    $scope.cancel = function(){
        controls.cancel();
    };

    $scope.confirm = function(){
        controls.confirm();
    }
}