# Monopoly — Full Game Context for Development

**Tech Stack:** Node.js (TypeScript), Socket.io, Express, React

---

## 1. Game Overview

- 2–8 players
- Turn-based, real-time multiplayer
- Goal: Be the last player with money/property (bankrupt all others)
- Game ends when all but one player are bankrupt

---

## 2. The Board (40 Spaces)

| Position | Name | Type | Price | Base Rent | Color Group |
|----------|------|------|-------|-----------|-------------|
| 0 | GO | Special | - | - | - |
| 1 | Mediterranean Ave | Property | $60 | $2 | Brown |
| 2 | Community Chest | Card | - | - | - |
| 3 | Baltic Ave | Property | $60 | $4 | Brown |
| 4 | Income Tax | Tax | - | $200 | - |
| 5 | Reading Railroad | Railroad | $200 | $25 | Railroad |
| 6 | Oriental Ave | Property | $100 | $6 | Light Blue |
| 7 | Chance | Card | - | - | - |
| 8 | Vermont Ave | Property | $100 | $6 | Light Blue |
| 9 | Connecticut Ave | Property | $120 | $8 | Light Blue |
| 10 | Jail / Just Visiting | Special | - | - | - |
| 11 | St. Charles Place | Property | $140 | $10 | Pink |
| 12 | Electric Company | Utility | $150 | - | Utility |
| 13 | States Ave | Property | $140 | $10 | Pink |
| 14 | Virginia Ave | Property | $160 | $12 | Pink |
| 15 | Pennsylvania Railroad | Railroad | $200 | $25 | Railroad |
| 16 | St. James Place | Property | $180 | $14 | Orange |
| 17 | Community Chest | Card | - | - | - |
| 18 | Tennessee Ave | Property | $180 | $14 | Orange |
| 19 | New York Ave | Property | $200 | $16 | Orange |
| 20 | Free Parking | Special | - | - | - |
| 21 | Kentucky Ave | Property | $220 | $18 | Red |
| 22 | Chance | Card | - | - | - |
| 23 | Indiana Ave | Property | $220 | $18 | Red |
| 24 | Illinois Ave | Property | $240 | $20 | Red |
| 25 | B&O Railroad | Railroad | $200 | $25 | Railroad |
| 26 | Atlantic Ave | Property | $260 | $22 | Yellow |
| 27 | Ventnor Ave | Property | $260 | $22 | Yellow |
| 28 | Water Works | Utility | $150 | - | Utility |
| 29 | Marvin Gardens | Property | $280 | $24 | Yellow |
| 30 | Go To Jail | Special | - | - | - |
| 31 | Pacific Ave | Property | $300 | $26 | Green |
| 32 | North Carolina Ave | Property | $300 | $26 | Green |
| 33 | Community Chest | Card | - | - | - |
| 34 | Pennsylvania Ave | Property | $320 | $28 | Green |
| 35 | Short Line Railroad | Railroad | $200 | $25 | Railroad |
| 36 | Chance | Card | - | - | - |
| 37 | Park Place | Property | $350 | $35 | Dark Blue |
| 38 | Luxury Tax | Tax | - | $100 | - |
| 39 | Boardwalk | Property | $400 | $50 | Dark Blue |

---

## 3. Full Rent Structure Per Property

Rent increases as houses and hotels are built. Owning all properties in a color group (a "color set") doubles the base rent even without houses.

