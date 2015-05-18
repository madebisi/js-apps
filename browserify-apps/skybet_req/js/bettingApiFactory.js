/**
 * @ngInject
 * @constructor
 */
 
"use strict";

function bettingApiFactory($http, BETS){

    var factory = {};

    factory.getBets = function(){
        return $http.get(BETS.AVAILABLE_BETS_URL);
    };

    factory.submitBets = function(data){
        if (data !== null && data !== undefined){
            return $http.post(BETS.PLACE_BET_URL,data,null);
        };
    };
    
    return factory;
}

module.exports = bettingApiFactory;
