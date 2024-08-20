class DrawableObjekt {

    img;
    imageCache = {};
    currentImage = 0;
    x = 10;
    y = 150;
    height = 150;
    width = 100;
    redFrameOffset = { top: 5, right: 5, bottom: 5, left: 5 };


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
         * 
         * @param {Array} arr - ['img/image1.png', 'img/image2.png' ....]
         */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

        })
    }
 

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken_Normal || this instanceof Chicken_Small || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            // Blauer äußerer Rahmen
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            // Roter innerer Rahmen
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            const { top, right, bottom, left } = this.redFrameOffset; // Offsets für den roten Rahmen
            ctx.rect(
                this.x + left,
                this.y + top,
                this.width - left - right,
                this.height - top - bottom
            );
            ctx.stroke();
        }
    }

    setRedFrameOffset(top, right, bottom, left) {
        this.redFrameOffset = { top, right, bottom, left };
    }
}