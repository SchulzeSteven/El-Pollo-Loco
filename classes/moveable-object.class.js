class MoveableObject {
        x = 0;
        y = 500;
        img;
        height = 350;
        width = 250;

        loadImage(path) {
            this.img = new Image();
            this.img.src = path;
        }


        moveRight() {
            console.log('Moving Right');
        }
}