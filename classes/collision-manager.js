class CollisionManager {
    constructor(world) {
        this.world = world;
    }


    /**
    * Starts checking for collisions at regular intervals.
    * Sets an interval to continuously check for various collisions every 250ms. Stops checking if the character is dead.
    */
    startCollisionCheck() {
        const collisionInterval = setInterval(() => {
            if (this.world.character.isDead()) {
                clearInterval(collisionInterval);
                return;
            }
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkEndbossCollision();
        }, 250);
        this.world.intervals.push(collisionInterval);
    }


    /**
    * Checks for collisions between the character and enemies.
    * If a collision is detected, the character takes damage, and the status bar is updated.
    */
    checkEnemyCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (!this.world.character.isHurt() && this.world.character.isColliding(enemy)) {
                this.world.character.hit(enemy);
                this.world.statusBar.setPercentage(this.world.character.life);
            }
        });
    }


    /**
    * Checks for collisions between the character and coins, collecting them upon collision.
    * Removes collected coins from the game and updates the coin count on the status bar.
    */
    checkCoinCollisions() {
        let collectedCoins = [];
        this.world.level.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                collectedCoins.push(index);
                this.world.statusBar.setCoinCount(this.world.statusBar.coinCount + 1);
            }
        });
        collectedCoins.reverse().forEach(index => {
            this.world.level.coins.splice(index, 1);
        });
    }


    /**
    * Checks for collisions between the character and bottles, collecting them upon collision.
    * Removes collected bottles from the game and updates the bottle count on the status bar.
    */
    checkBottleCollisions() {
        let collectedBottles = [];
        this.world.level.bottles.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                collectedBottles.push(index);
                this.world.statusBar.setBottleCount(this.world.statusBar.bottleCount + 1);
            }
        });
        collectedBottles.reverse().forEach(index => {
            this.world.level.bottles.splice(index, 1);
        });
    }


    /**
    * Checks if the character should throw a bottle and handles enemy collisions with thrown objects.
    * Attempts to throw a bottle if conditions are met, and checks for collisions with enemies.
    */
    checkThrowObjects() {
        this.attemptThrowBottle();
        this.checkCollisionsWithEnemies();
    }


    /**
    * Attempts to throw a bottle in the direction the character is facing.
    * Creates and throws a bottle if the character has bottles and throw cooldown is inactive.
    */
    attemptThrowBottle() {
        if (this.world.keyboard.D && this.world.statusBar.bottleCount > 0 && !this.world.throwCooldown) {
            this.world.character.resetIdleTimers();
            
            const direction = this.world.character.otherDirection ? 'left' : 'right';
            const offsetX = direction === 'right' ? 60 : -30;
            const bottle = new ThrowableObject(this.world.character.x + offsetX, this.world.character.y + 100, direction);
            bottle.world = this.world;
            
            this.world.throwableObjects.push(bottle);
            this.world.statusBar.setBottleCount(this.world.statusBar.bottleCount - 1);
            this.world.audioManager.play('throwing');
            this.activateThrowCooldown();
        }
    }


    /**
    * Checks for collisions between thrown bottles and enemies.
    * Checks if any thrown bottles are colliding with enemies, especially the endboss.
    */
    checkCollisionsWithEnemies() {
        this.world.throwableObjects.forEach(bottle => {
            this.world.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.checkCollisionWithBottle(bottle);
                }
            });
        });
    }


    /**
    * Activates a cooldown period for throwing bottles.
    * Prevents additional bottle throws for a short period.
    */
    activateThrowCooldown() {
        this.world.throwCooldown = true;
        setTimeout(() => {
            this.world.throwCooldown = false;
        }, 250);
    }


    /**
    * Checks for a collision between the character and the endboss.
    * If an endboss exists, checks if the character is colliding with it.
    */
    checkEndbossCollision() {
        const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.checkCollisionWithCharacter(this.world.character);
        }
    }
}