| Color | Property | Price | Mortgage | House Cost | Base | Color Set | 1H | 2H | 3H | 4H | Hotel |
|-------|----------|-------|----------|------------|------|-----------|----|----|----|----|----|
| Brown | Mediterranean Ave | $60 | $30 | $50 | $2 | $4 | $10 | $30 | $90 | $160 | $250 |
| Brown | Baltic Ave | $60 | $30 | $50 | $4 | $8 | $20 | $60 | $180 | $320 | $450 |
| Light Blue | Oriental Ave | $100 | $50 | $50 | $6 | $12 | $30 | $90 | $270 | $400 | $550 |
| Light Blue | Vermont Ave | $100 | $50 | $50 | $6 | $12 | $30 | $90 | $270 | $400 | $550 |
| Light Blue | Connecticut Ave | $120 | $60 | $50 | $8 | $16 | $40 | $100 | $300 | $450 | $600 |
| Pink | St. Charles Place | $140 | $70 | $100 | $10 | $20 | $50 | $150 | $450 | $625 | $750 |
| Pink | States Ave | $140 | $70 | $100 | $10 | $20 | $50 | $150 | $450 | $625 | $750 |
| Pink | Virginia Ave | $160 | $80 | $100 | $12 | $24 | $60 | $180 | $500 | $700 | $900 |
| Orange | St. James Place | $180 | $90 | $100 | $14 | $28 | $70 | $200 | $550 | $750 | $950 |
| Orange | Tennessee Ave | $180 | $90 | $100 | $14 | $28 | $70 | $200 | $550 | $750 | $950 |
| Orange | New York Ave | $200 | $100 | $100 | $16 | $32 | $80 | $220 | $600 | $800 | $1000 |
| Red | Kentucky Ave | $220 | $110 | $150 | $18 | $36 | $90 | $250 | $700 | $875 | $1050 |
| Red | Indiana Ave | $220 | $110 | $150 | $18 | $36 | $90 | $250 | $700 | $875 | $1050 |
| Red | Illinois Ave | $240 | $120 | $150 | $20 | $40 | $100 | $300 | $750 | $900 | $1100 |
| Yellow | Atlantic Ave | $260 | $130 | $150 | $22 | $44 | $110 | $330 | $800 | $975 | $1150 |
| Yellow | Ventnor Ave | $260 | $130 | $150 | $22 | $44 | $110 | $330 | $800 | $975 | $1150 |
| Yellow | Marvin Gardens | $280 | $140 | $150 | $24 | $48 | $120 | $360 | $850 | $1025 | $1200 |
| Green | Pacific Ave | $300 | $150 | $200 | $26 | $52 | $130 | $390 | $900 | $1100 | $1275 |
| Green | North Carolina Ave | $300 | $150 | $200 | $26 | $52 | $130 | $390 | $900 | $1100 | $1275 |
| Green | Pennsylvania Ave | $320 | $160 | $200 | $28 | $56 | $150 | $450 | $1000 | $1200 | $1400 |
| Dark Blue | Park Place | $350 | $175 | $200 | $35 | $70 | $175 | $500 | $1100 | $1300 | $1500 |
| Dark Blue | Boardwalk | $400 | $200 | $200 | $50 | $100 | $200 | $600 | $1400 | $1700 | $2000 |

---

## 4. Railroads

- Price: $200 each
- Own 1: $25 rent
- Own 2: $50 rent
- Own 3: $100 rent
- Own 4: $200 rent
- Mortgage value: $100

---

## 5. Utilities

- Price: $150 each
- Mortgage value: $75
- Own 1: Rent = dice roll × 4
- Own 2: Rent = dice roll × 10

---

## 6. House & Hotel Rules

- Must own **all properties** in a color group before building
- Must build **evenly** — no property can have more than 1 house ahead of any other in the group
- 4 houses → can be replaced with 1 hotel (houses returned to bank)
- Selling: houses/hotels sold back to bank at **half price**
- Bank has limited supply: **32 houses** and **12 hotels**
- If bank runs out of houses, no one can build until houses are sold back

---

## 7. Chance Cards (16 Cards)

1. Advance to GO (collect $200)
2. Advance to Illinois Ave (collect $200 if you pass GO)
3. Advance to St. Charles Place (collect $200 if you pass GO)
4. Advance to nearest Railroad — pay double rent if owned
5. Advance to nearest Railroad — pay double rent if owned
6. Advance to nearest Utility — if owned, pay 10× dice roll
7. Bank pays you dividend of $50
8. Get Out of Jail Free card (keep until used or sold)
9. Go Back 3 Spaces
10. Go to Jail — do not pass GO, do not collect $200
11. Make general repairs on all your property: $25 per house, $100 per hotel
12. Pay poor tax of $15
13. Take a trip to Reading Railroad (collect $200 if you pass GO)
14. Take a walk on the Boardwalk — advance to Boardwalk
15. You have been elected chairman of the board — pay each player $50
16. Your building loan matures — collect $150

---

## 8. Community Chest Cards (16 Cards)

1. Advance to GO (collect $200)
2. Bank error in your favor — collect $200
3. Doctor's fee — pay $50
4. From sale of stock you get $50
5. Get Out of Jail Free card (keep until used or sold)
6. Go to Jail — do not pass GO, do not collect $200
7. Grand Opera Night — collect $50 from every player
8. Holiday Fund matures — collect $100
9. Income tax refund — collect $20
10. It is your birthday — collect $10 from every player
11. Life insurance matures — collect $100
12. Pay hospital fees of $100
13. Pay school fees of $150
14. Receive $25 consultancy fee
15. You are assessed for street repairs: $40 per house, $115 per hotel
16. You have won second prize in a beauty contest — collect $10

