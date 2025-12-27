// assets/js/levels/Phase10.js
// FASE 10: O ALAMBIQUE DE OURO (O Desafio Final)

export const LEVELS_PHASE_10 = [
    {
        id: 91,
        title: "Nível 91: Entrada do Cofre",
        moves: 40,
        goals: { destroy: { 'duploGelo.png': 20, 'whisky.png': 30 } },
        layout: [
            ['B', 'B', 'D', 'D', 'D', 'D', 'B', 'B'],
            ['B', 'D', 'T', 'T', 'T', 'T', 'D', 'B'],
            ['D', 'T', 'T', 'T', 'T', 'T', 'T', 'D'],
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D'],
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D'],
            ['D', 'T', 'T', 'T', 'T', 'T', 'T', 'D'],
            ['B', 'D', 'T', 'T', 'T', 'T', 'D', 'B'],
            ['B', 'B', 'D', 'D', 'D', 'D', 'B', 'B']
        ]
    },
    {
        id: 92,
        title: "Nível 92: Tubulação de Cobre",
        moves: 45,
        goals: { destroy: { 'latinha.png': 50, 'gelo.png': 25 } },
        layout: [
            ['T', 'T', 'T', 'T', 'B', 'T', 'T', 'T'],
            ['T', 'B', 'B', 'T', 'B', 'T', 'B', 'B'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['T', 'B', 'T', 'B', 'B', 'B', 'T', 'B'],
            ['T', 'T', 'T', 'B', 'F', 'B', 'T', 'T'],
            ['B', 'B', 'T', 'B', 'F', 'B', 'T', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
        ]
    },
    {
        id: 93,
        title: "Nível 93: Destilação Tripla",
        moves: 50,
        goals: { destroy: { 'vinho.png': 30, 'whisky.png': 30, 'cocktail.png': 30 } },
        layout: [
            ['D', 'D', 'D', 'T', 'T', 'D', 'D', 'D'],
            ['D', 'F', 'D', 'T', 'T', 'D', 'F', 'D'],
            ['D', 'D', 'D', 'T', 'T', 'D', 'D', 'D'],
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'],
            ['D', 'D', 'D', 'T', 'T', 'D', 'D', 'D'],
            ['D', 'F', 'D', 'T', 'T', 'D', 'F', 'D'],
            ['D', 'D', 'D', 'T', 'T', 'D', 'D', 'D']
        ]
    },
    {
        id: 94,
        title: "Nível 94: O Labirinto do Mestre",
        moves: 55,
        goals: { destroy: { 'duploGelo.png': 30, 'garrafa.png': 40 } },
        layout: [
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['D', 'B', 'D', 'B', 'D', 'B', 'D', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'D', 'B', 'D', 'B', 'D', 'B', 'D'],
            ['B', 'T', 'B', 'T', 'B', 'T', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['D', 'B', 'D', 'B', 'D', 'B', 'D', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 95,
        title: "Nível 95: Pressão de Vapor",
        moves: 42,
        goals: { destroy: { 'chope.png': 60, 'limao.png': 30 } },
        layout: [
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'T', 'F', 'F', 'F', 'F', 'T', 'B'],
            ['T', 'T', 'F', 'D', 'D', 'F', 'T', 'T'],
            ['T', 'T', 'F', 'D', 'D', 'F', 'T', 'T'],
            ['B', 'T', 'F', 'F', 'F', 'F', 'T', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
        ]
    },
    {
        id: 96,
        title: "Nível 96: Barris Imperiais",
        moves: 60,
        goals: { destroy: { 'vinho.png': 100 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'B', 'B', 'B', 'B', 'B', 'B', 'T'],
            ['T', 'B', 'D', 'D', 'D', 'D', 'B', 'T'],
            ['T', 'B', 'D', 'F', 'F', 'D', 'B', 'T'],
            ['T', 'B', 'D', 'F', 'F', 'D', 'B', 'T'],
            ['T', 'B', 'D', 'D', 'D', 'D', 'B', 'T'],
            ['T', 'B', 'B', 'B', 'B', 'B', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 97,
        title: "Nível 97: Reflexo no Alambique",
        moves: 58,
        goals: { destroy: { 'cocktail.png': 50, 'duploGelo.png': 20 } },
        layout: [
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D'],
            ['T', 'D', 'T', 'T', 'T', 'T', 'D', 'T'],
            ['T', 'T', 'D', 'T', 'T', 'D', 'T', 'T'],
            ['B', 'T', 'T', 'F', 'F', 'T', 'T', 'B'],
            ['B', 'T', 'T', 'F', 'F', 'T', 'T', 'B'],
            ['T', 'T', 'D', 'T', 'T', 'D', 'T', 'T'],
            ['T', 'D', 'T', 'T', 'T', 'T', 'D', 'T'],
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D']
        ]
    },
    {
        id: 98,
        title: "Nível 98: A Grande Mistura",
        moves: 65,
        goals: { destroy: { 'gelo.png': 30, 'duploGelo.png': 30, 'garrafa.png': 30, 'latinha.png': 30 } },
        layout: [
            ['F', 'D', 'F', 'D', 'F', 'D', 'F', 'D'],
            ['D', 'F', 'D', 'F', 'D', 'F', 'D', 'F'],
            ['F', 'D', 'F', 'B', 'B', 'F', 'D', 'F'],
            ['D', 'F', 'B', 'B', 'B', 'B', 'F', 'D'],
            ['D', 'F', 'B', 'B', 'B', 'B', 'F', 'D'],
            ['F', 'D', 'F', 'B', 'B', 'F', 'D', 'F'],
            ['D', 'F', 'D', 'F', 'D', 'F', 'D', 'F'],
            ['F', 'D', 'F', 'D', 'F', 'D', 'F', 'D']
        ]
    },
    {
        id: 99,
        title: "Nível 99: Penúltimo Brinde",
        moves: 70,
        goals: { destroy: { 'whisky.png': 80, 'chope.png': 80 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'B', 'T', 'B', 'B', 'T', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'B', 'T', 'D', 'D', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'D', 'D', 'T', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'B', 'T', 'B', 'B', 'T', 'B', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 100,
        title: "Nível 100: O Alambique de Ouro",
        moves: 80,
        goals: { destroy: { 'duploGelo.png': 40, 'cocktail.png': 50, 'vinho.png': 50, 'garrafa.png': 50 } },
        layout: [
            ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
            ['D', 'B', 'B', 'T', 'T', 'B', 'B', 'D'],
            ['D', 'B', 'F', 'T', 'T', 'F', 'B', 'D'],
            ['D', 'T', 'T', 'F', 'F', 'T', 'T', 'D'],
            ['D', 'T', 'T', 'F', 'F', 'T', 'T', 'D'],
            ['D', 'B', 'F', 'T', 'T', 'F', 'B', 'D'],
            ['D', 'B', 'B', 'T', 'T', 'B', 'B', 'D'],
            ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D']
        ]
    }
];