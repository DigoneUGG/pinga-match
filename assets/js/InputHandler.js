export class InputHandler {
    constructor(boardElement, gameEngine) {
        this.boardElement = boardElement;
        this.gameEngine = gameEngine;

        this.isMouseDown = false;
        this.initialX = 0;
        this.initialY = 0;
        this.dragStartTileCoords = null;

        this.setupListeners();
    }

    setupListeners() {
        this.boardElement.addEventListener('mousedown', this.handleDragStart.bind(this));
        document.addEventListener('mouseup', this.handleDragEnd.bind(this));

        this.boardElement.addEventListener('touchstart', this.handleDragStart.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleDragEnd.bind(this));

        this.boardElement.addEventListener('touchmove', (e) => {
            if (this.isMouseDown) e.preventDefault();
        }, { passive: false });
    }

    handleDragStart(event) {
        if (this.gameEngine.isSwapping || this.gameEngine.movesLeft <= 0) return;

        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;

        const rect = this.boardElement.getBoundingClientRect();
        const tileX = clientX - rect.left;
        const tileY = clientY - rect.top;

        const tileSize = rect.width / this.gameEngine.size;
        const col = Math.floor(tileX / tileSize);
        const row = Math.floor(tileY / tileSize);

        if (this.gameEngine.isValidCoordinate(row, col)) {
            this.isMouseDown = true;
            this.initialX = clientX;
            this.initialY = clientY;
            this.dragStartTileCoords = { row, col };
            this.gameEngine.handleTileSelect(row, col);
        }
    }

    async handleDragEnd(event) {
        if (!this.dragStartTileCoords) return;

        const startCoords = this.dragStartTileCoords;
        this.dragStartTileCoords = null;

        const clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        const clientY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;

        const deltaX = clientX - this.initialX;
        const deltaY = clientY - this.initialY;

        const threshold = this.gameEngine.config.TILE_SIZE ? this.gameEngine.config.TILE_SIZE * 0.25 : 30;

        let targetRow = startCoords.row;
        let targetCol = startCoords.col;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > threshold || absDeltaY > threshold) {
            if (absDeltaX > absDeltaY) {
                targetCol += (deltaX > 0 ? 1 : -1);
            } else {
                targetRow += (deltaY > 0 ? 1 : -1);
            }

            if (this.gameEngine.isValidCoordinate(targetRow, targetCol)) {
                await this.gameEngine.attemptMove(startCoords.row, startCoords.col, targetRow, targetCol);
            }
        } else {
            this.gameEngine.handleTileSelect(startCoords.row, startCoords.col);
        }

        if (this.gameEngine.movesLeft > 0) {
            this.gameEngine.resetInactivityTimer();
        }
    }
}