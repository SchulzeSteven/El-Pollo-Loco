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
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();

        // Animation für das Werfen abspielen
        this.animationInterval = setInterval(() => {
            if (!this.isOnGround) { // Animation nur abspielen, wenn nicht am Boden
                this.playAnimation(this.IMAGES_THROWING);
            }
        }, 100);

        // Bewegung der Flasche basierend auf der Blickrichtung des Charakters
        this.moveInterval = setInterval(() => {
            if (this.y >= 350 && !this.isOnGround) { // Überprüfen, ob die Flasche den Boden erreicht hat
                this.onGround();
            } else {
                this.x += this.direction === 'right' ? 10 : -10; // Bewegung nach rechts oder links
            }
        }, 25);
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
}