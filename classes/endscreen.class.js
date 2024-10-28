class EndScreen extends DrawableObjekt {
    IMAGES_GAMEOVER = [
        "./assets/img/9_intro_outro_screens/game_over/game-over.png"
    ];
    
    IMAGES_WIN = [
        "./assets/img/9_intro_outro_screens/win/win_2.png"
    ];

    drawEndScreen(ctx, hasWon) {
        const imagePath = hasWon ? this.IMAGES_WIN[0] : this.IMAGES_GAMEOVER[0];
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        };
    }
}