---

## 9. Special Spaces

| Space | Effect |
|-------|--------|
| GO (pos 0) | Collect $200 when passing or landing |
| Just Visiting / Jail (pos 10) | No effect if Just Visiting; restricted actions if In Jail |
| Free Parking (pos 20) | No effect (standard rules) |
| Go To Jail (pos 30) | Move directly to Jail; do not pass GO; do not collect $200 |
| Income Tax (pos 4) | Pay $200 to bank |
| Luxury Tax (pos 38) | Pay $100 to bank |

---

## 10. Jail Rules

**A player goes to Jail when:**
- Landing on "Go To Jail" space
- Drawing a "Go to Jail" card
- Rolling doubles 3 consecutive turns

**To get out of Jail:**
- Roll doubles on your turn (allowed up to 3 turns)
- Pay $50 fine before rolling on any of the 3 turns
- Use a Get Out of Jail Free card

**If no doubles after 3 turns:** must pay $50 fine and move the dice amount.

**While in Jail:** a player can still collect rent, trade, buy/sell houses, and mortgage properties.

---

## 11. Turn Structure

```
1. Check if player is in Jail
   a. In Jail → attempt roll, pay fine, or use card
   b. Not in Jail → proceed normally

2. Roll two dice
   a. If doubles on 3rd consecutive roll → Go to Jail immediately, turn ends
   b. If doubles (not 3rd) → player moves and gets another roll after resolving space
   c. Otherwise → normal move

3. Move token forward (position + roll) % 40

4. If passed or landed on GO → collect $200

5. Resolve landed space:
   a. Unowned property → offer to buy at face value, or go to auction
   b. Owned property (not mortgaged) → pay rent to owner
   c. Tax space → pay bank
   d. Chance → draw and resolve Chance card
   e. Community Chest → draw and resolve Community Chest card
   f. Go To Jail → move to Jail
   g. Free Parking, Just Visiting → no action

6. After resolving space (and after any extra rolls from doubles):
   - Player may buy/sell houses or hotels
   - Player may mortgage/unmortgage properties
   - Player may propose trades

7. End turn → next player
```

---

## 12. Trading

- Players can trade: properties, cash, Get Out of Jail Free cards
- Both players must agree to terms
- Mortgaged properties can be traded; buyer is notified and may need to pay 10% fee to unmortgage later
- Immunity deals (e.g., "free landing once") are house rules and optional to implement

---

## 13. Mortgage Rules

- Mortgage value = half the purchase price
- To mortgage: collect mortgage value from bank; property earns no rent while mortgaged
- To unmortgage: pay mortgage value + 10% interest fee
- Cannot build houses on a mortgaged property or on any property in a group with a mortgaged property
- Trading mortgaged properties: new owner must either pay 10% interest immediately or leave it mortgaged (and pay 10% + mortgage value when they decide to unmortgage later)

---

## 14. Bankruptcy

A player is bankrupt when they **cannot pay a debt** even after:
- Selling all houses/hotels back to the bank (at half price)
- Mortgaging all their properties

**If bankrupt to another player:**
- All remaining cash and properties (mortgaged or not) go to that player
- Receiving player takes over mortgaged properties and must pay 10% of mortgage value for each

**If bankrupt to the bank:**
- All properties return to the bank and are auctioned to remaining players

The bankrupt player is eliminated from the game.

---

## 15. Auctions

- Triggered when a player lands on an unowned property and **declines to buy** it
- All players including the one who declined may bid
- Bidding starts at $1 (no minimum)
- Highest bidder pays and receives the property
- If no bids, the property remains unowned (rare edge case)

---

## 16. Game State — TypeScript Interfaces

