<script lang="ts">
	import { getPositionUILabel, getPositionsForFormation } from "$lib/positions";
	import { formation } from "$lib/stores/formation_store";

	const positions = getPositionsForFormation($formation);
	const position_options = positions.map((pos) => ({
		label: getPositionUILabel(pos.position),
		value: pos.position,
	}));
</script>

<div class="form-wrapper">
	<h2>Add a Player</h2>
	<form>
		<!-- TODO: Form action should add player - NO REFRESH -->
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
