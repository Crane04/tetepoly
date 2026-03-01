import { BoardSpace } from "../types";

export function initializeBoard(): BoardSpace[] {
  const base: Omit<BoardSpace, "ownerId"> = {
    position: 0,
    name: "",
    type: "go",
    isMortgaged: false,
    houses: 0,
    hasHotel: false,
  };
  const prop = (
    position: number,
    name: string,
    colorGroup: string,
    price: number,
    mortgageValue: number,
    houseCost: number,
    rentLevels: number[],
  ): BoardSpace => ({
    ...base,
    position,
    name,
    type: "property",
    colorGroup,
    price,
    mortgageValue,
    houseCost,
    rentLevels,
    ownerId: null,
  });

  const railroad = (position: number, name: string): BoardSpace => ({
    ...base,
    position,
    name,
    type: "railroad",
    colorGroup: "Railroad",
    price: 200,
    mortgageValue: 100,
    ownerId: null,
  });

  const utility = (position: number, name: string): BoardSpace => ({
    ...base,
    position,
    name,
    type: "utility",
    colorGroup: "Utility",
    price: 150,
    mortgageValue: 75,
    ownerId: null,
  });

  const special = (
    position: number,
    name: string,
    type: BoardSpace["type"],
  ): BoardSpace => ({
    ...base,
    position,
    name,
    type,
  });

  const tax = (
    position: number,
    name: string,
    taxAmount: number,
  ): BoardSpace => ({
    ...base,
    position,
    name,
    type: "tax",
    taxAmount,
  });

  const card = (
    position: number,
    name: string,
    type: "chance" | "community_chest",
  ): BoardSpace => ({
    ...base,
    position,
    name,
    type,
  });

  return [
    // 0
    special(0, "GO", "go"),
    // 1–3 Brown
    prop(
      1,
      "Mediterranean Ave",
      "Brown",
      60,
      30,
      50,
      [2, 4, 10, 30, 90, 160, 250],
    ),
    card(2, "Community Chest", "community_chest"),
    prop(3, "Baltic Ave", "Brown", 60, 30, 50, [4, 8, 20, 60, 180, 320, 450]),
    // 4
    tax(4, "Income Tax", 200),
    // 5 Railroad
    railroad(5, "Reading Railroad"),
    // 6–9 Light Blue
    prop(
      6,
      "Oriental Ave",
      "Light Blue",
      100,
      50,
      50,
      [6, 12, 30, 90, 270, 400, 550],
    ),
    card(7, "Chance", "chance"),
    prop(
      8,
      "Vermont Ave",
      "Light Blue",
      100,
      50,
      50,
      [6, 12, 30, 90, 270, 400, 550],
    ),
    prop(
      9,
      "Connecticut Ave",
      "Light Blue",
      120,
      60,
      50,
      [8, 16, 40, 100, 300, 450, 600],
    ),
    // 10
    special(10, "Jail / Just Visiting", "jail"),
    // 11–14 Pink
    prop(
      11,
      "St. Charles Place",
      "Pink",
      140,
      70,
      100,
      [10, 20, 50, 150, 450, 625, 750],
    ),
    utility(12, "Electric Company"),
    prop(
      13,
      "States Ave",
      "Pink",
      140,
      70,
      100,
      [10, 20, 50, 150, 450, 625, 750],
    ),
    prop(
      14,
      "Virginia Ave",
      "Pink",
      160,
      80,
      100,
      [12, 24, 60, 180, 500, 700, 900],
    ),
    // 15 Railroad
    railroad(15, "Pennsylvania Railroad"),
    // 16–19 Orange
    prop(
      16,
      "St. James Place",
      "Orange",
      180,
      90,
      100,
      [14, 28, 70, 200, 550, 750, 950],
    ),
    card(17, "Community Chest", "community_chest"),
    prop(
      18,
      "Tennessee Ave",
      "Orange",
      180,
      90,
      100,
      [14, 28, 70, 200, 550, 750, 950],
    ),
    prop(
      19,
      "New York Ave",
      "Orange",
      200,
      100,
      100,
      [16, 32, 80, 220, 600, 800, 1000],
    ),
    // 20
    special(20, "Free Parking", "free_parking"),
    // 21–24 Red
    prop(
      21,
      "Kentucky Ave",
      "Red",
      220,
      110,
      150,
      [18, 36, 90, 250, 700, 875, 1050],
    ),
    card(22, "Chance", "chance"),
    prop(
      23,
      "Indiana Ave",
      "Red",
      220,
      110,
      150,
      [18, 36, 90, 250, 700, 875, 1050],
    ),
    prop(
      24,
      "Illinois Ave",
      "Red",
      240,
      120,
      150,
      [20, 40, 100, 300, 750, 900, 1100],
    ),
    // 25 Railroad
    railroad(25, "B&O Railroad"),
    // 26–29 Yellow
    prop(
      26,
      "Atlantic Ave",
      "Yellow",
      260,
      130,
      150,
      [22, 44, 110, 330, 800, 975, 1150],
    ),
    prop(
      27,
      "Ventnor Ave",
      "Yellow",
      260,
      130,
      150,
      [22, 44, 110, 330, 800, 975, 1150],
    ),
    utility(28, "Water Works"),
    prop(
      29,
      "Marvin Gardens",
      "Yellow",
      280,
      140,
      150,
      [24, 48, 120, 360, 850, 1025, 1200],
    ),
    // 30
    special(30, "Go To Jail", "go_to_jail"),
    // 31–34 Green
    prop(
      31,
      "Pacific Ave",
      "Green",
      300,
      150,
      200,
      [26, 52, 130, 390, 900, 1100, 1275],
    ),
    prop(
      32,
      "North Carolina Ave",
      "Green",
      300,
      150,
      200,
      [26, 52, 130, 390, 900, 1100, 1275],
    ),
    card(33, "Community Chest", "community_chest"),
    prop(
      34,
      "Pennsylvania Ave",
      "Green",
      320,
      160,
      200,
      [28, 56, 150, 450, 1000, 1200, 1400],
    ),
    // 35 Railroad
    railroad(35, "Short Line Railroad"),
    card(36, "Chance", "chance"),
    // 37–39 Dark Blue
    prop(
      37,
      "Park Place",
      "Dark Blue",
      350,
      175,
      200,
      [35, 70, 175, 500, 1100, 1300, 1500],
    ),
    tax(38, "Luxury Tax", 100),
    prop(
      39,
      "Boardwalk",
      "Dark Blue",
      400,
      200,
      200,
      [50, 100, 200, 600, 1400, 1700, 2000],
    ),
  ];
}
