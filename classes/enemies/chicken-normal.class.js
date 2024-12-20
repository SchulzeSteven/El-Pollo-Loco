class Chicken_Normal extends MoveableObject {

    height = 75;
    width = 75;
    hitsToKill = 2;
    intervals = [];
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.y = 350;
        this.x = 700 + Math.random() * 2100;
        this.speed = 0.15 + Math.random() * 0.45;
        this.animate();
        this.setRedFrameOffset(2, 2, 2, 2);
    }


    /**
    * Starts animation and movement checking for the chicken at set intervals.
    * Initializes two intervals: one for checking movement and another for playing walking animation.
     */
    animate() {
        this.intervals.push(setInterval(() => this.checkMovement(), 1000 / 60));
        this.intervals.push(setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200));
    }


    /**
    * Clears all active intervals for the chicken.
    * Stops and removes all intervals stored in the `this.intervals` array.
    */
    clearIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }


    /**
    * Handles a hit on the chicken, reducing health and playing a sound.
    * Decreases the `hitsToKill` counter, plays a hit sound, and removes the chicken if `hitsToKill` reaches 0.
    */
    takeHit() {
        if (this.hitsToKill > 0) {
            this.hitsToKill--;
    
            const sound = this.world.audioManager.sounds['chickenBigHit'];
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
                sound.play();
            }
            if (this.hitsToKill <= 0) {
                this.removeChicken();
            }
        }
    }


    /**
    * Checks collision between the chicken and a bottle.
    * If a collision is detected, the character takes a hit and the bottle is removed.
    */
    checkCollisionWithBottle(bottle) {
        if (this.isColliding(bottle)) {
            this.takeHit();
            bottle.remove();
        }
    }


    /**
    * Removes the chicken from the game world and stops all intervals.
    * Clears all active intervals and removes the chicken from the enemy list.
    */
    removeChicken() {
        this.clearIntervals();
        this.world.level.enemies = this.world.level.enemies.filter(e => e !== this);
    }


    /**
    * Checks for player movement and starts the movement if detected.
    * Starts movement when left or right key is pressed.
    */
    checkMovement() {
        if (!this.movementStarted && (keyboard.LEFT || keyboard.RIGHT)) {
            this.movementStarted = true;
            if (keyboard.LEFT) {
                this.moveLeft();
            } else if (keyboard.RIGHT) {
                this.moveLeft();
            }
        }
    }
}