import { SPECIAL_TILE_TYPES } from './GameEngine.js';

export class GameUI {
    constructor(boardElement, config, size) {
        this.boardElement = boardElement;
        this.config = config;
        this.size = size;
        this.gameContainer = document.querySelector('.game-container') || document.body;
        this.logoOverlay = document.getElementById('game-logo-overlay');
        this.zecaContainer = document.getElementById('zeca-animation-container');
        this.zecaSprite = document.getElementById('zeca-sprite');
        this.zecaFrameCount = 16;
        this.zecaFramePath = this.config.ASSETS_PATH.replace('tiles/', 'zeca/frame_');
        this.initBoardStyle();
    }

    initBoardStyle() {
        this.boardElement.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        this.boardElement.style.width = '100%';
    }

    spawnFloatingScore(points, isChain = false) {
        const scoreElement = document.createElement('div');
        scoreElement.className = 'floating-score';
        scoreElement.textContent = `+${points}`;

        const target = document.getElementById('score-current') ||
            document.getElementById('user-score') ||
            document.querySelector('.score-container');

        if (!target) {
            this.showMessage(`+${points} PONTOS`, 800, 'match');
            return;
        }

        let baseSize = 2.5;
        if (points > 1000) {
            baseSize *= 1.6;
            scoreElement.classList.add('score-extra-huge');
        } else if (points > 500) {
            baseSize *= 1.4;
            scoreElement.classList.add('score-huge');
        } else if (points > 200) {
            baseSize *= 1.2;
        }

        const rect = this.boardElement.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;

        scoreElement.style.left = `${startX}px`;
        scoreElement.style.top = `${startY}px`;
        scoreElement.style.fontSize = `${baseSize}rem`;

        if (isChain) scoreElement.style.color = '#ffeb3b';

        document.body.appendChild(scoreElement);

        const targetRect = target.getBoundingClientRect();
        const diffX = targetRect.left - startX + (targetRect.width / 2);
        const diffY = targetRect.top - startY + (targetRect.height / 2);

        scoreElement.style.setProperty('--target-x', `${diffX}px`);
        scoreElement.style.setProperty('--target-y', `${diffY}px`);

        scoreElement.style.animation = 'score-pop 2.5s forwards';

        setTimeout(() => scoreElement.remove(), 2500);
    }

    async playZecaSpecialAnimation(audio) {
        if (!this.zecaContainer || !this.zecaSprite) {
            console.error("Zeca animation elements not found in DOM.");
            return;
        }

        const spriteAnimationDurationMs = 1500;
        const frameRateMs = spriteAnimationDurationMs / this.zecaFrameCount;
        let currentFrame = 1;

        audio.playSFX('especial_5.mp3');
        this.zecaContainer.classList.add('zeca-active');

        return new Promise(resolve => {
            const frameLoop = setInterval(() => {
                this.zecaSprite.style.backgroundImage = `url(${this.zecaFramePath}${currentFrame}.png)`;
                currentFrame++;
                if (currentFrame > this.zecaFrameCount) {
                    currentFrame = 1;
                }
            }, frameRateMs);

            setTimeout(() => {
                clearInterval(frameLoop);
                this.zecaContainer.classList.remove('zeca-active');
                this.zecaSprite.style.backgroundImage = '';
                resolve();
            }, spriteAnimationDurationMs);
        });
    }

