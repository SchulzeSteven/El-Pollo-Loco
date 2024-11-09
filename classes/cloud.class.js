class Cloud extends MoveableObject {
        y = 20;
        width = 500;
        height = 300;

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 3000;
        this.animate();
    }


    /**
    * Animates the object by moving it to the left.
    * Initiates a leftward movement for the object.
    */
    animate() {
        this.moveLeft();
    }
}