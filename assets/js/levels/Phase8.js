// assets/js/levels/Phase8.js
// FASE 8: A RESERVA ESPECIAL (Layouts fragmentados e ilhas isoladas)

export const LEVELS_PHASE_8 = [
    {
        id: 71,
        title: "Nível 71: Ilhas de Vinho",
        moves: 35,
        goals: { destroy: { 'vinho.png': 30, 'gelo.png': 10 } },
        layout: [
            ['F', 'F', 'T', 'B', 'B', 'T', 'F', 'F'],
            ['F', 'F', 'T', 'T', 'T', 'T', 'F', 'F'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['B', 'T', 'B', 'T', 'T', 'B', 'T', 'B'],
            ['B', 'T', 'B', 'T', 'T', 'B', 'T', 'B'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['F', 'F', 'T', 'T', 'T', 'T', 'F', 'F'],
            ['F', 'F', 'T', 'B', 'B', 'T', 'F', 'F']
        ]
    },
    {
        id: 72,
        title: "Nível 72: O H de Whisky",
        moves: 40,
        goals: { destroy: { 'whisky.png': 45, 'duploGelo.png': 12 } },
        layout: [
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'D', 'D', 'D', 'D', 'B', 'T'],
            ['T', 'T', 'D', 'D', 'D', 'D', 'T', 'T'],
            ['T', 'T', 'D', 'D', 'D', 'D', 'T', 'T'],
            ['T', 'B', 'D', 'D', 'D', 'D', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T'],
            ['T', 'B', 'T', 'T', 'T', 'T', 'B', 'T']
        ]
    },
    {
        id: 73,
        title: "Nível 73: Cruz de Malta",
        moves: 42,
        goals: { destroy: { 'chope.png': 40, 'limao.png': 25 } },
        layout: [
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'B', 'B', 'B', 'T', 'T'],
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B']
        ]
    },
    {
        id: 74,
        title: "Nível 74: Estrela de Gelo",
        moves: 45,
        goals: { destroy: { 'duploGelo.png': 20, 'garrafa.png': 30 } },
        layout: [
            ['T', 'T', 'T', 'D', 'D', 'T', 'T', 'T'],
            ['T', 'T', 'D', 'T', 'T', 'D', 'T', 'T'],
            ['T', 'D', 'T', 'T', 'T', 'T', 'D', 'T'],
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D'],
            ['D', 'T', 'T', 'B', 'B', 'T', 'T', 'D'],
            ['T', 'D', 'T', 'T', 'T', 'T', 'D', 'T'],
            ['T', 'T', 'D', 'T', 'T', 'D', 'T', 'T'],
            ['T', 'T', 'T', 'D', 'D', 'T', 'T', 'T']
        ]
    },
    {
        id: 75,
        title: "Nível 75: O Grande Tanque",
        moves: 50,
        goals: { destroy: { 'latinha.png': 60, 'vinho.png': 30 } },
        layout: [
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'T', 'F', 'F', 'F', 'F', 'T', 'B'],
            ['B', 'T', 'F', 'T', 'T', 'F', 'T', 'B'],
            ['B', 'T', 'F', 'T', 'T', 'F', 'T', 'B'],
            ['B', 'T', 'F', 'F', 'F', 'F', 'T', 'B'],
            ['B', 'T', 'T', 'T', 'T', 'T', 'T', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
        ]
    },
    {
        id: 76,
        title: "Nível 76: Fragmentos de Vidro",
        moves: 48,
        goals: { destroy: { 'cocktail.png': 45, 'chope.png': 35 } },
        layout: [
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T'],
            ['T', 'T', 'B', 'T', 'T', 'B', 'T', 'T']
        ]
    },
    {
        id: 77,
        title: "Nível 77: Armadilhas de Limão",
        moves: 40,
        goals: { destroy: { 'limao.png': 50, 'duploGelo.png': 15 } },
        layout: [
            ['D', 'T', 'D', 'T', 'D', 'T', 'D', 'T'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['D', 'T', 'D', 'T', 'D', 'T', 'D', 'T'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['D', 'T', 'D', 'T', 'D', 'T', 'D', 'T'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['D', 'T', 'D', 'T', 'D', 'T', 'D', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 78,
        title: "Nível 78: Colunas Reais",
        moves: 55,
        goals: { destroy: { 'vinho.png': 40, 'whisky.png': 40 } },
        layout: [
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['T', 'B', 'T', 'B', 'T', 'B', 'T', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
            ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 79,
        title: "Nível 79: Bunker de Bebidas",
        moves: 52,
        goals: { destroy: { 'gelo.png': 30, 'cocktail.png': 20, 'garrafa.png': 20 } },
        layout: [
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'T', 'T', 'F', 'F', 'T', 'T', 'B'],
            ['T', 'T', 'F', 'D', 'D', 'F', 'T', 'T'],
            ['T', 'F', 'D', 'T', 'T', 'D', 'F', 'T'],
            ['T', 'F', 'D', 'T', 'T', 'D', 'F', 'T'],
            ['T', 'T', 'F', 'D', 'D', 'F', 'T', 'T'],
            ['B', 'T', 'T', 'F', 'F', 'T', 'T', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B']
        ]
    },
    {
        id: 80,
        title: "Nível 80: O Coração da Reserva",
        moves: 60,
        goals: { destroy: { 'duploGelo.png': 25, 'chope.png': 40, 'latinha.png': 40 } },
        layout: [
            ['D', 'D', 'B', 'B', 'B', 'B', 'D', 'D'],
            ['D', 'T', 'T', 'T', 'T', 'T', 'T', 'D'],
            ['B', 'T', 'D', 'D', 'D', 'D', 'T', 'B'],
            ['B', 'T', 'D', 'F', 'F', 'D', 'T', 'B'],
            ['B', 'T', 'D', 'F', 'F', 'D', 'T', 'B'],
            ['B', 'T', 'D', 'D', 'D', 'D', 'T', 'B'],
            ['D', 'T', 'T', 'T', 'T', 'T', 'T', 'D'],
            ['D', 'D', 'B', 'B', 'B', 'B', 'D', 'D']
        ]
    }
];