    animateAllTilesDestruction(boardData) {
        const allTilesCoords = [];
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (!boardData[r][c].isBlocked) {
                    allTilesCoords.push({ r, c });
                }
            }
        }

        allTilesCoords.sort(() => Math.random() - 0.5);

        let maxDelay = 0;
        const animationDuration = 600;

        allTilesCoords.forEach(({ r, c }, index) => {
            const tile = this.getTileElement(r, c);
            if (tile) {
                const delay = index * 20;
                maxDelay = Math.max(maxDelay, delay);
                tile.style.animationDelay = `${delay}ms`;
                tile.classList.add('level-complete-destroy');
            }
        });

        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, maxDelay + animationDuration + 50);
        });
    }

    clearBoard() {
        this.boardElement.innerHTML = '';
    }

    animateLogoZoom() {
        if (!this.logoOverlay) return Promise.resolve();
        const animationDuration = 2000;
        this.logoOverlay.style.display = 'flex';
        this.logoOverlay.classList.add('zoom-level-complete');

        return new Promise(resolve => {
            setTimeout(() => {
                this.logoOverlay.classList.remove('zoom-level-complete');
                this.logoOverlay.style.display = 'none';
                this.boardElement.querySelectorAll('.tile').forEach(el => {
                    el.style.animationDelay = '';
                    el.classList.remove('level-complete-destroy');
                });
                resolve();
            }, animationDuration + 100);
        });
    }

    selectTile(r, c) {
        const tile = this.getTileElement(r, c);
        if (tile) {
            tile.classList.add('selected-tile');
            tile.style.zIndex = 100;
        }
    }

    deselectTile(r, c) {
        const tile = this.getTileElement(r, c);
        if (tile) {
            tile.classList.remove('selected-tile');
            tile.style.zIndex = '';
        }
    }

    getTileElement(r, c) {
        return document.getElementById(`tile-${r}-${c}`);
    }

    async animateGravityAndRefill(movements, finalBoardData) {
        const animationDuration = 300;
        this.renderBoard(finalBoardData);
        const animationPromises = [];

        movements.forEach(m => {
            const tileElement = this.getTileElement(m.to.r, m.to.c);
            if (!tileElement) return;

            const rowDiff = m.to.r - m.from.r;
            const translateY = rowDiff * -100;

            tileElement.style.transition = 'none';
            tileElement.style.transform = `translateY(${translateY}%)`;
            tileElement.offsetHeight;

            const p = new Promise(resolve => {
                setTimeout(() => {
                    tileElement.style.transition = `transform ${animationDuration}ms ease-in`;
                    tileElement.style.transform = '';
                    setTimeout(resolve, animationDuration);
                }, 10);
            });
            animationPromises.push(p);
        });

        await Promise.all(animationPromises);
        this.renderBoard(finalBoardData);
    }

    renderBoard(boardData) {
        this.boardElement.innerHTML = '';
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = boardData[row][col];
                const tileElement = this.createTileElement(cell, row, col);
                tileElement.id = `tile-${row}-${col}`;
                this.boardElement.appendChild(tileElement);
            }
        }
    }

    createTileElement(cell, r, c) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.row = r;
        tile.dataset.col = c;
        tile.style.gridRowStart = r + 1;
        tile.style.gridColumnStart = c + 1;

        if (cell.isBlocked) {
            tile.classList.add('tile-blocked');
            tile.style.backgroundImage = `url(${this.config.ASSETS_PATH + this.config.BLOCKED_TILE})`;
            tile.style.zIndex = 5;
        } else if (cell.isFrozen && cell.type === null) {
            tile.classList.add('tile-frozen-double');
            tile.style.backgroundImage = `url(${this.config.ASSETS_PATH + this.config.DOUBLE_FROZEN_TILE})`;
            tile.style.zIndex = 5;
        } else if (cell.isFrozen && cell.type !== null) {
            tile.classList.add('tile-frozen-single');
            tile.style.backgroundImage = `url(${this.config.ASSETS_PATH + this.config.FROZEN_TILE})`;
            tile.style.zIndex = 5;
            const colorTile = document.createElement('div');
            colorTile.classList.add('tile-color-inner');
            colorTile.style.backgroundImage = `url(${this.config.ASSETS_PATH + cell.type})`;
            tile.appendChild(colorTile);
        } else if (cell.type) {
            tile.style.backgroundImage = `url(${this.config.ASSETS_PATH + cell.type})`;
            tile.style.zIndex = 10;
        } else {
            tile.classList.add('tile-empty');
            tile.style.zIndex = 1;
        }

        if (cell.special === SPECIAL_TILE_TYPES.BOMB) {
            tile.classList.add('tile-bomb');
        } else if (cell.special && cell.special.includes('STRIPED')) {
            tile.classList.add('tile-striped');
        } else if (cell.special === SPECIAL_TILE_TYPES.COLOR_BOMB) {
            tile.classList.add('tile-color-bomb');
        }

        return tile;
    }

    async animateSwap(r1, c1, r2, c2) {
        const tile1 = this.getTileElement(r1, c1);
        const tile2 = this.getTileElement(r2, c2);
        if (!tile1 || !tile2) return new Promise(r => setTimeout(r, 150));
        const dR = r2 - r1;
        const dC = c2 - c1;
        tile1.style.transform = `translate(${dC * 100}%, ${dR * 100}%)`;
        tile2.style.transform = `translate(${dC * -100}%, ${dR * -100}%)`;
        tile1.classList.add('swapping');
        tile2.classList.add('swapping');
        await new Promise(r => setTimeout(r, 200));
        tile1.classList.remove('swapping');
        tile2.classList.remove('swapping');
    }

    async animateDestruction(coords, effectClass) {
        this.gameContainer.classList.add('screen-shake');
        const animationPromises = [];
        coords.forEach(({ r, c }) => {
            const tile = this.getTileElement(r, c);
            if (!tile) return;
            const explosion = document.createElement('div');
            explosion.classList.add('explosion-container');
            const rect = tile.getBoundingClientRect();
            const boardRect = this.boardElement.getBoundingClientRect();
            explosion.style.left = `${rect.left + rect.width / 2 - boardRect.left}px`;
            explosion.style.top = `${rect.top + rect.height / 2 - boardRect.top}px`;
            const effectImage = document.createElement('div');
            effectImage.classList.add(effectClass);
            explosion.appendChild(effectImage);
            this.boardElement.appendChild(explosion);
            tile.classList.add('destroying');
            const p = new Promise(resolve => {
                setTimeout(() => {
                    explosion.remove();
                    resolve();
                }, 400);
            });
            animationPromises.push(p);
        });
        await Promise.all(animationPromises);
        this.gameContainer.classList.remove('screen-shake');
        this.boardElement.querySelectorAll('.tile.destroying').forEach(el => {
            el.classList.remove('destroying');
        });
    }

    showMessage(text, duration = 1000, type = 'default') {
        const messageContainer = document.getElementById('floating-message-container');
        if (!messageContainer) return;
        const message = document.createElement('div');
        message.classList.add('floating-message', `message-${type}`);
        message.textContent = text;
        const offset = messageContainer.children.length * 5;
        message.style.transform = `translateY(-${offset}px)`;
        messageContainer.appendChild(message);
        setTimeout(() => {
            message.classList.add('fading-out');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, duration);
    }

    applySpecialCreationGlow(r, c, specialType) {
        const tile = this.getTileElement(r, c);
        if (tile) {
            tile.classList.add('tile-special-glow', specialType);
            setTimeout(() => {
                tile.classList.remove('tile-special-glow', specialType);
            }, 500);
        }
    }

    showHints(hintTiles) {
        this.removeHints();
        hintTiles.forEach(({ r, c }) => {
            const tile = this.getTileElement(r, c);
            if (tile) {
                tile.classList.add('hint-tile');
            }
        });
    }

    removeHints() {
        this.boardElement.querySelectorAll('.tile.hint-tile').forEach(el => {
            el.classList.remove('hint-tile');
        });
    }

    updatePhaseDisplay(movesLeft, title) {
        document.getElementById('moves-left').textContent = movesLeft;
        document.getElementById('phase-title').textContent = title;
    }

    async applyShuffleAnimation() {
        const allTiles = this.boardElement.querySelectorAll('.tile');
        allTiles.forEach((tile, index) => {
            tile.style.animationDelay = `${index * 0.01}s`;
            tile.classList.add('shuffling');
        });
        await new Promise(resolve => setTimeout(resolve, 600));
        allTiles.forEach(tile => {
            tile.classList.remove('shuffling');
            tile.style.animationDelay = '';
        });
    }
}