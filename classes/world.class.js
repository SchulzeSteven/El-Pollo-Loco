class World {
    character = new Character();
    enemies = [
        new Chicken_Normal(),
        new Chicken_Normal(),
        new Chicken_Normal(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObjekt('./assets/img/5_background/layers/air.png', 0),
        new BackgroundObjekt('./assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObjekt('./assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObjekt('./assets/img/5_background/layers/1_first_layer/1.png', 0),

    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);   
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.ctx.translate(-this.camera_x, 0); 



        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(moveableobject) {
        if (moveableobject.otherDirection) {
            this.flipImage(moveableobject);
        }
        this.ctx.drawImage(moveableobject.img, moveableobject.x, moveableobject.y, moveableobject.width, moveableobject.height);
        if (moveableobject.otherDirection) {
            this.flipImageBack(moveableobject);
        }
    }


    flipImage(moveableobject) {
        this.ctx.save();
        this.ctx.translate(moveableobject.width, 0);
        this.ctx.scale(-1, 1);
        moveableobject.x = moveableobject.x * -1;
    }

    flipImageBack(moveableobject) {
        moveableobject.x = moveableobject.x * -1;
        this.ctx.restore();
    }


    /**
     * simple function to clear the canvas graphics before every new draw cycle
     */
    clearCanvas() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

}