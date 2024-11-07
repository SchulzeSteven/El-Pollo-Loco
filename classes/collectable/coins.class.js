class Coin extends MoveableObject {

    height = 75;
    width = 75;
    IMAGES_MOVING = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ];


    constructor(x, y) {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_MOVING);
        this.x = x;
        this.y = y;
        this.animate();
        this.setRedFrameOffset(20, 20, 20, 20);
    }


    /**
    * Animates the object by repeatedly playing an animation of moving images.
    * Sets an interval to play the animation using images from `this.IMAGES_MOVING`.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MOVING);
        }, 200);
    }


    /**
    * Creates a parabolic arc of coin objects.
    * Generates coins along a parabolic arc defined by the starting position, arc height, and width.
    */ 
    static createCoinArc(startX, startY, arcHeight, arcWidth) {
        let coins = [];
        let numCoins = Coin.getRandomInt(3, 6);
        let adjustedArcWidth = arcWidth + (numCoins - 3) * 50;
    
        for (let i = 0; i < numCoins; i++) {
            let x = startX + (i * (adjustedArcWidth / (numCoins - 1)));
            let y = startY - Math.sin((i / (numCoins - 1)) * Math.PI) * arcHeight;
            let coin = new Coin(x, y);
            coins.push(coin);
        }

        return coins;
    }


    /**
    * Creates a vertical line of coin objects.
    */
    static createCoinLine(startX, startY, numCoins) {
        let coins = [];
        for (let i = 0; i < numCoins; i++) {
            let y = startY - i * 40;
            let coin = new Coin(startX, y);
            coins.push(coin);
        }
        return coins;
    }

   
    /**
    * Generates a random integer between a specified minimum and maximum.
    */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}