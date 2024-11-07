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


    /**
    * Sets the game world for this instance.
    */
    setWorld(world) {
        this.world = world;
    }


    /**
    * Plays a specified sound.
    */
    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.play();
        }
    }


    /**
    * Pauses a specified sound.
    */
    pause(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
        }
    }


    /**
    * Stops all sounds and resets their playback position.
    */
    stopAndResetSounds() {
        for (let soundName in this.sounds) {
            const sound = this.sounds[soundName];
            sound.pause();
            sound.currentTime = 0;
        }
    }


    /**
    * Plays the game-over music and pauses the background music.
    */
    playGameOverMusic() {
        this.pause('background');
        this.play('gameover');
    }


    /**
    * Plays the win music with reduced volume and pauses the background music.
    */
    playWinMusic() {
        this.pause('background');
        this.setVolume('win', 0.2);
        this.play('win');
    }


    /**
    * Sets the volume of a specified sound.
    */
    setVolume(soundName, volume) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.volume = volume;
        }
    }


    /**
    * Mutes all sounds.
    */
    muteAll() {
        this.setGlobalVolume(0);
        this.sounds.throwing.volume = 0;
    }


    /**
    * Unmutes all sounds, setting default volumes for background and throwing sounds.
    */
    unmuteAll() {
        this.setGlobalVolume(1);
        this.sounds.background.volume = 0.2;
        this.sounds.throwing.volume = 0.2;
    }


    /**
    * Sets the global volume for all sounds except the throwing sound.
    */
    setGlobalVolume(volume) {
        for (let sound in this.sounds) {
            if (sound !== 'throwing') {
                this.sounds[sound].volume = volume;
            }
        }
    }


    /**
    * Sets up a key listener to toggle mute with the 'M' key.
    */
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


    /**
    * Toggles mute for all sounds.
    * Mutes or unmutes all sounds, resuming playback if unmuted and not paused.
    */
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