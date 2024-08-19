let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;  // Standardmäßig auf stumm gesetzt
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

    // Setze die Lautstärke je nach Mute-Status
    setVolume(isMuted ? 0 : 1);

    // Event-Listener initialisieren
    initEventListeners();
}

function muteGame() {
    isMuted = !isMuted;  // Toggle den Mute-Status
    updateMuteButton();  // Aktualisiere das Icon
    setVolume(isMuted ? 0 : 1);  // Setze die Lautstärke entsprechend
}

function updateMuteButton() {
    const muteIcon = document.getElementById('mute-icon');
    if (isMuted) {
        muteIcon.src = './assets/img/icons/volume-off.png';
    } else {
        muteIcon.src = './assets/img/icons/volume-on.png';
    }
}

function setVolume(volume) {
    if (world) {
        world.character.walking_sound.volume = volume;
        world.character.jumping_sound.volume = volume;
        world.character.snoring_sound.volume = volume;
        world.character.hurting_sound.volume = volume;
        world.throw_sound.volume = volume * throwSoundVolume;  // Lautstärke für Wurfsound
    }
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
