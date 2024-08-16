class MoveableObject {
        x = 10;
        y = 150;
        img;
        height = 150;
        width = 100;
        imageCache = {};
        currentImage = 0;
        speed = 0.15;
        otherDirection = false
        speedY = 0;
        acceleration = 2;
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
            return this.y < 150;
        }


        loadImage(path) {
            this.img = new Image();
            this.img.src = path;
        }


        /**
         * 
         * @param {Array} arr - ['img/image1.png', 'img/image2.png' ....]
         */
        loadImages(arr) {
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;

            })
        }


        draw(ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }


        drawFrame(ctx) {
            if (this instanceof Character || this instanceof Chicken_Normal || this instanceof Chicken_Small || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = 'blue';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }


        isColliding(moveableobject) {
            let offset = 15;
                
            return this.x + this.width - offset > moveableobject.x + offset &&
                this.y + this.height - offset > moveableobject.y + offset &&
                this.x + offset < moveableobject.x + moveableobject.width - offset &&
                this.y + offset < moveableobject.y + moveableobject.height - offset;
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
                return 5;
            } else if (enemy instanceof Chicken_Normal) {
                return 10;
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