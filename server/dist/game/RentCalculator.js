"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRent = calculateRent;
exports.getNearestOf = getNearestOf;
exports.didPassGo = didPassGo;
function calculateRent(space, diceTotal, ownerPlayer, allSpaces, doubleRent = false, utilityMultiplierOverride) {
    if (space.isMortgaged)
        return 0;
    if (space.type === "railroad") {
        const railroadsOwned = allSpaces.filter((s) => s.type === "railroad" && s.ownerId === ownerPlayer.id).length;
        const base = 25 * Math.pow(2, railroadsOwned - 1);
        return doubleRent ? base * 2 : base;
    }
    if (space.type === "utility") {
        const utilitiesOwned = allSpaces.filter((s) => s.type === "utility" && s.ownerId === ownerPlayer.id).length;
        const multiplier = utilityMultiplierOverride ?? (utilitiesOwned === 2 ? 10 : 4);
        return diceTotal * multiplier;
    }
    if (space.type === "property" && space.rentLevels) {
        if (space.hasHotel)
            return space.rentLevels[6];
        if (space.houses > 0)
            return space.rentLevels[space.houses + 1]; // indices 2–5
        const colorGroupSpaces = allSpaces.filter((s) => s.colorGroup === space.colorGroup);
        const ownsAll = colorGroupSpaces.every((s) => s.ownerId === ownerPlayer.id);
        return ownsAll ? space.rentLevels[1] : space.rentLevels[0];
    }
    return 0;
}
function getNearestOf(type, currentPosition) {
    const railroads = [5, 15, 25, 35];
    const utilities = [12, 28];
    const targets = type === "railroad" ? railroads : utilities;
    for (const target of targets) {
        if (target > currentPosition)
            return target;
    }
    return targets[0]; // wrap around
}
function didPassGo(from, to) {
    return to < from || (from !== 0 && to === 0);
}
