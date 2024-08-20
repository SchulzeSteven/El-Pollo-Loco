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
        this.loadImage('./assets/img/7_statusbars/3_icons/icon_health.png');

        this.coinImg = new Image();
        this.coinImg.src = 'assets/img/7_statusbars/3_icons/icon_coin.png';

        this.bottleImg = new Image();
        this.bottleImg.src = 'assets/img/7_statusbars/3_icons/icon_salsa_bottle.png';

        this.x = 5;
        this.y = 5;
        this.width = 50; 
        this.height = 50; 
        this.lifePercentage = 100;
        this.coinCount = 0;
        this.bottleCount = 0;
        this.shouldDrawEndboss = false;
        this.endbossWidth = 180;
        this.endbossHeight = 60;
    }


    setPercentage(lifePercentage) {
        this.lifePercentage = lifePercentage;
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


    draw(ctx) {
        this.drawLife(ctx);
        this.drawCoins(ctx);
        this.drawBottles(ctx);
        if (this.shouldDrawEndboss) {
            this.drawEndboss(ctx);
        }
    }

    drawEndboss(ctx) {
        const endbossImg = this.imageCache[this.IMAGES_ENDBOSS[5]];  // Wähle das letzte Bild aus der Liste
        const canvasWidth = ctx.canvas.width;
        ctx.drawImage(endbossImg, canvasWidth - this.endbossWidth - 120, this.y, this.endbossWidth, this.endbossHeight);
    }

    enableEndbossDisplay() {
        this.shouldDrawEndboss = true;
        this.loadImages(this.IMAGES_ENDBOSS);  // Lade die Bilder, wenn sie noch nicht geladen sind
    }

    drawLife(ctx) {
        super.draw(ctx);
        this.drawText(ctx, this.lifePercentage, this.x + this.width, this.y + this.height / 2 + 17);
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