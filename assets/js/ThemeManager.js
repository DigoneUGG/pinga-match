/**
 * ThemeManager.js
 * Responsável por gerenciar a troca de backgrounds e músicas
 * baseado no progresso do nível (cada 10 níveis = 1 tema).
 */

export class ThemeManager {
    constructor(gameEngine, config) {
        this.engine = gameEngine;
        this.config = config;

        // Configurações de caminhos baseadas na sua estrutura
        this.bgPath = 'assets/img/telas/';
        this.audioPath = 'assets/mp3/';

        this.currentThemeIndex = -1;
    }

    /**
     * Define o tema baseado no ID do nível
     * @param {number} levelId 
     */
    updateTheme(levelId) {
        // Cálculo: Nível 1-10 = Tema 1, 11-20 = Tema 2, etc.
        const themeIndex = Math.ceil(levelId / 10);

        // Só atualiza se o tema mudar para evitar recarregar a música à toa
        if (themeIndex !== this.currentThemeIndex) {
            this.currentThemeIndex = themeIndex;
            this.applyBackground(themeIndex);
            this.applyMusic(themeIndex);
            console.log(`Tema atualizado para a Etapa: ${themeIndex}`);
        }
    }

    applyBackground(index) {
        const bgFileName = `background_tela_play-${index}.png`;
        const fullPath = `${this.bgPath}${bgFileName}`;

        // Aplica o background ao body ou container principal
        // Usamos document.body pois seu CSS base.css define o fundo lá
        document.body.style.backgroundImage = `url('${fullPath}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    }

    applyMusic(index) {
        const musicFileName = `musica_de_fundo_${index}.mp3`;

        // Acessa o sistema de áudio da engine para trocar a música
        if (this.engine.audio) {
            // Para a música atual e inicia a nova em loop
            this.engine.audio.playAudio(musicFileName, true);
        }
    }
}