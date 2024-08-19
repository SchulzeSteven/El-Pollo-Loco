class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    showFrames = false;
    statusBar = new StatusBar();
    throwableObjects = [];
    throw_sound = new Audio('./audio/throw.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initializeWorld();
        this.throw_sound.volume = throwSoundVolume;
    }


    initializeWorld() {
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.setupFrameToggle();
    }

    
    setWorld() {
        this.character.world = this;
        this.character.enableSounds();
    }


    checkCollisions() {
        const collisionInterval = setInterval(() => {
            if (this.character.isDead()) {
                clearInterval(collisionInterval);
                console.log('Character is dead, collisions disabled.');
                return;
            }
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
    
        }, 250);
    }


    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.isHurt() && this.character.isColliding(enemy)) {
                this.character.hit(enemy);
                this.statusBar.setPercentage(this.character.life);
                console.log('Collision with Character', this.character.life);
            }
        });
    }


    checkCoinCollisions() {
        let collectedCoins = [];
    
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                collectedCoins.push(index);
                this.statusBar.setCoinCount(this.statusBar.coinCount + 1);
            }
        });
        collectedCoins.reverse().forEach(index => {
            this.level.coins.splice(index, 1);
        });
    }


    checkBottleCollisions() {
        let collectedBottles = [];
    
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                collectedBottles.push(index);
                this.statusBar.setBottleCount(this.statusBar.bottleCount + 1); // Erhöht die Anzahl der Flaschen nach dem Einsammeln
            }
        });
    
        collectedBottles.reverse().forEach(index => {
            this.level.bottles.splice(index, 1);
        });
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.statusBar.bottleCount > 0) {
            let direction = this.character.otherDirection ? 'left' : 'right';
            let offsetX = direction === 'right' ? 60 : -30; // Passe den Offset für links an
    
            let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 100, direction);
            bottle.world = this; // Weisen Sie die Welt zu
            this.throwableObjects.push(bottle);
            this.statusBar.setBottleCount(this.statusBar.bottleCount - 1); // Reduziert die Anzahl der Flaschen nach dem Wurf
    
            this.throw_sound.play(); // Spielt den Wurfsound ab
        }
    }


    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        // ----------- Space for fixed objects -----------//
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
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


    setupFrameToggle() {
        window.addEventListener('keydown', (event) => {
            if (event.key === '#') {
                this.showFrames = !this.showFrames;  // Zustand umschalten
                console.log(`Frame drawing is now ${this.showFrames ? 'enabled' : 'disabled'}`);
            }
        });
    }
}