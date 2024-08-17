class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    showFrames = false;
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.setupFrameToggle();
    }

    
    setupFrameToggle() {
        window.addEventListener('keydown', (event) => {
            if (event.key === '#') {
                this.showFrames = !this.showFrames;  // Zustand umschalten
                console.log(`Frame drawing is now ${this.showFrames ? 'enabled' : 'disabled'}`);
            }
        });
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        const collisionInterval = setInterval(() => {
            if (this.character.isDead()) {
                clearInterval(collisionInterval);  // Stoppt die Kollisionserkennung, wenn der Charakter tot ist
                console.log('Character is dead, collisions disabled.');
                return;
            }

            this.level.enemies.forEach((enemy) => {
                // Kollision nur überprüfen, wenn der Charakter nicht verletzt ist
                if (!this.character.isHurt() && this.character.isColliding(enemy)) {
                    this.character.hit(enemy);  // Übergibt den enemy an die hit()-Methode des Characters
                    this.statusBar.setPercentage(this.character.life);
                    console.log('Collision with Character', this.character.life);
                }
            });
        }, 250);
    }


    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        // ----------- Space for fixed objects -----------//
        this.addToMap(this.statusBar);  // Zeichnet die StatusBar unabhängig von der Kamera-Position
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
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

        moveableobject.draw(this.ctx);

        if (this.showFrames) {  // Nur zeichnen, wenn showFrames true ist
            moveableobject.drawFrame(this.ctx);
        }

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

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}