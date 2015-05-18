/**
 * @ngInject
 * @constructor
 */

"use strict";

function availableBetsController($scope,bettingFactory){
    $scope.ui = bettingFactory.ui;
    $scope.ui.getAvailableBets();
}

function availableBetsDirective(){
    return {
        controller:availableBetsController,
        restrict: 'A',
        templateUrl:"js/views/bets.html"
    };
}

module.exports = availableBetsDirective;

