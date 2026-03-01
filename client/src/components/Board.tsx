import type { BoardSpace, Player } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROP_COLOR: Record<string, string> = {
  Brown: "#92400e",
  "Light Blue": "#bae6fd",
  Pink: "#fbcfe8",
  Orange: "#fed7aa",
  Red: "#fca5a5",
  Yellow: "#fef08a",
  Green: "#bbf7d0",
  "Dark Blue": "#bfdbfe",
};

const PLAYER_COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#a855f7",
  "#ec4899",
];

const CORNERS = new Set([0, 10, 20, 30]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
    case "go":          return "GO";
    case "jail":        return "⛓";
    case "free_parking":return "🅿";
    case "go_to_jail":  return "→⛓";
    case "chance":      return "?";
    case "community_chest": return "♠";
    case "tax":         return name.includes("Income") ? "💸" : "💰";
    case "railroad":    return "🚂";
    case "utility":     return name.includes("Electric") ? "⚡" : "💧";
    default:            return "";
  }
}

function abbrev(name: string): string {
  return name
    .replace("Avenue", "Ave")
    .replace("Railroad", "RR")
    .replace("Place", "Pl")
    .replace("Gardens", "Gdn")
    .replace(" Company", "")
    .replace("Mediterranean", "Med")
    .replace("Pennsylvania", "Penn")
    .replace("Connecticut", "CT")
    .replace("North Carolina", "NC");
}

// ─── Space Cell ───────────────────────────────────────────────────────────────

interface SpaceCellProps {
  space: BoardSpace;
  playersHere: Player[];
  playerColor: (id: string) => string;
  ownerColor: string | null;
}

// All sizing uses cqw (1% of the board's container width).
// Board is 11 columns → 1 cell ≈ 9.09cqw, corner ≈ 18.18cqw.
// clamp(min, preferred_cqw, max) keeps content legible at any size.

