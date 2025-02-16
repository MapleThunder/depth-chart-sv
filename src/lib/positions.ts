import { Formation } from "./stores/formation_store";

export enum Position {
	Striker = "ST",

	LeftWing = "LW",
	LeftMid = "LM",

	CentreAttackingMid = "CAM",
	CentreMid = "CM",
	CentreDefensiveMid = "CDM",

	RightWing = "RW",
	RightMid = "RM",

	LeftFullback = "LB",
	LeftWingback = "LWB",

	Centreback = "CB",

	RightFullback = "RB",
	RightWingback = "RWB",

	GoalKeeper = "GK",
}

export type PositionData = { position: Position; amount: number };

/**
 * Given a position code, returns the corresponding position label.
 */
export function getPositionUILabel(position_code: string): string {
	const position_key = Object.entries(Position)
		.find(([_, val]) => val === position_code)?.[0];
	if (position_key === undefined) {

		console.error(`No position found for code: ${position_code}`);
		return "";
	}
	return addSpaceToCamelCaseWords(position_key);
}

/**
 * Adds a space between words in a camel case string.
 */
export function addSpaceToCamelCaseWords(position_key: string): string {
	return position_key.replace(/([a-z])([A-Z])/g, "$1 $2");
}

// Helpful Builder arrays to save on typing
const KEEPER = { position: Position.GoalKeeper, amount: 1 };
export const BACK_THREE = [{ position: Position.Centreback, amount: 3 }];
export const BACK_FOUR = [
	{ position: Position.LeftFullback, amount: 1 },
	{ position: Position.Centreback, amount: 2 },
	{ position: Position.RightFullback, amount: 1 },
];
export const BACK_FIVE = [
	{ position: Position.LeftWingback, amount: 1 },
	...BACK_THREE,
	{ position: Position.RightWingback, amount: 1 },
];

export const CENTRE_ATT_MID = { position: Position.CentreAttackingMid, amount: 1 };
export const MID_TWO = [{ position: Position.CentreMid, amount: 2 }];
export const MID_THREE_FLAT = [{ position: Position.CentreMid, amount: 3 }];
export const MID_THREE_ATT = [
	{ position: Position.CentreMid, amount: 2 },
	{ position: Position.CentreAttackingMid, amount: 1 },
];
export const MID_FOUR = [
	{ position: Position.LeftMid, amount: 1 },
	...MID_TWO,
	{ position: Position.RightMid, amount: 1 },
];
export const MID_FIVE = [
	{ position: Position.LeftMid, amount: 1 },
	...MID_THREE_FLAT,
	{ position: Position.RightMid, amount: 1 },
];

export const FRONT_ONE = [{ position: Position.Striker, amount: 1 }];
export const FRONT_TWO = [{ position: Position.Striker, amount: 2 }];
export const FRONT_THREE = [
	{ position: Position.LeftWing, amount: 1 },
	...FRONT_ONE,
	{ position: Position.RightWing, amount: 1 },
];
export const FRONT_FOUR = [
	{ position: Position.LeftWing, amount: 1 },
	...FRONT_TWO,
	{ position: Position.RightWing, amount: 1 },
];

/**
 * Returns an array of PositionData objects that represent the positions for the given formation string.
 */
export function getPositionsForFormation(formation: string): PositionData[] {
	switch (formation) {
		case Formation.ThreeFourThree:
			return [...FRONT_THREE, ...MID_FOUR, ...BACK_THREE, KEEPER];
		case Formation.ThreeFourOneTwo:
			return [...FRONT_TWO, CENTRE_ATT_MID, ...MID_FOUR, ...BACK_THREE, KEEPER];
		case Formation.ThreeFiveOne:
			return [...FRONT_ONE, ...MID_FIVE, ...BACK_THREE, KEEPER];
		case Formation.FourTwoThreeOne:
			return [...FRONT_THREE, ...MID_THREE_ATT, ...BACK_FOUR, KEEPER];
		case Formation.FourTwoFour:
			return [...FRONT_FOUR, ...MID_TWO, ...BACK_FOUR, KEEPER];
		case Formation.FourThreeThree:
			return [...FRONT_THREE, ...MID_THREE_FLAT, ...BACK_FOUR, KEEPER];
		case Formation.FourFourTwo:
			return [...FRONT_TWO, ...MID_FOUR, ...BACK_FOUR, KEEPER];
		case Formation.FiveTwoThree:
			return [...FRONT_THREE, ...MID_TWO, ...BACK_FIVE, KEEPER];
		case Formation.FiveThreeTwo:
			return [...FRONT_TWO, ...MID_THREE_FLAT, ...BACK_FIVE, KEEPER];

		default:
			return [...FRONT_TWO, ...MID_FOUR, ...BACK_FOUR, KEEPER];
	}
}

/**
 * Returns a list of options for the position select
 */
export function getPositionSelectOptions(formation: string) {
	const positions = getPositionsForFormation(formation);
	return positions
		.map((pos) => ({
			label: getPositionUILabel(pos.position),
			value: pos.position,
		}))
		.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));
}
