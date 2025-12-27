export class MovementHandler {
    constructor(engine) {
        this.engine = engine;
    }

    async attemptMove(r1, c1, r2, c2) {
        const sourceTile = this.engine.board[r1][c1];
        if (!sourceTile.type || sourceTile.isBlocked || sourceTile.isFrozen) return;

        const targetTile = this.engine.board[r2][c2];
        if (targetTile.type && !targetTile.isBlocked && !targetTile.isFrozen) {
            await this.executeSwapLogic(r1, c1, r2, c2);
        } else if (sourceTile.special && targetTile.type) {
            await this.executeSwapLogic(r1, c1, r2, c2);
        }
    }

    async executeSwapLogic(r1, c1, r2, c2) {
        this.engine.isSwapping = true;
        const tile1 = this.engine.board[r1][c1];
        const tile2 = this.engine.board[r2][c2];
        const isSpecialSwap = tile1.special || tile2.special;

        if (!isSpecialSwap) {
            this.swapTypes(r1, c1, r2, c2);
            const matches = this.engine.matchFinder.findAllMatchesSimple(this.engine.board);
            this.swapTypes(r1, c1, r2, c2);

            if (matches.length === 0) {
                this.engine.ui.showMessage("Combinação inválida!", 800, 'error');
                this.engine.isSwapping = false;
                this.engine.resetInactivityTimer();
                return;
            }
        }

        await this.swapTiles(r1, c1, r2, c2);

        if (isSpecialSwap) {
            const tilesToDestroyBySpecial = this.triggerSpecialSwapEffect(r1, c1, r2, c2);
            if (tilesToDestroyBySpecial.length > 0) {
                this.engine.decrementMoves();
                await this.engine.processor.removeTiles(tilesToDestroyBySpecial);
                await this.engine.processor.applyGravityAndRefill();
                await this.engine.processor.processTurn();
                this.engine.resetInactivityTimer();
                this.engine.isSwapping = false;
                return;
            }
        }

        await this.engine.processor.processTurn();
        this.engine.resetInactivityTimer();
        this.engine.isSwapping = false;
    }

    swapTypes(r1, c1, r2, c2) {
        [this.engine.board[r1][c1].type, this.engine.board[r2][c2].type] = [this.engine.board[r2][c2].type, this.engine.board[r1][c1].type];
        [this.engine.board[r1][c1].special, this.engine.board[r2][c2].special] = [this.engine.board[r2][c2].special, this.engine.board[r1][c1].special];
    }

    async swapTiles(r1, c1, r2, c2, reverse = false) {
        this.engine.audio.playSFX('swap.mp3');
        this.swapTypes(r1, c1, r2, c2);
        await this.engine.ui.animateSwap(r1, c1, r2, c2);
        this.engine.ui.renderBoard(this.engine.board);
    }

    triggerSpecialSwapEffect(r1, c1, r2, c2) {
        const result = this.engine.specialLogic.calculateSpecialSwapEffect(this.engine.board, r1, c1, r2, c2);
        if (result.type === 'SUPER_BOMB' || result.type === 'AREA_BLAST') {
            this.engine.audio.playSFX('super_bomba.mp3');
            return result.coords;
        }
        if (result.type === 'COLOR_CLEAR') {
            this.engine.audio.playSFX('color_bomb.mp3');
            result.tileToConsume.special = null;
            result.tileToConsume.type = null;
            return result.coords;
        }
        return [];
    }
}