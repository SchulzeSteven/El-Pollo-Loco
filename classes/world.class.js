class World {
    character;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    showFrames = false;
    statusBar = new StatusBar();
    throwableObjects = [];
    throw_sound;
    endbossMovementStarted = false;
    throwCooldown = false;
    isMuted = false;

    muteButton = {
        x: 660,  // Rechts oben
        y: 20,
        width: 32,
        height: 32
    };

    muteIconOn = new Image();
    muteIconOff = new Image();

    constructor(canvas, keyboard, audioManager) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioManager = audioManager;
        this.audioManager.setWorld(this);
        this.muteIconOn.src = './assets/img/icons/volume-on.png';
        this.muteIconOff.src = './assets/img/icons/volume-off.png';
        this.character = new Character(audioManager);
        this.throw_sound = this.audioManager.sounds.throwing;
        this.initializeWorld();
        this.setupCanvasClickListener();
    }

    initializeWorld() {
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkEndbossMovement();
        this.setupFrameToggle();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
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
            this.checkEndbossCollision();
        }, 250);
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.isHurt() && this.character.isColliding(enemy)) {
                this.character.hit(enemy);
                this.statusBar.setPercentage(this.character.life);
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
                this.statusBar.setBottleCount(this.statusBar.bottleCount + 1);
            }
        });
        collectedBottles.reverse().forEach(index => {
            this.level.bottles.splice(index, 1);
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBar.bottleCount > 0 && !this.throwCooldown) {
            let direction = this.character.otherDirection ? 'left' : 'right';
            let offsetX = direction === 'right' ? 60 : -30;
    
            let bottle = new ThrowableObject(this.character.x + offsetX, this.character.y + 100, direction);
            bottle.world = this;
            this.throwableObjects.push(bottle);
            this.statusBar.setBottleCount(this.statusBar.bottleCount - 1);
            this.audioManager.play('throwing');
            this.activateThrowCooldown();
        }
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.checkCollisionWithBottle(bottle);  // Kollision mit dem Endboss überprüfen
                }
            });
        });
    }

    activateThrowCooldown() {
        this.throwCooldown = true;
        setTimeout(() => {
            this.throwCooldown = false;
        }, 250);
    }

    checkEndbossCollision() {
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            endboss.checkCollisionWithCharacter(this.character);
        }
    }

    checkEndbossMovement() {
        setInterval(() => {
            const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            if (this.character.x >= 2700 && endboss && !this.endbossMovementStarted) {
                this.endbossMovementStarted = true;
                endboss.startMovingLeft();
                this.statusBar.enableEndbossDisplay();  // Endboss-Bild anzeigen
            }
        }, 1000 / 60);
    }

    setupCanvasClickListener() {
        this.canvas.addEventListener('click', (event) => {
            let rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;
    
            // Überprüfen, ob der Klick innerhalb des Mute-Buttons war
            if (mouseX >= this.muteButton.x && mouseX <= this.muteButton.x + this.muteButton.width &&
                mouseY >= this.muteButton.y && mouseY <= this.muteButton.y + this.muteButton.height) {
                this.audioManager.toggleMute();  // Schalte den Mute-Status um und aktualisiere das Icon
            }
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.isMuted ? this.audioManager.muteAll() : this.audioManager.unmuteAll();
        this.drawMuteButton();
    }

    drawMuteButton() {
        let icon = this.audioManager.isMuted ? this.muteIconOff : this.muteIconOn;
        this.ctx.drawImage(icon, this.muteButton.x, this.muteButton.y, this.muteButton.width, this.muteButton.height);
    }

    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
    
        this.ctx.translate(-this.camera_x, 0);
    
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);
    
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    
        this.drawMuteButton();  // Stelle sicher, dass das Mute-Icon zuletzt gezeichnet wird
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

        if (this.showFrames) {
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
                this.showFrames = !this.showFrames;
                console.log(`Frame drawing is now ${this.showFrames ? 'enabled' : 'disabled'}`);
            }
        });
    }
}

