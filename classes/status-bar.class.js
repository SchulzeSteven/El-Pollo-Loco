class StatusBar extends DrawableObjekt {
    IMAGES_ENDBOSS = [
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    constructor() {
        super();
        this.heartImg = new Image();
        this.heartImg.src = './assets/img/7_statusbars/3_icons/icon_health.png'; // Herz-Symbol für den Charakter

        this.coinImg = new Image();
        this.coinImg.src = 'assets/img/7_statusbars/3_icons/icon_coin.png';

        this.bottleImg = new Image();
        this.bottleImg.src = 'assets/img/7_statusbars/3_icons/icon_salsa_bottle.png';

        this.x = 5;
        this.y = 5;
        this.width = 50; 
        this.height = 50; 
        this.lifePercentage = 100;  // Character life percentage
        this.coinCount = 0;
        this.bottleCount = 0;
        this.shouldDrawEndboss = false;
        this.endbossWidth = 180;
        this.endbossHeight = 60;
        this.endbossLife = 100;  // Endboss life percentage
    }

    setPercentage(lifePercentage) {
        this.lifePercentage = lifePercentage;  // This only affects character life
    }

    setCoinCount(coinCount) {
        this.coinCount = coinCount;
    }

    setBottleCount(bottleCount) {
        this.bottleCount = bottleCount;
    }

    setEndbossSize(width, height) {
        this.endbossWidth = width;
        this.endbossHeight = height;
    }

    updateEndbossLife(life) {
        this.endbossLife = life;
        this.updateEndbossImage();
    }

    updateEndbossImage() {
        const index = Math.floor(this.endbossLife / 20);
        const imageIndex = Math.min(5, index); // Select the correct image based on endboss life
        this.loadImage(this.IMAGES_ENDBOSS[imageIndex]);
    }

    draw(ctx) {
        this.drawCharacterLife(ctx);  // Draw the character life bar
        this.drawCoins(ctx);
        this.drawBottles(ctx);
        if (this.shouldDrawEndboss) {
            this.drawEndboss(ctx);  // Draw the endboss life bar separately
        }
    }

    drawCharacterLife(ctx) {
        const textX = this.x + this.width + 10;
        const coinTextX = this.x + this.width + 0;
        
        ctx.drawImage(this.heartImg, this.x, this.y, this.width, this.height);
        this.drawText(ctx, this.lifePercentage, coinTextX, this.y + this.height / 2 + 17);
    }

    drawEndboss(ctx) {
        const canvasWidth = ctx.canvas.width;
        ctx.drawImage(this.img, canvasWidth - this.endbossWidth - 120, this.y, this.endbossWidth, this.endbossHeight);  // Draw endboss life
    }

    enableEndbossDisplay() {
        this.shouldDrawEndboss = true;
        this.loadImages(this.IMAGES_ENDBOSS);
        this.loadImage(this.IMAGES_ENDBOSS[5]); // Set the default image to blue100.png
    }

    drawCoins(ctx) {
        ctx.drawImage(this.coinImg, this.x, this.y + this.height + 10, this.width, this.height);
        this.drawText(ctx, this.coinCount, this.x + this.width, this.y + this.height * 1.5 + 26);
    }

    drawBottles(ctx) {
        ctx.drawImage(this.bottleImg, this.x, this.y + this.height * 2 + 20, this.width, this.height);
        this.drawText(ctx, this.bottleCount, this.x + this.width, this.y + this.height * 2.5 + 35);
    }

    drawText(ctx, text, x, y) {
        ctx.font = '40px zabars';  
        ctx.fillStyle = 'black';
        this.setTextShadow(ctx, 'white', 2, 2);
        ctx.fillText(`${text}`, x, y);
        this.resetTextShadow(ctx);
    }

    setTextShadow(ctx, color, offsetX, offsetY, blur = 0) {
        ctx.shadowColor = color;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
        ctx.shadowBlur = blur;
    }
    
    resetTextShadow(ctx) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}