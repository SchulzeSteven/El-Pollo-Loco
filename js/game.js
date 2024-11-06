let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();
const endScreen = new EndScreen();


function init() {
    canvas = document.getElementById("canvas");
    const muteButton = document.getElementById('mute-button');
    muteButton.textContent = '🔊';
    muteButton.addEventListener('click', () => {
        if (world) world.toggleMute();
    });
    muteButton.addEventListener('touchstart', (event) => {
        event.preventDefault();
        if (world) world.toggleMute();
    });
}


function startGame() {
    hideStartScreen();
    resetWorldState();
    initializeWorld();
    updateControlsVisibility();
}


function restartGame() {
    hideButtonContainer();
    resetWorldState();
    initializeWorld();
    updateControlsVisibility();
}


function hideStartScreen() {
    document.getElementById('start').style.display = 'none';
    document.querySelector('.btn-container').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
}


function resetWorldState() {
    if (world) {
        world.stopGame();
        world.character.clearIntervals();
        world.level.enemies.forEach(enemy => {
            if (enemy.clearIntervals) {
                enemy.clearIntervals();
            }
        });
        world.audioManager.stopAndResetSounds();
        world.character.resetIdleTimers();
        world = null;
    }
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}


function initializeWorld() {
    keyboard = new Keyboard();
    audioManager = new AudioManager();
    world = new World(canvas, keyboard, audioManager);
    world.resetWorld();
    initEventListeners();
}


function hideButtonContainer() {
    document.querySelector('.btn-container').style.display = 'none';
}


function updateControlsVisibility() {
    updateDesktopControlsVisibility();
    updateMobileControlsVisibility();
}


function updateDesktopControlsVisibility() {
    const controls = document.querySelector('.controls');
    controls.style.display = window.innerWidth < 950 ? 'none' : 'flex';
}


function updateMobileControlsVisibility() {
    const mobileMovementContainer = document.getElementById("mobile-movement-container");
    const muteButton = document.getElementById("mute-button");

    if (world && !world.gameStopped && window.innerWidth < 950) {
        mobileMovementContainer.style.display = 'flex';
        muteButton.style.display = 'flex';
    } else {
        mobileMovementContainer.style.display = 'none';
        muteButton.style.display = 'none';
    }
}


function home() {
    document.getElementById('start').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById("mobile-movement-container").style.display = "none";
    document.querySelector('.btn-container').style.display = 'none';
    document.getElementById('impressum').style.display = 'none';
    if (world) {
        world.stopGame();
        world = null;
    }
}


function impressum() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('impressum').style.display = 'flex';
}


function stopMobileMovement(KEY) {
    if (KEY === 'THROW') {
        keyboard.D = false; // Setzt D auf false, wenn "THROW" losgelassen wird
    } else if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = false;
    }
}


function startMobileMovement(KEY) {
    if (KEY === 'THROW') {
        keyboard.D = true; // Setzt D auf true, wenn "THROW" gedrückt wird
    } else if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = true;
    }
}


function updateCharacterMovement() {
    if (keyboard.LEFT) character.moveLeft();
    if (keyboard.RIGHT) character.moveRight();
    if (keyboard.SPACE) character.jump();
    if (keyboard.D) character.throw();
}


function initEventListeners() {
    document.addEventListener("keydown", (event) => {
        const keyMap = { 32: 'SPACE', 37: 'LEFT', 39: 'RIGHT', 68: 'D' };
        if (keyMap[event.keyCode]) keyboard[keyMap[event.keyCode]] = true;
    });
    
    document.addEventListener("keyup", (event) => {
        const keyMap = { 32: 'SPACE', 37: 'LEFT', 39: 'RIGHT', 68: 'D' };
        if (keyMap[event.keyCode]) keyboard[keyMap[event.keyCode]] = false;
    });
}


window.addEventListener('resize', updateControlsVisibility);
window.addEventListener('orientationchange', updateControlsVisibility);
document.addEventListener("DOMContentLoaded", updateControlsVisibility);
