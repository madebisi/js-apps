/**
 * @ngInject
 * @constructor
 */
 "use strict";
 var _ = require('lodash');
function bettingFactory($http,$filter,BETS, bettingApiFactory, ccCurrencySymbol){

    "use strict";

    var factory = {};
    factory.ui = {};
    factory.ui.cc = ccCurrencySymbol;
    factory.slip = {};



    factory.slip.betSlipItems = [];
    factory.slip.betReceiptItems = [];
    factory.slip.betTotalWinnings = 0;
    factory.slip.showReceipt =false;
    factory.slip.showBetSlip =true;

    factory.ui.resetForm = function dispCurrency(){
        factory.slip.betReceiptItems = [];
        factory.slip.betSlipItems = [];
        factory.slip.showReceipt = false;
        factory.slip.showBetSlip = true;
        factory.ui.availableBets.forEach(function(bet){
            bet.selected='';                
            });
    };

    factory.ui.dispCurrency = function dispCurrency(val){
       return $filter('currency')(val, ccCurrencySymbol[BETS.CURRENCY]);
    };

    factory.ui.addToSlip = function(bet){
        if (factory.slip.betSlipItems.indexOf(bet) === -1 ){
            factory.slip.betSlipItems.push(bet);
        }

    };
    factory.slip.updateTotalWinnings = function(){
        var total = 0;
        factory.slip.betSlipItems.forEach(function(betItem){
            total += betItem.winnings;
        });
            factory.slip.betTotalWinnings = total;
    };
    factory.slip.submit = function(){
        factory.ui.showReceiptsLoading = true;
        factory.slip.betSlipItems.forEach(function(betItem){
            bettingApiFactory.submitBets(betItem)
            .then(factory.ui.submitSuccess, factory.ui.submitFailure)
            .then(factory.ui.showBetReceipt);
        });
            //factory.slip.betTotalWinnings = total;
    };
    factory.slip.remove = function(bet){
        bet.selected = '';
        if (factory.slip.betSlipItems.indexOf(bet) > -1 ){
            _.remove(factory.slip.betSlipItems,bet);
        }
            factory.slip.updateTotalWinnings();
    };

    factory.ui.showBetReceipt = function(){
        
        if (factory.slip.betReceiptItems.length>0){
            factory.slip.showReceipt =true;
            factory.slip.showBetSlip =false;
            factory.ui.showReceiptsLoading = false;
        }

    };
    factory.ui.submitSuccess = function(response){
        console.log("submitSuccess:", response.data);
        if (response.data){
            var oddsNum = parseFloat(response.data.odds.numerator/ response.data.odds.denominator);
            var oddsString = response.data.odds.numerator + '/' + response.data.odds.denominator;
            var stake = parseFloat(response.data.stake);
            response.data.oddsString = oddsString;
            response.data.winnings = (oddsNum * stake) + stake;
            factory.slip.betReceiptItems.push(response.data);
        }

    };
    factory.ui.submitFailure = function(response){
        console.log("submitFailure:", response.data);

    };
    // factory.ui functions

    factory.ui.getAvailableBets = function(){
        factory.ui.showBetsLoading = true;
        bettingApiFactory.getBets()
        .then(factory.ui.dataSuccess, factory.ui.dataFailure);
    };
    factory.ui.dataSuccess = function(response){
        console.log("dataSuccess:", response.data);
        factory.ui.availableBets  = response.data;
        factory.ui.availableBets.forEach(function(bet){
            bet.addToSlip = function(){
                bet.selected='selected';
                if (factory.slip.betSlipItems.indexOf(bet) === -1 ){
                    factory.slip.betSlipItems.push(bet);
                    factory.slip.updateTotalWinnings();
                }
            }
            bet.updateWinnings = function(bet, value){
                console.log("updateWinnings:", factory.slip.betSlipItems);
                var stake = parseFloat(bet.stake);
                bet.winnings = parseFloat((stake * bet.oddsNum)+stake);
                factory.slip.updateTotalWinnings();
            }
            bet.oddsString = (parseFloat((bet.odds.numerator / bet.odds.denominator), 10) ===1)?"Evens": bet.odds.numerator + '/' + bet.odds.denominator; 
            bet.oddsNum = parseFloat((bet.odds.numerator / bet.odds.denominator), 10); 
            bet.stake = 1; 
            bet.winnings = parseFloat((bet.stake * bet.oddsNum)+bet.stake, 10); 
        });
        factory.ui.showBetsLoading = false;  

    };

    /**
     * if there was an error other than 404 create a new flashMessage of type danger
     * @param response
     */
    factory.ui.dataFailure = function(response){
        console.log("dataFailure:", response);
         factory.ui.availableBets  = response;;
    };

    return factory;
}

module.exports = bettingFactory;