class Chicken_Normal extends MoveableObject {

        height = 70;
        width = 70;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.y = 355;
        this.x = 200 + Math.random() * 400;
    }

}