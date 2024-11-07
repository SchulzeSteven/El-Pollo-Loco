class World {
    character;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    showFrames = false;
    statusBar = new StatusBar();
    throwableObjects = [];
    throw_sound;
    endbossMovementStarted = false;
    throwCooldown = false;
    isMuted = false;
    endbossDefeated = false;
    gameStopped = false;
    endScreen = new EndScreen();
    intervals = [];
    muteButton = {
        x: 660,
        y: 20,
        width: 32,
        height: 32
    };
    muteIconOn = new Image();
    muteIconOff = new Image();


    constructor(canvas, keyboard, audioManager) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioManager = audioManager;
        this.audioManager.setWorld(this);
        this.muteIconOn.src = './assets/img/icons/volume-on.png';
        this.muteIconOff.src = './assets/img/icons/volume-off.png';
        this.character = new Character(audioManager);
        this.collisionManager = new CollisionManager(this);
        this.throw_sound = this.audioManager.sounds.throwing;
        this.initializeWorld();
        this.setupCanvasClickListener();
    }


    /**
    * Initializes the game world by drawing the initial frame, setting up world references,
    * and starting collision checks and endboss movement monitoring.
    *
    * @function initializeWorld
    * @memberof GameWorld
    */
    initializeWorld() {
        this.draw();
        this.setWorld();
        this.collisionManager.startCollisionCheck();
        this.checkEndbossMovement();
    }


    /**
    * Sets up the game world properties, including playing background music, assigning world references 
     to the character and each enemy, and setting initial audio volume levels.
    *
    * @function setWorld
    * @memberof GameWorld
    */
    setWorld() {
        audioManager.play('background');
        this.audioManager.sounds.background.volume = 0.2;
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }


    /**
   * Clears all currently active intervals in the game world to reset or stop all ongoing processes.
    *
    * @function clearIntervals
    * @memberof GameWorld
    */
    clearIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }


    /**
    * Checks if the game has ended due to the character’s death or the endboss being defeated.
    * If so, stops the game, displays the appropriate end screen, and hides mobile controls.
    *
    * @function checkGameEnd
    * @memberof GameWorld
    */
    checkGameEnd() {
        if (this.character.isDead()) {
            stopGame();
            this.endScreen.drawEndScreen(this.ctx, false);
            document.getElementById("mobile-movement-container").style.display = "none";
        } else if (this.endbossDefeated) {
            stopGame();
            this.endScreen.drawEndScreen(this.ctx, true);
            document.getElementById("mobile-movement-container").style.display = "none";
        }
    }
    
    
    /**
    * Displays the button container on the screen and temporarily disables buttons
    * to prevent accidental clicks, re-enabling them after a delay.
    *
    * @function showBtnContainer
    * @memberof GameWorld
    */
    showBtnContainer() {
        const btnContainer = document.querySelector('.btn-container');
        btnContainer.style.display = 'flex';
        
        const buttons = btnContainer.querySelectorAll('.btns');
        buttons.forEach(button => button.classList.add('disabled'));
    
        setTimeout(() => {
            buttons.forEach(button => button.classList.remove('disabled'));
        }, 2000);
    }


    /**
    * Checks whether the endboss movement should be triggered based on the character’s position.
    * If conditions are met, initiates endboss movement and enables the endboss display on the status bar.
    *
    * @function checkEndbossMovement
    * @memberof GameWorld
    */
    checkEndbossMovement() {
        setInterval(() => {
            const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            if (this.character.x >= 2700 && endboss && !this.endbossMovementStarted) {
                this.endbossMovementStarted = true;
                endboss.startMovingLeft();
                this.statusBar.enableEndbossDisplay();
            }
        }, 1000 / 60);
    }


    /**
    * Sets up click and touch event listeners on the canvas for the mute button,
    * allowing for toggling sound on and off when the button is clicked.
    *
    * @function setupCanvasClickListener
    * @memberof GameWorld
    */
    setupCanvasClickListener() {
        this.canvas.addEventListener('click', (event) => this.handleMuteButtonClick(event));
        this.canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.handleMuteButtonClick(event);
        });
    }
    

    /**
    * Handles mute button interactions by checking if the mute button was clicked.
    * If clicked, toggles the mute state for the game's audio.
    *  
    * @function handleMuteButtonClick
    * @memberof GameWorld
    * @param {Event} event - The mouse or touch event data.
    */
    handleMuteButtonClick(event) {
        if (this.gameStopped) return;
    
        let rect = this.canvas.getBoundingClientRect();
        let mouseX, mouseY;
        if (event.type === 'touchstart') {
            mouseX = event.touches[0].clientX - rect.left;
            mouseY = event.touches[0].clientY - rect.top;
        } else {
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        }
        if (mouseX >= this.muteButton.x && mouseX <= this.muteButton.x + this.muteButton.width &&
            mouseY >= this.muteButton.y && mouseY <= this.muteButton.y + this.muteButton.height) {
            this.audioManager.toggleMute();
        }
    }
    

    /**
    * Checks if the HTML mute button element is currently visible.
    *
    * @function isHtmlMuteButtonVisible
    * @memberof GameWorld
    * @returns {boolean} True if the mute button is displayed.
    */
    isHtmlMuteButtonVisible() {
        const muteButton = document.getElementById('mute-button');
        return muteButton && muteButton.style.display === 'flex';
    }


    /**
    * Toggles the mute state for game audio and updates the mute icon on the HTML button.
    *
    * @function toggleMute
    * @memberof GameWorld
    */
    toggleMute() {
        if (this.audioManager) {
            this.audioManager.toggleMute();
        }
        this.updateHtmlMuteIcon();
    }
    

    /**
    * Updates the mute icon displayed on the HTML button to match the current mute state.
    *
    * @function updateHtmlMuteIcon
    * @memberof GameWorld
    */
    updateHtmlMuteIcon() {
        const muteButton = document.getElementById('mute-button');
        if (muteButton) {
            muteButton.src = this.audioManager.isMuted ? './assets/img/icons/volume-off.png' : './assets/img/icons/volume-on.png';
        }
    }


    /**
    * Draws the mute button icon directly on the canvas, showing the muted or unmuted icon
    * depending on the current mute state.
    *  
    * @function drawMuteButton
    * @memberof GameWorld
    */
    drawMuteButton() {
        let icon = this.audioManager.isMuted ? this.muteIconOff : this.muteIconOn;
        this.ctx.drawImage(icon, this.muteButton.x, this.muteButton.y, this.muteButton.width, this.muteButton.height);
    }


    /**
    * Draws the game world, including background, character, enemies, and collectibles,
    * and checks for character death and game end conditions on each frame.
    *
    * @function draw
    * @memberof GameWorld
    */
    draw() {
        if (this.handleCharacterDeath()) return;
        this.checkGameEnd();
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        if (!this.isHtmlMuteButtonVisible()) {
            this.drawMuteButton();
        }
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
    

    /**
    * Manages the character's death animation and stops the game once the animation completes.
    *
    * @function handleCharacterDeath
    * @memberof GameWorld
    * @returns {boolean} True if the character is dead and animation has completed.
    */
    handleCharacterDeath() {
        if (this.character.isDead()) {
            this.character.playDeadAnimationOnce();
            if (this.character.isDeadAnimationCompleted()) {
                this.audioManager.playGameOverMusic();
                stopGame();
                return true;
            }
        }
        return false;
    }
    

    /**
    * Resets the game world to its initial state, reinitializing levels, resetting the character, and starting checks.
    *
    * @function resetWorld
    * @memberof GameWorld
    */
    resetWorld() {
        this.clearIntervals();
        this.resetBottleProperties();
        this.initializeLevel();
        this.resetGameState();
        this.resetCharacter();
        this.initializeWorld();
        this.collisionManager.startCollisionCheck();
        this.checkEndbossMovement();
    }
    

    /**
    * Resets properties related to bottle spacing within the game world.
    *
    * @function resetBottleProperties
    * @memberof GameWorld
    */
    resetBottleProperties() {
        Bottle.lastX = 0;
        Bottle.minSpacing = 100;
    }
    

    /**
    * Initializes the level with arrays of enemies, coins, bottles, clouds, and background objects.
    *
    * @function initializeLevel
    * @memberof GameWorld
    */
    initializeLevel() {
        this.level = new Level(
            this.createEnemies(),
            this.createCoins(),
            this.createBottles(),
            this.createClouds(),
            this.createBackgroundObjects()
        );
        this.throwableObjects = [];
    }
    

    /**
    * Creates instances of enemies from the level configuration.
    *
    * @function createEnemies
    * @memberof GameWorld
    * @returns {GameObject[]} Array of enemy objects.
    */
    createEnemies() {
        return level1.enemies.map(enemy => new enemy.constructor());
    }
    

    /**
    * Creates instances of coins for the level.
    *
    * @function createCoins
    * @memberof GameWorld
    * @returns {Coin[]} Array of coin objects.
    */
    createCoins() {
        return level1.coins.map(() => new Coin());
    }
    

    /**
    * Creates instances of bottles at random positions for the level.
    *
     @function createBottles
    * @memberof GameWorld
    * @returns {Bottle[]} Array of bottle objects.
    */
    createBottles() {
        return Array.from({ length: 12 }, () => {
            const bottle = new Bottle();
            bottle.setRandomXPosition();
            return bottle;
        });
    }
    

    /**
    * Creates instances of clouds for the level.
    *
    * @function createClouds
    * @memberof GameWorld
    * @returns {Cloud[]} Array of cloud objects.
    */
    createClouds() {
        return level1.clouds.map(() => new Cloud());
    }
    

    /**
    * Creates background objects from the level configuration.
    *
    * @function createBackgroundObjects
    * @memberof GameWorld
    * @returns {BackgroundObject[]} Array of background objects.
    */
    createBackgroundObjects() {
        return level1.backgroundObjects.map(bg => new BackgroundObject(bg.img.src, bg.x));
    }
    

    /**
    * Resets various game state properties to their initial values.
    *
    * @function resetGameState
    * @memberof GameWorld
    */
    resetGameState() {
        this.endbossMovementStarted = false;
        this.throwCooldown = false;
        this.endbossDefeated = false;
        this.gameStopped = false;
    }
    

    /**
    * Resets the character to its initial state and clears all active intervals related to the character.
    *
    * @function resetCharacter
    * @memberof GameWorld
    */
    resetCharacter() {
        if (this.character) {
            this.character.clearIntervals();
        }
        this.character = new Character(this.audioManager);
    }
    
    
    /**
    * Draws multiple objects on the map by calling `addToMap` on each.
    *  
    * @function addObjectsToMap
    * @memberof GameWorld
    * @param {GameObject[]} objects - Array of objects to be drawn on the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
    * Draws an individual object on the map and handles flipping if necessary.
    *
    * @function addToMap
    * @memberof GameWorld
    * @param {GameObject} moveableObject - The object to draw on the map.
    */
    addToMap(moveableobject) {
        if (moveableobject.otherDirection) {
            this.flipImage(moveableobject);
        }
        moveableobject.draw(this.ctx);
        if (this.showFrames) {
            moveableobject.drawFrame(this.ctx);
        }
        if (moveableobject.otherDirection) {
            this.flipImageBack(moveableobject);
        }
    }


    /**
    * Flips an object's image horizontally to simulate movement in the opposite direction.
    *
    * @function flipImage
    * @memberof GameWorld
    * @param {GameObject} moveableObject - The object whose image should be flipped.
    */
    flipImage(moveableobject) {
        this.ctx.save();
        this.ctx.translate(moveableobject.width, 0);
        this.ctx.scale(-1, 1);
        moveableobject.x = moveableobject.x * -1;
    }


    /**
    * Restores the object's image to its original orientation after flipping.
    *
    * @function flipImageBack
     @memberof GameWorld
    * @param {GameObject} moveableObject - The object to restore.
    */
    flipImageBack(moveableobject) {
        moveableobject.x = moveableobject.x * -1;
        this.ctx.restore();
    }


    /**
    * Clears the canvas to prepare for the next frame's drawing.
    *
    * @function clearCanvas
    * @memberof GameWorld
    */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


window.addEventListener('keydown', (event) => {
    if (event.key === '#') {
        if (world) {
            world.showFrames = !world.showFrames;
        }
    }
});

