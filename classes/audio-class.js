class AudioManager {
    constructor() {
        this.sounds = {
            walking: new Audio('./audio/steps.mp3'),
            jumping: new Audio('./audio/jump.mp3'),
            snoring: new Audio('./audio/snore.mp3'),
            hurting: new Audio('./audio/hurt.mp3'),
            throwing: new Audio('./audio/throw.mp3'),
            background: new Audio('./audio/backgroundMusic.mp3'),
            gameover: new Audio('./audio/gameover.mp3'),
            win: new Audio('./audio/win.mp3'),
            chickenSmallHit: new Audio('./audio/chickenSmall.mp3'),
            chickenBigHit: new Audio('./audio/chicken_big.mp3'),
        };

        this.sounds.background.volume = 0.2;
        this.sounds.throwing.volume = 0.2;
        this.setGlobalVolume(1);

        this.isMuted = false;  
        this.world = null;  // Referenz auf die World-Instanz

        this.setupMuteToggle();  // Mute-Toggle-Listener einrichten
    }

    setWorld(world) {
        this.world = world;  // Welt-Instanz setzen
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.play();
        }
    }

    pause(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
        }
    }

    stopAndResetSounds() {
        for (let soundName in this.sounds) {
            const sound = this.sounds[soundName];
            sound.pause();              // Stoppt den Sound
            sound.currentTime = 0;      // Setzt die Wiedergabeposition auf Anfang
        }
    }

    playGameOverMusic() {
        this.pause('background');  // Hintergrundmusik anhalten
        this.play('gameover');     // Gameover-Sound abspielen
    }

    playWinMusic() {
        this.pause('background');  // Hintergrundmusik anhalten
        this.setVolume('win', 0.2);
        this.play('win');          // Win-Sound abspielen
    }

    setVolume(soundName, volume) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.volume = volume;
        }
    }

    muteAll() {
        this.setGlobalVolume(0);
        this.sounds.throwing.volume = 0;
    }

    unmuteAll() {
        this.setGlobalVolume(1);
        this.sounds.background.volume = 0.2;
        this.sounds.throwing.volume = 0.2;
    }

    setGlobalVolume(volume) {
        for (let sound in this.sounds) {
            if (sound !== 'throwing') {
                this.sounds[sound].volume = volume;
            }
        }
    }

    setupMuteToggle() {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'm' || event.key === 'M') {
                this.toggleMute();
            }
        });
    }

    toggleMute() {
    this.isMuted = !this.isMuted;
    this.isMuted ? this.muteAll() : this.unmuteAll();
    
    if (this.world) {
        this.world.clearCanvas();  // Canvas leeren
        this.world.draw();  // Die Welt neu zeichnen
    }
}
}