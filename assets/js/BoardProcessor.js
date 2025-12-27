import { SPECIAL_TILE_TYPES } from './GameEngine.js';

export class BoardProcessor {
    constructor(engine) {
        this.engine = engine;
    }

    async processTurn() {
        let chainReaction = 0;
        if (this.engine.isSwapping) this.engine.decrementMoves();
        do {
            const result = this.engine.matchFinder.findComplexMatches(this.engine.board);
            const createdSpecialCoords = this.applyNewSpecials(result.complexMatches);
            const allTilesToClear = [...result.matchedCoordinates, ...createdSpecialCoords.filter(c => !this.engine.board[c.r][c.c].special)];
            createdSpecialCoords.filter(c => this.engine.board[c.r][c.c].special).forEach(c => allTilesToClear.push(c));

            if (allTilesToClear.length === 0) break;

            chainReaction++;

            const pontosDestaRodada = allTilesToClear.length * 10 * chainReaction;

            this.engine.addScore(pontosDestaRodada);

            if (this.engine.ui && this.engine.ui.spawnFloatingScore) {
                this.engine.ui.spawnFloatingScore(pontosDestaRodada, chainReaction > 1);
            }

            if (chainReaction > 1) this.engine.ui.showMessage(`Combinação em cadeia! (x${chainReaction})`, 500, 'match');
            await this.removeTiles(allTilesToClear);
            await this.applyGravityAndRefill();
        } while (true);
        await this.checkWinLoss();
    }

    applyNewSpecials(complexMatches) {
        let createdCoords = [];
        complexMatches.forEach(match => {
            const { r, c } = match.center;
            if (!this.engine.board[r][c].special) {
                this.engine.board[r][c].special = match.type;
                createdCoords.push({ r, c });
                this.engine.ui.applySpecialCreationGlow(r, c, match.type);
            }
        });
        if (createdCoords.length > 0) this.engine.audio.playSFX('especial_5.mp3');
        return createdCoords;
    }

    async removeTiles(matches) {
        const allTilesToClear = this.getTilesActivatedByMatches(matches);
        await this.engine.ui.animateDestruction(allTilesToClear, 'explosao');
        this.engine.audio.playSFX('destruicao_simples.mp3');
        for (const { r, c } of allTilesToClear) {
            const cell = this.engine.board[r][c];
            this.crackAdjacentTiles(r, c);
            this.removeFrozenAdjacentTiles(r, c);
            if (cell.type) this.engine.updateGoals(cell.type);
            if (cell.isFrozen) {
                cell.isFrozen = false;
                this.engine.audio.playSFX('gelo_quebrando.mp3');
                this.engine.ui.showMessage("Gelo Quebrado!", 500);
            }
            cell.type = null;
            cell.special = null;
        }
        this.engine.ui.renderBoard(this.engine.board);
    }

    getTilesActivatedByMatches(matches) {
        const tilesToClear = new Set(matches.map(t => `${t.r}-${t.c}`));
        const toProcess = [...matches];
        while (toProcess.length > 0) {
            const { r, c } = toProcess.pop();
            const tile = this.engine.board[r][c];
            if (!tile || !tile.special) continue;
            tilesToClear.add(`${r}-${c}`);
            let eff = [];
            if (tile.special === SPECIAL_TILE_TYPES.BOMB) eff = this.engine.specialLogic.getBombEffectTiles(r, c);
            else if (tile.special.includes('STRIPED')) {
                const orientation = tile.special.includes('H') ? 'H' : 'V';
                eff = this.engine.specialLogic.getStripedEffectTiles(r, c, orientation);
            }
            eff.forEach(t => {
                const key = `${t.r}-${t.c}`;
                if (!tilesToClear.has(key)) { tilesToClear.add(key); toProcess.push(t); }
            });
            tile.special = null;
        }
        return Array.from(tilesToClear).map(k => {
            const [r, c] = k.split('-').map(Number); return { r, c };
        });
    }

    async applyGravityAndRefill() {
        const movements = [];
        let moved = false;
        for (let col = 0; col < this.engine.size; col++) {
            let empty = 0;
            for (let row = this.engine.size - 1; row >= 0; row--) {
                const cell = this.engine.board[row][col];
                if (cell.isBlocked) { empty = 0; continue; }
                if (cell.type === null && !cell.isFrozen) empty++;
                else if (empty > 0) {
                    const targetRow = row + empty;
                    movements.push({ type: 'move', from: { r: row, c: col }, to: { r: targetRow, c: col }, tileData: { ...cell, row: targetRow, col: col } });
                    this.engine.board[targetRow][col].type = cell.type;
                    this.engine.board[targetRow][col].special = cell.special;
                    cell.type = null;
                    cell.special = null;
                    moved = true;
                }
            }
        }
        for (let col = 0; col < this.engine.size; col++) {
            for (let row = 0; row < this.engine.size; row++) {
                const cell = this.engine.board[row][col];
                if (cell.type === null && !cell.isBlocked && !cell.isFrozen) {
                    const newType = this.engine.getRandomTileType();
                    movements.push({ type: 'new', from: { r: row - this.engine.size, c: col }, to: { r: row, c: col }, tileData: { type: newType, special: null, isBlocked: false, isFrozen: false, row, col } });
                    cell.type = newType;
                    moved = true;
                }
            }
        }
        if (moved) {
            this.engine.audio.playSFX('embaralhar.mp3');
            await this.engine.ui.animateGravityAndRefill(movements, this.engine.board);
        }
    }

