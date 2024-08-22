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
        this.direction = direction; // Speichert die Richtung des Wurfs
        this.throw();
        this.setRedFrameOffset(10, 10, 10, 10);  // Passe die Offsets für den roten Rahmen an
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.animationInterval = setInterval(() => {
            if (!this.isOnGround) {
                this.playAnimation(this.IMAGES_THROWING);
            }
        }, 100);
    
        this.moveInterval = setInterval(() => {
            if (this.y >= 350 && !this.isOnGround) {
                this.onGround();
            } else {
                this.x += this.direction === 'right' ? 12 : -12;
                this.checkCollisionWithChickens();  // Hier die Kollision mit den Hühnern prüfen
            }
        }, 25);
    }
    
    checkCollisionWithChickens() {
        for (let enemy of this.world.level.enemies) {
            if (enemy instanceof Chicken_Normal && enemy.isColliding(this)) {
                enemy.takeHit();
                this.remove();  // Flasche sofort entfernen nach dem Treffer
                clearInterval(this.moveInterval);  // Bewegung stoppen, um weitere Kollisionen zu verhindern
                break;  // Schleife beenden nach dem Treffer
            }
        }
    }

    onGround() {
        this.isOnGround = true;
        clearInterval(this.animationInterval); // Stoppe die Wurfanimation
        this.playAnimation(this.IMAGES_SPLASH); // Spiele die Splash-Animation ab

        setTimeout(() => {
            this.remove(); // Entferne die Flasche nach der Splash-Animation
        }, 600); // Länge der Splash-Animation (6 Bilder x 100ms)
    }

    remove() {
        const index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1); // Entferne die Flasche aus dem Array
        }
    }

    draw(ctx) {
        super.draw(ctx);
        if (this.world.showFrames) {
            this.drawFrame(ctx);  // Zeichne den Rahmen, wenn die showFrames-Option aktiviert ist
        }
    }
}