class MoveableObject extends DrawableObjekt {

    speed = 0.15;
    otherDirection = false
    speedY = 0;
    acceleration = 3;
    life = 100;
    lastHit = 0;
    intervals = [];


    /**
    * Applies gravity to the object, adjusting its y-position and speed.
    *
    * @function applyGravity
    * @memberof GameObject
    * @description Continuously applies downward acceleration if the object is above ground or has upward speed.
    */
    applyGravity() {
        const gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.checkIfLanded();
            }
        }, 1000 / 25);
        this.intervals.push(gravityInterval);
    }


    /**
    * Checks if the object is above ground level.
    *
    * @function isAboveGround
    * @memberof GameObject
    * @returns {boolean} True if the object is above ground or is a throwable object.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 150;
        }
    }


    /**
    * Ensures the object is set to ground level when it lands.
    *
    * @function checkIfLanded
    * @memberof GameObject
    */
    checkIfLanded() {
        if (!(this instanceof ThrowableObject) && this.y >= 150) {
            this.y = 150;
            this.speedY = 0;
        }
    }


    /**
    * Checks if this object is colliding with another.
    *
    * @function isColliding
    * @memberof GameObject
    * @param {GameObject} moveableObject - The other object to check for collision.
    * @returns {boolean} True if objects are colliding.
    */
    isColliding(moveableObject) {
        const redFrame1 = this.getRedFrame();
        const redFrame2 = moveableObject.getRedFrame();
    
        return redFrame1.x < redFrame2.x + redFrame2.width &&
                redFrame1.x + redFrame1.width > redFrame2.x &&
                redFrame1.y < redFrame2.y + redFrame2.height &&
                redFrame1.y + redFrame1.height > redFrame2.y;
    }


    /**
    * Checks if this object is colliding with the top of another object.
    *
    * @function isCollidingTop
    * @memberof GameObject
    * @param {GameObject} moveableObject - The other object to check for top collision.
    * @returns {boolean} True if colliding with the top of the other object.
    */
    isCollidingTop(moveableObject) {
        const redFrame1 = this.getRedFrame();
        const redFrame2 = moveableObject.getRedFrame();
        return redFrame1.y + redFrame1.height >= redFrame2.y &&
                redFrame1.y + redFrame1.height <= redFrame2.y + redFrame2.height / 2 &&
                redFrame1.x < redFrame2.x + redFrame2.width &&
                redFrame1.x + redFrame1.width > redFrame2.x;
    }

    
    /**
    * Returns the adjusted dimensions of the object for collision detection.
    *
    * @function getRedFrame
    * @memberof GameObject
    * @returns {Object} The x, y, width, and height of the object's collision frame.
    */
    getRedFrame() {
        const { top, right, bottom, left } = this.redFrameOffset;
        return {
            x: this.x + left,
            y: this.y + top,
            width: this.width - left - right,
            height: this.height - top - bottom
        };
    }


    /**
    * Checks if the object is currently in a hurt state.
    *
    * @function isHurt
    * @memberof GameObject
    * @returns {boolean} True if the object is hurt within the last 0.8 seconds.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }


    /**
    * Checks if the object's life is zero, indicating it is dead.
    *
    * @function isDead
    * @memberof GameObject
    * @returns {boolean} True if life is zero.
    */
    isDead() {
        return this.life == 0;
    }


    /**
    * Plays an animation by cycling through a series of images.
    *
    * @function playAnimation
    * @memberof GameObject
    * @param {string[]} images - Array of image paths to cycle through.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    * Calculates damage based on the type of enemy.
    *
    * @function calculateDamage
    * @memberof GameObject
    * @param {GameObject} enemy - The enemy object to calculate damage for.
    * @returns {number} Damage amount.
    */
    calculateDamage(enemy) {
        if (enemy instanceof Chicken_Small) {
            return 10;
        } else if (enemy instanceof Chicken_Normal) {
            return 15;
        }
        return 25;
    }


    /**
    * Applies damage to the object, reducing its life.
    *
    * @function applyDamage
    * @memberof GameObject
    * @param {number} damage - The amount of damage to apply.
    */
    applyDamage(damage) {
        this.life -= damage;
        if (this.life < 0) {
            this.life = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
    * Moves the object to the right.
    *
    * @function moveRight
    * @memberof GameObject
    */
    moveRight() {
        this.x += this.speed;
    }


    /**
    * Moves the object to the left.
    *  
    * @function moveLeft
    * @memberof GameObject
    * @description Moves the object left continuously if it is a chicken or cloud, or in one step otherwise.
    */
    moveLeft() {
        if (this instanceof Chicken_Normal || this instanceof Chicken_Small || this instanceof Cloud) {
            const moveInterval = setInterval(() => {
                this.x -= this.speed;
            }, 1000 / 60);
            this.intervals.push(moveInterval);
        } else {
            this.x -= this.speed;
        }
    }


    /**
    * Clears all active intervals for the object.
    *
    * @function clearIntervals
    * @memberof GameObject
    */
    clearIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }


    /**
    * Makes the object jump by setting an upward speed.
    *
    * @function jump
    * @memberof GameObject
    */
    jump() {
        this.speedY = 27;
    }


    /**
    * Causes the object to bounce off a surface by setting an upward speed.
    *
    * @function bounceOff
    * @memberof GameObject
    */
    bounceOff() {
        this.speedY = 25;
    }
}