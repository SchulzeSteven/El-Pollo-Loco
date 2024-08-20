class Endboss extends MoveableObject {

    height = 390;
    width = 300;
    speed = 1.2;  // Geschwindigkeit des Endbosses
    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    isAlerted = false;
    isAttacking = false;
    isWalking = false;

    constructor() {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 3050;
        this.y = 55;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (!this.isAlerted) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    startMovingLeft() {
        this.isAlerted = true;
        setTimeout(() => {
            this.isWalking = true;
            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        }, 1000);  // bevor der Endboss anfängt zu laufen
    }

    checkCollisionWithCharacter(character) {
        if (this.isColliding(character)) {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, this.IMAGES_ATTACK.length * 100);  // Attacke dauert so lange wie die Animation, schnellerer Takt (100ms)
        }
    }
}