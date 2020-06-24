"use strict";
function CalculatorModel() {
    
    var value = 0;
    var currencies = [];
    var rates = [];
    var emojis = ['🇺🇸',
        '🇯🇵',
        '🇧🇬',
        '🇨🇿',
        '🇩🇰',
        '🇬🇧',
        '🇭🇺',
        '🇵🇱',
        '🇷🇴',
        '🇸🇪',
        '🇨🇭',
        '🇮🇸',
        '🇳🇴',
        '🇭🇷',
        '🇷🇺',
        '🇹🇷',
        '🇦🇺',
        '🇧🇷',
        '🇨🇦',
        '🇨🇳',
        '🇭🇰',
        '🇮🇩',
        '🇮🇱',
        '🇮🇳',
        '🇰🇷',
        '🇲🇽',
        '🇲🇾',
        '🇳🇿',
        '🇵🇭',
        '🇸🇬',
        '🇹🇭',
        '🇿🇦',
    '🇪🇺'];
    
    this.updateRates = function (r){
        rates = r;
    };
    this.updateCurrencies = function (c){
        currencies = c;
    };   
    this.getCurrentValue = function (toIndex) {
        //JPY
        if(toIndex==1){
            return parseInt(value);
        }
        return parseFloat(value).toFixed(2);
    };
    this.getCurrencies = function () {
        return currencies;
    };
    this.getRates = function () {
        return rates;
    };
    this.getEmojis = function () {
        return emojis;
    }; 
    this.enterValue = function (newValue) {
        if (value ==(0)){
            value = newValue;
            }else{
            value =parseInt(value + newValue)
        }
        
    };
    this.clearValue = function () {
        value = 0;
    };
    this.calculateValue = function (fromIndex,toIndex,fee) {
        value = ((value)/rates[fromIndex])*rates[toIndex];
        value = value * ((100 + fee)/100);      
    };
    
    
}