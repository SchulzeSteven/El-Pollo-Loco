class Character extends MoveableObject {
    height = 280;
    width = 120;
    speed = 5;
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    audioManager;
    idleTimeout;
    longIdleTimeout;
    idleInterval;
    longIdleInterval;
    isIdle = false;
    isLongIdle = false;
    animationStarted = false;
    deadAnimationCompleted = false;
    isSnoring = false;
    lastBounceTime = 0;
    bounceCooldown = 250;
    intervals = [];


    constructor(audioManager) {
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.audioManager = audioManager;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
        this.setIdleTimers();
        this.setRedFrameOffset(110, 25, 10, 12);
    }


    /**
     * Checks for collisions with chicken objects and triggers actions based on collision type.
    * If the character collides from above, it bounces off and damages the chicken.
    * Side collisions cause the character to take damage.
    */
    checkCollisionsWithChickens(chickens) {
        if (this.isDead() || this.world.endbossDefeated) {
            return;
        }
        let currentTime = new Date().getTime();
        if (currentTime - this.lastBounceTime < this.bounceCooldown) {
            return;
        }
        let chickenHit = false;
        for (let chicken of chickens) {
            if (this.isCollidingTop(chicken) && this.speedY < 0 && !chickenHit) {
                this.bounceOff();
                chicken.takeHit();
                chickenHit = true;
                this.lastBounceTime = currentTime;
                break;
            } 
            else if (this.isColliding(chicken) && !this.isHurt() && !chickenHit) {
                this.hit(chicken);
            }
        }
    }
    

    /**
    * Starts various intervals for animations, movements, and collision checks.
    * This function is critical for enabling continuous character behavior and interaction with the game world.
    */
    animate() {
        this.intervals.push(this.createMovementInterval());
        this.intervals.push(this.createCollisionCheckInterval());
        this.intervals.push(this.createJumpAndWalkAnimationInterval());
        this.intervals.push(this.createIdleAnimationInterval());
    }
    

    /**
    * Creates an interval for handling the character's movement, managing both walking and jumping
    * based on current keyboard input. This function also updates the camera position relative to
    * the character.
    */
    createMovementInterval() {
        return setInterval(() => {
            if (this.shouldStopAnimation()) return;
            this.handleWalking();
            this.handleJumping();
            this.updateCamera();
        }, 1000 / 60);
    }
    

    /**
    * Creates an interval to check for collisions specifically with chicken objects.
    */
    createCollisionCheckInterval() {
        return setInterval(() => {
            const chickens = this.world.level.enemies.filter(enemy => enemy instanceof Chicken_Normal || enemy instanceof Chicken_Small);
            this.checkCollisionsWithChickens(chickens);
        }, 25);
    }
    

    /**
    * Sets up an interval for managing character animations, specifically for jumping, walking,
    * and handling the character's death. This allows the character’s actions to be visualized smoothly.
    */
    createJumpAndWalkAnimationInterval() {
        return setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimationOnce();
            } else if (this.isHurt()) {
                this.playHurtAnimation();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);
    }
    

    /**
    * Creates an interval for managing idle animations. Plays idle animations when the character is
    * not moving or performing other actions, giving a realistic idle behavior.
    */
    createIdleAnimationInterval() {
        return setInterval(() => {
            if (this.isDead()) {
                this.audioManager.pause('snoring');
                return;
            }
            if (this.shouldPlayIdleAnimation()) {
                this.playIdleAnimation();
            } else {
                this.audioManager.pause('snoring');
            }
        }, 200);
    }
    
    
    /**
    * Determines if character animations should stop based on the game or character state,
    * such as when the character is dead or the game has been paused/stopped.
    */
    shouldStopAnimation() {
        if (this.isDead() || this.world.gameStopped) {
            this.audioManager.pause('walking');
            this.audioManager.pause('jumping');
            this.audioManager.pause('snoring');
            this.audioManager.pause('hurting');
            return true;
        }
        return false;
    }
    

    /**
    * Handles the walking logic for the character based on keyboard inputs, managing direction and 
    * playing walking sounds. Adjusts the direction the character is facing based on movement.
    */
    handleWalking() {
        this.audioManager.pause('walking');
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.resetIdleTimers();
            this.otherDirection = false;
            this.playWalkingSound();
        }
        if (this.world.keyboard.LEFT && this.x > -400) {
            this.moveLeft();
            this.resetIdleTimers();
            this.otherDirection = true;
            this.playWalkingSound();
        }
    }
    

    /**
    * Manages the jumping logic for the character, activating jump when the space key is pressed
    * and playing the appropriate sound. Resets idle timers to prevent idle animations during jumps.
    */
    handleJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.resetIdleTimers();
            this.audioManager.play('jumping');
            this.audioManager.pause('snoring');
        }
    }
    

    /**
    * Updates the camera position to keep the character centered in the viewport. Ensures smooth
    * gameplay experience by adjusting the camera view as the character moves.
    */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }
    

    /**
    * Plays the walking sound if the character is on the ground, providing audio feedback to the
    * player that the character is moving.
    */
    playWalkingSound() {
        if (!this.isAboveGround()) {
            this.audioManager.play('walking');
            this.audioManager.pause('snoring');
        }
    }
    

    /**
    * Plays the hurt animation and stops idle sounds when the character is damaged by an enemy.
    * Provides visual feedback to indicate the character is in a hurt state.
    */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.resetIdleTimers();
        this.audioManager.pause('snoring');
    }
    

    /**
    * Checks if the idle animation should play by assessing if the character is above ground,
    * actively moving, or if the game is stopped. Only plays idle animation if conditions are met.
    */
    shouldPlayIdleAnimation() {
        return !this.world.gameStopped && !this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
    }
    

    /**
    * Plays the idle animation based on the character's idle state (e.g., normal idle or long idle).
    * Different animations are shown depending on how long the character has been idle.
    */
    playIdleAnimation() {
        if (this.isLongIdle) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            this.audioManager.play('snoring');
        } else if (this.isIdle) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
            this.audioManager.pause('snoring');
        }
    }
    
    
    /**
    * Clears all active intervals related to the character, including movement, animation, and idle
    * intervals. Resets idle and animation states to ensure a clean character state.
    */
    clearIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        clearTimeout(this.idleTimeout);
        clearTimeout(this.longIdleTimeout);
        this.intervals = [];
        this.isIdle = false;
        this.isLongIdle = false;
        this.animationStarted = false;
        this.deadAnimationCompleted = false;
    }


    /**
    * Plays the character's death animation once by cycling through death images.
    * Marks the animation as completed once all frames are shown.
    */
    playDeadAnimationOnce() {
        if (this.animationStarted) return;
        this.animationStarted = true;
        let currentImageIndex = 0;
        const interval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(interval);
                this.deadAnimationCompleted = true;
            }
        }, 150);
    }


    /**
    * Checks if the character's death animation has finished, useful for determining if the character
    */
    isDeadAnimationCompleted() {
        return this.deadAnimationCompleted;
    }


    /**
    * Checks if the character is dead based on its life value. Returns true if life is zero or below,
    * indicating that the character should no longer respond to controls.
    */
    isDead() {
        return this.life <= 0;
    }


    /**
    * Sets timers to manage idle and long-idle states, providing a realistic idle behavior
    * when the character has not moved for a period of time. Long-idle animations start after
    * an additional delay if the character remains idle.
    */
    setIdleTimers() {
        this.idleTimeout = setTimeout(() => {
            this.isIdle = true;
            this.longIdleTimeout = setTimeout(() => {
                this.isLongIdle = true;
            }, 3000);
        }, 3000);
    }


    /**
    * Resets idle timers and state, ensuring the character starts a fresh idle countdown when
    * returning to a neutral state after movement or action.
    */
    resetIdleTimers() {
        clearTimeout(this.idleTimeout);
        clearTimeout(this.longIdleTimeout);
        this.isIdle = false;
        this.isLongIdle = false;
        this.setIdleTimers();
    }


    /**
    * Handles the character taking damage from an enemy, calculates and applies the damage,
    * plays the hurt sound, and updates the life status in the UI.
    */
    hit(enemy) {
        const damage = this.calculateDamage(enemy);
        this.applyDamage(damage);
        this.audioManager.play('hurting');
        this.lastHit = new Date().getTime();
        this.world.statusBar.setPercentage(this.life);
    }


    /**
    * Checks if the character is currently in a hurt state by comparing the time since the last hit.
    * If the character was hit recently, it remains in the hurt state.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < this.getHurtDuration();
    }


    /**
    * Calculates the duration the character remains in a hurt state, based on the length of
    * the hurt animation sequence. This duration determines when the character can take damage again.
    */
    getHurtDuration() {
        return this.IMAGES_HURT.length * 350;
    }
}