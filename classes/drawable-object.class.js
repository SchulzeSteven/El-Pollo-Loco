class DrawableObjekt {

    img;
    imageCache = {};
    currentImage = 0;
    x = 10;
    y = 150;
    height = 150;
    width = 100;
    redFrameOffset = { top: 5, right: 5, bottom: 5, left: 5 };


    /**
    * Loads an image from a specified path and assigns it to `this.img`.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
    * Loads multiple images from an array of paths and caches them.
    * Loads each image and stores it in `this.imageCache` for quick access.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

        })
    }
 

    /**
    * Draws the current image on the canvas at the object's position.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
    * Draws the frames around the object if it is a drawable object.
    * Draws blue and red frames around the object for debugging purposes.
    */
    drawFrame(ctx) {
        if (this.isDrawableObject()) {
            this.drawBlueFrame(ctx);
            this.drawRedFrame(ctx);
        }
    }
    

    /**
    * Checks if the object is drawable, based on its class type.
    */
    isDrawableObject() {
        return this instanceof Character || 
               this instanceof Chicken_Normal || 
               this instanceof Chicken_Small || 
               this instanceof Endboss || 
               this instanceof Coin || 
               this instanceof Bottle || 
               this instanceof ThrowableObject;
    }
    

    /**
    * Draws a blue frame around the object.
    * Draws a blue outline around the object's dimensions.
    */
    drawBlueFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    

    /**
    * Draws a red frame around the object with custom offsets.
    * Draws a red outline inside the object's dimensions, adjusted by the `redFrameOffset`.
    */
    drawRedFrame(ctx) {
        const { top, right, bottom, left } = this.redFrameOffset;
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.x + left,
            this.y + top,
            this.width - left - right,
            this.height - top - bottom
        );
        ctx.stroke();
    }
    

    /**
    * Sets custom offsets for the red frame around the object.
    */
    setRedFrameOffset(top, right, bottom, left) {
        this.redFrameOffset = { top, right, bottom, left };
    }
}