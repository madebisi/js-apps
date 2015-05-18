var angular = require('angular');
require('angular-currency-code');

var component = 'betting';
var app = angular.module(component, ['cc'])
    .constant('BETS',require('./bettingConstants'))
    .factory(component+'Factory',require('./bettingFactory'))
    .factory(component+'ApiFactory',require('./bettingApiFactory'))
    .directive('availableBets',require('./availableBetsDirective'))
    .directive('bettingSlip',require('./bettingSlipDirective'));