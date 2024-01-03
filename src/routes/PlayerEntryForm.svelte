<script lang="ts">
	import { Position, getPositionUILabel, getPositionsForFormation } from "$lib/positions";
	import { formation } from "$lib/stores/formation_store";
	import { addPlayer } from "$lib/stores/player_store";

	const positions = getPositionsForFormation($formation);
	const position_options = positions.map((pos) => ({
		label: getPositionUILabel(pos.position),
		value: pos.position,
	}));

	function handleAddPlayer(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		const player_name = (data.get("player_name") as string) ?? "";
		const player_positions = data.getAll("player_positions") as Position[];
		const new_player = { name: player_name, positions: player_positions };
		console.log("add new player", new_player);

		// addPlayer(new_player);
	}
</script>

<div class="form-wrapper">
	<h2>Add a Player</h2>
	<form on:submit|preventDefault={handleAddPlayer}>
		<!-- TODO: Form should clear on submition -->
		<!-- TODO: Focus should return to the name field on form submition -->
		<label for="player_name">Player Name</label>
		<input type="text" name="player_name" placeholder="Eustáquio" />
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
