// assets/js/levels/Phase7.js
// FASE 7: O DESAFIO DO BARMAN (Layouts restritivos e ilhas de objetivos)

export const LEVELS_PHASE_7 = [
    {
        id: 61,
        title: "Nível 61: O Funil",
        moves: 35,
        goals: { destroy: { 'cocktail.png': 40 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 62,
        title: "Nível 62: Quatro Cantos",
        moves: 40,
        goals: { destroy: { 'duploGelo.png': 16, 'vinho.png': 30 } },
        layout: [
            ['D', 'D', 'T', 'T', 'T', 'T', 'D', 'D'],
            ['D', 'D', 'T', 'T', 'T', 'T', 'D', 'D'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['D', 'D', 'T', 'T', 'T', 'T', 'D', 'D'],
            ['D', 'D', 'T', 'T', 'T', 'T', 'D', 'D']
        ]
    },
    {
        id: 63,
        title: "Nível 63: Labirinto de Vidro",
        moves: 45,
        goals: { destroy: { 'garrafa.png': 45, 'gelo.png': 20 } },
        layout: [
            ['T', 'F', 'T', 'F', 'T', 'F', 'T', 'F'],
            ['F', 'B', 'B', 'B', 'B', 'B', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'F'],
            ['F', 'B', 'T', 'B', 'B', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'B', 'B', 'T', 'B', 'F'],
            ['F', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'B', 'B', 'B', 'B', 'B', 'F'],
            ['F', 'T', 'F', 'T', 'F', 'T', 'F', 'T']
        ]
    },
    {
        id: 64,
        title: "Nível 64: A Ampulheta",
        moves: 38,
        goals: { destroy: { 'chope.png': 50, 'limao.png': 20 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 65,
        title: "Nível 65: Coração de Gelo",
        moves: 50,
        goals: { destroy: { 'duploGelo.png': 12, 'whisky.png': 40 } },
        layout: [
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T'],
            ['T', 'B', 'D', 'B', 'B', 'D', 'B', 'T'],
            ['B', 'D', 'D', 'D', 'D', 'D', 'D', 'B'],
            ['B', 'D', 'D', 'D', 'D', 'D', 'D', 'B'],
            ['T', 'B', 'D', 'D', 'D', 'D', 'B', 'T'],
            ['T', 'T', 'B', 'D', 'D', 'B', 'T', 'T'],
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 66,
        title: "Nível 66: Torres Gêmeas",
        moves: 42,
        goals: { destroy: { 'latinha.png': 60 } },
        layout: [
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 67,
        title: "Nível 67: Armazém Restrito",
        moves: 45,
        goals: { destroy: { 'vinho.png': 30, 'whisky.png': 30, 'chope.png': 30 } },
        layout: [
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'T', 'D', 'D', 'D', 'D', 'T', 'B'],
            ['T', 'T', 'D', 'F', 'F', 'D', 'T', 'T'],
            ['T', 'T', 'D', 'F', 'F', 'D', 'T', 'T'],
            ['B', 'T', 'D', 'D', 'D', 'D', 'T', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B']
        ]
    },
    {
        id: 68,
        title: "Nível 68: Diagonal de Sangue",
        moves: 48,
        goals: { destroy: { 'limao.png': 50, 'gelo.png': 20 } },
        layout: [
            ['F', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['T', 'F', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'T', 'F', 'T', 'T', 'B', 'T', 'T'],
            ['T', 'T', 'T', 'F', 'B', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'B', 'F', 'T', 'T', 'T'],
            ['T', 'T', 'B', 'T', 'T', 'F', 'T', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'F', 'T'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'F']
        ]
    },
    {
        id: 69,
        title: "Nível 69: O Caleidoscópio",
        moves: 55,
        goals: { destroy: { 'cocktail.png': 60, 'duploGelo.png': 10 } },
        layout: [
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D'],
            ['T', 'D', 'T', 'B', 'B', 'T', 'D', 'T'],
            ['T', 'T', 'D', 'T', 'T', 'D', 'T', 'T'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['T', 'T', 'D', 'T', 'T', 'D', 'T', 'T'],
            ['T', 'D', 'T', 'B', 'B', 'T', 'D', 'T'],
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D']
        ]
    },
    {
        id: 70,
        title: "Nível 70: Grande Final do Barman",
        moves: 65,
        goals: { destroy: { 'garrafa.png': 40, 'latinha.png': 40, 'duploGelo.png': 20 } },
        layout: [
            ['B', 'B', 'B', 'D', 'D', 'B', 'B', 'B'],
            ['B', 'D', 'D', 'T', 'T', 'D', 'D', 'B'],
            ['B', 'D', 'T', 'T', 'T', 'T', 'D', 'B'],
            ['D', 'T', 'T', 'F', 'F', 'T', 'T', 'D'],
            ['D', 'T', 'T', 'F', 'F', 'T', 'T', 'D'],
            ['B', 'D', 'T', 'T', 'T', 'T', 'D', 'B'],
            ['B', 'D', 'D', 'T', 'T', 'D', 'D', 'B'],
            ['B', 'B', 'B', 'D', 'D', 'B', 'B', 'B']
        ]
    }
];