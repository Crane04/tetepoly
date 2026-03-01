"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = shuffle;
exports.initChanceDeck = initChanceDeck;
exports.initCommunityChestDeck = initCommunityChestDeck;
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function initChanceDeck() {
    return shuffle([
        {
            id: 'ch1',
            deck: 'chance',
            description: 'Advance to GO (collect $200)',
            action: 'advance_to',
            targetPosition: 0,
            value: 200,
        },
        {
            id: 'ch2',
            deck: 'chance',
            description: 'Advance to Illinois Ave — if you pass GO, collect $200',
            action: 'advance_to',
            targetPosition: 24,
        },
        {
            id: 'ch3',
            deck: 'chance',
            description: 'Advance to St. Charles Place — if you pass GO, collect $200',
            action: 'advance_to',
            targetPosition: 11,
        },
        {
            id: 'ch4',
            deck: 'chance',
            description: 'Advance to nearest Railroad — pay double rent if owned',
            action: 'advance_to_nearest',
            targetType: 'railroad',
            doubleRentIfOwned: true,
        },
        {
            id: 'ch5',
            deck: 'chance',
            description: 'Advance to nearest Railroad — pay double rent if owned',
            action: 'advance_to_nearest',
            targetType: 'railroad',
            doubleRentIfOwned: true,
        },
        {
            id: 'ch6',
            deck: 'chance',
            description: 'Advance to nearest Utility — if owned, pay 10× dice roll',
            action: 'advance_to_nearest',
            targetType: 'utility',
            multiplierIfOwned: 10,
        },
        {
            id: 'ch7',
            deck: 'chance',
            description: 'Bank pays you a dividend of $50',
            action: 'collect',
            value: 50,
        },
        {
            id: 'ch8',
            deck: 'chance',
            description: 'Get Out of Jail Free',
            action: 'get_out_of_jail_free',
        },
        {
            id: 'ch9',
            deck: 'chance',
            description: 'Go Back 3 Spaces',
            action: 'go_back',
            stepsBack: 3,
        },
        {
            id: 'ch10',
            deck: 'chance',
            description: 'Go to Jail — do not pass GO, do not collect $200',
            action: 'go_to_jail',
        },
        {
            id: 'ch11',
            deck: 'chance',
            description: 'Make general repairs: $25 per house, $100 per hotel',
            action: 'repairs',
            houseCost: 25,
            hotelCost: 100,
        },
        {
            id: 'ch12',
            deck: 'chance',
            description: 'Pay poor tax of $15',
            action: 'pay',
            value: 15,
        },
        {
            id: 'ch13',
            deck: 'chance',
            description: 'Take a trip to Reading Railroad — if you pass GO, collect $200',
            action: 'advance_to',
            targetPosition: 5,
        },
        {
            id: 'ch14',
            deck: 'chance',
            description: 'Take a walk on the Boardwalk — advance to Boardwalk',
            action: 'advance_to',
            targetPosition: 39,
        },
        {
            id: 'ch15',
            deck: 'chance',
            description: 'You have been elected chairman of the board — pay each player $50',
            action: 'pay_each_player',
            value: 50,
        },
        {
            id: 'ch16',
            deck: 'chance',
            description: 'Your building loan matures — collect $150',
            action: 'collect',
            value: 150,
        },
    ]);
}
function initCommunityChestDeck() {
    return shuffle([
        {
            id: 'cc1',
            deck: 'community_chest',
            description: 'Advance to GO (collect $200)',
            action: 'advance_to',
            targetPosition: 0,
            value: 200,
        },
        {
            id: 'cc2',
            deck: 'community_chest',
            description: 'Bank error in your favor — collect $200',
            action: 'collect',
            value: 200,
        },
        {
            id: 'cc3',
            deck: 'community_chest',
            description: "Doctor's fee — pay $50",
            action: 'pay',
            value: 50,
        },
        {
            id: 'cc4',
            deck: 'community_chest',
            description: 'From sale of stock you get $50',
            action: 'collect',
            value: 50,
        },
        {
            id: 'cc5',
            deck: 'community_chest',
            description: 'Get Out of Jail Free',
            action: 'get_out_of_jail_free',
        },
        {
            id: 'cc6',
            deck: 'community_chest',
            description: 'Go to Jail — do not pass GO, do not collect $200',
            action: 'go_to_jail',
        },
        {
            id: 'cc7',
            deck: 'community_chest',
            description: 'Grand Opera Night — collect $50 from every player',
            action: 'collect_from_players',
            value: 50,
        },
        {
            id: 'cc8',
            deck: 'community_chest',
            description: 'Holiday Fund matures — collect $100',
            action: 'collect',
            value: 100,
        },
        {
            id: 'cc9',
            deck: 'community_chest',
            description: 'Income tax refund — collect $20',
            action: 'collect',
            value: 20,
        },
        {
            id: 'cc10',
            deck: 'community_chest',
            description: 'It is your birthday — collect $10 from every player',
            action: 'collect_from_players',
            value: 10,
        },
        {
            id: 'cc11',
            deck: 'community_chest',
            description: 'Life insurance matures — collect $100',
            action: 'collect',
            value: 100,
        },
        {
            id: 'cc12',
            deck: 'community_chest',
            description: 'Pay hospital fees of $100',
            action: 'pay',
            value: 100,
        },
        {
            id: 'cc13',
            deck: 'community_chest',
            description: 'Pay school fees of $150',
            action: 'pay',
            value: 150,
        },
        {
            id: 'cc14',
            deck: 'community_chest',
            description: 'Receive $25 consultancy fee',
            action: 'collect',
            value: 25,
        },
        {
            id: 'cc15',
            deck: 'community_chest',
            description: 'You are assessed for street repairs: $40 per house, $115 per hotel',
            action: 'repairs',
            houseCost: 40,
            hotelCost: 115,
        },
        {
            id: 'cc16',
            deck: 'community_chest',
            description: 'You have won second prize in a beauty contest — collect $10',
            action: 'collect',
            value: 10,
        },
    ]);
}
