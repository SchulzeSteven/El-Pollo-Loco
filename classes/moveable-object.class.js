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


        isColliding(moveableObject) {
            const { bufferX, bufferY } = this.getCollisionBuffer(moveableObject);
        
            return this.x + this.width - bufferX > moveableObject.x + bufferX &&
                   this.y + this.height - bufferY > moveableObject.y + bufferY &&
                   this.x + bufferX < moveableObject.x + moveableObject.width - bufferX &&
                   this.y + bufferY < moveableObject.y + moveableObject.height - bufferY;
        }
        
        getCollisionBuffer(moveableObject) {
            let bufferX = 30;
            let bufferY = 10;

            if (moveableObject instanceof Coin) {
                bufferX = 20;
                bufferY = 50;
            } else if (moveableObject instanceof Chicken_Normal) {
                bufferX = 20;
                bufferY = 15;
            } else if (moveableObject instanceof Chicken_Small) {
                bufferX = 25;
                bufferY = 10;
            }
            return { bufferX, bufferY };
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
}