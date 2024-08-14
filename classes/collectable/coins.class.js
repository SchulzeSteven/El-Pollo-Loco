class Coin extends MoveableObject {

    height = 75;
    width = 75;
    IMAGES_MOVING = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ];
    
    static lastX = 0;
    static minSpacing = 250;


    constructor() {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_MOVING);
        this.setRandomXPosition();
        this.animate();
    }


    setRandomXPosition() {
        let minX = Coin.lastX + Coin.minSpacing;
        let maxX = 0 + Math.random() * 1600;
        this.x = Math.max(minX, maxX);
        this.y = 60 + Math.random() * 250;
        Coin.lastX = this.x;
    }


    animate() {
        setInterval( () => {
        this.playAnimationCollectable(this.IMAGES_MOVING);
        }, 200);
    }

}