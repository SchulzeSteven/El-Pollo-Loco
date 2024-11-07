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
        this.heartImg.src = './assets/img/7_statusbars/3_icons/icon_health.png';
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
        this.endbossLife = 100;
    }


    /**
    * Sets the life percentage for the character.
    */
    setPercentage(lifePercentage) {
        this.lifePercentage = lifePercentage;
    }


    /**
    * Sets the coin count for the status display.
    */
    setCoinCount(coinCount) {
        this.coinCount = coinCount;
    }


    /**
    * Sets the bottle count for the status display.
    */
    setBottleCount(bottleCount) {
        this.bottleCount = bottleCount;
    }


    /**
    * Sets the dimensions of the endboss image.
    */
    setEndbossSize(width, height) {
        this.endbossWidth = width;
        this.endbossHeight = height;
    }


    /**
    * Updates the endboss life and refreshes the displayed image.
    */
    updateEndbossLife(life) {
        this.endbossLife = life;
        this.updateEndbossImage();
    }


    /**
    * Updates the endboss image based on its life.
    */
    updateEndbossImage() {
        const index = Math.floor(this.endbossLife / 20);
        const imageIndex = Math.min(5, index);
        this.loadImage(this.IMAGES_ENDBOSS[imageIndex]);
    }


    /**
    * Draws the status bar components on the canvas.
    */
    draw(ctx) {
        this.drawCharacterLife(ctx);
        this.drawCoins(ctx);
        this.drawBottles(ctx);
        if (this.shouldDrawEndboss) {
            this.drawEndboss(ctx);
        }
    }


    /**
    * Draws the character's life status on the canvas.
    */
    drawCharacterLife(ctx) {
        const textX = this.x + this.width + 10;
        const coinTextX = this.x + this.width + 0;
        
        ctx.drawImage(this.heartImg, this.x, this.y, this.width, this.height);
        this.drawText(ctx, this.lifePercentage, coinTextX, this.y + this.height / 2 + 17);
    }


    /**
    * Draws the endboss's life status on the canvas.
    */
    drawEndboss(ctx) {
        const canvasWidth = ctx.canvas.width;
        ctx.drawImage(this.img, canvasWidth - this.endbossWidth - 120, this.y, this.endbossWidth, this.endbossHeight);
    }


    /**
    * Enables the endboss display and loads necessary images.
    */
    enableEndbossDisplay() {
        this.shouldDrawEndboss = true;
        this.loadImages(this.IMAGES_ENDBOSS);
        this.loadImage(this.IMAGES_ENDBOSS[5]);
    }


    /**
    * Draws the coin count on the canvas.
    */
    drawCoins(ctx) {
        ctx.drawImage(this.coinImg, this.x, this.y + this.height + 10, this.width, this.height);
        this.drawText(ctx, this.coinCount, this.x + this.width, this.y + this.height * 1.5 + 26);
    }


    /**
    * Draws the bottle count on the canvas.
    */
    drawBottles(ctx) {
        ctx.drawImage(this.bottleImg, this.x, this.y + this.height * 2 + 20, this.width, this.height);
        this.drawText(ctx, this.bottleCount, this.x + this.width, this.y + this.height * 2.5 + 35);
    }


    /**
    * Draws text with specified position and styling.
    */
    drawText(ctx, text, x, y) {
        ctx.font = '40px zabars';  
        ctx.fillStyle = 'black';
        this.setTextShadow(ctx, 'white', 2, 2);
        ctx.fillText(`${text}`, x, y);
        this.resetTextShadow(ctx);
    }


    /**
    * Sets a shadow effect for the text.
    */
    setTextShadow(ctx, color, offsetX, offsetY, blur = 0) {
        ctx.shadowColor = color;
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
        ctx.shadowBlur = blur;
    }
    
    
    /**
    * Resets the shadow effect for text.
    */
    resetTextShadow(ctx) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}