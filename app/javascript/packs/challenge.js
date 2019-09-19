
import { CANVAS, Game } from "phaser";

const zeros = (m, n) => [...Array(m)].map(e => Array(n).fill(0));

var arGrid = zeros(20, 20);

var cells = document.querySelectorAll(".cell");

cells.forEach(setListeners);

function updateValue(el, amount) {

    

    var row = parseInt(el.dataset.row);
    var col = parseInt(el.dataset.column);
    
    var new_val = (parseInt(arGrid[row][col]) || 0) + amount;
    arGrid[row][col] = new_val;
    el.innerText = new_val;
    el.dataset.value = new_val;

}

function setListeners(e, i) {
    e.addEventListener("click", function(e){
        var el = e.target;
        updateValue(el, 1);
    });
    e.addEventListener("contextmenu", function(e){
        e.preventDefault();
        var el = e.target;
        updateValue(el, -1);
    })
};




// var canvas = document.getElementById("preview");

// var config = {
//     type: CANVAS,
//     canvas: canvas,
//     width: 400,
//     height: 400  
// };

// var game = new Game(config);
