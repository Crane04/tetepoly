import type { BoardSpace } from '../types';

// Muted dark strip colors for the property modal header
const HEADER_BG: Record<string, string> = {
  Brown:        "#2d1005",
  "Light Blue": "#052535",
  Pink:         "#2d0518",
  Orange:       "#2d1605",
  Red:          "#2d0505",
  Yellow:       "#222000",
  Green:        "#052005",
  "Dark Blue":  "#050520",
};

const HEADER_ACCENT: Record<string, string> = {
  Brown:        "#9a5020",
  "Light Blue": "#3090c0",
  Pink:         "#c04070",
  Orange:       "#c07020",
  Red:          "#c03030",
  Yellow:       "#b0a010",
  Green:        "#30a040",
  "Dark Blue":  "#3050c0",
};

interface PropertyCardProps {
  space: BoardSpace;
  canBuy: boolean;
  playerMoney?: number;
  onBuy?: () => void;
  onDecline?: () => void;
  onClose?: () => void;
}

export default function PropertyCard({ space, canBuy, playerMoney, onBuy, onDecline, onClose }: PropertyCardProps) {
  const canAfford = playerMoney !== undefined ? playerMoney >= (space.price ?? 0) : true;
  const headerBg = space.colorGroup ? (HEADER_BG[space.colorGroup] ?? '#0f1117') : '#0f1117';
  const accent = space.colorGroup ? (HEADER_ACCENT[space.colorGroup] ?? '#4a6080') : '#4a6080';

  const typeLabel =
    space.colorGroup ?? (space.type === 'railroad' ? 'Railroad' : space.type === 'utility' ? 'Utility' : 'Property');

  // Computed fields for the design's "BASE YIELD / MULTIPLIER / LIQUIDATION" layout
  const baseYield = space.rentLevels?.[0] ?? (space.type === 'railroad' ? 25 : null);
  const multiplier = space.rentLevels ? `×${(space.rentLevels[1] / (space.rentLevels[0] || 1)).toFixed(1)}` : space.type === 'railroad' ? '×2 / RR' : space.type === 'utility' ? '4× / 10×' : null;
  const liquidation = space.mortgageValue;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1117] border border-[#1e2230] rounded-xl shadow-2xl w-72 overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-4" style={{ backgroundColor: headerBg, borderBottom: `1px solid ${accent}30` }}>
          <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>{typeLabel}</p>
          <h2 className="text-xl font-bold uppercase tracking-wide text-slate-100">{space.name}</h2>
          {space.price && (
            <p className="font-mono text-sm mt-1" style={{ color: accent }}>${space.price}</p>
          )}
        </div>

        {/* Stats */}
        <div className="px-5 py-4 border-b border-[#1a1f2c]">
          <div className="flex flex-col gap-3">
            {baseYield !== null && (
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.15em] uppercase text-slate-600">Base Yield</span>
                <span className="font-mono text-sm text-slate-300">${baseYield}</span>
              </div>
            )}
            {multiplier && (
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.15em] uppercase text-slate-600">Multiplier</span>
                <span className="font-mono text-sm text-slate-300">{multiplier}</span>
              </div>
            )}
            {liquidation && (
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.15em] uppercase text-slate-600">Liquidation</span>
                <span className="font-mono text-sm text-slate-300">${liquidation}</span>
              </div>
            )}

            {/* Rent table detail (collapsed under main stats) */}
            {space.rentLevels && (
              <div className="border-t border-[#1a1f2c] pt-3 flex flex-col gap-1.5">
                {[1, 2, 3, 4].map((h) => (
                  <div key={h} className="flex justify-between">
                    <span className="text-xs text-[#2a3848]">{h} house{h > 1 ? 's' : ''}</span>
                    <span className="font-mono text-xs text-slate-600">${space.rentLevels![h + 1]}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-xs text-[#2a3848]">Hotel</span>
                  <span className="font-mono text-xs text-slate-600">${space.rentLevels[6]}</span>
                </div>
              </div>
            )}

            {space.type === 'railroad' && (
              <div className="border-t border-[#1a1f2c] pt-3 flex flex-col gap-1">
                {[25, 50, 100, 200].map((rent, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-xs text-[#2a3848]">{i + 1} railroad{i > 0 ? 's' : ''}</span>
                    <span className="font-mono text-xs text-slate-600">${rent}</span>
                  </div>
                ))}
              </div>
            )}

            {space.type === 'utility' && (
              <div className="border-t border-[#1a1f2c] pt-3 flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-xs text-[#2a3848]">1 utility</span>
                  <span className="font-mono text-xs text-slate-600">4× roll</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#2a3848]">Both owned</span>
                  <span className="font-mono text-xs text-slate-600">10× roll</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 flex gap-3">
          {canBuy ? (
            <>
              <button
                disabled={!canAfford}
                onClick={canAfford ? onBuy : undefined}
                className="flex-1 py-2.5 rounded border text-xs font-semibold tracking-[0.15em] uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-slate-500 text-slate-200 hover:border-slate-300 hover:text-white disabled:border-slate-800 disabled:text-slate-700"
                title={!canAfford ? "Insufficient funds" : undefined}
              >
                Acquire
              </button>
              <button
                onClick={onDecline}
                className="flex-1 py-2.5 rounded border border-[#1e2230] text-[#3a4a5a] text-xs font-semibold tracking-[0.15em] uppercase hover:border-red-900 hover:text-red-500 transition-colors"
              >
                Decline
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded border border-[#1e2230] text-slate-500 text-xs font-semibold tracking-[0.15em] uppercase hover:border-slate-600 hover:text-slate-400 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
