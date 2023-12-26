import { writable } from 'svelte/store';

export enum Formation {
	ThreeFourThree = '343',
	ThreeFiveOne = '351',
	FourTwoThreeOne = '4231',
	FourTwoFour = '424',
	FourFourTwo = '442',
	FourThreeThree = '433',
	FiveTwoThree = '523',
	FiveThreeTwo = '532'
}

export default writable<Formation>(Formation.FourFourTwo);
