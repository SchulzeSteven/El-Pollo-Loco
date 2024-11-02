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
    // Blendet die Button-Gruppe aus
    document.querySelector('.btn-container').style.display = 'none';

    // Neustart des Spiels initialisieren
    if (world) {
        world.stopGame();
        world.character.clearIntervals();
        world.level.enemies.forEach(enemy => {
            if (enemy.clearIntervals) {
                enemy.clearIntervals();
            }
        });
        world.audioManager.stopAndResetSounds();
        world.character.resetIdleTimers();
        world = null;
    }

    // Canvas leeren
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    // Neue Welt-Instanz erstellen und initialisieren
    world = new World(canvas, keyboard, audioManager);
    world.resetWorld();
    initEventListeners();
}

function home() {
    // Blendet die Button-Gruppe aus
    document.querySelector('.btn-container').style.display = 'none';

    // Führen Sie hier den Code aus, der die Rückkehr zum Startbildschirm oder Hauptmenü ermöglicht
    // z. B. Startbildschirm anzeigen oder Spiel zurücksetzen, wenn ein Home-Bildschirm existiert
    document.getElementById('start').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';
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