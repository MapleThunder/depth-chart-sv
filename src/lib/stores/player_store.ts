import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Position } from "$lib/positions";
// import { onDestroy } from "svelte";

export type PlayerPosition = {
	position: Position;
	weight: number;
};

export type PlayerRecord = {
	name: string;
	positions: PlayerPosition[];
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

/**
 * Checks local storage for existing data & returns it if found, otherwise returns the default value.
 */
function loadInitialValue(): PlayerRecord[] {
	if (browser) {
		const storedData = window.localStorage.getItem("player_store");
		if (storedData) {
			return JSON.parse(storedData);
		}
	}
	return defaultValue;
}

/**
 * Adds a player record to the store if it doesn't exist, otherwise updates the record with the new position.
 */
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

/**
 * Removes positions from a player and eventually a player from the store entirely.
 */
export function removePlayer(player: PlayerRecord) {
	const [existing_player] = get(players).filter((contents) => contents.name === player.name);
	if (existing_player === undefined) {
		// If no players are found just return.
		return;
	}
	const store_without_player = get(players).filter((contents) => contents.name !== player.name);

	// Filter the passed position(s) out of the player listing in the store
	const new_positions = existing_player.positions.filter(
		(p) => player.positions.includes(p),
	);
	// If there is at least 1 position left update the record, otherwise remove it.
	if (new_positions.length > 0) {
		players.set([
			...store_without_player,
			{ name: existing_player.name, positions: new_positions },
		]);
	} else {
		players.set(store_without_player);
	}
}

/**
 * Resets the state to default (empty).
 */
export function resetPlayers() {
	if (confirm("Do you want to clear all the players ?")) {
		players.set(defaultValue);
	}
}

/**
 * Updates the given players in the store, used for updating position weights with drag-and-drop.
 */
export function updatePlayers(players_to_update: PlayerRecord[]) {
	const updated_players = get(players).map((player) => {
		const player_to_update = players_to_update.filter((p) => p.name === player.name);
		// If the filter doesn't find anything, return the original record.
		if (player_to_update.length === 0) {
			return player;
		}

		const position_update_data = player_to_update[0].positions[0];
		return {
			name: player.name,
			positions: player.positions.map((pos) => {
				if (pos.position === position_update_data.position) {
					return { position: pos.position, weight: position_update_data.weight };
				} else {
					return pos;
				}
			}),
		};
	});

	players.set(updated_players);
}
