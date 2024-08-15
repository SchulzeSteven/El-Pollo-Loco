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