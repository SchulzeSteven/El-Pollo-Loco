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
        this.isMuted = false;  
        this.world = null;
        this.setGlobalVolume(1);
        this.setupMuteToggle();
    }


    setWorld(world) {
        this.world = world;
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
            sound.pause();
            sound.currentTime = 0;
        }
    }


    playGameOverMusic() {
        this.pause('background');
        this.play('gameover');
    }


    playWinMusic() {
        this.pause('background');
        this.setVolume('win', 0.2);
        this.play('win');
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
        if (!this.muteToggleAdded) {
            window.addEventListener('keydown', (event) => {
                if (event.key === 'm' || event.key === 'M') {
                    this.toggleMute();
                }
            });
            this.muteToggleAdded = true;
        }
    }


    toggleMute() {
        this.isMuted = !this.isMuted;
        Object.values(this.sounds).forEach(sound => {
            sound.muted = this.isMuted;
            if (!this.isMuted && !sound.paused) {
                sound.play();
            }
        });
    }
}