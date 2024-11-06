class Endboss extends MoveableObject {

    height = 390;
    width = 300;
    speed = 1.2;
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
    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    isAlerted = false;
    isAttacking = false;
    isHurt = false;
    isWalking = false;
    hasStartedMoving = false;

    
    constructor() {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3050;
        this.y = 55;
        this.hitsToKill = 5;
        this.life = 100;
        this.intervals = [];
        this.animate();
        this.setRedFrameOffset(50, 10, 10, 25);
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
        this.intervals.push(setTimeout(() => {
            this.isWalking = true;
            this.hasStartedMoving = true;
            this.intervals.push(setInterval(() => this.moveLeft(), 1000 / 60));
        }, 1000));
    }


    clearIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }


    checkCollisionWithCharacter(character) {
        if (this.isColliding(character)) {
            this.isAttacking = true;
            setTimeout(() => {
                this.isAttacking = false;
            }, this.IMAGES_ATTACK.length * 100);
        }
    }


    takeHit() {
        if (this.isHurt || !this.hasStartedMoving) 
            return;
        this.life -= 20;
    
        if (this.life <= 19 && this.life > 0) {
            this.isHurt = false;
            this.stopWalking();
            this.playDeadAnimation();
        } else if (this.life >= 20) {
            this.isHurt = true;
            this.stopWalking();
            this.playHurtAnimation();
    
            setTimeout(() => {
                this.isHurt = false;
                this.startWalking();
            }, this.IMAGES_HURT.length * 150);
        }
        this.world.statusBar.updateEndbossLife(this.life);
    
        if (this.life <= 0) {
            this.stopWalking();
            this.playDeadAnimation();
        }
    }
    

    playHurtAnimation() {
        let currentImageIndex = 0;
        const hurtInterval = setInterval(() => {
            if (this.isHurt && currentImageIndex < this.IMAGES_HURT.length) {
                this.loadImage(this.IMAGES_HURT[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(hurtInterval);
            }
        }, 150);
    }
    

    playDeadAnimation() {
        let currentImageIndex = 0;
        const interval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(interval);
                this.world.endbossDefeated = true;
                
                setTimeout(() => {
                    this.removeEndboss();
                }, 120);
            }
        }, 200);
    }


    stopWalking() {
        this.isWalking = false;
    }


    startWalking() {
        if (this.hasStartedMoving && !this.isHurt) {
            this.isWalking = true;
        }
    }


    removeEndboss() {
        this.clearIntervals();
        this.world.level.enemies = this.world.level.enemies.filter(e => e !== this);
        
        setTimeout(() => {
            this.world.stopGame();
            this.world.audioManager.playWinMusic();
        }, 400);
    }


    checkCollisionWithBottle(bottle) {
        if (this.isColliding(bottle)) {
            this.takeHit();
            bottle.remove();
        }
    }
}