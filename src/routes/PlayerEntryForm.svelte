<script lang="ts">
	import { Position, getPositionUILabel, getPositionsForFormation } from "$lib/positions";
	import { formation } from "$lib/stores/formation_store";
	import { addPlayer } from "$lib/stores/player_store";

	$: positions = getPositionsForFormation($formation);
	$: position_options = positions.map((pos) => ({
		label: getPositionUILabel(pos.position),
		value: pos.position,
	}));

	let player_name = "";
	let player_name_input: HTMLInputElement;

	function handleAddPlayer(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		const new_player_name = (data.get("player_name") as string) ?? "";
		const player_positions = data.getAll("player_positions") as Position[];
		const new_player = { name: new_player_name, positions: player_positions };

		player_name = "";
		player_name_input.focus();
		addPlayer(new_player);
	}
</script>

<div class="form-wrapper">
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
		<select name="player_positions">
			{#each position_options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<button type="submit" name="add-player">Add Player</button>
	</form>
</div>

<style>
	.form-wrapper {
		height: fit-content;
		padding: 15px;
		background-color: var(--paper);
		border-radius: 0 0 5px 5px;
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
		border-radius: 5px;
		align-self: flex-end;
		border: 1px solid transparent;
	}

	button:hover,
	button:focus {
		background-color: var(--accent);
		color: var(--text-dark);
		border: 1px solid var(--black);
	}
</style>
