import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Position } from "$lib/positions";
import { onDestroy } from "svelte";

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

export function removePlayer(plyr: PlayerRecord) {
	const [existing_player] = get(players).filter((contents) => contents.name === plyr.name);
	const store_without_player = get(players).filter((contents) => contents.name !== plyr.name);

	if (existing_player.positions.length > 1) {
		const new_positions = existing_player.positions.filter(
			(p) => p.position !== plyr.positions[0].position,
		);
		players.set([
			...store_without_player,
			{ name: existing_player.name, positions: new_positions },
		]);
	} else {
		players.set(store_without_player);
	}
}

export function resetPlayers() {
	players.set(defaultValue);
}

export function updatePlayers(players_to_update: PlayerRecord[]) {
	const store_contents = get(players);
	const updated_players = store_contents.map((plyr) => {
		const player_to_update = players_to_update.filter((p) => p.name === plyr.name);
		const update_this_player = player_to_update.length > 0;

		if (update_this_player) {
			const position_update_data = player_to_update[0].positions[0];
			return {
				name: plyr.name,
				positions: plyr.positions.map((pos) => {
					if (pos.position === position_update_data.position) {
						return { position: pos.position, weight: position_update_data.weight };
					} else {
						return pos;
					}
				}),
			};
		} else {
			return plyr;
		}
	});

	console.log("player_store::updatePlayers", updated_players);
	players.set(updated_players);
}
