import { SPECIAL_TILE_TYPES } from './GameEngine.js';

export class SpecialMoveLogic {
    constructor(boardSize) {
        this.size = boardSize;
    }

    isValidCoordinate(r, c) {
        return r >= 0 && r < this.size && c >= 0 && c < this.size;
    }

    calculateSpecialSwapEffect(board, r1, c1, r2, c2) {
        const tileData1 = board[r1][c1];
        const tileData2 = board[r2][c2];

        let specialTile = tileData1.special ? tileData1 : tileData2.special ? tileData2 : null;
        let otherTile = specialTile === tileData1 ? tileData2 : tileData1;

        if (tileData1.special && tileData2.special) {
            if (tileData1.special === SPECIAL_TILE_TYPES.COLOR_BOMB || tileData2.special === SPECIAL_TILE_TYPES.COLOR_BOMB) {
                return {
                    type: 'SUPER_BOMB',
                    coords: this.getAllTilesCoordinates(board)
                };
            }
            return {
                type: 'AREA_BLAST',
                coords: this.getSuperBombEffectTiles(r1, c1)
            };
        }

        if (specialTile && specialTile.special === SPECIAL_TILE_TYPES.COLOR_BOMB && otherTile.type) {
            const typeToClear = otherTile.type;
            return {
                type: 'COLOR_CLEAR',
                targetType: typeToClear,
                coords: this.getAllTilesByType(board, typeToClear),
                tileToConsume: specialTile
            };
        }

        return { type: null, coords: [] };
    }

    getBombEffectTiles(r, c) {
        const aff = [];
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
            let nr = r + dr, nc = c + dc;
            if (this.isValidCoordinate(nr, nc)) aff.push({ r: nr, c: nc });
        }
        return aff;
    }

    getStripedEffectTiles(r, c, orientation) {
        const aff = [];
        for (let k = 0; k < this.size; k++) {
            if (orientation === 'H') aff.push({ r, c: k });
            else aff.push({ r: k, c });
        }
        return aff;
    }

    getSuperBombEffectTiles(r, c) {
        const aff = [];
        for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
            let nr = r + dr, nc = c + dc;
            if (this.isValidCoordinate(nr, nc)) aff.push({ r: nr, c: nc });
        }
        return aff;
    }

    getAllTilesCoordinates(board) {
        const all = [];
        for (let r = 0; r < this.size; r++) for (let c = 0; c < this.size; c++) {
            if (board[r][c].type && !board[r][c].isBlocked) all.push({ r, c });
        }
        return all;
    }

    getAllTilesByType(board, type) {
        const all = [];
        for (let r = 0; r < this.size; r++) for (let c = 0; c < this.size; c++) {
            if (board[r][c].type === type && !board[r][c].isBlocked) all.push({ r, c });
        }
        return all;
    }
}