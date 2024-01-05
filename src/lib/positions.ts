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

export function getPositionUILabel(position_code: string): string | null {
	const position_key = Object.entries(Position).find(([key, val]) => val === position_code)?.[0];
	if (position_key === undefined) {
		// TODO: Throw Error ?
		console.error(`No position found for code: ${position_code}`);
		return null;
	}
	return getPositionUILabelFromKey(position_key);
}

export function getPositionUILabelFromKey(position_key: string): string {
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

export function getPositionsForFormation(formation: string): PositionData[] {
	switch (formation) {
		case Formation.ThreeFourThree:
			return [...FRONT_THREE, ...MID_FOUR, ...BACK_THREE, KEEPER];
		case Formation.ThreeFiveOne:
			return [...FRONT_ONE, ...MID_FIVE, ...BACK_THREE, KEEPER];
		case Formation.FourTwoThreeOne:
			return [...FRONT_ONE, ...MID_THREE_ATT, ...BACK_FOUR, KEEPER];
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
