<script lang="ts">
	import PlayerEntryForm from "./PlayerEntryForm.svelte";
	import { formation } from "$lib/stores/formation_store";
	import { getPositionsForFormation, type PositionData } from "$lib/positions";
	import { getVisibleAssignedPosition } from "$lib/player_visibility";
	import { players } from "$lib/stores/player_store";
	import PositionBox from "./PositionBox.svelte";
	import PlayerEditModal from "./PlayerEditModal.svelte";
	import Legend from "./Legend.svelte";
	import { base_url, site_description, site_name, site_title } from "$lib/config";
	import FormationSelect from "./FormationSelect.svelte";
	import SharePictureButton from "./SharePictureButton.svelte";
	import ClearAllButton from "./ClearAllButton.svelte";

	let positions: PositionData[];
	$: $formation, (positions = getPositionsForFormation($formation));
	$: visible_positions = new Set(positions.map((pos) => pos.position));
	$: unassigned_players = $players
		.filter((player) => getVisibleAssignedPosition(player, visible_positions) === undefined)
		.toSorted((a, b) => a.name.localeCompare(b.name));
	let show_secondary_positions = false;

	let show_hidden_edit_modal = false;
	let editing_hidden_player_name = "";

	function openHiddenEditModal(playerName: string): void {
		const existing_player = $players.find((player) => player.name === playerName);
		if (!existing_player) {
			return;
		}

		editing_hidden_player_name = playerName;
		show_hidden_edit_modal = true;
	}

	function closeHiddenEditModal(): void {
		show_hidden_edit_modal = false;
		editing_hidden_player_name = "";
	}
</script>

<svelte:head>
	<title>Depth Chart</title>
	<meta name="description" content={site_description} />

	<meta property="og:site_name" content={site_name} />
	<meta property="og:locale" content="en" />
	<meta property="og:url" content={base_url} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={site_title} />
	<meta property="og:description" content={site_description} />
</svelte:head>

<div id="content">
	<div id="left-column">
		<div class="form-wrapper">
			<FormationSelect />
			<PlayerEntryForm />

			<div class="secondary-visibility">
				<label class="switch">
					<input type="checkbox" bind:checked={show_secondary_positions} />
					<span class="slider" aria-hidden="true"></span>
				</label>
				<span>Show secondary positions</span>
			</div>

			<hr />

			<div class="button-wrapper">
				<SharePictureButton />
				<ClearAllButton />
			</div>
		</div>
		{#if unassigned_players.length > 0}
			<section class="unassigned-panel">
				<h3>Not Shown In This Formation</h3>
				<p>These players have no visible primary or secondary positions.</p>
				<h4>Players</h4>
				<ul>
					{#each unassigned_players as player}
						<li>
							<span>{player.name}</span>
							<button
								type="button"
								class="edit unassigned-edit"
								aria-label="Edit {player.name}"
								on:click={() => openHiddenEditModal(player.name)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16"
									><path d="M0 0h24v24H0z" fill="none" /><path
										d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5a.996.996 0 0 0 0-1.41l-2.59-2.59a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0z"
									/></svg
								>
							</button>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
		<Legend />
	</div>

	<div id="position-boxes" class="position-boxes">
		{#each positions as positionData}
			<PositionBox {positionData} {show_secondary_positions} />
		{/each}
	</div>
</div>

<PlayerEditModal
	open={show_hidden_edit_modal}
	playerName={editing_hidden_player_name}
	on:close={closeHiddenEditModal}
/>

<style>
	div#content {
		display: grid;
		grid-template-columns: minmax(280px, 360px) 1fr;
		gap: 1.2rem;
		margin: 0 auto;
		max-width: var(--column);
		padding: 1.2rem var(--side);
	}

	div#left-column {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	div.form-wrapper {
		grid-area: "FORM";
		height: fit-content;
		padding: 1.2rem;
		background-color: var(--paper);
		border-radius: var(--border-radius);
		border: var(--border);
		box-shadow: var(--panel-shadow-soft);
	}

	.secondary-visibility {
		margin-top: 0.7rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.9rem;
		color: hsl(210, 15%, 30%);
		font-weight: 600;
	}

	.switch {
		position: relative;
		display: inline-flex;
		width: 42px;
		height: 24px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		inset: 0;
		background-color: hsl(210, 20%, 90%);
		border-radius: 999px;
		transition: background-color 0.2s ease;
		border: 1px solid var(--panel-border);
	}

	.slider::before {
		content: "";
		position: absolute;
		height: 18px;
		width: 18px;
		left: 3px;
		top: 50%;
		transform: translateY(-50%);
		background-color: var(--white);
		border-radius: 50%;
		transition: transform 0.2s ease;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
	}

	.switch input:checked + .slider {
		background-color: var(--primary);
	}

	.switch input:checked + .slider::before {
		transform: translate(18px, -50%);
	}

	.button-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.position-boxes {
		padding: 0.5rem 0.3rem 1rem;
		display: grid;
		gap: 12px;
		grid-template-areas:
			".. ST .."
			"LW CAM RW"
			"LM CM RM"
			"LB CB RB"
			".. GK ..";
	}

	.unassigned-panel {
		background-color: var(--paper);
		border: var(--border);
		border-radius: var(--border-radius);
		padding: 0.9rem 1rem;
		box-shadow: var(--panel-shadow-soft);
	}

	.unassigned-panel h3 {
		margin: 0 0 0.45rem;
		font-size: 1rem;
	}

	.unassigned-panel p {
		margin: 0 0 0.65rem;
		font-size: 0.9rem;
		color: hsl(210, 15%, 30%);
	}

	.unassigned-panel h4 {
		margin: 0 0 0.5rem;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: hsl(210, 14%, 38%);
	}

	.unassigned-panel ul {
		margin: 0;
		padding: 0.45rem;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		border-radius: 10px;
		background: var(--white);
	}

	.unassigned-panel li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem;
		padding: 0.45rem 0.5rem;
		border-radius: 8px;
		background: hsl(210, 22%, 97%);
		border: 1px solid hsl(210, 22%, 91%);
	}

	.unassigned-edit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		padding: 0.15rem;
		border: 1px solid transparent;
		background: transparent;
		cursor: pointer;
	}

	.unassigned-edit:hover,
	.unassigned-edit:focus {
		background: var(--button-hover-colour);
		border: 1px solid var(--panel-border);
	}

	@media screen and (max-width: 700px) {
		div#content {
			display: flex;
			flex-direction: column;
			padding: 0.7rem var(--side);
		}

		.position-boxes {
			padding: 16px 0;
			grid-gap: 10px;
			margin-top: 10px;
		}
	}
</style>