```typescript
// ─── Core Game State ───────────────────────────────────────────────────────

interface GameState {
  gameId: string;
  status: 'waiting' | 'started' | 'ended';
  players: Player[];
  currentPlayerIndex: number;
  board: BoardSpace[];
  chanceDeck: Card[];
  communityChestDeck: Card[];
  bank: Bank;
  auction: Auction | null;
  activeTrade: Trade | null;
  diceRoll: [number, number] | null;
  doublesCount: number;         // resets each turn; goes to jail at 3
  lastDiceRollWasDoubles: boolean;
  winner: string | null;
  log: string[];               // game event log
}

// ─── Player ────────────────────────────────────────────────────────────────

interface Player {
  id: string;
  name: string;
  token: string;               // e.g., 'car', 'hat', 'dog', 'ship', etc.
  position: number;            // 0–39
  money: number;               // starts at $1500
  properties: number[];        // board positions owned
  inJail: boolean;
  jailTurnsRemaining: number;  // 0–3
  isBankrupt: boolean;
  getOutOfJailCards: number;   // count of GOOJF cards held
  isConnected: boolean;
}

// ─── Board Space ───────────────────────────────────────────────────────────

type SpaceType =
  | 'property'
  | 'railroad'
  | 'utility'
  | 'tax'
  | 'chance'
  | 'community_chest'
  | 'go'
  | 'jail'
  | 'free_parking'
  | 'go_to_jail';

interface BoardSpace {
  position: number;
  name: string;
  type: SpaceType;
  price?: number;
  mortgageValue?: number;
  houseCost?: number;
  colorGroup?: string;
  ownerId?: string | null;
  isMortgaged: boolean;
  houses: number;              // 0–4
  hasHotel: boolean;
  rentLevels?: number[];       // [base, colorSet, 1H, 2H, 3H, 4H, hotel]
  taxAmount?: number;          // for tax spaces
}

// ─── Bank ──────────────────────────────────────────────────────────────────

interface Bank {
  houses: number;              // starts at 32
  hotels: number;              // starts at 12
}

// ─── Cards ─────────────────────────────────────────────────────────────────

type CardAction =
  | 'advance_to'               // move to specific position
  | 'advance_to_nearest'       // nearest railroad or utility
  | 'collect'                  // collect from bank
  | 'pay'                      // pay bank
  | 'collect_from_players'     // collect from each player
  | 'pay_each_player'          // pay each player
  | 'go_to_jail'
  | 'get_out_of_jail_free'
  | 'go_back'                  // go back N spaces
  | 'repairs';                 // pay per house/hotel

interface Card {
  id: string;
  deck: 'chance' | 'community_chest';
  description: string;
  action: CardAction;
  value?: number;              // amount to collect/pay
  targetPosition?: number;     // for advance_to
  targetType?: 'railroad' | 'utility'; // for advance_to_nearest
  stepsBack?: number;          // for go_back
  houseCost?: number;          // for repairs
  hotelCost?: number;          // for repairs
  doubleRentIfOwned?: boolean; // for advance_to_nearest railroad
  multiplierIfOwned?: number;  // for advance_to_nearest utility
}

// ─── Auction ───────────────────────────────────────────────────────────────

interface Auction {
  propertyPosition: number;
  highestBid: number;
  highestBidderId: string | null;
  activeBidders: string[];     // player ids still in auction
}

// ─── Trade ─────────────────────────────────────────────────────────────────

interface Trade {
  fromPlayerId: string;
  toPlayerId: string;
  offer: TradeOffer;
  request: TradeOffer;
  status: 'pending' | 'accepted' | 'declined';
}

interface TradeOffer {
  cash: number;
  properties: number[];        // board positions
  getOutOfJailCards: number;
}
```

---

## 17. Starting Conditions

- Each player starts at position 0 (GO)
- Each player starts with **$1,500**:
  - 2 × $500
  - 2 × $100
  - 2 × $50
  - 6 × $20
  - 5 × $10
  - 5 × $5
  - 5 × $1
- Bank holds all 32 houses, 12 hotels, all properties
- Chance and Community Chest decks are shuffled separately
- Turn order determined randomly or by highest dice roll

---

