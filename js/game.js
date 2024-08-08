let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    console.log('My Character is', world.character);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}


function resizeCanvas() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    }
}