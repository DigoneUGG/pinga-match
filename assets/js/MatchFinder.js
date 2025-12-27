import { SPECIAL_TILE_TYPES } from './GameEngine.js';

export class MatchFinder {
    constructor(boardSize) {
        this.size = boardSize;
    }

    findComplexMatches(board) {
        const allMatches = [];
        const size = this.size;

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const tileData = board[r][c];
                const type = tileData.type;

                if (!type || tileData.isBlocked || tileData.special) continue;

                let hMatch = [{ r, c, tile: tileData }];
                for (let k = c + 1; k < size; k++) {
                    const nextTile = board[r][k];
                    if (nextTile && nextTile.type === type && !nextTile.isBlocked && !nextTile.special) {
                        hMatch.push({ r, c: k, tile: nextTile });
                    } else break;
                }
                if (hMatch.length >= 3) {
                    allMatches.push({ tiles: hMatch, orientation: 'H', tileType: type });
                    c += hMatch.length - 1;
                }

                let vMatch = [{ r, c, tile: tileData }];
                for (let k = r + 1; k < size; k++) {
                    const nextTile = board[k][c];
                    if (nextTile && nextTile.type === type && !nextTile.isBlocked && !nextTile.special) {
                        vMatch.push({ r: k, c, tile: nextTile });
                    } else break;
                }
                if (vMatch.length >= 3) {
                    allMatches.push({ tiles: vMatch, orientation: 'V', tileType: type });
                }
            }
        }

        const matchedCoordinates = new Set();
        const complexMatches = [];
        const lineMatchesByType = allMatches.reduce((acc, match) => {
            if (!acc[match.tileType]) acc[match.tileType] = [];
            acc[match.tileType].push(match.tiles);
            return acc;
        }, {});

        for (const type in lineMatchesByType) {
            const lines = lineMatchesByType[type];
            for (let i = 0; i < lines.length; i++) {
                for (let j = i + 1; j < lines.length; j++) {
                    const line1 = lines[i];
                    const line2 = lines[j];
                    const intersection = line1.find(t1 => line2.some(t2 => t1.r === t2.r && t1.c === t2.c));

                    if (intersection) {
                        const combined = [...line1, ...line2];
                        const uniqueTiles = [];
                        const tileSet = new Set();
                        combined.forEach(t => {
                            const key = `${t.r}-${t.c}`;
                            if (!tileSet.has(key)) {
                                tileSet.add(key);
                                uniqueTiles.push(t);
                            }
                        });
                        if (uniqueTiles.length >= 5) {
                            complexMatches.push({ type: SPECIAL_TILE_TYPES.BOMB, tiles: uniqueTiles, center: intersection });
                            uniqueTiles.forEach(t => matchedCoordinates.add(`${t.r}-${t.c}`));
                        }
                    }
                }
            }
        }

        allMatches.forEach(match => {
            const tiles = match.tiles.filter(t => !matchedCoordinates.has(`${t.r}-${t.c}`));
            if (tiles.length === 0) return;

            if (tiles.length >= 5) {
                complexMatches.push({ type: SPECIAL_TILE_TYPES.COLOR_BOMB, tiles: tiles, center: tiles[Math.floor(tiles.length / 2)] });
                tiles.forEach(t => matchedCoordinates.add(`${t.r}-${t.c}`));
            } else if (tiles.length === 4) {
                const specialType = match.orientation === 'H' ? SPECIAL_TILE_TYPES.STRIPED_HORIZONTAL : SPECIAL_TILE_TYPES.STRIPED_VERTICAL;
                complexMatches.push({ type: specialType, tiles: tiles, center: tiles[Math.floor(tiles.length / 2)] });
                tiles.forEach(t => matchedCoordinates.add(`${t.r}-${t.c}`));
            } else {
                tiles.forEach(t => matchedCoordinates.add(`${t.r}-${t.c}`));
            }
        });

        return {
            matchedCoordinates: Array.from(matchedCoordinates).map(key => {
                const [r, c] = key.split('-').map(Number);
                return { r, c };
            }),
            complexMatches: complexMatches
        };
    }

    findAllMatchesSimple(board) {
        const matches = new Set();
        const addTileToMatches = (r, c) => matches.add(`${r}-${c}`);

        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                const tileData = board[r][c];
                const type = tileData.type;

                if (!type || tileData.isBlocked) continue;

                if (c + 2 < this.size) {
                    if (board[r][c + 1].type === type && board[r][c + 2].type === type) {
                        for (let k = 0; c + k < this.size && board[r][c + k]?.type === type; k++) addTileToMatches(r, c + k);
                    }
                }
                if (r + 2 < this.size) {
                    if (board[r + 1][c].type === type && board[r + 2][c].type === type) {
                        for (let k = 0; r + k < this.size && board[r + k][c]?.type === type; k++) addTileToMatches(r + k, c);
                    }
                }
            }
        }
        return Array.from(matches).map(key => {
            const [r, c] = key.split('-').map(Number);
            return { r, c };
        });
    }
}