    crackAdjacentTiles(r, c) {
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let cracked = false;
        dirs.forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc;
            if (this.engine.isValidCoordinate(nr, nc)) {
                const n = this.engine.board[nr][nc];
                if (n.isFrozen && !n.isBlocked && n.type === null) {
                    n.type = this.engine.getRandomTileType();
                    cracked = true;
                }
            }
        });
        if (cracked) {
            this.engine.audio.playSFX('gelo_quebrando.mp3');
            this.engine.ui.showMessage("Gelo Rachado!", 500);
            this.engine.ui.renderBoard(this.engine.board);
        }
    }

    removeFrozenAdjacentTiles(r, c) {
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let unfreezed = false;
        dirs.forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc;
            if (this.engine.isValidCoordinate(nr, nc)) {
                const n = this.engine.board[nr][nc];
                if (n.isFrozen && !n.isBlocked && n.type !== null) {
                    n.isFrozen = false;
                    unfreezed = true;
                }
            }
        });
        if (unfreezed) {
            this.engine.audio.playSFX('gelo_quebrando.mp3');
            this.engine.ui.showMessage("Gelo Quebrado!", 500);
        }
    }

    async checkForInitialMatches() {
        let attempts = 0;
        let boardIsPlayable = false;
        while (!boardIsPlayable && attempts < 100) {
            let matches = this.engine.matchFinder.findAllMatchesSimple(this.engine.board);
            let validMoves = this.hasValidMoves();
            if (matches.length === 0 && validMoves) boardIsPlayable = true;
            else { await this.shuffleBoard(); attempts++; }
        }
    }

    async shuffleBoard() {
        this.engine.isSwapping = true;
        this.engine.audio.playSFX('embaralhar.mp3');
        await this.engine.ui.applyShuffleAnimation();
        for (let r = 0; r < this.engine.size; r++) for (let c = 0; c < this.engine.size; c++) {
            if (this.engine.board[r][c].type || (!this.engine.board[r][c].isBlocked && !this.engine.board[r][c].isFrozen)) {
                this.engine.board[r][c].type = this.engine.getRandomTileType();
                this.engine.board[r][c].special = null;
            }
        }
        this.engine.ui.renderBoard(this.engine.board);
        this.engine.isSwapping = false;
        this.engine.resetInactivityTimer();
    }

    hasValidMoves() {
        for (let r = 0; r < this.engine.size; r++) {
            for (let c = 0; c < this.engine.size; c++) {
                const t1 = this.engine.board[r][c];
                if (!t1.type || t1.isBlocked || t1.isFrozen) continue;
                if (c + 1 < this.engine.size) {
                    const t2 = this.engine.board[r][c + 1];
                    if (t2.type && !t2.isBlocked && !t2.isFrozen) {
                        this.engine.movement.swapTypes(r, c, r, c + 1);
                        const m = this.engine.matchFinder.findAllMatchesSimple(this.engine.board);
                        this.engine.movement.swapTypes(r, c, r, c + 1);
                        if (m.length > 0) return true;
                    }
                }
                if (r + 1 < this.engine.size) {
                    const t2 = this.engine.board[r + 1][c];
                    if (t2.type && !t2.isBlocked && !t2.isFrozen) {
                        this.engine.movement.swapTypes(r, c, r + 1, c);
                        const m = this.engine.matchFinder.findAllMatchesSimple(this.engine.board);
                        this.engine.movement.swapTypes(r, c, r + 1, c);
                        if (m.length > 0) return true;
                    }
                }
            }
        }
        return false;
    }

    async checkWinLoss() {
        const hasGoals = Object.values(this.engine.phaseGoals.destroy || {}).some(c => c > 0);
        if (!hasGoals) {
            this.engine.clearHintInterval();
            await this.playLevelCompleteAnimation();
            if (this.engine.phaseManager) this.engine.phaseManager.onLevelComplete();
            return;
        }
        if (this.engine.movesLeft <= 0) {
            this.engine.ui.showMessage("Sem jogadas!", 1500, 'loss');
            this.engine.clearHintInterval();
            setTimeout(() => {
                if (this.engine.phaseManager) this.engine.phaseManager.onLevelDefeat();
                else alert("Acabaram os movimentos!");
            }, 1000);
            return;
        }
        if (!this.hasValidMoves()) {
            this.engine.ui.showMessage("Embaralhando...", 1500);
            await this.shuffleBoard();
        }
    }

    async playLevelCompleteAnimation() {
        this.engine.ui.showMessage("Fase Concluída!", 3000, 'win');
        this.engine.audio.playSFX('pingamatch.mp3');
        await this.engine.ui.animateAllTilesDestruction(this.engine.board);
        this.engine.ui.clearBoard();
        await this.engine.ui.animateLogoZoom();
    }
}