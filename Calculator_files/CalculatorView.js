"use strict";
function CalculatorView () {
    var display = document.getElementById("display"),
    buttons = document.getElementById("buttons");
    
    this.showCurrentValue = function (number, afterCalc) {
        if(!afterCalc){
            display.value = number +" "  +document.getElementById("select1").value.substring(0,3);
            }else{ 
            display.value = number +" "  +document.getElementById("select2").value.substring(0,3);
        }
    };
    
    this.setButtonsCallback = function (callback) {
        document.getElementById("buttons").addEventListener("click", callback);
    };
    
    this.setSelectCallback = function (callback) {
        document.getElementById("select1").addEventListener("change", callback);
        document.getElementById("select2").addEventListener("change", callback);
        document.getElementById("select3").addEventListener("change", callback);
    };
    
    var openNav = true,
    addMouseAndTouchUp = function (elementID, handler) {
        //utility function to add both mouseup and touchend events and prevent double events
        var element = document.getElementById(elementID),
        f = function (e) {
            e.preventDefault();//stops mobile browsers faking the mouse events after touch events
            handler(e);
            return false;
        };
        element.addEventListener("mouseup", f, false);
        element.addEventListener("touchend", f, false);
    },
    openCloseNav = function () {
        //doggle the side menu reveal
        if (openNav) {
            openNav = false;
            document.getElementById("nav").className = "closedmenu";
            document.getElementById("mainsection").className = "closedmenu";
            document.getElementById("navelem").style.display = "none";
            } else {
            openNav = true;
            document.getElementById("nav").className = "";
            document.getElementById("mainsection").className = "";
            document.getElementById("navelem").style.display = "block";
        }
    };
    
    this.init = function () {
        openCloseNav();      
        addMouseAndTouchUp("navmenu", openCloseNav);
    };
    
}

