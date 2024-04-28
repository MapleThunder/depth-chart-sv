import { getPositionUILabelFromKey } from "$lib/positions";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

export enum Formation {
	ThreeFourThree = "343",
	ThreeFourOneTwo = "3412",
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

export function getFormationSelectOptions(): FormationOption[] {
	const options = [];
	for (const [key, value] of Object.entries(Formation)) {
		options.push({ label: value, value: value });
	}
	return options;
}

const defaultValue = Formation.FourFourTwo;
const initialValue = browser
	? window.localStorage.getItem("formation_store") ?? defaultValue
	: defaultValue;

export const formation = writable(initialValue);

formation.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("formation_store", value);
	}
});
