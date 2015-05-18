/**
 * @ngInject
 * @constructor
 */
 "use strict";
function bettingSlipController($scope, bettingFactory){
    $scope.slip = bettingFactory.slip;
    }

function bettingSlipDirective(){
    return {
        controller:bettingSlipController,
        restrict: 'A',
        templateUrl:"js/views/betslip.html"
    };
}

module.exports = bettingSlipDirective;
