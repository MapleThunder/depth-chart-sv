import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Position } from "$lib/positions";
import { onDestroy } from "svelte";

export type PlayerRecord = {
	name: string;
	positions: Position[];
};

const defaultValue: PlayerRecord[] = [];
const initialValue = loadInitialValue();
export const players = writable(initialValue);

// Save to local storage when the player store value changes.
const unsubscribeLocalStorage = players.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem("player_store", JSON.stringify(value));
	}
});
// onDestroy(unsubscribeLocalStorage);

function loadInitialValue(): PlayerRecord[] {
	if (browser) {
		const storedData = window.localStorage.getItem("player_store");
		if (storedData) {
			return JSON.parse(storedData);
		}
	}
	return defaultValue;
}

export function addPlayer(new_player: PlayerRecord) {
	const store_contents = get(players);

	// Check to see if the player exists in the store
	const existing_record = store_contents.find(
		(player_record) => player_record.name === new_player.name,
	);

	if (existing_record) {
		// Update the positions if it exists
		const combined_positions = [...existing_record.positions, ...new_player.positions];
		const new_record = { name: new_player.name, positions: combined_positions };
		players.set([
			...store_contents.filter((record) => record.name !== new_player.name),
			new_record,
		]);
	} else {
		// Add the player if it doesn't exist
		players.update((store_contents) => [...store_contents, new_player]);
	}
}

export function removePlayer(player: PlayerRecord) {
	players.update((store_contents) => store_contents.filter((p) => p.name !== player.name));
}

export function resetPlayers() {
	players.set(defaultValue);
}
