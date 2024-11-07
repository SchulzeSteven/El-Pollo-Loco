class Bottle extends MoveableObject {

    height = 75;
    width = 75;
    IMAGES_ONGROUND = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    
    static lastX = 0;
    static minSpacing = 200;


    constructor() {
        super().loadImage('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_ONGROUND);
        this.setRandomXPosition();
        this.setRandomImage();
        this.setRedFrameOffset(12, 20, 5, 20);
    }


    /**
    * Sets a random x-position for the object within a specified range and minimum spacing.
    *
    * @function setRandomXPosition
    * @memberof Bottle
    * @description Calculates a new x-position based on a minimum distance from the last position
    * (`Bottle.minSpacing`) and a random upper limit, then saves it as `Bottle.lastX`.
    * 
    * @property {number} minX - Minimum x-position based on the last x-position plus minimum spacing.
    * @property {number} maxX - Randomly generated x-position within -850 to 300.
    */
    setRandomXPosition() {
        let minX = Bottle.lastX + Bottle.minSpacing;
        let maxX = -850 + Math.random() * 1150;
        this.x = Math.max(minX, maxX);
        this.y = 350;
        Bottle.lastX = this.x;
    }


    /**
     * Selects a random image for the object.
    *
     * @function setRandomImage
    * @memberof Bottle
    * @description Chooses a random image from `this.IMAGES_ONGROUND` and sets it as `this.img`.
    * 
    * @property {number} randomIndex - Random index for selecting an image.
    */
    setRandomImage() {
        let randomIndex = Math.floor(Math.random() * this.IMAGES_ONGROUND.length);
        this.img = this.imageCache[this.IMAGES_ONGROUND[randomIndex]];
    }
}