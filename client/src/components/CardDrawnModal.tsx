import type { Card } from "../types";

const DECK_LABEL: Record<string, string> = {
  chance: "Chance",
  community_chest: "Community Chest",
};

const DECK_COLOR: Record<string, string> = {
  chance: "#f59e0b",        // amber
  community_chest: "#3b82f6", // blue
};

interface Props {
  deck: "chance" | "community_chest";
  card: Card;
  playerName: string;
  onClose: () => void;
}

export default function CardDrawnModal({ deck, card, playerName, onClose }: Props) {
  const color = DECK_COLOR[deck] ?? "#888";
  const label = DECK_LABEL[deck] ?? deck;
  const icon = deck === "chance" ? "?" : "♠";

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden"
        style={{ border: `4px solid ${color}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ backgroundColor: color }}
        >
          <span className="text-3xl font-black text-white">{icon}</span>
          <div>
            <p className="font-black text-white text-lg leading-tight">{label}</p>
            <p className="text-white/80 text-sm">{playerName} drew a card</p>
          </div>
        </div>

        {/* Card body */}
        <div className="bg-white px-6 py-6 text-center">
          <p className="text-gray-800 text-base font-semibold leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* OK button */}
        <div className="bg-gray-50 px-6 py-4 flex justify-center">
          <button
            className="px-8 py-2 rounded-full font-bold text-white text-sm"
            style={{ backgroundColor: color }}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
