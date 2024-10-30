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
    Bottle.lastX = 0;  // Rücksetzen der statischen Eigenschaft für Flaschen

    if (world) {
        world.stopGame(); // Stoppt die laufende Welt und alle Intervalle
    }
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    // Erstelle eine neue Instanz der Welt und des Levels
    world = new World(canvas, keyboard, audioManager);

    // Initialisiert die Welt und alle Bewegungs- und Kollisionsintervalle neu
    world.resetWorld();

    initEventListeners(); // Setze alle Event Listener neu

    console.log("Spiel wurde zurückgesetzt, Objekte neu initialisiert.");
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