import { LEVELS } from './LevelConfig.js';
import { ThemeManager } from './ThemeManager.js';
import { db, auth, doc, setDoc, salvarProgressoNoFirebase, salvarPontuacaoNoFirebase } from './FirebaseService.js';

export class PhaseManager {
    constructor(gameEngine, config) {
        this.gameEngine = gameEngine;
        this.config = config;
        this.goalPanel = document.querySelector('.goals-panel');
        this.themeManager = new ThemeManager(this.gameEngine, this.config);
        this.mapContainer = document.getElementById('map-container');
        this.gameContainer = document.getElementById('game-view');
        this.victoryModal = document.getElementById('victory-modal');
        this.btnNextLevel = document.getElementById('btn-next-level');
        this.btnExitLevel = document.getElementById('btn-exit-level');
        this.defeatModal = document.getElementById('defeat-modal');
        this.btnRetryLevel = document.getElementById('btn-retry-level');
        this.btnExitDefeat = document.getElementById('btn-exit-defeat');
        this.startModal = document.getElementById('phase-start-modal');
        this.startModalTitle = document.getElementById('start-modal-title');
        this.startModalGoals = document.getElementById('start-modal-goals');
        this.btnStartLevel = document.getElementById('btn-start-level');
        this.currentLevelId = 1;
        this.maxLevelReached = this.loadProgress();
        this.themeManager.updateTheme(this.currentLevelId);
        this.initMap();
        this.setupVictoryListeners();
        this.setupDefeatListeners();
        this.setupStartModalListener();
    }

    setupVictoryListeners() {
        this.btnNextLevel.addEventListener('click', () => {
            this.victoryModal.classList.remove('open');
            this.setupLevel(this.currentLevelId + 1);
            this.gameEngine.playSFX('clique_de_botao.mp3');
        });

        this.btnExitLevel.addEventListener('click', () => {
            this.victoryModal.classList.remove('open');
            this.showMap();
            this.gameEngine.playSFX('clique_de_botao.mp3');
        });
    }

    setupDefeatListeners() {
        this.btnRetryLevel.addEventListener('click', () => {
            this.defeatModal.classList.remove('open');
            this.setupLevel(this.currentLevelId);
            this.gameEngine.playSFX('clique_de_botao.mp3');
        });

        this.btnExitDefeat.addEventListener('click', () => {
            this.defeatModal.classList.remove('open');
            this.onLevelFail();
            this.gameEngine.playSFX('clique_de_botao.mp3');
        });
    }

    setupStartModalListener() {
        this.btnStartLevel.addEventListener('click', () => {
            this.startLevel(this.currentLevelId);
        });
    }

    async startLevel(levelId) {
        const level = LEVELS.find(l => l.id === levelId);
        if (!level) return;

        this.currentLevelId = levelId;

        const themeIndex = Math.ceil(levelId / 10);
        const musicFile = `musica_de_fundo_${themeIndex}.mp3`;

        this.gameEngine.playSFX('clique_de_botao.mp3');
        this.gameEngine.audio.stopTransitionMusic();

        if (this.gameEngine.audio.pauseBackgroundMusic) {
            this.gameEngine.audio.pauseBackgroundMusic();
        } else if (this.gameEngine.audio.backgroundMusicAudio) {
            this.gameEngine.audio.backgroundMusicAudio.pause();
        }

        this.gameEngine.audio.playAudio(musicFile, true);

        this.gameEngine.startPhase(level);
        this.showGame();
        this.startModal.classList.remove('open');
    }

    loadProgress() {
        const progress = localStorage.getItem('maxLevelReached');
        return progress ? parseInt(progress, 10) : 1;
    }

    saveProgress() {
        localStorage.setItem('maxLevelReached', this.maxLevelReached);
    }

    initMap() {
        const list = this.mapContainer.querySelector('#level-list');
        if (!list) return;
        list.innerHTML = '';

        LEVELS.forEach(level => {
            const btn = document.createElement('button');
            btn.classList.add('level-btn');
            btn.id = `level-btn-${level.id}`;
            btn.dataset.levelId = level.id;
            btn.textContent = level.id;

            if (level.id > this.maxLevelReached) {
                btn.disabled = true;
                btn.classList.add('locked');
            } else if (level.id === this.maxLevelReached) {
                btn.classList.add('current-level-blinking');
            }

            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.levelId);
                if (id <= this.maxLevelReached) {
                    this.setupLevel(id);
                    this.gameEngine.playSFX('clique_de_botao.mp3');
                } else {
                    this.gameEngine.playSFX('erro.mp3');
                }
            });

