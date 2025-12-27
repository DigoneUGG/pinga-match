export const LEVELS_PHASE_1 = [
    {
        id: 1,
        title: "Nível 1: O Início",
        moves: 15,
        goals: { destroy: { 'chope.png': 5, 'limao.png': 5 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 2,
        title: "Nível 2: Esfriando a Cabeça",
        moves: 20,
        goals: { destroy: { 'gelo.png': 10 } },
        layout: [
            ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'T'], ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'T'], ['T', 'T', 'F', 'F', 'F', 'F', 'T', 'T']
        ]
    },
    {
        id: 3,
        title: "Nível 3: Mesa Reservada",
        moves: 25,
        goals: { destroy: { 'whisky.png': 10, 'vinho.png': 10 } },
        layout: [
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'], ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'], ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T']
        ]
    },
    {
        id: 4,
        title: "Nível 4: Labirinto do Bar",
        moves: 30,
        goals: { destroy: { 'chope.png': 15, 'cocktail.png': 15 } },
        layout: [
            ['B', 'T', 'T', 'B', 'B', 'T', 'T', 'B'], ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'],
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'B', 'B', 'T', 'T', 'T'], ['B', 'T', 'T', 'B', 'B', 'T', 'T', 'B']
        ]
    },
    {
        id: 5,
        title: "Nível 5: O Chefão",
        moves: 35,
        goals: { destroy: { 'garrafa.png': 10, 'latinha.png': 10, 'limao.png': 10 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'B', 'F', 'F', 'B', 'T', 'T'],
            ['T', 'T', 'F', 'T', 'T', 'F', 'T', 'T'],
            ['T', 'T', 'F', 'T', 'T', 'F', 'T', 'T'],
            ['T', 'T', 'B', 'F', 'F', 'B', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 6,
        title: "Nível 6: A Saideira",
        moves: 30,
        goals: { destroy: { 'chope.png': 15, 'gelo.png': 15 } },
        layout: [
            ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B'], ['B', 'T', 'T', 'F', 'F', 'T', 'T', 'B'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['B', 'T', 'T', 'F', 'F', 'T', 'T', 'B'], ['B', 'B', 'T', 'T', 'T', 'T', 'B', 'B']
        ]
    },
    {
        id: 7,
        title: "Nível 7: Balcão Central",
        moves: 28,
        goals: { destroy: { 'latinha.png': 20, 'gelo.png': 10 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'B', 'B', 'T', 'T', 'B', 'B', 'T'],
            ['T', 'B', 'F', 'T', 'T', 'F', 'B', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'B', 'F', 'T', 'T', 'F', 'B', 'T'],
            ['T', 'B', 'B', 'T', 'T', 'B', 'B', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 8,
        title: "Nível 8: Degustação",
        moves: 32,
        goals: { destroy: { 'vinho.png': 15, 'whisky.png': 15, 'cocktail.png': 15 } },
        layout: [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['T', 'F', 'T', 'F', 'F', 'T', 'F', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], ['F', 'T', 'F', 'B', 'B', 'F', 'T', 'F'],
            ['F', 'T', 'F', 'B', 'B', 'F', 'T', 'F'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'F', 'T', 'F', 'F', 'T', 'F', 'T'], ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']
        ]
    },
    {
        id: 9,
        title: "Nível 9: Coluna de Gelo",
        moves: 35,
        goals: { destroy: { 'gelo.png': 30 } },
        layout: [
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'], ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'], ['T', 'F', 'T', 'B', 'B', 'T', 'F', 'T'],
            ['T', 'F', 'T', 'B', 'B', 'T', 'F', 'T'], ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'], ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T']
        ]
    },
    {
        id: 10,
        title: "Nível 10: Grande Evento",
        moves: 40,
        goals: { destroy: { 'garrafa.png': 20, 'chope.png': 20, 'gelo.png': 20 } },
        layout: [
            ['F', 'T', 'T', 'T', 'T', 'T', 'T', 'F'], ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'],
            ['T', 'T', 'F', 'B', 'B', 'F', 'T', 'T'], ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'T', 'T', 'B', 'B', 'B'], ['T', 'T', 'F', 'B', 'B', 'F', 'T', 'T'],
            ['T', 'F', 'T', 'T', 'T', 'T', 'F', 'T'], ['F', 'T', 'T', 'T', 'T', 'T', 'T', 'F']
        ]
    }
];