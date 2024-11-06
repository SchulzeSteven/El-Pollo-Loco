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
    endbossDefeated = false;
    gameStopped = false;
    endScreen = new EndScreen();
    intervals = [];
    muteButton = {
        x: 660,
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
    }


    setWorld() {
        audioManager.play('background');
        this.audioManager.sounds.background.volume = 0.2;
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }


    checkCollisions() {
        const collisionInterval = setInterval(() => {
            if (this.character.isDead()) {
                clearInterval(collisionInterval);
                return;
            }
            this.checkEnemyCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkEndbossCollision();
        }, 250);
        this.intervals.push(collisionInterval);
    }


    clearIntervals() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
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
            this.character.resetIdleTimers();
            
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
                    enemy.checkCollisionWithBottle(bottle);
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


    checkGameEnd() {
        if (this.character.isDead()) {
            this.stopGame();
            this.endScreen.drawEndScreen(this.ctx, false);
            document.getElementById("mobile-movement-container").style.display = "none";
        } else if (this.endbossDefeated) {
            this.stopGame();
            this.endScreen.drawEndScreen(this.ctx, true);
            document.getElementById("mobile-movement-container").style.display = "none";
        }
    }
    
    
    showBtnContainer() {
        const btnContainer = document.querySelector('.btn-container');
        btnContainer.style.display = 'flex';
        
        const buttons = btnContainer.querySelectorAll('.btns');
        buttons.forEach(button => button.classList.add('disabled'));
    
        setTimeout(() => {
            buttons.forEach(button => button.classList.remove('disabled'));
        }, 2000);
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
                this.statusBar.enableEndbossDisplay();
            }
        }, 1000 / 60);
    }


    setupCanvasClickListener() {
        this.canvas.addEventListener('click', (event) => this.handleMuteButtonClick(event));
        this.canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.handleMuteButtonClick(event);
        });
    }
    

    handleMuteButtonClick(event) {
        if (this.gameStopped) return;
    
        let rect = this.canvas.getBoundingClientRect();
        let mouseX, mouseY;
        if (event.type === 'touchstart') {
            mouseX = event.touches[0].clientX - rect.left;
            mouseY = event.touches[0].clientY - rect.top;
        } else {
            mouseX = event.clientX - rect.left;
            mouseY = event.clientY - rect.top;
        }
        if (mouseX >= this.muteButton.x && mouseX <= this.muteButton.x + this.muteButton.width &&
            mouseY >= this.muteButton.y && mouseY <= this.muteButton.y + this.muteButton.height) {
            this.audioManager.toggleMute();
        }
    }
    

    isHtmlMuteButtonVisible() {
        const muteButton = document.getElementById('mute-button');
        return muteButton && muteButton.style.display === 'flex';
    }


    toggleMute() {
        if (this.audioManager) {
            this.audioManager.toggleMute();
        }
        this.updateHtmlMuteIcon();
    }
    

    updateHtmlMuteIcon() {
        const muteButton = document.getElementById('mute-button');
        if (muteButton) {
            muteButton.src = this.audioManager.isMuted ? './assets/img/icons/volume-off.png' : './assets/img/icons/volume-on.png';
        }
    }


    drawMuteButton() {
        let icon = this.audioManager.isMuted ? this.muteIconOff : this.muteIconOn;
        this.ctx.drawImage(icon, this.muteButton.x, this.muteButton.y, this.muteButton.width, this.muteButton.height);
    }


    draw() {
        if (this.handleCharacterDeath()) return;
        this.checkGameEnd();
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
        if (!this.isHtmlMuteButtonVisible()) {
            this.drawMuteButton();
        }
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
    

    handleCharacterDeath() {
        if (this.character.isDead()) {
            this.character.playDeadAnimationOnce();
            if (this.character.isDeadAnimationCompleted()) {
                this.audioManager.playGameOverMusic();
                this.stopGame();
                return true;
            }
        }
        return false;
    }


    stopGame() {
        this.gameStopped = true;
        cancelAnimationFrame(this.animationFrameId);
    
        if (this.collisionInterval) {
            clearInterval(this.collisionInterval);
            this.collisionInterval = null;
        }
         if (this.endbossMovementInterval) {
            clearInterval(this.endbossMovementInterval);
            this.endbossMovementInterval = null;
        }
        this.level.enemies.forEach(enemy => {
            if (enemy.clearIntervals) {
                enemy.clearIntervals();
            }
        });
        this.throwableObjects = [];
    }
    

    resetWorld() {
        this.clearIntervals();
        Bottle.lastX = 0;
        Bottle.minSpacing = 100;
        this.level = new Level(
            level1.enemies.map(enemy => new enemy.constructor()),
            level1.coins.map(() => new Coin()),
            Array.from({ length: 12 }, () => {
                let bottle = new Bottle();
                bottle.setRandomXPosition();
                return bottle;
            }),
            level1.clouds.map(() => new Cloud()),
            level1.backgroundObjects.map(bg => new BackgroundObject(bg.img.src, bg.x))
        );
        this.throwableObjects = [];
        this.endbossMovementStarted = false;
        this.throwCooldown = false;
        this.endbossDefeated = false;
        this.gameStopped = false;
        if (this.character) {
            this.character.clearIntervals();
        }
        this.character = new Character(this.audioManager);
        this.initializeWorld();
        this.checkCollisions();
        this.checkEndbossMovement();
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
}


window.addEventListener('keydown', (event) => {
    if (event.key === '#') {
        if (world) {
            world.showFrames = !world.showFrames;
        }
    }
});

