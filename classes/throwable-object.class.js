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
    * Calls functions to initialize throw parameters, start animation, and begin movement.
    */
    throw() {
        this.initializeThrow();
        this.startAnimation();
        this.startMovement();
    }
    

    /**
    * Sets initial speed for the throw and applies gravity.
    */
    initializeThrow() {
        this.speedY = 25;
        this.applyGravity();
    }
    

    /**
    * Starts the throw animation, playing images as long as the object is not on the ground.
    * Loops through throwing images while the object is in the air.
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
    * Moves the object horizontally and checks if it hits the ground or collides with chickens.
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
    * Moves the object in its direction and checks for collisions with enemies.
    */
    updatePosition() {
        this.x += this.direction === 'right' ? 12 : -12;
        this.checkCollisionWithChickens();
    }
    
    

    /**
    * Checks for collisions with enemies in the game, specifically chickens and the endboss.
    * Triggers different actions based on the type of enemy collided with.
    */
    checkCollisionWithChickens() {
        for (let enemy of this.world.level.enemies) {
            if (enemy instanceof Chicken_Normal && enemy.isColliding(this)) {
                this.handleChickenCollision(enemy);
                break;
            } else if (enemy instanceof Endboss && enemy.isColliding(this)) {
                this.handleEndbossCollision(enemy);
                break;
            }
        }
    }


    /**
    * Handles the collision with a chicken by damaging the chicken, removing the character,
    * and stopping its movement.
    */
    handleChickenCollision(chicken) {
        chicken.takeHit();
        this.remove();
        clearInterval(this.moveInterval);
    }
    

    /**
    * Handles the collision with the endboss, applying damage and removing the character
    * based on the endboss's remaining life.
    */
    handleEndbossCollision(endboss) {
        if (!this.world.endbossDefeated && endboss.life > 20) {
            endboss.takeHit();
            this.playAnimation(this.IMAGES_SPLASH);
            setTimeout(() => {
                if (this.world && this.world.throwableObjects.includes(this)) {
                    this.remove();
                }
            }, 50);
        } else if (endboss.life <= 20) {
            endboss.takeHit();
            this.remove();
        }
        clearInterval(this.moveInterval);
    }
    

    /**
    * Handles the object's behavior when it hits the ground, stopping animation and playing splash effect.
    * Stops animation, plays splash animation, and removes the object after a delay.
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
    */
    remove() {
        const index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }


    /**
    * Draws the throwable object on the canvas, including optional debug frames.
    */
    draw(ctx) {
        super.draw(ctx);
        if (this.world.showFrames) {
            this.drawFrame(ctx);
        }
    }
}