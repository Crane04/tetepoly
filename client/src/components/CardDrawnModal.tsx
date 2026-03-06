import type { Card } from "../types";

interface Props {
  deck: "chance" | "community_chest";
  card: Card;
  playerName: string;
  onClose: () => void;
}

export default function CardDrawnModal({ deck, card, playerName, onClose }: Props) {
  const isChance = deck === "chance";
  const label = isChance ? "Chance" : "Community";
  const icon = isChance ? "⟐" : "⊞";
  const accentColor = isChance ? "#3060a0" : "#207050";
  const accentBg = isChance ? "#05102a" : "#051a10";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#0f1117] rounded-xl shadow-2xl max-w-sm w-full overflow-hidden"
        style={{ border: `1px solid ${accentColor}50` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center gap-4" style={{ backgroundColor: accentBg, borderBottom: `1px solid ${accentColor}30` }}>
          <div className="w-10 h-10 rounded border flex items-center justify-center text-xl shrink-0" style={{ borderColor: `${accentColor}60`, color: accentColor }}>
            {icon}
          </div>
          <div>
            <p className="font-bold text-slate-200 tracking-wide uppercase text-sm">{label}</p>
            <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: accentColor }}>
              {playerName} drew a card
            </p>
          </div>
        </div>

        {/* Card text */}
        <div className="px-6 py-6">
          <p className="text-slate-300 text-sm leading-relaxed text-center">{card.description}</p>
        </div>

        {/* Dismiss */}
        <div className="px-6 pb-5 flex justify-center">
          <button
            className="px-8 py-2.5 rounded border border-[#1e2230] text-slate-400 text-xs font-semibold tracking-[0.15em] uppercase hover:border-slate-500 hover:text-slate-300 transition-colors"
            onClick={onClose}
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
