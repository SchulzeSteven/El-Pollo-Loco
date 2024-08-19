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
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_MOVING);
        }, 200);
    }

    static createCoinArc(startX, startY, arcHeight, arcWidth) {
        let coins = [];
        let numCoins = Coin.getRandomInt(3, 6); // Zufällige Anzahl der Münzen zwischen 3 und 6
    
        // Anpassung der Bogenbreite basierend auf der Anzahl der Münzen
        let adjustedArcWidth = arcWidth + (numCoins - 3) * 50; // Mehr Münzen -> breiterer Bogen
    
        for (let i = 0; i < numCoins; i++) {
            let x = startX + (i * (adjustedArcWidth / (numCoins - 1)));
            let y = startY - Math.sin((i / (numCoins - 1)) * Math.PI) * arcHeight;
            let coin = new Coin(x, y);
            coins.push(coin);
        }

        return coins;
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}