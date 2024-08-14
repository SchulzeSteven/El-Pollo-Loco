class Endboss extends MoveableObject {

    height = 390;
    width = 300;
    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 3050;
        this.y = 55;
        this.animate();
    }


    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200)
    }
}