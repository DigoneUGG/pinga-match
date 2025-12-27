export class GameAudio {
    constructor(config) {
        this.config = config;
        this.isMuted = false;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.75;

        this.transitionMusic = null;
        this.backgroundMusicAudio = null;
        this.isUnlocked = false;
    }

    unlockAudioContext() {
        if (this.isUnlocked) return;

        const audio = new Audio(this.config.AUDIO_PATH + 'clique_de_botao.mp3');
        audio.volume = 0.001;

        audio.play()
            .then(() => {
                this.isUnlocked = true;
                console.log("Contexto de áudio desbloqueado com sucesso.");
            })
            .catch(e => {
                console.warn("Falha ao desbloquear o contexto de áudio:", e.message);
                this.isUnlocked = true;
            });
    }

    playAudio(fileName, loop = false) {
        const fullPath = this.config.AUDIO_PATH + fileName;

        if (this.backgroundMusicAudio && this.backgroundMusicAudio.src.includes(fileName)) {
            if (this.backgroundMusicAudio.paused) this.backgroundMusicAudio.play();
            return Promise.resolve();
        }

        if (this.backgroundMusicAudio) {
            this.backgroundMusicAudio.pause();
        }

        this.backgroundMusicAudio = new Audio(fullPath);
        this.backgroundMusicAudio.loop = loop;
        this.backgroundMusicAudio.volume = this.isMuted ? 0 : this.musicVolume;

        return this.backgroundMusicAudio.play().catch(e => console.warn("Erro ao tocar:", e));
    }

    pauseBackgroundMusic() {
        if (this.backgroundMusicAudio && !this.backgroundMusicAudio.paused) {
            this.backgroundMusicAudio.pause();
        }
    }

    resumeBackgroundMusic() {
        if (this.backgroundMusicAudio && !this.isMuted) {
            this.backgroundMusicAudio.play().catch(e => console.log("Música de fundo não pôde ser retomada automaticamente:", e));
        }
    }

    playTransitionMusic(fileName) {
        this.pauseBackgroundMusic();

        if (this.transitionMusic) {
            this.stopTransitionMusic(false);
        }

        this.transitionMusic = new Audio(this.config.AUDIO_PATH + fileName);
        this.transitionMusic.volume = this.musicVolume;
        this.transitionMusic.play().catch(e => console.log("Música de transição não pôde ser tocada:", e));
    }

    stopTransitionMusic(resumeBgMusic = true) {
        if (this.transitionMusic) {
            this.transitionMusic.pause();
            this.transitionMusic.currentTime = 0;
            this.transitionMusic = null;
        }
        if (resumeBgMusic) {
            this.resumeBackgroundMusic();
        }
    }

    playSFX(fileName) {
        const audio = new Audio(this.config.AUDIO_PATH + fileName);
        audio.volume = this.isMuted ? 0 : this.sfxVolume;
        audio.play().catch(() => { });
    }

    setMusicVolume(volume) {
        this.musicVolume = volume;
        if (this.backgroundMusicAudio && !this.isMuted) {
            this.backgroundMusicAudio.volume = volume;
        }
        if (this.transitionMusic) {
            this.transitionMusic.volume = volume;
        }
    }

    setSfxVolume(volume) {
        this.sfxVolume = volume;
    }

    toggleMute(isMuted) {
        this.isMuted = isMuted;

        if (this.backgroundMusicAudio) {
            this.backgroundMusicAudio.volume = isMuted ? 0 : this.musicVolume;
        }

        if (this.transitionMusic) {
            this.transitionMusic.volume = isMuted ? 0 : this.musicVolume;
        }
    }
}