class StatusBar extends DrawableObjekt {
    constructor() {
        super();
        this.loadImage('./assets/img/7_statusbars/3_icons/icon_health.png');  // Lädt das Herz-Symbol
        this.coinImg = new Image();  // Bild für das Münz-Symbol
        this.coinImg.src = 'assets/img/7_statusbars/3_icons/icon_coin.png';

        this.x = 20;
        this.y = 5;
        this.width = 50;  // Breite des Herz-Symbols und Münz-Symbols
        this.height = 50; // Höhe des Herz-Symbols und Münz-Symbols
        this.lifePercentage = 100;  // Startwert für Lebenspunkte in Prozent
        this.coinCount = 0;  // Startwert für die Anzahl der Münzen
    }

    setPercentage(lifePercentage) {
        this.lifePercentage = lifePercentage;
    }

    setCoinCount(coinCount) {
        this.coinCount = coinCount;
    }

    draw(ctx) {
        // Zeichnet das Herz-Symbol und den Lebens-Prozentsatz
        super.draw(ctx);
        this.drawText(ctx, this.lifePercentage, this.x + this.width + 0, this.y + this.height / 2 + 17);

        // Zeichnet das Münz-Symbol und die Anzahl der Münzen
        ctx.drawImage(this.coinImg, this.x, this.y + this.height + 0, this.width, this.height);  // 10px Abstand unter dem Herz-Symbol
        this.drawText(ctx, this.coinCount, this.x + this.width + 0, this.y + this.height * 1.5 + 15);  // Text unter dem Münz-Symbol
    }

    drawText(ctx, text, x, y) {
        ctx.font = '40px zabars';  // Schriftart und -größe
        ctx.fillStyle = 'black';  // Textfarbe

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