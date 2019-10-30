import Blockly from 'blockly';

var obelisk = require('obelisk.js');

var canvas = document.getElementById("preview");

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
    for (var x = 0; x < 18; x++) {
        for (var y = 0; y < 18; y++) {
            var i = arGrid[x][y];
            var j = objGrid[x][y]
            if ( i > 0) {
                for (var k = 1; k <= i; k++) {
                    drawCube(x*18, y*18, k * 18)
                }
                var color;
                if ( j == 10) {
                    color = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.BLUE);
                    drawObject(x*18, y*18, (i+1) * 18, color);
                } 
                if ( j == 11) {
                    color = new obelisk.CubeColor().getByHorizontalColor(obelisk.ColorPattern.GRASS_GREEN);
                    drawObject(x*18, y*18, (i+1) * 18, color);
                } 
            }
        }
    } 
}

redraw_preview();




var workspace = Blockly.inject('blocklyDiv',
    {toolbox: document.getElementById('toolbox')});

var code = Blockly.JavaScript.workspaceToCode(workspace);

Blockly.svgResize(workspace);

function myUpdateFunction(event) {
var code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('generated-code').innerText = code;
    //Prism.highlightAll();
}

workspace.addChangeListener(myUpdateFunction);

Blockly.Blocks['move_block'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move")
            .appendField(new Blockly.FieldDropdown([["forward","move_forward"], ["backward","move_backward"], ["left","move_ left"], ["right","move_right"]]), "direction")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
    this.setTooltip("move");
    this.setHelpUrl("");
    }
};


Blockly.JavaScript['move_block'] = function(block) {
    return block.getFieldValue('direction') + "();";
    
};

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
        break;
        }
    }
}

function move_forward(){
    var coords = find_player_block();
    var x = coords[0];
    var y = coords[1];

    objGrid[x+1][y] = objGrid[x][y]
    objGrid[x][y] = 0;
     
    redraw_preview();

};

// Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
// Blockly.JavaScript.addReservedWords('highlightBlock');

// function highlightBlock(id) {
//     workspace.highlightBlock(id);
// }


function find_player_block() {
    for (var x = 0; x < 18; x++) {
        for (var y = 0; y < 18; y++) {
            var i = objGrid[x][y];
            if (i == 10) {
                return [x, y];
            }
        }
    }
}

document.getElementById("run_button").addEventListener("click", function(ev) {
    ev.preventDefault();
    var code = document.getElementById('generated-code').innerText;
    eval(code); 
});