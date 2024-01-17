<script lang="ts">
	import { Position, getPositionUILabel, getPositionsForFormation } from "$lib/positions";
	import { formation, getFormationSelectOptions } from "$lib/stores/formation_store";
	import { addPlayer, resetPlayers } from "$lib/stores/player_store";

	$: positions = getPositionsForFormation($formation);
	$: position_options = positions
		.map((pos) => ({
			label: getPositionUILabel(pos.position),
			value: pos.position,
		}))
		.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));

	const formationOptions = getFormationSelectOptions();
	let player_name = "";
	let player_position: Position;
	let player_name_input: HTMLInputElement;

	function handleAddPlayer() {
		const new_player = {
			name: player_name,
			positions: [{ position: player_position, weight: 9 }],
		};

		player_name = "";
		player_name_input.focus();
		addPlayer(new_player);
	}
</script>

<div class="form-wrapper">
	<div class="formation-selection">
		<label for="formation-select">Formation Selection</label>
		<select id="formation-select" name="formation-select" bind:value={$formation}>
			{#each formationOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>

	<div class="button-wrapper">
		<button id="clear-btn" type="button" on:click|preventDefault={() => resetPlayers()}>
			Clear All Players
		</button>
	</div>

	<hr />

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
		<button id="add-player" type="submit" name="add-player">Add Player</button>
	</form>
</div>

<style>
	.form-wrapper {
		grid-area: "FORM";
		height: fit-content;
		padding: 15px;
		background-color: var(--paper);
		border-radius: 0 0 5px 5px;
		border: var(--border);
		border-top: transparent;
	}

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

	.button-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 1.3rem 0;
	}

	.formation-selection {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.formation-selection label {
		font-size: 1.2rem;
		font-weight: bold;
	}

	button#add-player {
		background-color: var(--primary);
		color: var(--text-light);
		padding: 7px;
		width: fit-content;
		border-radius: var(--border-radius);
		align-self: flex-end;
		border: 1px solid transparent;
	}

	button#add-player:hover,
	button#add-player:focus {
		background-color: var(--button-hover-colour);
		color: var(--text-dark);
		border: 1px solid var(--black);
	}

	button#clear-btn {
		background-color: var(--red-dark);
		border: 1px solid transparent;
		padding: 7px;
		width: 80%;
		align-self: center;
		color: var(--text-light);
		border-radius: var(--border-radius);
	}

	button#clear-btn:hover,
	button#clear-btn:focus {
		background-color: var(--red-light);
		color: var(--text-dark);
		border: 1px solid var(--black);
	}
</style>
