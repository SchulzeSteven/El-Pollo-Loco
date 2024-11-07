class Chicken_Small extends MoveableObject {

    height = 45;
    width = 45;
    hitsToKill = 1;
    intervals = [];
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.y = 375;
        this.x = 600 + Math.random() * 2100;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
        this.setRedFrameOffset(1, 1, 1, 1);
    }


    /**
    * Starts animation and movement checking for the chicken at set intervals.
    *
    * @function animate
    * @memberof Chicken
    * @description Initializes two intervals: one for checking movement and another for playing walking animation.
    */
    animate() {
        this.intervals.push(setInterval(() => this.checkMovement(), 1000 / 60));
        this.intervals.push(setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200));
    }


    /**
    * Clears all active intervals for the chicken.
    *
    * @function clearIntervals
    * @memberof Chicken
    * @description Stops and removes all intervals stored in the `this.intervals` array.
    */
    clearIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }


    /**
    * Handles a hit on the chicken, reducing its health and playing a sound.
    *
    * @function takeHit
    * @memberof Chicken
    * @description Decreases the `hitsToKill` counter, plays a hit sound, and removes the chicken if `hitsToKill` reaches 0.
    */
    takeHit() {
        this.hitsToKill--;
        this.world.audioManager.play('chickenSmallHit');
    
        if (this.hitsToKill <= 0) {
            this.removeChicken();
        }
    }


    /**
    * Removes the chicken from the game world and stops all intervals.
    *
    * @function removeChicken
    * @memberof Chicken
    * @description Clears all active intervals and removes the chicken from the enemy list.
    */
    removeChicken() {
        this.clearIntervals();
        this.world.level.enemies = this.world.level.enemies.filter(e => e !== this);
    }


    /**
    * Checks for player movement and starts the movement if detected.
    *
    * @function checkMovement
    * @memberof Character
    * @description Starts movement when left or right key is pressed.
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