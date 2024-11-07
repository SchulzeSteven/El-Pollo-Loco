class EndScreen extends DrawableObjekt {
    IMAGES_GAMEOVER = [
        "./assets/img/9_intro_outro_screens/game_over/game-over.png"
    ];
    IMAGES_WIN = [
        "./assets/img/9_intro_outro_screens/win/win_2.png"
    ];


    /**
    * Draws the end screen image based on the game result.
    * Displays a win or game-over image, covering the entire canvas. Shows the button container after a delay.
    */
    drawEndScreen(ctx, hasWon) {
        const imagePath = hasWon ? this.IMAGES_WIN[0] : this.IMAGES_GAMEOVER[0];
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            setTimeout(() => {
                world.showBtnContainer();
            }, 2000);
        };
    }
}