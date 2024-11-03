class Chicken_Small extends MoveableObject {

    height = 45;
    width = 45;
    hitsToKill = 1;
    intervals = [];
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();

        this.y = 375;
        this.x = 600 + Math.random() * 2100;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
        this.setRedFrameOffset(1, 1, 1, 1);
    }


    animate() {
        this.intervals.push(setInterval(() => this.checkMovement(), 1000 / 60));
        this.intervals.push(setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200));
    }

    clearIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }

    takeHit() {
        this.hitsToKill--;
        this.world.audioManager.play('chickenSmallHit'); // Spielt den kleinen Hühner-Treffer-Sound ab
    
        if (this.hitsToKill <= 0) {
            this.removeChicken();
        }
    }

    removeChicken() {
        this.clearIntervals();
        console.log('Chicken_Small entfernt');
        this.world.level.enemies = this.world.level.enemies.filter(e => e !== this);
    }

    checkMovement() {
        if (!this.movementStarted && (keyboard.LEFT || keyboard.RIGHT)) {
            this.movementStarted = true; // Bewegung als gestartet markieren
            if (keyboard.LEFT) {
                this.moveLeft();
            } else if (keyboard.RIGHT) {
                this.moveLeft();
            }
        }
    }

}