import type { BoardSpace, Player } from "../types";

// ─── Color palette ────────────────────────────────────────────────────────────

const PROP_COLOR: Record<string, string> = {
  Brown:        "#4a1c08",
  "Light Blue": "#073858",
  Pink:         "#4a0720",
  Orange:       "#4a2308",
  Red:          "#4a0808",
  Yellow:       "#3a3200",
  Green:        "#084a08",
  "Dark Blue":  "#08083a",
};

const PLAYER_COLORS = ["#e05050","#5070e0","#40b858","#d09030","#b050d0","#d05090"];
const CORNERS = new Set([0, 10, 20, 30]);

function gridPos(pos: number): { row: number; col: number } {
  if (pos <= 10) return { row: 10, col: 10 - pos };
  if (pos <= 20) return { row: 20 - pos, col: 0 };
  if (pos <= 30) return { row: 0, col: pos - 20 };
  return { row: pos - 30, col: 10 };
}

function cellRotation(pos: number): string {
  if (CORNERS.has(pos)) return "0deg";
  if (pos < 10) return "180deg";
  if (pos < 20) return "-90deg";
  if (pos < 30) return "0deg";
  return "90deg";
}

function spaceIcon(type: string, name: string): string {
  switch (type) {
    case "go":              return "↗";
    case "jail":            return "⛓";
    case "free_parking":    return "◌";
    case "go_to_jail":      return "⊗";
    case "chance":          return "?";
    case "community_chest": return "⊞";
    case "tax":             return name.includes("Income") ? "%" : "$";
    case "railroad":        return "▷";
    case "utility":         return name.includes("Electric") ? "⚡" : "~";
    default:                return "";
  }
}

function abbrev(name: string): string {
  return name
    .replace("Avenue", "Ave").replace("Railroad", "RR").replace("Place", "Pl")
    .replace("Gardens", "Gdn").replace(" Company", "").replace("Mediterranean", "Med")
    .replace("Pennsylvania", "Penn").replace("Connecticut", "CT").replace("North Carolina", "NC");
}

interface SpaceCellProps {
  space: BoardSpace;
  playersHere: Player[];
  playerColor: (id: string) => string;
  ownerColor: string | null;
}

