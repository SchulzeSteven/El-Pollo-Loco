class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 2876;


    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}