let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();  // Neuer AudioManager
const endScreen = new EndScreen();

function init() {
    canvas = document.getElementById("canvas");
    // Das Spiel wird erst gestartet, wenn der Benutzer auf "Start" klickt
}

function startGame() {
    document.getElementById('start').style.display = 'none'; // Startbildschirm ausblenden
    document.getElementById('canvas').style.display = 'block'; // Canvas anzeigen
    world = new World(canvas, keyboard, audioManager);
    initEventListeners();
}

function restartGame() {
    if (world) {
        world.stopGame();                     // Stoppt alle Intervalle und Animationen
        world.character.clearIntervals();      // Charakter-Intervalle zurücksetzen
        world.level.enemies.forEach(enemy => { // Setzt Intervalle aller Gegner zurück
            if (enemy.clearIntervals) {
                enemy.clearIntervals();
            }
        });
        world.audioManager.stopAndResetSounds();  // Sounds stoppen und zurücksetzen
        world.character.resetIdleTimers();
        world = null;  // Setzt die `world`-Instanz auf null, um alle Referenzen zu löschen
    }

    // Canvas leeren
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    // Neue Welt-Instanz erstellen und initialisieren
    world = new World(canvas, keyboard, audioManager);
    world.resetWorld();

    initEventListeners();
    console.log("Spiel wurde vollständig zurückgesetzt und neu gestartet.");
}


function initEventListeners() {
    document.addEventListener("keydown", (event) => {
        if (event.keyCode == 32) {
            keyboard.SPACE = true;
        }

        if (event.keyCode == 37) {
            keyboard.LEFT = true;
        }

        if (event.keyCode == 39) {
            keyboard.RIGHT = true;
        }

        if (event.keyCode == 68) {
            keyboard.D = true;
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.keyCode == 32) {
            keyboard.SPACE = false;
        }

        if (event.keyCode == 37) {
            keyboard.LEFT = false;
        }

        if (event.keyCode == 39) {
            keyboard.RIGHT = false;
        }

        if (event.keyCode == 68) {
            keyboard.D = false;
        }
    });
}