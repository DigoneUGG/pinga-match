import { GameEngine } from './GameEngine.js';
import { PhaseManager } from './PhaseManager.js';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, carregarProgressoDoFirebase, buscarRankingGlobal } from './FirebaseService.js';

document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mapContainer = document.getElementById('map-container');
    const btnPlay = document.getElementById('btn-play');
    const btnSettingsWelcome = document.getElementById('btn-settings-welcome');
    const btnLoginGoogle = document.getElementById('btn-login-google');
    const btnLogoutGoogle = document.getElementById('btn-logout-google');
    const userInfo = document.getElementById('user-info');
    const userNameDisplay = document.getElementById('user-name');
    const userNameMap = document.getElementById('user-name-map');

    const configModal = document.getElementById('config-modal');
    const btnConfig = document.getElementById('btn-config');
    const btnExitModal = document.getElementById('btn-exit-modal');
    const btnMuteToggle = document.getElementById('btn-mute-toggle');
    const musicVolumeRange = document.getElementById('music-volume');
    const sfxVolumeRange = document.getElementById('sfx-volume');

    const exitConfirmModal = document.getElementById('exit-confirm-modal');
    const btnModalSair = document.getElementById('btn-modal-sair');
    const btnModalContinuar = document.getElementById('btn-modal-continuar');

    const btnOpenRanking = document.getElementById('btn-ranking-map');
    const btnRankingGame = document.getElementById('btn-ranking-map-game');
    const rankingScreen = document.getElementById('ranking-screen');
    const btnBackRanking = document.getElementById('btn-back-from-ranking');

    let gameEngine;
    let phaseManager;
    let isAppReady = false;

    setTimeout(() => {
        gameEngine = new GameEngine('game-board', window.GAME_CONFIG);
        phaseManager = new PhaseManager(gameEngine, window.GAME_CONFIG);
        gameEngine.setPhaseManager(phaseManager);

        gameEngine.setMusicVolume(musicVolumeRange.value / 100);
        gameEngine.setSfxVolume(sfxVolumeRange.value / 100);

        splashScreen.style.display = 'none';
        isAppReady = true;

        checkAuthState(auth.currentUser);
    }, 4000);

    const checkAuthState = async (user) => {
        if (!isAppReady) return;

        if (user) {
            if (btnLoginGoogle) btnLoginGoogle.parentElement.style.display = 'none';
            if (btnLogoutGoogle) btnLogoutGoogle.style.display = 'block';
            if (userInfo) userInfo.style.display = 'block';
            if (userNameDisplay) userNameDisplay.textContent = `Olá, ${user.displayName.split(' ')[0]}`;
            if (userNameMap) userNameMap.textContent = user.displayName;

            const nivelNuvem = await carregarProgressoDoFirebase(user.uid);
            if (nivelNuvem && phaseManager) {
                if (nivelNuvem > phaseManager.maxLevelReached) {
                    phaseManager.maxLevelReached = nivelNuvem;
                    phaseManager.saveProgress();
                    phaseManager.updateMapButtons();
                }
            }

            welcomeScreen.style.display = 'none';
            mapContainer.style.display = 'flex';
            if (phaseManager) phaseManager.showMap();
        } else {
            if (btnLoginGoogle) btnLoginGoogle.parentElement.style.display = 'flex';
            if (btnLogoutGoogle) btnLogoutGoogle.style.display = 'none';
            if (userInfo) userInfo.style.display = 'none';
            if (welcomeScreen) welcomeScreen.style.display = 'flex';
            if (mapContainer) mapContainer.style.display = 'none';
        }
    };

    onAuthStateChanged(auth, (user) => {
        checkAuthState(user);
    });

    btnLoginGoogle.addEventListener('click', async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    });

    btnLogoutGoogle.addEventListener('click', () => {
        signOut(auth).then(() => {
            location.reload();
        }).catch((error) => {
            console.error(error);
        });
    });

    btnPlay.addEventListener('click', () => {
        if (!gameEngine || !phaseManager) return;

        if (gameEngine.audio) {
            gameEngine.audio.unlockAudioContext();
        }

        gameEngine.playSFX('clique_de_botao.mp3');
        welcomeScreen.style.display = 'none';
        mapContainer.style.display = 'flex';

        phaseManager.showMap();
    });

    const abrirRanking = async () => {
        if (gameEngine) gameEngine.playSFX('clique_de_botao.mp3');

        const rankingData = await buscarRankingGlobal();
        const listContainer = document.getElementById('global-ranking-list');
        listContainer.innerHTML = '';

        rankingData.forEach((user, index) => {
            const isTop10 = index < 10;
            const item = document.createElement('div');
            item.className = `rank-item ${isTop10 ? 'top-10' : ''}`;
            item.innerHTML = `
                <span>${index + 1}º ${user.userName || 'Anônimo'}</span>
                <span>${(user.totalScore || 0).toLocaleString()} PTS</span>
            `;
            listContainer.appendChild(item);

            if (auth.currentUser && user.id === auth.currentUser.uid) {
                document.getElementById('user-pos').textContent = `${index + 1}º`;
                document.getElementById('user-name-rank').textContent = user.userName;
                document.getElementById('user-score-rank').textContent = `${(user.totalScore || 0).toLocaleString()} PTS`;
            }
        });

        rankingScreen.style.display = 'flex';
    };

    if (btnOpenRanking) btnOpenRanking.addEventListener('click', abrirRanking);
    if (btnRankingGame) btnRankingGame.addEventListener('click', abrirRanking);

    btnBackRanking.addEventListener('click', () => {
        rankingScreen.style.display = 'none';
        if (gameEngine) gameEngine.playSFX('clique_de_botao.mp3');
    });

    btnSettingsWelcome.addEventListener('click', () => {
        if (!gameEngine) return;
        configModal.classList.add('open');
        gameEngine.playSFX('clique_de_botao.mp3');
    });

    btnConfig.addEventListener('click', () => {
        if (!gameEngine) return;
        configModal.classList.add('open');
        gameEngine.playSFX('clique_de_botao.mp3');
    });

    btnExitModal.addEventListener('click', () => {
        configModal.classList.remove('open');
    });

    let isMuted = false;
    btnMuteToggle.addEventListener('click', () => {
        if (!gameEngine) return;
        isMuted = !isMuted;
        gameEngine.toggleMute(isMuted);

        if (isMuted) {
            btnMuteToggle.src = 'assets/img/btn/mute-off.png';
        } else {
            btnMuteToggle.src = 'assets/img/btn/mute-on.png';
        }
        gameEngine.playSFX('clique_de_botao.mp3');
    });

    musicVolumeRange.addEventListener('input', (e) => {
        if (!gameEngine) return;
        gameEngine.setMusicVolume(e.target.value / 100);
    });

    sfxVolumeRange.addEventListener('input', (e) => {
        if (!gameEngine) return;
        gameEngine.setSfxVolume(e.target.value / 100);
    });

    document.getElementById('btn-back-map').addEventListener('click', () => {
        if (!gameEngine) return;
        exitConfirmModal.classList.add('open');
        gameEngine.playSFX('clique_de_botao.mp3');
    });

    btnModalSair.addEventListener('click', () => {
        if (!phaseManager) return;
        exitConfirmModal.classList.remove('open');
        phaseManager.onLevelFail();
        gameEngine.playSFX('clique_de_botao.mp3');
    });

    btnModalContinuar.addEventListener('click', () => {
        if (!gameEngine) return;
        exitConfirmModal.classList.remove('open');
        gameEngine.playSFX('clique_de_botao.mp3');
    });
});