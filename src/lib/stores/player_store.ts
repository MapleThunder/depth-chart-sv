import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Position } from "$lib/positions";

export type PlayerRecord = {
	name: string;
	positions: Position[];
};

const defaultValue: PlayerRecord[] = [];
const initialValue = loadInitialValue();
export const players = writable(initialValue);

players.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("player_store", JSON.stringify(value));
	}
});

function loadInitialValue(): PlayerRecord[] {
	if (browser) {
		const storedData = window.localStorage.getItem("player_store");
		if (storedData) {
			return JSON.parse(storedData);
		}
	}
	return defaultValue;
}

export function addPlayer(player: PlayerRecord) {
	// TODO: Check to see if the player exists in the store
	// TODO: Update the positions if it exists
	// TODO: Add the player if it doesn't exist
}

function removePlayer(player: PlayerRecord) {
	// TODO: Find the player in the store & remove it
}

export function resetPlayers() {
	players.set(defaultValue);
}
