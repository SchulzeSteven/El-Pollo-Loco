class StatusBar extends DrawableObjekt {
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


    draw(ctx) {
        this.drawLife(ctx);
        this.drawCoins(ctx);
        this.drawBottles(ctx);
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