function SpaceCell({
  space,
  playersHere,
  playerColor,
  ownerColor,
}: SpaceCellProps) {
  const { row, col } = gridPos(space.position);
  const rot = cellRotation(space.position);
  const isCorner = CORNERS.has(space.position);
  const propColor = space.colorGroup
    ? (PROP_COLOR[space.colorGroup] ?? null)
    : null;

  // cqw-based sizes — scale with the board
  const pad         = isCorner ? "0.5cqw" : "0.3cqw";
  const nameFontSize  = isCorner ? "clamp(9px,2cqw,20px)"  : "clamp(6px,1.2cqw,14px)";
  const iconFontSize  = isCorner ? "clamp(16px,3.5cqw,40px)" : "clamp(11px,2cqw,22px)";
  const labelFontSize = "clamp(7px,1.2cqw,13px)";
  const priceFontSize = "clamp(5px,0.9cqw,11px)";
  const tokenSize     = "clamp(12px,2.2cqw,28px)";
  const tokenFont     = "clamp(6px,1cqw,13px)";
  const houseSize     = "clamp(5px,1.2cqw,14px)";
  const hotelSize     = "clamp(6px,1.5cqw,18px)";

  return (
    <div
      style={{
        gridRow: row + 1,
        gridColumn: col + 1,
        backgroundColor: "white",
        border: "1px solid #9ca3af",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `rotate(${rot})`,
          padding: pad,
          boxSizing: "border-box",
        }}
      >
        {/* Color strip (properties) OR icon (specials) */}
        {propColor ? (
          <div
            style={{
              width: "100%",
              height: "20%",
              minHeight: "6%",
              flexShrink: 0,
              backgroundColor: propColor,
              border: ownerColor
                ? `2px solid ${ownerColor}`
                : "1px solid rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.2cqw",
            }}
          >
            {space.hasHotel ? (
              <div
                style={{
                  width: hotelSize,
                  height: hotelSize,
                  background: "#dc2626",
                  borderRadius: "1px",
                  flexShrink: 0,
                }}
              />
            ) : (
              Array.from({ length: space.houses }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: houseSize,
                    height: houseSize,
                    background: "#15803d",
                    borderRadius: "1px",
                    flexShrink: 0,
                  }}
                />
              ))
            )}
          </div>
        ) : (
          <div
            style={{
              fontSize: iconFontSize,
              lineHeight: 1.1,
              textAlign: "center",
              color: "#374151",
              fontWeight: isCorner ? 800 : 500,
            }}
          >
            {spaceIcon(space.type, space.name)}
            {isCorner && (
              <div style={{ fontSize: labelFontSize, marginTop: "0.3cqw", fontWeight: 700 }}>
                {space.type === "go"          && "GO"}
                {space.type === "jail"        && "JAIL"}
                {space.type === "free_parking"&& "PARKING"}
                {space.type === "go_to_jail"  && "GO TO JAIL"}
              </div>
            )}
          </div>
        )}

        {/* Space name */}
        <div
          style={{
            fontSize: nameFontSize,
            lineHeight: 1.2,
            textAlign: "center",
            color: "#111827",
            fontWeight: 600,
            wordBreak: "break-word",
            overflow: "hidden",
            maxHeight: "38%",
            padding: "0 0.2cqw",
          }}
        >
          {abbrev(space.name)}
        </div>

        {/* Price or tax */}
        {(space.price || space.taxAmount) && (
          <div style={{ fontSize: priceFontSize, color: "#6b7280", fontWeight: 500 }}>
            ${space.price ?? space.taxAmount}
          </div>
        )}

        {/* Player tokens */}
        {playersHere.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25cqw",
              justifyContent: "center",
            }}
          >
            {playersHere.map((p) => (
              <div
                key={p.id}
                title={p.name}
                style={{
                  width: tokenSize,
                  height: tokenSize,
                  borderRadius: "50%",
                  backgroundColor: playerColor(p.id),
                  border: "1px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: tokenFont,
                  fontWeight: "bold",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {p.name[0]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Board ────────────────────────────────────────────────────────────────────

interface BoardProps {
  spaces: BoardSpace[];
  players: Player[];
  playerDisplayPositions: Record<string, number>;
}

export default function Board({ spaces, players, playerDisplayPositions }: BoardProps) {
  function playerColor(id: string): string {
    const idx = players.findIndex((p) => p.id === id);
    return PLAYER_COLORS[idx % PLAYER_COLORS.length] ?? "#888";
  }

  function ownerColor(space: BoardSpace): string | null {
    if (!space.ownerId) return null;
    return playerColor(space.ownerId);
  }

  return (
    <div
      style={
        {
          // container-type: inline-size lets children use cqw relative to this element
          containerType: "inline-size",
          display: "grid",
          gridTemplateColumns: "repeat(11, 1fr)",
          gridTemplateRows: "repeat(11, 1fr)",
          width: "100%",
          height: "100%",
          aspectRatio: "1 / 1",
          border: "3px solid #111",
          backgroundColor: "#f0fdf4",
        } as React.CSSProperties
      }
    >
      {spaces.map((space) => (
        <SpaceCell
          key={space.position}
          space={space}
          playersHere={players.filter(
            (p) =>
              (playerDisplayPositions[p.id] ?? p.position) === space.position &&
              !p.isBankrupt,
          )}
          playerColor={playerColor}
          ownerColor={ownerColor(space)}
        />
      ))}

      {/* Center watermark */}
      <div
        style={{
          gridRow: "2 / 11",
          gridColumn: "2 / 11",
          backgroundColor: "#dcfce7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          fontSize: "clamp(16px,4cqw,48px)",
          fontWeight: 900,
          color: "#166534",
          opacity: 0.2,
          transform: "rotate(-45deg)",
          letterSpacing: "0.08em",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        MONOPOLY
      </div>
    </div>
  );
}
