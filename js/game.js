let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();
const endScreen = new EndScreen();


/**
 * Initializes the main components of the game interface, setting up the canvas and the mute button.
 * This function also adds click and touch event listeners to the mute button to allow sound toggling.
 */
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


/**
 * Initiates the game by hiding the start screen, resetting any existing game state,
 * and initializing a new game world. Updates control visibility based on device and screen size.
 */
function startGame() {
    hideStartScreen();
    resetWorldState();
    initializeWorld();
    updateControlsVisibility();
}


/**
 * Restarts the game by hiding the button container, resetting the game state, and
 * initializing the world again. Updates control visibility for the new game session.
 */
function restartGame() {
    hideButtonContainer();
    resetWorldState();
    initializeWorld();
    updateControlsVisibility();
}


/**
 * Hides the initial start screen elements and displays the main game canvas.
 * The function ensures a clean transition from the start screen to the game interface.
 */
function hideStartScreen() {
    document.getElementById('start').style.display = 'none';
    document.querySelector('.btn-container').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
}


/**
 * Stops the game by canceling the animation frame and clearing active intervals associated with
 * the world, such as collision and endboss movement. Additionally, stops intervals for each enemy
 * and clears throwable objects in the game.
 */
function stopGame() {
    if (!world) return;
    world.gameStopped = true;
    cancelAnimationFrame(world.animationFrameId);
    if (world.collisionInterval) {
        clearInterval(world.collisionInterval);
        world.collisionInterval = null;
    }
    if (world.endbossMovementInterval) {
        clearInterval(world.endbossMovementInterval);
        world.endbossMovementInterval = null;
    }
    world.level.enemies.forEach(enemy => {
        if (enemy.clearIntervals) {
            enemy.clearIntervals();
        }
    });
    world.throwableObjects = [];
}


/**
 * Resets the game world state by stopping the game, clearing character and enemy intervals,
 * stopping and resetting all sounds, and reinitializing the canvas. This function is critical
 * for ensuring a clean state before a new game begins.
 */
function resetWorldState() {
    if (world) {
        stopGame();
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


/**
 * Sets up a new game world with a fresh instance of the World object. It initializes the keyboard
 * and audio manager, resets the game world, and binds event listeners for keyboard inputs.
 */
function initializeWorld() {
    keyboard = new Keyboard();
    audioManager = new AudioManager();
    world = new World(canvas, keyboard, audioManager);
    world.resetWorld();
    initEventListeners();
}


/**
 * Hides the button container, typically used when restarting the game to keep the interface clean.
 */
function hideButtonContainer() {
    document.querySelector('.btn-container').style.display = 'none';
}


/**
 * Updates the visibility of control elements based on device type and screen size.
 * Calls separate functions to handle desktop and mobile control visibility individually.
 */
function updateControlsVisibility() {
    updateDesktopControlsVisibility();
    updateMobileControlsVisibility();
}


/**
 * Manages the visibility of desktop controls. Hides them on smaller screens and displays them
 * on larger screens to ensure the game controls fit properly on different device types.
 */
function updateDesktopControlsVisibility() {
    const controls = document.querySelector('.controls');
    controls.style.display = window.innerWidth < 950 ? 'none' : 'flex';
}


/**
 * Updates the visibility of mobile control elements, such as movement controls and the mute button,
 * based on the game state and screen size. Displays them on mobile screens if the game is active.
 */
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


/**
 * Returns the user to the home screen, stops the game if it is running, and hides the game canvas,
 * mobile controls, and button container. Resets the display for the Impressum section.
 */
function home() {
    document.getElementById('start').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';
    document.getElementById("mobile-movement-container").style.display = "none";
    document.querySelector('.btn-container').style.display = 'none';
    document.getElementById('impressum').style.display = 'none';
    if (world) {
        stopGame();
        world = null;
    }
}


/**
 * Displays the Impressum section and hides other screens such as the game canvas and start screen.
 */
function impressum() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('impressum').style.display = 'flex';
}


/**
 * Stops a mobile control action based on the provided key input, such as stopping movement or
 * throwing. This allows for a smooth transition between actions.
 */
function stopMobileMovement(KEY) {
    if (KEY === 'THROW') {
        keyboard.D = false;
    } else if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = false;
    }
}


/**
 * Starts a mobile control action based on the provided key input, enabling movement or an action
 * such as jumping or throwing. This function ensures controls are responsive on mobile.
 */
function startMobileMovement(KEY) {
    if (KEY === 'THROW') {
        keyboard.D = true;
    } else if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = true;
    }
}


/**
 * Updates the character’s movement according to the current keyboard input state. Processes
 * movements like moving left, right, jumping, or throwing based on active inputs.
 */
function updateCharacterMovement() {
    if (keyboard.LEFT) character.moveLeft();
    if (keyboard.RIGHT) character.moveRight();
    if (keyboard.SPACE) character.jump();
    if (keyboard.D) character.throw();
}


/**
 * Binds keyboard event listeners for keydown and keyup events, mapping each keypress to a specific
 * game control (e.g., move left, jump, throw). Updates the keyboard input state accordingly.
 */
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

/**
 * Listens for window resize and orientation change events to update control visibility as needed.
 * Ensures that the interface adapts dynamically to screen orientation and size changes.
 */
window.addEventListener('resize', updateControlsVisibility);
window.addEventListener('orientationchange', updateControlsVisibility);
document.addEventListener("DOMContentLoaded", updateControlsVisibility);
