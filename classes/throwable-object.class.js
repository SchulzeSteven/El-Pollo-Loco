class ThrowableObject extends MoveableObject {
    IMAGES_THROWING = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y, direction) {
        super().loadImage('./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 75;
        this.width = 75;
        this.direction = direction;
        this.throw();
        this.setRedFrameOffset(10, 10, 10, 10);
    }


    /**
    * Initiates the throw action, setting up the animation and movement.
    *
    * @function throw
    * @memberof ThrowableObject
    * @description Calls functions to initialize throw parameters, start animation, and begin movement.
    */
    throw() {
        this.initializeThrow();
        this.startAnimation();
        this.startMovement();
    }
    

    /**
    * Sets initial speed for the throw and applies gravity.
    *
    * @function initializeThrow
    * @memberof ThrowableObject
    */
    initializeThrow() {
        this.speedY = 25;
        this.applyGravity();
    }
    

    /**
    * Starts the throw animation, playing images as long as the object is not on the ground.
    *
    * @function startAnimation
    * @memberof ThrowableObject
    * @description Loops through throwing images while the object is in the air.
    */
    startAnimation() {
        this.animationInterval = setInterval(() => {
            if (!this.isOnGround) {
                this.playAnimation(this.IMAGES_THROWING);
            }
        }, 100);
    }
    

    /**
    * Begins the movement of the object, updating its position and checking for ground impact.
    *
    * @function startMovement
    * @memberof ThrowableObject
    * @description Moves the object horizontally and checks if it hits the ground or collides with chickens.
    */
    startMovement() {
        this.moveInterval = setInterval(() => {
            if (this.y >= 350 && !this.isOnGround) {
                this.onGround();
            } else {
                this.updatePosition();
            }
        }, 25);
    }
    
    
    /**
    * Updates the position of the throwable object and checks for collisions with chickens.
    *
    * @function updatePosition
    * @memberof ThrowableObject
    * @description Moves the object in its direction and checks for collisions with enemies.
    */
    updatePosition() {
        this.x += this.direction === 'right' ? 12 : -12;
        this.checkCollisionWithChickens();
    }
    
    

    /**
    * Checks for collisions with chicken enemies, causing damage and removing the object if a collision occurs.
    *
    * @function checkCollisionWithChickens
     @memberof ThrowableObject
    */
    checkCollisionWithChickens() {
        for (let enemy of this.world.level.enemies) {
            if (enemy instanceof Chicken_Normal && enemy.isColliding(this)) {
                enemy.takeHit();
                this.remove();
                clearInterval(this.moveInterval);
                break;
            }
        }
    }


    /**
    * Handles the object's behavior when it hits the ground, stopping animation and playing splash effect.
    *
    * @function onGround
    * @memberof ThrowableObject
    * @description Stops animation, plays splash animation, and removes the object after a delay.
    */
    onGround() {
        this.isOnGround = true;
        clearInterval(this.animationInterval);
        this.playAnimation(this.IMAGES_SPLASH);

        setTimeout(() => {
            this.remove();
        }, 600);
    }


    /**
    * Removes the throwable object from the game world.
    *
    * @function remove
    * @memberof ThrowableObject
    */
    remove() {
        const index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }


    /**
    * Draws the throwable object on the canvas, including optional debug frames.
    *
 * @function draw
 * @memberof ThrowableObject
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
 */
    draw(ctx) {
        super.draw(ctx);
        if (this.world.showFrames) {
            this.drawFrame(ctx);
        }
    }
}