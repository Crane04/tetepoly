"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGameState = initGameState;
exports.currentPlayer = currentPlayer;
exports.getPlayerById = getPlayerById;
exports.getSpace = getSpace;
exports.movePlayer = movePlayer;
exports.movePlayerTo = movePlayerTo;
exports.payRent = payRent;
exports.buyProperty = buyProperty;
exports.buildHouse = buildHouse;
exports.buildHotel = buildHotel;
exports.sellHouse = sellHouse;
exports.sellHotel = sellHotel;
exports.mortgageProperty = mortgageProperty;
exports.unmortgageProperty = unmortgageProperty;
exports.drawCard = drawCard;
exports.applyCard = applyCard;
exports.sendToJail = sendToJail;
exports.exitJail = exitJail;
exports.startAuction = startAuction;
exports.placeBid = placeBid;
exports.withdrawFromAuction = withdrawFromAuction;
exports.endAuction = endAuction;
exports.proposeTrade = proposeTrade;
exports.executeTrade = executeTrade;
exports.declareBankruptcy = declareBankruptcy;
exports.advanceTurn = advanceTurn;
const uuid_1 = require("uuid");
const Board_1 = require("./Board");
const Cards_1 = require("./Cards");
const RentCalculator_1 = require("./RentCalculator");
// ─── Initialization ──────────────────────────────────────────────────────────
function initGameState(players) {
    const initialPlayers = players.map((p) => ({
        id: p.id,
        name: p.name,
        token: p.token,
        position: 0,
        money: 1500,
        properties: [],
        inJail: false,
        jailTurnsRemaining: 0,
        isBankrupt: false,
        getOutOfJailCards: 0,
        isConnected: true,
    }));
    return {
        gameId: (0, uuid_1.v4)(),
        status: "started",
        players: initialPlayers,
        currentPlayerIndex: 0,
        board: (0, Board_1.initializeBoard)(),
        chanceDeck: (0, Cards_1.initChanceDeck)(),
        communityChestDeck: (0, Cards_1.initCommunityChestDeck)(),
        bank: { houses: 32, hotels: 12 },
        auction: null,
        activeTrade: null,
        diceRoll: null,
        doublesCount: 0,
        lastDiceRollWasDoubles: false,
        winner: null,
        log: ["Game started!"],
    };
}
// ─── Helpers ─────────────────────────────────────────────────────────────────
function currentPlayer(state) {
    return state.players[state.currentPlayerIndex];
}
function getPlayerById(state, id) {
    return state.players.find((p) => p.id === id);
}
function getSpace(state, position) {
    return state.board[position];
}
function addLog(state, message) {
    state.log.push(message);
    if (state.log.length > 200)
        state.log.shift();
}
function transferMoney(from, to, amount) {
    from.money -= amount;
    if (to)
        to.money += amount;
}
function activePlayers(state) {
    return state.players.filter((p) => !p.isBankrupt);
}
// ─── Movement ────────────────────────────────────────────────────────────────
function movePlayer(state, playerId, steps) {
    const player = getPlayerById(state, playerId);
    const from = player.position;
    const to = (from + steps) % 40;
    const passed = (0, RentCalculator_1.didPassGo)(from, to);
    player.position = to;
    if (passed) {
        player.money += 200;
        addLog(state, `${player.name} passed GO and collected $200.`);
    }
    addLog(state, `${player.name} moved from ${from} to ${to}.`);
    return { passedGo: passed, newPosition: to };
}
function movePlayerTo(state, playerId, targetPosition, collectGoIfPassed) {
    const player = getPlayerById(state, playerId);
    const from = player.position;
    const passed = (0, RentCalculator_1.didPassGo)(from, targetPosition);
    player.position = targetPosition;
    if (passed && collectGoIfPassed) {
        player.money += 200;
        addLog(state, `${player.name} passed GO and collected $200.`);
    }
    addLog(state, `${player.name} moved to position ${targetPosition}.`);
    return { passedGo: passed };
}
// ─── Rent ────────────────────────────────────────────────────────────────────
function payRent(state, payerId, position, diceTotal, doubleRent = false, utilityMultiplierOverride) {
    const space = getSpace(state, position);
    if (!space.ownerId || space.isMortgaged)
        return 0;
    const payer = getPlayerById(state, payerId);
    const owner = getPlayerById(state, space.ownerId);
    if (owner.id === payer.id)
        return 0;
    const amount = (0, RentCalculator_1.calculateRent)(space, diceTotal, owner, state.board, doubleRent, utilityMultiplierOverride);
    if (amount === 0)
        return 0;
    transferMoney(payer, owner, amount);
    addLog(state, `${payer.name} paid $${amount} rent to ${owner.name} for ${space.name}.`);
    return amount;
}
// ─── Property Purchase ───────────────────────────────────────────────────────
function buyProperty(state, playerId, position) {
    const space = getSpace(state, position);
    const player = getPlayerById(state, playerId);
    if (space.ownerId !== null && space.ownerId !== undefined)
        return false;
    if (!space.price)
        return false;
    if (player.money < space.price)
        return false;
    player.money -= space.price;
    space.ownerId = playerId;
    player.properties.push(position);
    addLog(state, `${player.name} bought ${space.name} for $${space.price}.`);
    return true;
}
// ─── Building ────────────────────────────────────────────────────────────────
function buildHouse(state, playerId, position) {
    const space = getSpace(state, position);
    const player = getPlayerById(state, playerId);
    if (space.ownerId !== playerId)
        return "You do not own this property.";
    if (space.isMortgaged)
        return "Property is mortgaged.";
    if (space.hasHotel)
        return "Property already has a hotel.";
    if (space.houses >= 4)
        return "Max houses reached — build a hotel instead.";
    if (!space.colorGroup)
        return "Not a buildable property.";
    if (!space.houseCost)
        return "No house cost defined.";
    const groupSpaces = state.board.filter((s) => s.colorGroup === space.colorGroup);
    const ownsAll = groupSpaces.every((s) => s.ownerId === playerId);
    if (!ownsAll)
        return "You must own the entire color group.";
    const hasMortgaged = groupSpaces.some((s) => s.isMortgaged);
    if (hasMortgaged)
        return "A property in this group is mortgaged.";
    // Even building rule
    const minHouses = Math.min(...groupSpaces.map((s) => s.houses));
    if (space.houses > minHouses)
        return "Must build evenly across the color group.";
    if (state.bank.houses < 1)
        return "Bank has no houses available.";
    if (player.money < space.houseCost)
        return "Not enough money.";
    player.money -= space.houseCost;
    space.houses += 1;
    state.bank.houses -= 1;
    addLog(state, `${player.name} built a house on ${space.name}.`);
    return null;
}
function buildHotel(state, playerId, position) {
    const space = getSpace(state, position);
    const player = getPlayerById(state, playerId);
    if (space.ownerId !== playerId)
        return "You do not own this property.";
    if (space.isMortgaged)
        return "Property is mortgaged.";
    if (space.hasHotel)
        return "Property already has a hotel.";
    if (space.houses < 4)
        return "Need 4 houses before upgrading to hotel.";
    if (!space.houseCost)
        return "No house cost defined.";
    const groupSpaces = state.board.filter((s) => s.colorGroup === space.colorGroup);
    const hasMortgaged = groupSpaces.some((s) => s.isMortgaged);
    if (hasMortgaged)
        return "A property in this group is mortgaged.";
    // Even building rule — all others must have 4 houses or a hotel
    const othersReady = groupSpaces
        .filter((s) => s.position !== position)
        .every((s) => s.houses === 4 || s.hasHotel);
    if (!othersReady)
        return "Must build evenly — other properties need 4 houses first.";
    if (state.bank.hotels < 1)
        return "Bank has no hotels available.";
    if (player.money < space.houseCost)
        return "Not enough money.";
    player.money -= space.houseCost;
    space.houses = 0;
    space.hasHotel = true;
    state.bank.hotels -= 1;
    state.bank.houses += 4; // 4 houses returned
    addLog(state, `${player.name} built a hotel on ${space.name}.`);
    return null;
}
function sellHouse(state, playerId, position) {
    const space = getSpace(state, position);
    const player = getPlayerById(state, playerId);
    if (space.ownerId !== playerId)
        return "You do not own this property.";
    if (space.houses < 1)
        return "No houses to sell.";
    if (!space.houseCost)
        return "No house cost defined.";
    const groupSpaces = state.board.filter((s) => s.colorGroup === space.colorGroup);
    const maxHouses = Math.max(...groupSpaces.map((s) => s.houses));
    if (space.houses < maxHouses)
        return "Must sell evenly across the color group.";
    const salePrice = Math.floor(space.houseCost / 2);
    player.money += salePrice;
    space.houses -= 1;
    state.bank.houses += 1;
    addLog(state, `${player.name} sold a house on ${space.name} for $${salePrice}.`);
    return null;
}
function sellHotel(state, playerId, position) {
    const space = getSpace(state, position);
    const player = getPlayerById(state, playerId);
    if (space.ownerId !== playerId)
        return "You do not own this property.";
    if (!space.hasHotel)
        return "No hotel to sell.";
    if (!space.houseCost)
        return "No house cost defined.";
    // Need 4 houses from bank to downgrade
    if (state.bank.houses < 4)
        return "Bank does not have enough houses for downgrade.";
    const salePrice = Math.floor(space.houseCost / 2);
    player.money += salePrice;
    space.hasHotel = false;
    space.houses = 4;
    state.bank.hotels += 1;
    state.bank.houses -= 4;
    addLog(state, `${player.name} sold a hotel on ${space.name} for $${salePrice}.`);
    return null;
}
// ─── Mortgage ────────────────────────────────────────────────────────────────
function mortgageProperty(state, playerId, position) {
    const space = getSpace(state, position);
    const player = getPlayerById(state, playerId);
    if (space.ownerId !== playerId)
        return "You do not own this property.";
    if (space.isMortgaged)
        return "Already mortgaged.";
    if (space.houses > 0 || space.hasHotel)
        return "Sell all buildings first.";
    if (!space.mortgageValue)
        return "No mortgage value defined.";
    space.isMortgaged = true;
    player.money += space.mortgageValue;
    addLog(state, `${player.name} mortgaged ${space.name} for $${space.mortgageValue}.`);
    return null;
}
function unmortgageProperty(state, playerId, position) {
    const space = getSpace(state, position);
    const player = getPlayerById(state, playerId);
    if (space.ownerId !== playerId)
        return "You do not own this property.";
    if (!space.isMortgaged)
        return "Not mortgaged.";
    if (!space.mortgageValue)
        return "No mortgage value defined.";
    const cost = Math.ceil(space.mortgageValue * 1.1);
    if (player.money < cost)
        return `Not enough money. Need $${cost}.`;
    player.money -= cost;
    space.isMortgaged = false;
    addLog(state, `${player.name} unmortgaged ${space.name} for $${cost}.`);
    return null;
}
// ─── Cards ───────────────────────────────────────────────────────────────────
function drawCard(state, deck) {
    const deckArr = deck === "chance" ? state.chanceDeck : state.communityChestDeck;
    if (deckArr.length === 0) {
        // Reshuffle — GOOJF cards held by players are excluded and already not in deck
        const reshuffled = deck === "chance" ? (0, Cards_1.initChanceDeck)() : (0, Cards_1.initCommunityChestDeck)();
        deckArr.push(...reshuffled.filter((c) => c.action !== "get_out_of_jail_free"));
    }
    return deckArr.shift();
}
function applyCard(state, playerId, card, diceTotal) {
    const player = getPlayerById(state, playerId);
    addLog(state, `${player.name} drew: "${card.description}"`);
    switch (card.action) {
        case "advance_to": {
            if (card.targetPosition === undefined)
                break;
            const passed = movePlayerTo(state, playerId, card.targetPosition, true);
            // If advance_to GO specifically collect $200 (already handled in movePlayerTo)
            break;
        }
        case "advance_to_nearest": {
            if (!card.targetType)
                break;
            const nearest = (0, RentCalculator_1.getNearestOf)(card.targetType, player.position);
            movePlayerTo(state, playerId, nearest, true);
            if (card.doubleRentIfOwned)
                return { rentDoubled: true };
            if (card.multiplierIfOwned)
                return { utilityMultiplier: card.multiplierIfOwned };
            break;
        }
        case "collect":
            player.money += card.value ?? 0;
            break;
        case "pay":
            player.money -= card.value ?? 0;
            break;
        case "collect_from_players": {
            const amount = card.value ?? 0;
            activePlayers(state)
                .filter((p) => p.id !== playerId)
                .forEach((p) => {
                p.money -= amount;
                player.money += amount;
            });
            break;
        }
        case "pay_each_player": {
            const amount = card.value ?? 0;
            activePlayers(state)
                .filter((p) => p.id !== playerId)
                .forEach((p) => {
                player.money -= amount;
                p.money += amount;
            });
            break;
        }
        case "go_to_jail":
            sendToJail(state, playerId);
            break;
        case "get_out_of_jail_free":
            player.getOutOfJailCards += 1;
            addLog(state, `${player.name} received a Get Out of Jail Free card.`);
            break;
        case "go_back": {
            const steps = card.stepsBack ?? 3;
            const newPos = (player.position - steps + 40) % 40;
            player.position = newPos;
            addLog(state, `${player.name} went back ${steps} spaces to position ${newPos}.`);
            break;
        }
        case "repairs": {
            const houseFee = card.houseCost ?? 0;
            const hotelFee = card.hotelCost ?? 0;
            let total = 0;
            player.properties.forEach((pos) => {
                const sp = getSpace(state, pos);
                if (sp.hasHotel)
                    total += hotelFee;
                else
                    total += sp.houses * houseFee;
            });
            player.money -= total;
            addLog(state, `${player.name} paid $${total} in repairs.`);
            break;
        }
    }
    return {};
}
// ─── Jail ────────────────────────────────────────────────────────────────────
function sendToJail(state, playerId) {
    const player = getPlayerById(state, playerId);
    player.position = 10;
    player.inJail = true;
    player.jailTurnsRemaining = 3;
    state.doublesCount = 0;
    state.lastDiceRollWasDoubles = false;
    addLog(state, `${player.name} was sent to Jail.`);
}
function exitJail(state, playerId, method) {
    const player = getPlayerById(state, playerId);
    if (!player.inJail)
        return "Player is not in jail.";
    if (method === "fine") {
        if (player.money < 50)
            return "Not enough money to pay the $50 fine.";
        player.money -= 50;
    }
    else if (method === "card") {
        if (player.getOutOfJailCards < 1)
            return "No Get Out of Jail Free cards.";
        player.getOutOfJailCards -= 1;
    }
    player.inJail = false;
    player.jailTurnsRemaining = 0;
    addLog(state, `${player.name} exited Jail via ${method}.`);
    return null;
}
// ─── Auction ─────────────────────────────────────────────────────────────────
function startAuction(state, position) {
    const active = activePlayers(state).map((p) => p.id);
    state.auction = {
        propertyPosition: position,
        highestBid: 0,
        highestBidderId: null,
        activeBidders: active,
    };
    addLog(state, `Auction started for position ${position}.`);
}
function placeBid(state, playerId, amount) {
    if (!state.auction)
        return "No active auction.";
    const { auction } = state;
    if (!auction.activeBidders.includes(playerId))
        return "You are not in this auction.";
    if (amount <= auction.highestBid)
        return `Bid must be higher than current highest ($${auction.highestBid}).`;
    const player = getPlayerById(state, playerId);
    if (player.money < amount)
        return "Not enough money.";
    auction.highestBid = amount;
    auction.highestBidderId = playerId;
    addLog(state, `${player.name} bid $${amount} in the auction.`);
    return null;
}
function withdrawFromAuction(state, playerId) {
    if (!state.auction)
        return;
    state.auction.activeBidders = state.auction.activeBidders.filter((id) => id !== playerId);
    addLog(state, `Player ${playerId} withdrew from auction.`);
}
function endAuction(state) {
    if (!state.auction)
        return { winnerId: null, amount: 0 };
    const { auction } = state;
    const result = {
        winnerId: auction.highestBidderId,
        amount: auction.highestBid,
    };
    if (auction.highestBidderId && auction.highestBid > 0) {
        const winner = getPlayerById(state, auction.highestBidderId);
        const space = getSpace(state, auction.propertyPosition);
        winner.money -= auction.highestBid;
        space.ownerId = winner.id;
        winner.properties.push(auction.propertyPosition);
        addLog(state, `${winner.name} won the auction for position ${auction.propertyPosition} at $${auction.highestBid}.`);
    }
    else {
        addLog(state, `Auction ended with no winner.`);
    }
    state.auction = null;
    return result;
}
// ─── Trade ───────────────────────────────────────────────────────────────────
function proposeTrade(state, trade) {
    if (state.activeTrade)
        return "A trade is already pending.";
    const from = getPlayerById(state, trade.fromPlayerId);
    const to = getPlayerById(state, trade.toPlayerId);
    if (!from || !to)
        return "Invalid player IDs.";
    // Validate offered items belong to proposer
    for (const pos of trade.offer.properties) {
        const sp = getSpace(state, pos);
        if (sp.ownerId !== trade.fromPlayerId)
            return `You do not own position ${pos}.`;
    }
    if (trade.offer.cash > from.money)
        return "Insufficient cash offered.";
    if (trade.offer.getOutOfJailCards > from.getOutOfJailCards)
        return "Insufficient GOOJF cards.";
    // Validate requested items belong to target
    for (const pos of trade.request.properties) {
        const sp = getSpace(state, pos);
        if (sp.ownerId !== trade.toPlayerId)
            return `Target does not own position ${pos}.`;
    }
    if (trade.request.cash > to.money)
        return "Target has insufficient cash.";
    if (trade.request.getOutOfJailCards > to.getOutOfJailCards)
        return "Target has insufficient GOOJF cards.";
    state.activeTrade = { ...trade, status: "pending" };
    addLog(state, `${from.name} proposed a trade to ${to.name}.`);
    return null;
}
function executeTrade(state) {
    const trade = state.activeTrade;
    if (!trade || trade.status !== "pending")
        return "No active trade.";
    const from = getPlayerById(state, trade.fromPlayerId);
    const to = getPlayerById(state, trade.toPlayerId);
    // Transfer cash
    from.money -= trade.offer.cash;
    to.money += trade.offer.cash;
    to.money -= trade.request.cash;
    from.money += trade.request.cash;
    // Transfer GOOJF cards
    from.getOutOfJailCards -= trade.offer.getOutOfJailCards;
    to.getOutOfJailCards += trade.offer.getOutOfJailCards;
    to.getOutOfJailCards -= trade.request.getOutOfJailCards;
    from.getOutOfJailCards += trade.request.getOutOfJailCards;
    // Transfer properties (offer: from→to)
    for (const pos of trade.offer.properties) {
        const sp = getSpace(state, pos);
        sp.ownerId = to.id;
        from.properties = from.properties.filter((p) => p !== pos);
        to.properties.push(pos);
    }
    // Transfer properties (request: to→from)
    for (const pos of trade.request.properties) {
        const sp = getSpace(state, pos);
        sp.ownerId = from.id;
        to.properties = to.properties.filter((p) => p !== pos);
        from.properties.push(pos);
    }
    trade.status = "accepted";
    addLog(state, `Trade completed between ${from.name} and ${to.name}.`);
    state.activeTrade = null;
    return null;
}
// ─── Bankruptcy ──────────────────────────────────────────────────────────────
function declareBankruptcy(state, playerId, creditorId) {
    const player = getPlayerById(state, playerId);
    player.isBankrupt = true;
    if (creditorId) {
        const creditor = getPlayerById(state, creditorId);
        // Transfer remaining cash
        creditor.money += player.money;
        player.money = 0;
        // Transfer properties
        for (const pos of player.properties) {
            const sp = getSpace(state, pos);
            sp.ownerId = creditor.id;
            creditor.properties.push(pos);
        }
        creditor.getOutOfJailCards += player.getOutOfJailCards;
    }
    else {
        // Bankrupt to bank — properties go to auction (handled by socket layer)
        for (const pos of player.properties) {
            const sp = getSpace(state, pos);
            sp.ownerId = null;
            sp.houses = 0;
            sp.hasHotel = false;
            sp.isMortgaged = false;
        }
        player.money = 0;
    }
    player.properties = [];
    player.getOutOfJailCards = 0;
    addLog(state, `${player.name} declared bankruptcy.`);
    // Check for winner
    const remaining = activePlayers(state);
    if (remaining.length === 1) {
        state.winner = remaining[0].id;
        state.status = "ended";
        addLog(state, `${remaining[0].name} wins the game!`);
    }
}
// ─── Turn Management ─────────────────────────────────────────────────────────
function advanceTurn(state) {
    state.diceRoll = null;
    state.doublesCount = 0;
    state.lastDiceRollWasDoubles = false;
    const players = activePlayers(state);
    if (players.length === 0)
        return;
    let next = (state.currentPlayerIndex + 1) % state.players.length;
    // Skip bankrupt players
    while (state.players[next].isBankrupt) {
        next = (next + 1) % state.players.length;
    }
    state.currentPlayerIndex = next;
    addLog(state, `It is now ${state.players[next].name}'s turn.`);
}
