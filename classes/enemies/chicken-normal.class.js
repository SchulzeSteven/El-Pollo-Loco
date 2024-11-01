class Chicken_Normal extends MoveableObject {

    height = 75;
    width = 75;
    hitsToKill = 2;
    intervals = [];
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();

        this.y = 350;
        this.x = 700 + Math.random() * 2100;
        this.speed = 0.15 + Math.random() * 0.45;
        this.animate();
        this.setRedFrameOffset(2, 2, 2, 2);
    }


    animate() {
        // Speichere die IDs der Intervalle in der Liste
        this.intervals.push(setInterval(() => this.checkMovement(), 1000 / 60));
        this.intervals.push(setInterval(() => this.playAnimation(this.IMAGES_WALKING), 200));
    }

    clearIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];  // Array zurücksetzen
    }

    takeHit() {
        if (this.hitsToKill > 0) {
            this.hitsToKill--;  // Trefferanzahl um 1 reduzieren
            console.log(`Chicken_Normal getroffen, verbleibende Treffer: ${this.hitsToKill}`);
            if (this.hitsToKill <= 0) {
                this.removeChicken(); // Entfernt das Huhn nach den benötigten Treffern
            }
        }
    }

    checkCollisionWithBottle(bottle) {
        if (this.isColliding(bottle)) {
            this.takeHit();
            bottle.remove();  // Flasche entfernen, wenn sie das Huhn trifft
        }
    }

    removeChicken() {
        console.log('Chicken_Normal entfernt');
        this.clearIntervals();
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