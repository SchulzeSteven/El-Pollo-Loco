class Chicken_Small extends MoveableObject {

    height = 45;
    width = 45;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.y = 375;
        this.x = 600 + Math.random() * 2100;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

}