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
        // Zeichnet das Herz-Symbol und den Lebens-Prozentsatz
        super.draw(ctx);
        this.drawText(ctx, this.lifePercentage, this.x + this.width + 0, this.y + this.height / 2 + 17);

        // Zeichnet das Münz-Symbol und die Anzahl der Münzen
        ctx.drawImage(this.coinImg, this.x, this.y + this.height + 10, this.width, this.height);
        this.drawText(ctx, this.coinCount, this.x + this.width + 0, this.y + this.height * 1.5 + 26);

        // Zeichnet das Salsa-Flaschen-Symbol und die Anzahl der Flaschen
        ctx.drawImage(this.bottleImg, this.x, this.y + this.height * 2 + 20, this.width, this.height);
        this.drawText(ctx, this.bottleCount, this.x + this.width + 0, this.y + this.height * 2.5 + 35);
    }

    drawText(ctx, text, x, y) {
        ctx.font = '40px zabars';  
        ctx.fillStyle = 'black';

        // Weißer Schatten für den Text
        ctx.shadowColor = 'white';  // Farbe des Schattens
        ctx.shadowOffsetX = 2;  // Horizontaler Versatz des Schattens
        ctx.shadowOffsetY = 2;  // Vertikaler Versatz des Schattens

        // Text wird mit den angegebenen Koordinaten gezeichnet
        ctx.fillText(`${text}`, x, y);

        // Schatten zurücksetzen, um unerwünschte Effekte auf andere Zeichnungen zu vermeiden
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}
