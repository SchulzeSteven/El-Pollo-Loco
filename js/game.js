let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();  // Neuer AudioManager
const endScreen = new EndScreen();

function init() {
    canvas = document.getElementById("canvas");

    // Standardmäßig "Ton an"-Symbol, aber ausgeblendet
    const muteButton = document.getElementById('mute-button');
    muteButton.textContent = '🔊';

    // Event-Listener für Mute-Button hinzufügen
    muteButton.addEventListener('click', () => {
        if (world) world.toggleMute();
    });
    muteButton.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Verhindert doppeltes Event
        if (world) world.toggleMute();
    });

    // Spiel wird erst gestartet, wenn der Benutzer auf "Start" klickt
}



function startGame() {
    // Blendet den Startbildschirm und die Button-Gruppe aus
    document.getElementById('start').style.display = 'none';
    document.querySelector('.btn-container').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';

    // Setzt das Spiel zurück, falls es bereits läuft
    if (world) {
        world.stopGame();
        world.character.clearIntervals();
        world.level.enemies.forEach(enemy => {
            if (enemy.clearIntervals) {
                enemy.clearIntervals();
            }
        });
        
        // Resetet Sounds, die spezifisch für das Spiel sind
        world.audioManager.stopAndResetSounds();
        world.character.resetIdleTimers();
        world = null;
    }

    // Leert das Canvas
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    // Initialisiert die Tastatursteuerung und Audio-Einstellungen neu
    keyboard = new Keyboard();
    audioManager = new AudioManager();

    // Initialisiert eine neue Spielwelt
    world = new World(canvas, keyboard, audioManager);
    world.resetWorld();
    initEventListeners();
    updateControlsVisibility();

    // Zeigt die mobilen Steuerungen an, falls die Bildschirmbreite unter 950px liegt
    if (window.innerWidth < 950) {
        document.getElementById("mobile-movement-container").style.display = "flex";
    }
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
    updateControlsVisibility();

    // Zeige die mobilen Steuerungen, wenn die Bildschirmbreite unter 950px ist
    if (window.innerWidth < 950) {
        document.getElementById("mobile-movement-container").style.display = "flex";
    }
}

function home() {
    // Startbildschirm anzeigen und Canvas ausblenden
    document.getElementById('start').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';

    // Blendet den mobilen Steuerungscontainer und die Button-Gruppe aus
    document.getElementById("mobile-movement-container").style.display = "none";
    document.querySelector('.btn-container').style.display = 'none';

    // Blendet das Impressum aus, falls es sichtbar ist
    document.getElementById('impressum').style.display = 'none';

    // Setze das Spiel zurück, falls es läuft
    if (world) {
        world.stopGame();
        world = null;
    }
}



function updateControlsVisibility() {
    const controls = document.querySelector('.controls');
    const mobileMovementContainer = document.getElementById("mobile-movement-container");
    const muteButton = document.getElementById("mute-button");

    // Steuerungen für kleinere und größere Bildschirmbreiten anpassen
    if (window.innerWidth < 950) {
        controls.style.display = 'none'; // Steuerungen ausblenden bei kleinen Bildschirmen
    } else {
        controls.style.display = 'flex'; // Steuerungen anzeigen bei großen Bildschirmen
    }

    // Zeige mobileMovementContainer und muteButton nur, wenn das Spiel läuft und die Breite < 950px ist
    if (world && !world.gameStopped && window.innerWidth < 950) {
        mobileMovementContainer.style.display = 'flex';
        muteButton.style.display = 'flex'; // Soundsymbol anzeigen
    } else {
        mobileMovementContainer.style.display = 'none';
        muteButton.style.display = 'none'; // Soundsymbol ausblenden
    }
}




function showMovementContainer() {
    let container = document.getElementById("mobile-movement-container");
    if (container) {
        container.style.display = "flex";
    }
}

/**
 * Event listener for orientation change on the window.
 * Reloads the page when the device orientation changes.
 */
window.addEventListener("orientationchange", () => {
    location.reload();
});

/**
 * Stoppt die angegebene mobile Bewegung, indem der entsprechende Schlüssel
 * im Keyboard-Objekt auf "false" gesetzt wird.
 *
 * @param {string} KEY - Der zu stoppende Schlüssel (z.B. "LEFT", "RIGHT", "SPACE", "D").
 */
function stopMobileMovement(KEY) {
    if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = false;
    }
}

/**
 * Startet die angegebene mobile Bewegung, indem der entsprechende Schlüssel
 * im Keyboard-Objekt auf "true" gesetzt wird.
 *
 * @param {string} KEY - Der zu startende Schlüssel (z.B. "LEFT", "RIGHT", "SPACE", "D").
 */
function startMobileMovement(KEY) {
    if (keyboard[KEY] !== undefined) {
        keyboard[KEY] = true;
    }
}

// Zeigt den mobilen Steuerungscontainer, wenn die Bildschirmbreite unter 950px liegt
if (window.innerWidth < 950) {
    showMovementContainer();
}

// Beispiel einer Funktion, die basierend auf dem Keyboard-Objekt den Charakter steuert
function updateCharacterMovement() {
    if (keyboard.LEFT) {
        character.moveLeft();
    }
    if (keyboard.RIGHT) {
        character.moveRight();
    }
    if (keyboard.SPACE) {
        character.jump();
    }
    if (keyboard.D) {
        character.throw();
    }
}

// Ereignislistener für Änderungen der Bildschirmgröße und -ausrichtung
window.addEventListener('resize', updateControlsVisibility);
window.addEventListener('orientationchange', updateControlsVisibility);
document.addEventListener("DOMContentLoaded", updateControlsVisibility);

function impressum() {
    // Canvas, Startbildschirm und Controls ausblenden
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    
    // Impressum einblenden
    document.getElementById('impressum').style.display = 'flex';
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