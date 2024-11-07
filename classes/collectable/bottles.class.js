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
    * Calculates a new x-position based on a minimum distance from the last position
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
    * Chooses a random image from `this.IMAGES_ONGROUND` and sets it as `this.img`..
    */
    setRandomImage() {
        let randomIndex = Math.floor(Math.random() * this.IMAGES_ONGROUND.length);
        this.img = this.imageCache[this.IMAGES_ONGROUND[randomIndex]];
    }
}