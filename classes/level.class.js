class Level {
    enemies;
    clouds;
    coins;
    backgroundObjects;
    level_end_x = 2876;


    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}