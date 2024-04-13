import { GameEngine, Vertex3d, Triangle, Mesh } from "./gameEngine.js";

$(function() {
    let meshUrl = '/assets/cube.obj';

    window.Game = {
        controls: {
            turnLeft: false,
            turnRight: false,
            forward: false,
            back: false,
            left: false,
            right: false
        }		
    };
    
    //reference canvas
    let ge = new GameEngine("screen1");
    
    //get obj
    fetch(meshUrl)
        .then(response => response.text())
        .then((data) => {
            let mesh = new Mesh();
            mesh.loadFromObj(data, true);
            mesh.color = {r:100,g:100,b:255};
            console.log(mesh);
            ge.addMesh(mesh);
            ge.start();
        });
});

var lastTime = Date.now();

function drawLoop() {
    requestAnimationFrame(drawLoop);

    var now = Date.now();
    var elapsedTime = now-lastTime;

    //clear the screen 
    ctx1.clearRect(0, 0, c1.width, c1.height);
    
    //draw top down
        
        
    //change variables for next frame
    if(Game.controls.turnLeft) {
        Game.player.direction -= Game.player.turnSpeed * elapsedTime;
    }
    
    if(Game.controls.turnRight) {
        Game.player.direction += Game.player.turnSpeed * elapsedTime;
    }

    if(Game.controls.left) {
        Game.player.x += Math.sin(Game.player.direction);
        Game.player.y -= Math.cos(Game.player.direction);
    }
    if(Game.controls.right) {
        Game.player.x -= Math.sin(Game.player.direction);
        Game.player.y += Math.cos(Game.player.direction);
    }
    if(Game.controls.forward) {
        Game.player.x += Math.cos(Game.player.direction);
        Game.player.y += Math.sin(Game.player.direction);
    }
    if(Game.controls.back) {
        Game.player.x -= Math.cos(Game.player.direction);
        Game.player.y -= Math.sin(Game.player.direction);
    }

    lastTime = now;
}

function FNcross(x1, y1, x2, y2) {
    return x1*y2 - x2*y1;
}

function Intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var x = FNcross(x1, y1, x2, y2);
    var y = FNcross(x3, y3, x4, y4);
    var det = FNcross(x1-x2, y1-y2, x3-x4, y3-y4);
    x = FNcross(x, x1-x2, y, x3-x4)/det;
    y = FNcross(x, y1-y2, y, y3-y4)/det
    
    return { x: x, y: y };
}

if ( !window.requestAnimationFrame ) {

window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

            window.setTimeout( callback, 1000 / 60 );

        };
    } )();
}

window.addEventListener("keydown", function(e){
    switch(e.keyCode)
    {
        case 37: // left arrow
            Game.controls.turnLeft = true;
            break;
        case 38: // up arrow
            Game.controls.forward = true;
            break;
        case 39: // right arrow
            Game.controls.turnRight = true;
            break;
        case 40: // down arrow
            Game.controls.back = true;
            break;
        case 81: // q
            Game.controls.left = true;
            break;
        case 69: // e
            Game.controls.right = true;
            break;
    }
}, false);

window.addEventListener("keyup", function(e){
    switch(e.keyCode)
    {
        case 37: // left arrow
            Game.controls.turnLeft = false;
            break;
        case 38: // up arrow
            Game.controls.forward = false;
            break;
        case 39: // right arrow
            Game.controls.turnRight = false;
            break;
        case 40: // down arrow
            Game.controls.back = false;
            break;
        case 81: // q
            Game.controls.left = false;
            break;
        case 69: // e
            Game.controls.right = false;
            break;
    }
}, false);	