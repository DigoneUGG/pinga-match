export class HintManager {
    constructor(gameEngine) {
        this.engine = gameEngine;
        this.inactivityTimer = null;
        this.hintInterval = null;
        this.HINT_DELAY_MS = 8000;
    }

    resetTimer() {
        this.stop();
        this.engine.ui.removeHints();
        this.inactivityTimer = setTimeout(() => {
            this.startBlink();
        }, this.HINT_DELAY_MS);
    }

    stop() {
        if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
        if (this.hintInterval) clearInterval(this.hintInterval);
        this.inactivityTimer = null;
        this.hintInterval = null;
    }

    startBlink() {
        this._findAndApply();
        this.hintInterval = setInterval(() => {
            this._findAndApply();
        }, 1500);
    }

    _findAndApply() {
        this.engine.ui.removeHints();
        const size = this.engine.size;
        const board = this.engine.board;

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const currentTile = board[r][c];
                if (!currentTile.type || currentTile.isBlocked || currentTile.isFrozen) continue;

                if (c + 1 < size) {
                    if (this._tryHintSwap(r, c, r, c + 1)) return;
                }
                if (r + 1 < size) {
                    if (this._tryHintSwap(r, c, r + 1, c)) return;
                }
            }
        }
    }

    _tryHintSwap(r1, c1, r2, c2) {
        const board = this.engine.board;
        const t2 = board[r2][c2];

        if (t2.type && !t2.isBlocked && !t2.isFrozen) {
            const type1 = board[r1][c1].type;
            const type2 = board[r2][c2].type;

            board[r1][c1].type = type2;
            board[r2][c2].type = type1;

            const matches = this.engine.matchFinder.findAllMatchesSimple(board);

            board[r1][c1].type = type1;
            board[r2][c2].type = type2;

            if (matches.length > 0) {
                this.engine.ui.showHints([{ r: r1, c: c1 }, { r: r2, c: c2 }]);
                return true;
            }
        }
        return false;
    }
}