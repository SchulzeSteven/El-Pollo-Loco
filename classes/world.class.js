class World {
    character = new Character();
    enemies = [
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

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.clearCanvas();
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);


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
        this.ctx.drawImage(moveableobject.img, moveableobject.x, moveableobject.y, moveableobject.width, moveableobject.height);
    }


    /**
     * simple function to clear the canvas graphics before every new draw cycle
     */
    clearCanvas() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

}