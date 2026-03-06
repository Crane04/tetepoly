// ─── Core Game State ────────────────────────────────────────────────────────

export interface GameState {
  gameId: string;
  status: "waiting" | "started" | "ended";
  players: Player[];
  currentPlayerIndex: number;
  board: BoardSpace[];
  chanceDeck: Card[];
  communityChestDeck: Card[];
  bank: Bank;
  activeTrade: Trade | null;
  diceRoll: [number, number] | null;
  doublesCount: number;
  lastDiceRollWasDoubles: boolean;
  winner: string | null;
  winners: PayoutResult[] | null; // 1st and 2nd place with payout amounts
  log: string[];
  gameEndsAt: number | null; // ms timestamp when 15-min game timer expires
  turnEndsAt: number | null; // ms timestamp when current player's 20s turn expires
}

// ─── Payout ──────────────────────────────────────────────────────────────────

export interface PayoutResult {
  playerId: string;
  place: 1 | 2;
  netWorth: number;
  payoutShare: number; // e.g. 0.65 or 0.27
}

// ─── Room Info ───────────────────────────────────────────────────────────────

export interface RoomInfo {
  id: string;
  name: string;
  buyIn: number;
  startingMoney: number;
  capacity: number;
  playerCount: number;
  waitingCount: number;
  status: "waiting" | "started" | "ended";
  countdownEndsAt: number | null;
}

// ─── Player ─────────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  name: string;
  token: string;
  position: number;
  money: number;
  properties: number[];
  inJail: boolean;
  jailTurnsRemaining: number;
  isBankrupt: boolean;
  getOutOfJailCards: number;
  isConnected: boolean;
}

// ─── Board Space ─────────────────────────────────────────────────────────────

export type SpaceType =
  | "property"
  | "railroad"
  | "utility"
  | "tax"
  | "chance"
  | "community_chest"
  | "go"
  | "jail"
  | "free_parking"
  | "go_to_jail";

export interface BoardSpace {
  position: number;
  name: string;
  type: SpaceType;
  price?: number;
  mortgageValue?: number;
  houseCost?: number;
  colorGroup?: string;
  ownerId?: string | null;
  isMortgaged: boolean;
  houses: number;
  hasHotel: boolean;
  rentLevels?: number[]; // [base, colorSet, 1H, 2H, 3H, 4H, hotel]
  taxAmount?: number;
}

// ─── Bank ────────────────────────────────────────────────────────────────────

export interface Bank {
  houses: number;
  hotels: number;
}

// ─── Cards ───────────────────────────────────────────────────────────────────

export type CardAction =
  | "advance_to"
  | "advance_to_nearest"
  | "collect"
  | "pay"
  | "collect_from_players"
  | "pay_each_player"
  | "go_to_jail"
  | "get_out_of_jail_free"
  | "go_back"
  | "repairs";

export interface Card {
  id: string;
  deck: "chance" | "community_chest";
  description: string;
  action: CardAction;
  value?: number;
  targetPosition?: number;
  targetType?: "railroad" | "utility";
  stepsBack?: number;
  houseCost?: number;
  hotelCost?: number;
  doubleRentIfOwned?: boolean;
  multiplierIfOwned?: number;
}

// ─── Trade ───────────────────────────────────────────────────────────────────

export interface Trade {
  fromPlayerId: string;
  toPlayerId: string;
  offer: TradeOffer;
  request: TradeOffer;
  status: "pending" | "accepted" | "declined";
}

export interface TradeOffer {
  cash: number;
  properties: number[];
  getOutOfJailCards: number;
}

// ─── Socket Event Payloads ───────────────────────────────────────────────────

// Client → Server
export interface JoinGamePayload {
  gameId: string;
  playerName: string;
}
export interface StartGamePayload {
  gameId: string;
}
export interface RollDicePayload {
  gameId: string;
}
export interface BuyPropertyPayload {
  gameId: string;
  position: number;
}
export interface DeclineBuyPayload {
  gameId: string;
  position: number;
}
export interface BuildHousePayload {
  gameId: string;
  position: number;
}
export interface BuildHotelPayload {
  gameId: string;
  position: number;
}
export interface SellHousePayload {
  gameId: string;
  position: number;
}
export interface SellHotelPayload {
  gameId: string;
  position: number;
}
export interface MortgagePropertyPayload {
  gameId: string;
  position: number;
}
export interface UnmortgagePropertyPayload {
  gameId: string;
  position: number;
}
export interface ProposeTradePayload {
  gameId: string;
  trade: Trade;
}
export interface RespondTradePayload {
  gameId: string;
  accept: boolean;
}
export interface PayJailFinePayload {
  gameId: string;
}
export interface UseJailCardPayload {
  gameId: string;
}
export interface DeclareBankruptcyPayload {
  gameId: string;
}
export interface EndTurnPayload {
  gameId: string;
}
export interface LeaveGamePayload {
  gameId: string;
}