            list.appendChild(btn);
        });

        setTimeout(() => this.scrollToCurrentLevel(), 100);
    }

    setupLevel(levelId) {
        const levelData = LEVELS.find(l => l.id === levelId);
        if (!levelData) return;

        this.currentLevelId = levelId;
        this.themeManager.updateTheme(this.currentLevelId);
        this.showPhaseStartModal(levelData);
    }

    showPhaseStartModal(levelData) {
        this.startModalTitle.textContent = `Fase ${levelData.id} - ${levelData.title || 'Novo Desafio'}`;
        this._renderGoalPanel(this.startModalGoals, levelData.goals);
        this.gameEngine.audio.playTransitionMusic('musica_transicao.mp3');
        this.startModal.classList.add('open');
    }

    _renderGoalPanel(panelElement, goals) {
        panelElement.innerHTML = '';
        const tileAssets = this.config.ASSETS_PATH;

        if (goals.destroy) {
            for (const [tileType, count] of Object.entries(goals.destroy)) {
                if (count > 0) {
                    const item = document.createElement('div');
                    item.classList.add('goal-item');

                    const typePath = this.config.TILE_TYPES.includes(tileType)
                        ? tileType
                        : tileType === 'BLOCKED'
                            ? this.config.BLOCKED_TILE
                            : this.config.TILE_TYPES[0];

                    item.innerHTML = `
                        <img src="${tileAssets}${typePath}" alt="Objetivo: ${tileType}">
                        <span class="goal-count">x${count}</span>
                    `;
                    panelElement.appendChild(item);
                }
            }
        }

        if (goals.moves !== undefined) {
            const item = document.createElement('div');
            item.classList.add('goal-item');
            item.innerHTML = `
                <img src="assets/img/icones/moves.png" alt="Movimentos">
                <span class="goal-count">Max. ${goals.moves}</span>
            `;
            panelElement.appendChild(item);
        }
    }

    showScoreModal(score) {
        return new Promise(resolve => {
            const modal = document.getElementById('level-score-modal');
            document.getElementById('points-gained').textContent = score;
            modal.classList.add('open');

            document.getElementById('btn-continue-from-score').onclick = () => {
                modal.classList.remove('open');
                resolve();
            };
        });
    }

    async onLevelComplete() {
        this.gameEngine.playSFX('vitoria.mp3');
        await this.showScoreModal(this.gameEngine.currentLevelScore);

        if (auth.currentUser) {
            await salvarPontuacaoNoFirebase(
                auth.currentUser.uid,
                auth.currentUser.displayName,
                this.gameEngine.currentLevelScore
            );
        }

        this.victoryModal.classList.add('open');

        if (this.currentLevelId === this.maxLevelReached) {
            this.maxLevelReached++;
            this.saveProgress();
            this.updateMapButtons();

            if (auth.currentUser) {
                salvarProgressoNoFirebase(auth.currentUser.uid, this.maxLevelReached);
            }
        }
    }

    onLevelDefeat() {
        this.defeatModal.classList.add('open');
        this.gameEngine.playSFX('sem_jogadas.mp3');
    }

    onLevelFail() {
        this.gameEngine.audio.stopTransitionMusic(false);
        this.showMap();
    }

    showMap() {
        this.mapContainer.style.display = 'flex';
        this.gameContainer.style.display = 'none';

        if (this.gameEngine.audio.pauseBackgroundMusic) {
            this.gameEngine.audio.pauseBackgroundMusic();
        } else if (this.gameEngine.audio.backgroundMusicAudio) {
            this.gameEngine.audio.backgroundMusicAudio.pause();
        }

        this.gameEngine.audio.playAudio('musica_de_fundo_2.mp3', true);

        // Adicionei aqui também para garantir o scroll na volta do jogo
        setTimeout(() => this.scrollToCurrentLevel(), 100);
    }

    showGame() {
        this.mapContainer.style.display = 'none';
        this.gameContainer.style.display = 'flex';
    }

    updatePhaseDisplay(movesLeft, title) {
        document.getElementById('moves-left').textContent = movesLeft;
        document.getElementById('phase-title').textContent = title;
    }

    updateGoalDisplay(goals) {
        this._renderGoalPanel(this.goalPanel, goals);
    }

    updateMapButtons() {
        this.initMap();

        setTimeout(() => {
            const levelList = document.querySelector('.level-list');
            const currentBtn = document.querySelector(`.level-btn[data-id="${this.maxLevelReached}"]`);

            if (levelList && currentBtn) {
                const targetScroll = currentBtn.offsetTop - (levelList.offsetHeight / 2) + (currentBtn.offsetHeight / 2);
                levelList.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    scrollToCurrentLevel() {
        const targetId = `level-btn-${this.maxLevelReached}`;
        const targetBtn = document.getElementById(targetId);
        const levelList = document.querySelector('.level-list');

        if (targetBtn && levelList) {
            targetBtn.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }
}