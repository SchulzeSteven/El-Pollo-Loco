class Bottle extends MoveableObject {

    height = 75;
    width = 75;
    IMAGES_ONGROUND = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    static lastX = 0;
    static minSpacing = 350;


    constructor() {
        super().loadImage('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_ONGROUND);
        this.setRandomXPosition();
        this.setRandomImage();
    }


    setRandomXPosition() {
        let minX = Bottle.lastX + Bottle.minSpacing;
        let maxX = -100 + Math.random() * 1000;
        this.x = Math.max(minX, maxX);
        this.y = 350;
        Bottle.lastX = this.x;
    }


    setRandomImage() {
        let randomIndex = Math.floor(Math.random() * this.IMAGES_ONGROUND.length);
        this.img = this.imageCache[this.IMAGES_ONGROUND[randomIndex]];
    }
}