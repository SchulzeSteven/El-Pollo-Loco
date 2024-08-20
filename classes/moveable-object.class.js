class MoveableObject extends DrawableObjekt {

        speed = 0.15;
        otherDirection = false
        speedY = 0;
        acceleration = 3;
        life = 100;
        lastHit = 0;


        applyGravity() {
            setInterval(() => {
                if(this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    this.checkIfLanded();
                }
            }, 1000 / 25);
        }


        isAboveGround() {
            if (this instanceof ThrowableObject) {
                return true;
            } else {
            return this.y < 150;
            }
        }


        checkIfLanded() {
            if (!(this instanceof ThrowableObject) && this.y >= 150) {
                this.y = 150;
                this.speedY = 0;
            }
        }


        isColliding(moveableObject) {
            const redFrame1 = this.getRedFrame();
            const redFrame2 = moveableObject.getRedFrame();
    
            return redFrame1.x < redFrame2.x + redFrame2.width &&
                   redFrame1.x + redFrame1.width > redFrame2.x &&
                   redFrame1.y < redFrame2.y + redFrame2.height &&
                   redFrame1.y + redFrame1.height > redFrame2.y;
        }


        isCollidingTop(moveableObject) {
            const redFrame1 = this.getRedFrame();
            const redFrame2 = moveableObject.getRedFrame();
    
            // Prüfen, ob der untere Rand des Charakters den oberen Rand des Huhns berührt
            return redFrame1.y + redFrame1.height >= redFrame2.y &&
                   redFrame1.y + redFrame1.height <= redFrame2.y + redFrame2.height / 2 &&
                   redFrame1.x < redFrame2.x + redFrame2.width &&
                   redFrame1.x + redFrame1.width > redFrame2.x;
        }

    
        getRedFrame() {
            const { top, right, bottom, left } = this.redFrameOffset;
            return {
                x: this.x + left,
                y: this.y + top,
                width: this.width - left - right,
                height: this.height - top - bottom
            };
        }


        isHurt() {
            let timepassed = new Date().getTime() - this.lastHit;
            timepassed = timepassed / 1000;
            return timepassed < 0.8;
        }


        isDead() {
            return this.life == 0;
        }


        playAnimation(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }


        calculateDamage(enemy) {
            if (enemy instanceof Chicken_Small) {
                return 10;
            } else if (enemy instanceof Chicken_Normal) {
                return 15;
            }
            return 25; // Standard-Schaden für andere Feinde
        }


        applyDamage(damage) {
            this.life -= damage;
            if (this.life < 0) {
                this.life = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }


        moveRight() {
            this.x += this.speed;
        }


        moveLeft() {
            if (this instanceof Chicken_Normal || this instanceof Chicken_Small || this instanceof Cloud) {
                setInterval(() => {
                    this.x -= this.speed;
                }, 1000 / 60);
            } else {
                this.x -= this.speed;
            }
        }


        jump() {
            this.speedY = 27;
        }


        bounceOff() {
            this.speedY = 25; // Bounce-Effekt
        }
}