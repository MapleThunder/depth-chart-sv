<script lang="ts">
	import { Position, getPositionSelectOptions } from "$lib/positions";
	import { formation } from "$lib/stores/formation_store";
	import { addPlayer } from "$lib/stores/player_store";

	$: position_options = getPositionSelectOptions($formation);
	
	// Form values
	let player_name = "";
	let player_position: Position;
	let player_name_input: HTMLInputElement;
	
	/**
	 * Adds a new player + position combo to the Player Store
	 */
	function handleAddPlayer(): void {
		addPlayer({
			name: player_name,
			positions: [{ position: player_position, weight: 9 }],
		});
		resetForm();
	}

	/**
	 * Resets the form but leaves the position as the last selected.
	 */
	function resetForm(position?: Position): void {
		player_name = "";
		if (position) {
			player_position = position;
		}
		player_name_input.focus();
	}
</script>

<h2>Add a Player</h2>
<form on:submit|preventDefault={handleAddPlayer}>
	<label for="player_name">Player Name</label>
	<input
		type="text"
		name="player_name"
		bind:value={player_name}
		bind:this={player_name_input}
		placeholder="Eustáquio"
	/>
	<label for="player_positions">Position(s)</label>
	<select name="player_positions" bind:value={player_position}>
		{#each position_options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	<button type="submit" name="add-player">Add Player</button>
</form>

<style>
	h2 {
		margin-bottom: 0.5rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	select,
	input {
		padding: 0.4rem;
		border-radius: var(--border-radius);
	}
	
	button {
		background-color: var(--primary);
		color: var(--text-light);
		padding: 7px;
		width: fit-content;
		border-radius: var(--border-radius);
		align-self: flex-end;
		border: 1px solid transparent;
	}

	button:hover,
	button:focus {
		background-color: var(--button-hover-colour);
		color: var(--text-dark);
		border: 1px solid var(--black);
	}
</style>
