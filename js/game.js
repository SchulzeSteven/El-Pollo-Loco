let canvas;
let world;
let keyboard = new Keyboard();
let throwSoundVolume = 0.1;  // Lautstärke für den Wurfsound

function init() {
    canvas = document.getElementById("canvas");
    // World wird nicht initialisiert, bevor das Spiel gestartet wird
}

function startGame() {
    document.getElementById('start').style.display = 'none'; // Startbildschirm ausblenden
    document.getElementById('canvas').style.display = 'block'; // Canvas anzeigen

    // Jetzt die World instanziieren und das Spiel starten
    world = new World(canvas, keyboard);

    // Event-Listener initialisieren
    initEventListeners();
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
