class Chicken_Normal extends MoveableObject {

    height = 75;
    width = 75;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.y = 350;
        this.x = 700 + Math.random() * 2100;
        this.speed = 0.15 + Math.random() * 0.45;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.checkMovement();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
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