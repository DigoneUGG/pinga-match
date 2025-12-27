import { GameUI } from './GameUI.js';
import { GameAudio } from './GameAudio.js';
import { MatchFinder } from './MatchFinder.js';
import { InputHandler } from './InputHandler.js';
import { HintManager } from './HintManager.js';
import { SpecialMoveLogic } from './SpecialMoveLogic.js';
import { BoardProcessor } from './BoardProcessor.js';
import { MovementHandler } from './MovementHandler.js';

export const SPECIAL_TILE_TYPES = {
    STRIPED_HORIZONTAL: 'STRIPED_H',
    STRIPED_VERTICAL: 'STRIPED_V',
    BOMB: 'BOMB',
    COLOR_BOMB: 'COLOR_BOMB'
};

export class GameEngine {
    constructor(boardId, config) {
        this.config = config;
        this.boardElement = document.getElementById(boardId);
        this.size = config.BOARD_SIZE;
        this.board = [];
        this.isSwapping = false;
        this.movesLeft = 0;
        this.currentLevelScore = 0;
        this.selectedTileCoords = null;
        this.phaseManager = null;
        this.phaseGoals = {};
        this.currentPhase = null;

        this.ui = new GameUI(this.boardElement, config, this.size);
        this.audio = new GameAudio(config);
        this.matchFinder = new MatchFinder(this.size);
        this.specialLogic = new SpecialMoveLogic(this.size);
        this.hintManager = new HintManager(this);
        this.inputHandler = new InputHandler(this.boardElement, this);

        this.processor = new BoardProcessor(this);
        this.movement = new MovementHandler(this);
    }

    handleTileSelect(r, c) {
        if (this.isSwapping || this.movesLeft <= 0) return;

        if (!this.selectedTileCoords) {
            this.selectedTileCoords = { r, c };
            this.ui.selectTile(r, c);
        } else {
            const { r: r1, c: c1 } = this.selectedTileCoords;
            this.ui.deselectTile(r1, c1);
            this.selectedTileCoords = null;

            if ((Math.abs(r1 - r) === 1 && c1 === c) || (Math.abs(c1 - c) === 1 && r1 === r)) {
                this.attemptMove(r1, c1, r, c);
            } else {
                this.selectedTileCoords = { r, c };
                this.ui.selectTile(r, c);
            }
        }
    }

    addScore(points) {
        this.currentLevelScore += points;
        const scoreElement = document.getElementById('score-current') || document.getElementById('user-score') || document.getElementById('score-value');
        if (scoreElement) {
            scoreElement.textContent = this.currentLevelScore;
        }
    }

    isValidCoordinate(r, c) {
        return r >= 0 && r < this.size && c >= 0 && c < this.size;
    }

    setPhaseManager(pm) { this.phaseManager = pm; }

    async startPhase(phaseData) {
        this.currentLevelScore = 0;
        const scoreElement = document.getElementById('score-current') || document.getElementById('user-score') || document.getElementById('score-value');
        if (scoreElement) {
            scoreElement.textContent = "0";
        }

        this.currentPhase = phaseData;
        this.movesLeft = phaseData.moves;
        this.phaseGoals = { ...phaseData.goals };
        this.ui.updatePhaseDisplay(this.movesLeft, phaseData.title);
        this.generateBoard(phaseData.layout);
        this.ui.renderBoard(this.board);
        this.phaseManager.updateGoalDisplay(this.phaseGoals);
        this.audio.playAudio('musica_de_fundo_1.mp3', true);
        await this.processor.checkForInitialMatches();
        this.resetInactivityTimer();
    }

    generateBoard(layout) {
        this.board = [];
        for (let row = 0; row < this.size; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.size; col++) {
                let type = layout[row][col];
                let isBlocked = type === 'B';
                let isFrozen = type === 'F';
                let tileType = isBlocked || isFrozen ? null : this.getRandomTileType();
                this.board[row][col] = {
                    type: tileType, row, col,
                    id: Date.now() + row * this.size + col,
                    isBlocked, isFrozen, special: null
                };
            }
        }
    }

    getRandomTileType() {
        return this.config.TILE_TYPES[Math.floor(Math.random() * this.config.TILE_TYPES.length)];
    }

    decrementMoves() {
        this.movesLeft--;
        document.getElementById('moves-left').textContent = this.movesLeft;
    }

    updateGoals(type) {
        if (this.phaseGoals.destroy && this.phaseGoals.destroy[type] > 0) {
            this.phaseGoals.destroy[type]--;
            this.phaseManager.updateGoalDisplay(this.phaseGoals);
        }
    }

    resetInactivityTimer() { this.hintManager.resetTimer(); }
    clearHintInterval() { this.hintManager.stop(); }

    async attemptMove(r1, c1, r2, c2) { await this.movement.attemptMove(r1, c1, r2, c2); }
    async processTurn() { await this.processor.processTurn(); }
    async checkWinLoss() { await this.processor.checkWinLoss(); }
    async shuffleBoard() { await this.processor.shuffleBoard(); }

    async triggerZecaAnimation() {
        const wasSwapping = this.isSwapping;
        this.isSwapping = true;
        await this.ui.playZecaSpecialAnimation(this.audio);
        this.isSwapping = wasSwapping;
        this.hintManager.resetTimer();
    }

    playSFX(f) { this.audio.playSFX(f); }
    toggleMute(m) { this.audio.toggleMute(m); }
    setMusicVolume(v) { this.audio.setMusicVolume(v); }
    setSfxVolume(v) { this.audio.setSfxVolume(v); }
}