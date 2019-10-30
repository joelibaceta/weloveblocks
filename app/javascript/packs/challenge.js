

var cells = document.querySelectorAll(".cell");

cells.forEach(setListeners);

function updateValue(el, amount) {

    var row = parseInt(el.dataset.row);
    var col = parseInt(el.dataset.column);
    
    var new_val = (parseInt(arGrid[row][col]) || 0) + amount;
    arGrid[row][col] = new_val; 

    updateGrid();
    redraw_preview();
}

function updateGrid() {
    for (var x = 0; x < 18; x++) {
        for (var y = 0; y < 18; y++) {
            var i = arGrid[x][y];
            var j = objGrid[x][y];
            var el = document.getElementById(x + "-" + y);

            el.dataset.value = i;
            el.innerText = i;
        }
    }
}

function setValue(el, val) {
    var row = parseInt(el.dataset.row);
    var col = parseInt(el.dataset.column);
    
    if (val >= 10) {
        objGrid[row][col] = val;
    } else {
        arGrid[row][col] += val;
    }
    
    updateGrid(); 
    redraw_preview();
   
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
    e.addEventListener("drop", function(e){
        e.preventDefault();
        var el = e.target;
        var data = e.dataTransfer.getData("text");
         
        setValue(el, parseInt(data));
        redraw_preview();
    }),
    e.addEventListener("dragover", function(e) {
        e.preventDefault();
    });
    e.addEventListener("dragstart", function(e) {
        e.dataTransfer.setData("text", e.target.dataset.value);
    });
};

function save_changes() {
    let formData = new FormData();

    formData.append("map_grid", JSON.stringify(arGrid));
    formData.append("objects_grid", JSON.stringify(objGrid));
    formData.append("description", description_text.value);

    fetch(window.location.href, {
        method: 'PUT',
        body: formData
    });
}

var canvas = document.getElementById("preview");

// var config = {
//     type: CANVAS,
//     canvas: canvas,
//     width: 400,
//     height: 400  
// };

// var game = new Game(config);



//var iso = new Isomer(document.getElementById("preview"));


var obelisk = require('obelisk.js');

// create pixel view container in point
var point = new obelisk.Point(325, 160);
var pixelView = new obelisk.PixelView(canvas, point);



function drawCube(x,y,z) {
    // create dimension instance
    var dimension = new obelisk.CubeDimension(18, 18, 18);
    // create color instance
    var color = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.GRAY);
    // create cube primitive
    var cube = new obelisk.Cube(dimension, color);
    
    pixelView.renderObject(cube, new obelisk.Point3D(x, y, z));
}


function drawObject(x,y,z, color) {
    // create dimension instance
    var dimension = new obelisk.CubeDimension(18, 18, 18);
    // create cube primitive
    var cube = new obelisk.Cube(dimension, color);
    
    pixelView.renderObject(cube, new obelisk.Point3D(x, y, z));
}

function redraw_preview() {
    pixelView.clear();
    create_grid();
    for (var x = 0; x < 18; x++) {
        for (var y = 0; y < 18; y++) {
            var i = arGrid[x][y];
            var j = objGrid[x][y]
            if ( i > 0) {

                for (var k = 1; k <= i; k++) {
                    drawCube(x*18, y*18, k * 18)
                }
                var color;
                if ( j > 0) {
                    switch(j) {
                        case 10:
                            color = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.BLUE);
                            break;
                        case 11:
                            color = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.GRASS_GREEN);
                            break;
                        case 12:
                            color = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.YELLOW);
                            break;
                    }
                    drawObject(x*18, y*18, (i+1) * 18, color);
                }
                
            }
        }
    }
    save_changes();
}

function create_grid() {
    // Let's build a grid...
    // Setup lines
    var lineColor = new obelisk.LineColor();
    var dimensionX = new obelisk.LineXDimension(306);
    var dimensionY = new obelisk.LineYDimension(306);
    var lineX = new obelisk.LineX(dimensionX, lineColor);
    var lineY = new obelisk.LineY(dimensionY, lineColor);

    var x = 0;
    var y = 0;
    
    // Create Grid:
    for (x = 0; x <18; x++) {
    pixelView.renderObject(lineX, new obelisk.Point3D(0, x * 18, 0));
    }
    for (y = 0; y < 18; y++) {
    pixelView.renderObject(lineY, new obelisk.Point3D(y * 18, 0, 0));
    }
}

var player_item = document.getElementById("player_item");

player_item.addEventListener("dragstart", function(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.value);
});

var player_item = document.getElementById("goal_marker");

player_item.addEventListener("dragstart", function(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.value);
});

var player_item = document.getElementById("bonus_point");

player_item.addEventListener("dragstart", function(ev) {
    ev.dataTransfer.setData("text", ev.target.dataset.value);
});

var description_text = document.getElementById("description");

description_text.addEventListener("change", function(){

});


redraw_preview();
updateGrid();