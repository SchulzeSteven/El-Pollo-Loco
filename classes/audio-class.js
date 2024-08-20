class AudioManager {
    constructor() {
        this.sounds = {
            walking: new Audio('./audio/steps.mp3'),
            jumping: new Audio('./audio/jump.mp3'),
            snoring: new Audio('./audio/snore.mp3'),
            hurting: new Audio('./audio/hurt.mp3'),
            throwing: new Audio('./audio/throw.mp3')
        };

        // Set specific volume for throwing sound
        this.sounds.throwing.volume = 0.2;

        // Set global volume for other sounds
        this.setGlobalVolume(1);
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
        this.sounds.throwing.volume = 0;  // Ensure throwing sound is muted as well
    }

    unmuteAll() {
        this.setGlobalVolume(1);
        this.sounds.throwing.volume = 0.2;  // Reapply specific volume for throwing sound
    }

    setGlobalVolume(volume) {
        for (let sound in this.sounds) {
            if (sound !== 'throwing') {  // Keep specific volume for "throwing"
                this.sounds[sound].volume = volume;
            }
        }
    }
}
