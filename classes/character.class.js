class Character extends MoveableObject {

    height = 280;
    width = 120;
    speed = 5;
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    walking_sound = new Audio('./audio/steps.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');
    snoring_sound = new Audio('./audio/snore.mp3');
    hurting_sound = new Audio('./audio/hurt.mp3');
    idleTimeout;
    longIdleTimeout;
    idleInterval;
    longIdleInterval;
    isIdle = false;
    isLongIdle = false;
    animationStarted = false; // Flag to ensure IMAGES_DEAD is played only once


    constructor() {
        super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
        this.setIdleTimers();
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.walking_sound.pause();
                this.jumping_sound.pause();
                this.snoring_sound.pause();
                return; // Stop further animation if dead
            }

            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.resetIdleTimers();
                this.otherDirection = false;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                    this.snoring_sound.pause();
                }
            }

            if (this.world.keyboard.LEFT && this.x > -400) {
                this.moveLeft();
                this.resetIdleTimers();
                this.otherDirection = true;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                    this.snoring_sound.pause();
                }
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.resetIdleTimers();
                this.jumping_sound.play();
                this.snoring_sound.pause();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        /* JUMP and WALK Timers */
        setInterval(() => {
            if (this.isDead()) {
                if (!this.animationStarted) {
                    this.playDeadAnimationOnce(); // Play IMAGES_DEAD once
                } 
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);

        /* IDLES Timers */
        setInterval(() => {
            if (this.isDead()) {
                this.snoring_sound.pause();
                return; // Stop idle animations if dead
            }

            if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                if (this.isLongIdle) {
                    this.playAnimation(this.IMAGES_IDLE_LONG);
                    this.snoring_sound.play();
                } else if (this.isIdle) {
                    this.playAnimation(this.IMAGES_IDLE);
                } else {
                    this.loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
                }
            }
        }, 200);
    }

    playDeadAnimationOnce() {
        this.animationStarted = true;
        let currentImageIndex = 0;
        const interval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(interval);
            }
        }, 150);
    }

    
    setIdleTimers() {
        this.idleTimeout = setTimeout(() => {
            this.isIdle = true;
            this.longIdleTimeout = setTimeout(() => {
                this.isLongIdle = true;
            }, 3000);
        }, 3000);
    }


    resetIdleTimers() {
        clearTimeout(this.idleTimeout);
        clearTimeout(this.longIdleTimeout);
        this.isIdle = false;
        this.isLongIdle = false;
        this.setIdleTimers();
    }


    hit(enemy) {
        const damage = this.calculateDamage(enemy);
        this.applyDamage(damage);
        this.hurting_sound.play();
        console.log(`Character hit by ${enemy.constructor.name}, received ${damage} damage. Remaining life: ${this.life}`);
    }
}