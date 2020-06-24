"use strict";
var calculatorView = new CalculatorView(),
calculatorModel = new CalculatorModel(),
calculatorController = null;

function CalculatorController() {
    
    this.createSelects = function () {
        var p1 = document.getElementById("currencyFrom");
        var p2 = document.getElementById("currencyTo");
        var p3 = document.getElementById("fee");
        
        var select1 = document.createElement("select");
        var select2 = document.createElement("select");
        var select3 = document.createElement("select");
        
        select1.id = "select1";
        select2.id = "select2";
        select3.id = "select3";
        
        p1.appendChild(select1);
        p2.appendChild(select2);
        p3.appendChild(select3);
        
        for (var i = 0; i < 4; i++) {
            var option = document.createElement("option");
            option.text = i*2 + "%";
            select3.appendChild(option);  
        }
        var f = localStorage.getItem("select3");
        if (f != null) {
            select3.selectedIndex = f;
        }
    }
    
    
    this.updateSelects = function () {
        
        var currencies = calculatorModel.getCurrencies();
        var emojis = calculatorModel.getEmojis();
        var select1 =document.getElementById("select1")
        var select2 =document.getElementById("select2")
        
        
        for (var i = 0; i < currencies.length; i++) {
            var option1 = document.createElement("option");
            option1.text = currencies[i] + emojis[i];;
            select1.appendChild(option1);
            
            var option2 = document.createElement("option");
            option2.text = currencies[i] + emojis[i];
            select2.appendChild(option2);
        }
        var f = localStorage.getItem("select1");
        var s = localStorage.getItem("select2");        
        if (s == null) {
            select1.selectedIndex = 5;
            }else{
            select1.selectedIndex = f;
        }
        if (f == null) {
            select2.selectedIndex = 32;
            }else{
            select2.selectedIndex = s;
        }
    };
    
    
    this.updateDisplay = function (afterCalc) {
        
        calculatorView.showCurrentValue(calculatorModel.getCurrentValue(document.getElementById("select2").selectedIndex),afterCalc);
        calculatorView.showCurrentValue(calculatorModel.getCurrentValue(document.getElementById("select2").selectedIndex),afterCalc);
    };
    
    this.loadDoc = function () {
        var httpreq = new XMLHttpRequest();
        httpreq.onreadystatechange = function() {
            if (httpreq.readyState == 4 && httpreq.status == 200) {
                var i;
                var x = this.responseXML.getElementsByTagName("Cube");
                var currencies=[x.length];
                var rates=[x.length];
                for (i = 2; i <x.length; i++) {
                    currencies[i-2]=(x[i].getAttribute("currency"));
                    rates[i-2]=(x[i].getAttribute("rate"));
                }
                currencies[x.length-2]=("EUR");
                rates[x.length-2]=(1);
                calculatorModel.updateRates(rates);
                calculatorModel.updateCurrencies(currencies);
                
                localStorage.setItem("rates",rates);
                localStorage.setItem("currencies",currencies);
                
                calculatorController.updateSelects();
                
                calculatorController.updateDisplay();
            }
        };
        httpreq.open("GET", "https://devweb2018.cis.strath.ac.uk/~aes02112/ecbxml.php");
        httpreq.send();
        
        
    };
    
    this.init = function() {
        calculatorView.setButtonsCallback( function(evt) {
            if(evt.target.matches('button')){
                
                var value = evt.target.id;
                if (value==('=')) {
                    calculatorModel.calculateValue(document.getElementById("select1").selectedIndex,document.getElementById("select2").selectedIndex,document.getElementById("select3").selectedIndex*2);
                    
                    calculatorController.updateDisplay(true);
                    }else if (value==('c')) {
                    calculatorModel.clearValue();
                    
                    calculatorController.updateDisplay(false);
                    }else{
                    calculatorModel.enterValue(value);
                    
                    calculatorController.updateDisplay(false);
                }
            }
        });
        
        calculatorView.setSelectCallback(function(evt) {
            localStorage.setItem(evt.target.id, evt.target.selectedIndex);
            if(evt.target.id=="select1"){
            calculatorController.updateDisplay(false);}
        });
        calculatorView.init();
        
    };
    
    
}
calculatorController = new CalculatorController();
calculatorController.createSelects();
calculatorController.loadDoc();
calculatorController.updateDisplay();
window.addEventListener("load", calculatorController.init );

