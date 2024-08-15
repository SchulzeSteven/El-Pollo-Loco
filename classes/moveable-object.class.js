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


        /* isColliding (moveableobject) {
            return  (this.X + this.width) >= moveableobject.X && this.X <= (moveableobject.X + moveableobject.width) && 
                    (this.Y + this.offsetY + this.height) >= moveableobject.Y &&
                    (this.Y + this.offsetY) <= (moveableobject.Y + moveableobject.height) && 
                    moveableobject.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    
        } */

        isColliding(moveableobject) {
            return this.x + this.width > moveableobject.x &&
                this.y + this.height > moveableobject.y &&
                this.x < moveableobject.x &&
                this.y < moveableobject.y + moveableobject.height;
        }


        hit() {
            this.life -= 10;
            if (this.life < 0) {
                this.life = 0;
            }
        }


        isDead() {
            return this.life == 0;
        }


        playAnimation(images) {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }


        playAnimationCollectable(images) {
            let i = this.currentImage % this.IMAGES_MOVING.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
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