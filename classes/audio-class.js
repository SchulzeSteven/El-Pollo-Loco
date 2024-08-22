class AudioManager {
    constructor() {
        this.sounds = {
            walking: new Audio('./audio/steps.mp3'),
            jumping: new Audio('./audio/jump.mp3'),
            snoring: new Audio('./audio/snore.mp3'),
            hurting: new Audio('./audio/hurt.mp3'),
            throwing: new Audio('./audio/throw.mp3')
        };

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