## 18. Socket.io Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `joinGame` | `{ gameId, playerName, token }` | Join or create a game room |
| `startGame` | `{ gameId }` | Host starts the game |
| `rollDice` | `{ gameId }` | Roll dice for current turn |
| `buyProperty` | `{ gameId, position }` | Buy the landed-on property |
| `declineBuy` | `{ gameId, position }` | Decline purchase, trigger auction |
| `placeBid` | `{ gameId, amount }` | Bid during auction |
| `withdrawFromAuction` | `{ gameId }` | Drop out of auction |
| `buildHouse` | `{ gameId, position }` | Build a house on a property |
| `buildHotel` | `{ gameId, position }` | Upgrade to hotel |
| `sellHouse` | `{ gameId, position }` | Sell a house back to bank |
| `sellHotel` | `{ gameId, position }` | Downgrade hotel to houses |
| `mortgageProperty` | `{ gameId, position }` | Mortgage a property |
| `unmortgageProperty` | `{ gameId, position }` | Unmortgage a property |
| `proposeTrade` | `{ gameId, trade: Trade }` | Propose a trade |
| `respondTrade` | `{ gameId, accept: boolean }` | Accept or decline a trade |
| `payJailFine` | `{ gameId }` | Pay $50 to leave jail |
| `useJailCard` | `{ gameId }` | Use Get Out of Jail Free card |
| `declareBankruptcy` | `{ gameId }` | Formally declare bankruptcy |
| `endTurn` | `{ gameId }` | End current player's turn |
| `leaveGame` | `{ gameId }` | Disconnect from game |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `gameState` | `GameState` | Full state sync (on join, reconnect) |
| `playerJoined` | `{ player: Player }` | A player joined the lobby |
| `playerLeft` | `{ playerId }` | A player disconnected |
| `gameStarted` | `GameState` | Game begins |
| `diceRolled` | `{ playerId, dice: [n,n], total, isDoubles }` | Dice result |
| `playerMoved` | `{ playerId, from, to, passedGo }` | Player moved |
| `propertyLanded` | `{ playerId, position, space: BoardSpace }` | Landed on property |
| `propertyBought` | `{ playerId, position }` | Player bought property |
| `auctionStarted` | `{ auction: Auction }` | Auction begins |
| `auctionBid` | `{ auction: Auction }` | New bid placed |
| `auctionEnded` | `{ winnerId, position, amount }` | Auction concluded |
| `cardDrawn` | `{ playerId, deck, card: Card }` | Card drawn and action applied |
| `rentPaid` | `{ fromId, toId, amount, position }` | Rent transaction |
| `taxPaid` | `{ playerId, amount }` | Tax paid to bank |
| `jailEntered` | `{ playerId }` | Player sent to Jail |
| `jailExited` | `{ playerId, method }` | Player left Jail |
| `houseBuilt` | `{ playerId, position }` | House built |
| `hotelBuilt` | `{ playerId, position }` | Hotel built |
| `propertyMortgaged` | `{ playerId, position }` | Property mortgaged |
| `propertyUnmortgaged` | `{ playerId, position }` | Property unmortgaged |
| `tradeProposed` | `{ trade: Trade }` | Trade offer sent |
| `tradeCompleted` | `{ trade: Trade }` | Trade accepted and executed |
| `tradeDeclined` | `{ trade: Trade }` | Trade rejected |
| `playerBankrupt` | `{ playerId, creditorId }` | Player eliminated |
| `gameOver` | `{ winnerId, winnerName }` | Game ended |
| `error` | `{ message }` | Error feedback |

---

## 19. Rent Calculation Logic

```typescript
function calculateRent(space: BoardSpace, diceTotal: number, ownedByPlayer: Player, allSpaces: BoardSpace[]): number {
  if (space.isMortgaged) return 0;

  if (space.type === 'railroad') {
    const railroadsOwned = allSpaces.filter(
      s => s.type === 'railroad' && s.ownerId === ownedByPlayer.id
    ).length;
    return 25 * Math.pow(2, railroadsOwned - 1);
  }

  if (space.type === 'utility') {
    const utilitiesOwned = allSpaces.filter(
      s => s.type === 'utility' && s.ownerId === ownedByPlayer.id
    ).length;
    return diceTotal * (utilitiesOwned === 2 ? 10 : 4);
  }

  if (space.type === 'property' && space.rentLevels) {
    if (space.hasHotel) return space.rentLevels[6];
    if (space.houses > 0) return space.rentLevels[space.houses + 1]; // indices 2–5
    // Check if owner has color set (no houses)
    const colorGroupSpaces = allSpaces.filter(s => s.colorGroup === space.colorGroup);
    const ownsAll = colorGroupSpaces.every(s => s.ownerId === ownedByPlayer.id);
    return ownsAll ? space.rentLevels[1] : space.rentLevels[0];
  }

  return 0;
}
```

---

## 20. "Advance to Nearest" Logic (Chance Cards)

