class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 2876;


    constructor(enemies, coins, bottles, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
 
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        // Erzeuge zufällige Startpositionen für die Bögen
        let arc1StartX = getRandomInt(200, 500);
        let arc2StartX = getRandomInt(700, 1000);
        let arc3StartX = getRandomInt(1200, 1500);
        let arc4StartX = getRandomInt(1700, 2000);
        let arc5StartX = getRandomInt(2200, 2500);
        
        // Erzeuge die Bögen mit den zufälligen Startpositionen
        let arc1 = Coin.createCoinArc(arc1StartX, 160, 30, 150);
        let arc2 = Coin.createCoinArc(arc2StartX, 140, 30, 150);
        let arc3 = Coin.createCoinArc(arc3StartX, 100, 30, 150);
        let arc4 = Coin.createCoinArc(arc4StartX, 120, 30, 150);
        let arc5 = Coin.createCoinArc(arc5StartX, 160, 30, 150);
        
        // Füge die Münzbögen dem Level hinzu
        this.coins = this.coins.concat(arc1, arc2, arc3, arc4, arc5);
    }
}