function SpaceCell({ space, playersHere, playerColor, ownerColor }: SpaceCellProps) {
  const { row, col } = gridPos(space.position);
  const rot = cellRotation(space.position);
  const isCorner = CORNERS.has(space.position);
  const propColor = space.colorGroup ? (PROP_COLOR[space.colorGroup] ?? null) : null;

  const pad           = isCorner ? "0.5cqw" : "0.3cqw";
  const nameFontSize  = isCorner ? "clamp(8px,1.8cqw,18px)" : "clamp(5px,1.1cqw,12px)";
  const iconFontSize  = isCorner ? "clamp(14px,3cqw,36px)"  : "clamp(9px,1.8cqw,20px)";
  const labelFontSize = "clamp(6px,1.1cqw,12px)";
  const priceFontSize = "clamp(4px,0.85cqw,10px)";
  const tokenSize     = "clamp(10px,1.8cqw,22px)";
  const houseSize     = "clamp(4px,1cqw,12px)";
  const hotelSize     = "clamp(5px,1.2cqw,15px)";

  return (
    <div style={{ gridRow: row + 1, gridColumn: col + 1, backgroundColor: "#0c0e15", border: "1px solid #1a1f2c", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", transform: `rotate(${rot})`, padding: pad, boxSizing: "border-box" }}>
        {propColor ? (
          <div style={{ width: "100%", height: "22%", minHeight: "6%", flexShrink: 0, backgroundColor: propColor, border: ownerColor ? `2px solid ${ownerColor}` : "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.2cqw" }}>
            {space.hasHotel ? (
              <div style={{ width: hotelSize, height: hotelSize, background: "#9a2020", borderRadius: "1px", flexShrink: 0 }} />
            ) : (
              Array.from({ length: space.houses }).map((_, i) => (
                <div key={i} style={{ width: houseSize, height: houseSize, background: "#1a7a1a", borderRadius: "1px", flexShrink: 0 }} />
              ))
            )}
          </div>
        ) : (
          <div style={{ fontSize: iconFontSize, lineHeight: 1.1, textAlign: "center", color: isCorner ? "#607080" : "#3a4a58", fontWeight: isCorner ? 700 : 400 }}>
            {spaceIcon(space.type, space.name)}
            {isCorner && (
              <div style={{ fontSize: labelFontSize, marginTop: "0.3cqw", fontWeight: 700, color: "#7080a0", letterSpacing: "0.05em" }}>
                {space.type === "go"           && "ORIGIN"}
                {space.type === "jail"         && "DETENTION"}
                {space.type === "free_parking" && "RESPITE"}
                {space.type === "go_to_jail"   && "LOCKDOWN"}
              </div>
            )}
          </div>
        )}

        <div style={{ fontSize: nameFontSize, lineHeight: 1.2, textAlign: "center", color: "#506070", fontWeight: 500, wordBreak: "break-word", overflow: "hidden", maxHeight: "40%", padding: "0 0.2cqw", letterSpacing: "0.02em" }}>
          {abbrev(space.name)}
        </div>

        {(space.price || space.taxAmount) && (
          <div style={{ fontSize: priceFontSize, color: "#354050", fontWeight: 500, fontFamily: "monospace" }}>
            ${space.price ?? space.taxAmount}
          </div>
        )}

        {playersHere.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.2cqw", justifyContent: "center" }}>
            {playersHere.map((p) => (
              <div key={p.id} title={p.name} style={{ width: tokenSize, height: tokenSize, borderRadius: "50%", backgroundColor: playerColor(p.id), border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: `calc(${tokenSize} * 0.6)`, flexShrink: 0, lineHeight: 1 }}>
                {p.token}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface BoardProps {
  spaces: BoardSpace[];
  players: Player[];
  playerDisplayPositions: Record<string, number>;
}

export default function Board({ spaces, players, playerDisplayPositions }: BoardProps) {
  function playerColor(id: string): string {
    const idx = players.findIndex((p) => p.id === id);
    return PLAYER_COLORS[idx % PLAYER_COLORS.length] ?? "#4a5a6a";
  }
  function ownerColor(space: BoardSpace): string | null {
    if (!space.ownerId) return null;
    return playerColor(space.ownerId);
  }

  return (
    <div style={{ containerType: "inline-size", display: "grid", gridTemplateColumns: "repeat(11, 1fr)", gridTemplateRows: "repeat(11, 1fr)", width: "100%", height: "100%", aspectRatio: "1 / 1", border: "2px solid #1a1f2c", backgroundColor: "#0a0c12" } as React.CSSProperties}>
      {spaces.map((space) => (
        <SpaceCell key={space.position} space={space} playersHere={players.filter((p) => (playerDisplayPositions[p.id] ?? p.position) === space.position && !p.isBankrupt)} playerColor={playerColor} ownerColor={ownerColor(space)} />
      ))}

      {/* Center */}
      <div style={{ gridRow: "2 / 11", gridColumn: "2 / 11", backgroundColor: "#0a0c12", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5%", pointerEvents: "none", userSelect: "none" }}>
        <div style={{ fontSize: "clamp(14px,3.5cqw,42px)", fontWeight: 900, color: "#12151e", transform: "rotate(-45deg)", letterSpacing: "0.15em", whiteSpace: "nowrap" }}>
          TETEPOLY
        </div>
        <div style={{ display: "flex", gap: "6%", width: "60%" }}>
          <div style={{ flex: 1, aspectRatio: "2/3", backgroundColor: "#0f1117", border: "1px solid #1a2030", borderRadius: "3px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8%" }}>
            <span style={{ fontSize: "clamp(8px,1.8cqw,20px)", color: "#253545" }}>⟐</span>
            <span style={{ fontSize: "clamp(4px,1cqw,11px)", color: "#1e2a38", letterSpacing: "0.15em", fontWeight: 700 }}>CHANCE</span>
          </div>
          <div style={{ flex: 1, aspectRatio: "2/3", backgroundColor: "#0f1117", border: "1px solid #1a2030", borderRadius: "3px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8%" }}>
            <span style={{ fontSize: "clamp(8px,1.8cqw,20px)", color: "#253545" }}>⬡</span>
            <span style={{ fontSize: "clamp(4px,1cqw,11px)", color: "#1e2a38", letterSpacing: "0.15em", fontWeight: 700 }}>VAULT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
