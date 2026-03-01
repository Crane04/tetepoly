import type { BoardSpace } from '../types';

const PROP_COLOR: Record<string, string> = {
  Brown: '#92400e',
  'Light Blue': '#bae6fd',
  Pink: '#fbcfe8',
  Orange: '#fed7aa',
  Red: '#fca5a5',
  Yellow: '#fef08a',
  Green: '#bbf7d0',
  'Dark Blue': '#bfdbfe',
};

interface PropertyCardProps {
  space: BoardSpace;
  /** True when it's the current player's decision to buy or decline */
  canBuy: boolean;
  playerMoney?: number;
  onBuy?: () => void;
  onDecline?: () => void;
  onClose?: () => void;
}

export default function PropertyCard({
  space,
  canBuy,
  playerMoney,
  onBuy,
  onDecline,
  onClose,
}: PropertyCardProps) {
  const color = space.colorGroup ? (PROP_COLOR[space.colorGroup] ?? '#e5e7eb') : '#e5e7eb';
  const canAfford = playerMoney !== undefined ? playerMoney >= (space.price ?? 0) : true;

  const headerLabel =
    space.colorGroup ??
    (space.type === 'railroad' ? 'Railroad' : space.type === 'utility' ? 'Utility' : '');

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white text-gray-900 rounded-xl shadow-2xl w-64 overflow-hidden">
        {/* Color / type header */}
        <div
          className="h-10 flex items-center justify-center font-bold text-xs tracking-widest uppercase"
          style={{ backgroundColor: color, color: '#111' }}
        >
          {headerLabel}
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-center mb-1 leading-tight">{space.name}</h2>

          {space.price && (
            <p className="text-center text-sm text-gray-500 mb-3">Price: ${space.price}</p>
          )}

          {/* Rent table for regular properties */}
          {space.rentLevels && (
            <table className="w-full text-xs mb-3 border-t border-gray-200">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-0.5 text-gray-600">Rent</td>
                  <td className="text-right font-semibold">${space.rentLevels[0]}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-0.5 text-gray-600">Color set</td>
                  <td className="text-right font-semibold">${space.rentLevels[1]}</td>
                </tr>
                {[1, 2, 3, 4].map((h) => (
                  <tr key={h} className="border-b border-gray-100">
                    <td className="py-0.5 text-gray-600">
                      {h} house{h > 1 ? 's' : ''}
                    </td>
                    <td className="text-right font-semibold">${space.rentLevels![h + 1]}</td>
                  </tr>
                ))}
                <tr className="border-b border-gray-100">
                  <td className="py-0.5 text-gray-600">Hotel</td>
                  <td className="text-right font-semibold">${space.rentLevels[6]}</td>
                </tr>
              </tbody>
            </table>
          )}

          {/* Railroad rent info */}
          {space.type === 'railroad' && (
            <div className="text-xs mb-3 border-t border-gray-200 pt-2 space-y-0.5 text-gray-600">
              <p>1 owned: $25 &nbsp; 2 owned: $50</p>
              <p>3 owned: $100 &nbsp; 4 owned: $200</p>
            </div>
          )}

          {/* Utility rent info */}
          {space.type === 'utility' && (
            <div className="text-xs mb-3 border-t border-gray-200 pt-2 space-y-0.5 text-gray-600">
              <p>1 utility: rent = 4× dice roll</p>
              <p>Both utilities: rent = 10× dice roll</p>
            </div>
          )}

          {space.mortgageValue && (
            <p className="text-xs text-gray-400 text-center mb-4">
              Mortgage value: ${space.mortgageValue}
            </p>
          )}

          {/* Actions */}
          {canBuy ? (
            <div className="flex gap-2">
              <button
                className={`flex-1 rounded py-2 font-semibold text-sm text-white transition-colors ${
                  canAfford
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={canAfford ? onBuy : undefined}
                disabled={!canAfford}
                title={!canAfford ? "You can't afford this property" : undefined}
              >
                Buy ${space.price}
              </button>
              <button
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded py-2 font-semibold text-sm transition-colors"
                onClick={onDecline}
              >
                Decline
              </button>
            </div>
          ) : (
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded py-2 font-semibold text-sm transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
