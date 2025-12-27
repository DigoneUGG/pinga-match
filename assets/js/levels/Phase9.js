// assets/js/levels/Phase9.js
// FASE 9: A DESTILARIA SUBTERRÂNEA (Gargalos e controle de fluxo)

export const LEVELS_PHASE_9 = [
    {
        id: 81,
        title: "Nível 81: O Funil Invertido",
        moves: 35,
        goals: { destroy: { 'whisky.png': 40, 'gelo.png': 15 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['B', 'B', 'T', 'F', 'F', 'T', 'B', 'B'],
            ['B', 'T', 'F', 'F', 'F', 'F', 'T', 'B'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'F', 'T']
        ]
    },
    {
        id: 82,
        title: "Nível 82: Colunas de Pressão",
        moves: 40,
        goals: { destroy: { 'latinha.png': 50, 'duploGelo.png': 10 } },
        layout: [
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'T'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'T'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'T'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'T'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'T']
        ]
    },
    {
        id: 83,
        title: "Nível 83: O Grande Filtro",
        moves: 45,
        goals: { destroy: { 'garrafa.png': 30, 'vinho.png': 30, 'limao.png': 30 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 84,
        title: "Nível 84: Zonas de Vácuo",
        moves: 38,
        goals: { destroy: { 'cocktail.png': 45, 'chope.png': 25 } },
        layout: [
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T']
        ]
    },
    {
        id: 85,
        title: "Nível 85: Labirinto Vertical",
        moves: 50,
        goals: { destroy: { 'duploGelo.png': 20, 'gelo.png': 20 } },
        layout: [
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['T', 'B', 'D', 'B', 'D', 'B', 'T', 'B'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'D', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'T', 'B', 'T', 'B', 'T', 'B', 'T'],
            ['B', 'D', 'B', 'D', 'B', 'T', 'B', 'T'],
            ['B', 'T', 'B', 'T', 'B', 'D', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 86,
        title: "Nível 86: Tanques de Maturação",
        moves: 42,
        goals: { destroy: { 'whisky.png': 60 } },
        layout: [
            ['B', 'T', 'T', 'B', 'B', 'T', 'T', 'B'],
            ['B', 'T', 'T', 'B', 'B', 'T', 'T', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'F', 'F', 'B', 'B', 'F', 'F', 'B'],
            ['B', 'F', 'F', 'B', 'B', 'F', 'F', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'T', 'T', 'B', 'B', 'T', 'T', 'B']
        ]
    },
    {
        id: 87,
        title: "Nível 87: O Enigma do Barril",
        moves: 45,
        goals: { destroy: { 'vinho.png': 40, 'duploGelo.png': 15 } },
        layout: [
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T'],
            ['T', 'B', 'D', 'D', 'D', 'D', 'B', 'T'],
            ['B', 'D', 'T', 'T', 'T', 'T', 'D', 'B'],
            ['T', 'D', 'T', 'B', 'B', 'T', 'D', 'T'],
            ['T', 'D', 'T', 'B', 'B', 'T', 'D', 'T'],
            ['B', 'D', 'T', 'T', 'T', 'T', 'D', 'B'],
            ['T', 'B', 'D', 'D', 'D', 'D', 'B', 'T'],
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T']
        ]
    },
    {
        id: 88,
        title: "Nível 88: Corredores de Vidro",
        moves: 55,
        goals: { destroy: { 'garrafa.png': 50, 'latinha.png': 50 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
        ]
    },
    {
        id: 89,
        title: "Nível 89: Pressão Máxima",
        moves: 48,
        goals: { destroy: { 'gelo.png': 40, 'chope.png': 40 } },
        layout: [
            ['F', 'F', 'B', 'T', 'T', 'B', 'F', 'F'],
            ['F', 'F', 'B', 'T', 'T', 'B', 'F', 'F'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['F', 'F', 'B', 'T', 'T', 'B', 'F', 'F'],
            ['F', 'F', 'B', 'T', 'T', 'B', 'F', 'F']
        ]
    },
    {
        id: 90,
        title: "Nível 90: Mestre da Destilaria",
        moves: 65,
        goals: { destroy: { 'duploGelo.png': 30, 'cocktail.png': 40, 'whisky.png': 40 } },
        layout: [
            ['D', 'D', 'B', 'T', 'T', 'B', 'D', 'D'],
            ['D', 'D', 'B', 'T', 'T', 'B', 'D', 'D'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'T', 'F', 'F', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'F', 'F', 'T', 'B', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['D', 'D', 'B', 'T', 'T', 'B', 'D', 'D'],
            ['D', 'D', 'B', 'T', 'T', 'B', 'D', 'D']
        ]
    }
];