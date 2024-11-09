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
    */
    applyGravity() {
        const gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY * 0.5; // kleinere Schritte für die y-Anpassung
                this.speedY -= this.acceleration * 0.5;
                this.checkIfLanded();
            }
        }, 1000 / 50); // Intervall auf 20 ms reduzieren
        this.intervals.push(gravityInterval);
    }


    /**
    * Checks if the object is above ground level.
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
    */
    checkIfLanded() {
        if (!(this instanceof ThrowableObject) && this.y >= 150) {
            this.y = 150;
            this.speedY = 0;
            this.lastBounceTime = new Date().getTime();
        }
    }


    /**
    * Checks if this object is colliding with another.
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
    * Checks if the character is colliding with the top of another movable object.
    * For smaller chickens, a larger height threshold is used to detect top collisions.
    */
    isCollidingTop(moveableObject) {
        const redFrame1 = this.getRedFrame();
        const redFrame2 = moveableObject.getRedFrame();
        const isSmallChicken = moveableObject instanceof Chicken_Small;
        
        return (
            redFrame1.y + redFrame1.height >= redFrame2.y &&
            redFrame1.y + redFrame1.height <= redFrame2.y + (isSmallChicken ? redFrame2.height : redFrame2.height / 2) &&
            redFrame1.x < redFrame2.x + redFrame2.width &&
            redFrame1.x + redFrame1.width > redFrame2.x
        );
    }
    
    
    /**
    * Returns the adjusted dimensions of the object for collision detection.
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
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }


    /**
    * Checks if the object's life is zero, indicating it is dead.
    */
    isDead() {
        return this.life == 0;
    }


    /**
    * Plays an animation by cycling through a series of images.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    * Calculates damage based on the type of enemy.
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
    */
    moveRight() {
        this.x += this.speed;
    }


    /**
    * Moves the object to the left.
    * Moves the object left continuously if it is a chicken or cloud, or in one step otherwise.
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
    */
    clearIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }


    /**
    * Makes the object jump by setting an upward speed.
    */
    jump() {
        this.speedY = 27;
    }


    /**
    * Causes the object to bounce off a surface by setting an upward speed.
    */
    bounceOff() {
        this.speedY = 25;
    }
}