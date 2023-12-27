import { getPositionUILabelFromKey } from "$lib/positions";
import { writable } from "svelte/store";

export enum Formation {
	ThreeFourThree = "343",
	ThreeFiveOne = "351",
	FourTwoThreeOne = "4231",
	FourTwoFour = "424",
	FourThreeThree = "433",
	FourFourTwo = "442",
	FiveTwoThree = "523",
	FiveThreeTwo = "532",
}

export type FormationOption = {
	label: string;
	value: Formation;
};

export const formation = writable<Formation>(Formation.FourFourTwo);

export function getFormationSelectOptions(): FormationOption[] {
	const options = [];
	for (const [key, value] of Object.entries(Formation)) {
		options.push({ label: getPositionUILabelFromKey(key), value: value });
	}
	return options;
}