```typescript
function getNearestOf(type: 'railroad' | 'utility', currentPosition: number): number {
  const railroads = [5, 15, 25, 35];
  const utilities = [12, 28];
  const targets = type === 'railroad' ? railroads : utilities;

  for (const target of targets) {
    if (target > currentPosition) return target;
  }
  return targets[0]; // wrap around
}

function didPassGo(from: number, to: number): boolean {
  return to < from || to === 0;
}
```

---

## 21. Project Structure

```
monopoly/
├── server/
│   ├── src/
│   │   ├── game/
│   │   │   ├── GameManager.ts        # manages all active game rooms
│   │   │   ├── GameState.ts          # state mutations and validation
│   │   │   ├── Board.ts              # static board data and initialization
│   │   │   ├── Player.ts             # player-specific logic
│   │   │   ├── Dice.ts               # dice rolling logic
│   │   │   ├── Cards.ts              # shuffle, draw, apply card effects
│   │   │   ├── Auction.ts            # auction lifecycle
│   │   │   ├── Trade.ts              # trade proposal and execution
│   │   │   └── RentCalculator.ts     # rent calculation
│   │   ├── socket/
│   │   │   └── index.ts              # all socket.io event handlers
│   │   ├── routes/
│   │   │   └── gameRoutes.ts         # REST endpoints (create/join game)
│   │   └── index.ts                  # express + socket.io server entry
│   ├── package.json
│   └── tsconfig.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board/
│   │   │   │   ├── Board.tsx         # full board layout
│   │   │   │   ├── BoardSpace.tsx    # individual space
│   │   │   │   └── PlayerToken.tsx
│   │   │   ├── UI/
│   │   │   │   ├── Dice.tsx
│   │   │   │   ├── PropertyCard.tsx  # property info panel
│   │   │   │   ├── TradeModal.tsx
│   │   │   │   ├── AuctionModal.tsx
│   │   │   │   ├── BankruptcyModal.tsx
│   │   │   │   ├── GameLog.tsx       # event history feed
│   │   │   │   └── PlayerPanel.tsx   # player money/properties HUD
│   │   │   └── Lobby.tsx
│   │   ├── store/
│   │   │   └── gameStore.ts          # Zustand or Redux store
│   │   ├── socket/
│   │   │   └── socketClient.ts       # socket.io-client setup
│   │   ├── hooks/
│   │   │   └── useGame.ts            # custom hook for game actions
│   │   ├── types/
│   │   │   └── index.ts              # shared TypeScript interfaces
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── shared/
    └── types/
        └── index.ts                  # shared types (import in both server & client)
```

---

## 22. Key Implementation Notes

**Game Room Management:** Each game has a unique `gameId`. Use a `Map<string, GameState>` in `GameManager.ts` to hold active games in memory. Optionally persist to Redis or a DB for reconnect support.

**Turn Guards:** Every socket action should verify it is the correct player's turn and that the action is valid for the current game phase (e.g., can't build houses mid-roll resolution).

**Atomic State Updates:** Mutate state server-side only. After each action, broadcast updated `GameState` to all players in the room.

**Deck Shuffling:** Shuffle Chance and Community Chest decks at game start. When a deck is empty, reshuffle discarded cards (except GOOJF cards currently held by players).

**Disconnection Handling:** When a player disconnects, set `player.isConnected = false`. Allow a reconnect window (e.g., 60 seconds). If they don't reconnect, either auto-play or give host option to remove them.

**Double Roll Loop:** Track `doublesCount` per turn. Reset on non-doubles or when the player goes to Jail. After resolving a space from doubles, immediately trigger another roll — do not end turn.

**Building Evenly Enforcement:** Before allowing a house placement, verify no other property in the same color group has fewer houses than the target.

**Auction Timeout:** Set a timer (e.g., 10–15 seconds) per bid round to keep the game moving.

---

## 23. Recommended Libraries

| Purpose | Library |
|---------|---------|
| Server framework | `express` |
| WebSockets | `socket.io` |
| Language | `typescript` |
| UUID generation | `uuid` |
| State management (client) | `zustand` or `redux-toolkit` |
| UI framework | `react` + `vite` |
| Styling | `tailwindcss` |
| Drag & drop (trading UI) | `@dnd-kit/core` |
| Animation (tokens) | `framer-motion` |
| Testing | `jest` + `supertest` |

---

*This document is intended as a complete reference to feed into an AI coding assistant (Claude) in VS Code for building a full-stack Monopoly implementation.*
