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
    document.getElementById('start').style.display = 'none';
    document.querySelector('.btn-container').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
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
    keyboard = new Keyboard();
    audioManager = new AudioManager();
    world = new World(canvas, keyboard, audioManager);
    world.resetWorld();
    initEventListeners();
    updateControlsVisibility();
    if (window.innerWidth < 950) {
        document.getElementById("mobile-movement-container").style.display = "flex";
    }
}


function restartGame() {
    document.querySelector('.btn-container').style.display = 'none';
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
    world = new World(canvas, keyboard, audioManager);
    world.resetWorld();
    initEventListeners();
    updateControlsVisibility();
    if (window.innerWidth < 950) {
        document.getElementById("mobile-movement-container").style.display = "flex";
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


function updateControlsVisibility() {
    const controls = document.querySelector('.controls');
    const mobileMovementContainer = document.getElementById("mobile-movement-container");
    const muteButton = document.getElementById("mute-button");
    if (window.innerWidth < 950) {
        controls.style.display = 'none';
    } else {
        controls.style.display = 'flex';
    }
    if (world && !world.gameStopped && window.innerWidth < 950) {
        mobileMovementContainer.style.display = 'flex';
        muteButton.style.display = 'flex';
    } else {
        mobileMovementContainer.style.display = 'none';
        muteButton.style.display = 'none';
    }
}


function showMovementContainer() {
    let container = document.getElementById("mobile-movement-container");
    if (container) {
        container.style.display = "flex";
    }
}


window.addEventListener("orientationchange", () => {
    location.reload();
});


function stopMobileMovement(KEY) {
    if (KEY === 'THROW') {
        keyboard.D = false;
    } else if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = false;
    }
}


function startMobileMovement(KEY) {
    if (KEY === 'THROW') {
        keyboard.D = true;
    } else if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = true;
    }
}


if (window.innerWidth < 950) {
    showMovementContainer();
}


function updateCharacterMovement() {
    if (keyboard.LEFT) {
        character.moveLeft();
    }
    if (keyboard.RIGHT) {
        character.moveRight();
    }
    if (keyboard.SPACE) {
        character.jump();
    }
    if (keyboard.D) {
        character.throw();
    }
}


function impressum() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('impressum').style.display = 'flex';
}


function initEventListeners() {
    document.addEventListener("keydown", (event) => {
        if (event.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (event.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (event.keyCode == 68) {
            keyboard.D = true;
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.keyCode == 32) {
            keyboard.SPACE = false;
        }
        if (event.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (event.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (event.keyCode == 68) {
            keyboard.D = false;
        }
    });
}


window.addEventListener('resize', updateControlsVisibility);
window.addEventListener('orientationchange', updateControlsVisibility);
document.addEventListener("DOMContentLoaded", updateControlsVisibility);