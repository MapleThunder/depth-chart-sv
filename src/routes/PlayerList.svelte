<script lang="ts">
	/**
	 * This file is based on the Svelte-DragDropList package.
	 * I altered it to match my use case, added some types, and made slight style changes.
	 *
	 * https://github.com/jwlarocque/svelte-dragdroplist
	 */
	import { type Position } from "$lib/positions";
	import { getPositionSelectOptions } from "$lib/positions";
	import {
		comparePlayersForPosition,
		getPositionForList,
		getSkillForPosition,
		isSecondaryForPosition,
	} from "$lib/player_list_item";
	import { getVisibleAssignedPosition } from "$lib/player_visibility";
	import { formation } from "$lib/stores/formation_store";
	import {
		players,
		removePlayer,
		type PlayerRecord,
		updatePlayers,
	} from "$lib/stores/player_store";
	import { settings } from "$lib/stores/settings_store";
	import PlayerEditModal from "./PlayerEditModal.svelte";
	import { flip } from "svelte/animate";

	export let position: Position;
	export let removesItems = false;
	export let show_secondary_positions = false;

	$: visible_positions = new Set(
		getPositionSelectOptions($formation).map((option) => option.value),
	);

	$: filtered_players = $players
		.filter((player) => {
			if (show_secondary_positions) {
				return player.positions.some((pos) => pos.position === position);
			}
			return getVisibleAssignedPosition(player, visible_positions) === position;
		})
		.toSorted((a, b) => comparePlayersForPosition(a, b, position, $settings.player_sort_mode));

	let ghost: HTMLElement;
	let grabbed: HTMLElement | null = null;

	let lastTarget: any;

	let show_edit_modal = false;
	let editing_player_name = "";

	let mouseY = 0; // pointer y coordinate within client
	let offsetY = 0; // y distance from top of grabbed element to pointer
	let layerY = 0; // distance from top of list to top of client

	function grab(clientY: number, element: HTMLElement) {
		// modify grabbed element
		grabbed = element;
		grabbed.dataset.grabY = String(clientY);

		// modify ghost element (which is actually dragged)
		ghost.innerHTML = grabbed.innerHTML;

		// record offset from cursor to top of element
		// (used for positioning ghost)
		offsetY = grabbed.getBoundingClientRect().y - clientY;
		drag(clientY);
	}

	// drag handler updates cursor position
	function drag(clientY: number) {
		if (grabbed) {
			mouseY = clientY;
			const parent = ghost.parentElement;
			layerY = parent ? parent.getBoundingClientRect().y : 0;
		}
	}

	// touchEnter handler emulates the mouseenter event for touch input
	// (more or less)
	function touchEnter(touch: Touch) {
		drag(touch.clientY);
		// trigger dragEnter the first time the cursor moves over a list item
		const hit = document.elementFromPoint(touch.clientX, touch.clientY);
		const target = hit ? (hit.closest(".item") as HTMLElement | null) : null;
		if (target && target != lastTarget) {
			lastTarget = target;
			dragEnter(target);
		}
	}

	function dragEnter(target: HTMLElement) {
		// swap items in data
		if (grabbed && target != grabbed && target.classList.contains("item")) {
			const from = Number(grabbed.dataset.index);
			const to = Number(target.dataset.index);
			if (Number.isFinite(from) && Number.isFinite(to)) {
				moveDatum(from, to);
			}
		}
	}

	// does the actual moving of items in data
	function moveDatum(from: number, to: number) {
		let temp = filtered_players[from];
		filtered_players = [...filtered_players.slice(0, from), ...filtered_players.slice(from + 1)];
		filtered_players = [...filtered_players.slice(0, to), temp, ...filtered_players.slice(to)];

		const updated_player_weights = filtered_players.map((plyr, idx) => ({
			name: plyr.name,
			positions: [{ position, weight: idx }],
		}));

		updatePlayers(updated_player_weights);
	}

	function release() {
		grabbed = null;
	}

	function removeDatum(index: number) {
		removePlayer({ name: filtered_players[index].name, positions: [{ position, weight: 0 }] });
	}

	function openEditModal(playerName: string): void {
		const existing_player = $players.find((player) => player.name === playerName);
		if (!existing_player) {
			return;
		}
		editing_player_name = playerName;
		show_edit_modal = true;
	}

	function closeEditModal(): void {
		show_edit_modal = false;
		editing_player_name = "";
	}

	function getListPosition(player: PlayerRecord) {
		return getPositionForList(player, position);
	}

	function isSecondary(player: PlayerRecord): boolean {
		return isSecondaryForPosition(player, position);
	}

	function getSkill(player: PlayerRecord): "low" | "mid" | "high" {
		return getSkillForPosition(player, position);
	}

	function getSkillColor(skill: "low" | "mid" | "high"): string {
		if (skill === "low") return "hsl(8 78% 56%)";
		if (skill === "high") return "hsl(120 52% 45%)";
		return "hsl(46 92% 54%)";
	}

	function getSkillFadeColor(skill: "low" | "mid" | "high"): string {
		if (skill === "low") return "hsl(8 78% 56% / 0)";
		if (skill === "high") return "hsl(120 52% 45% / 0)";
		return "hsl(46 92% 54% / 0)";
	}
</script>

<main class="dragdroplist">
	<div
		bind:this={ghost}
		id="ghost"
		class={grabbed ? "item haunting" : "item"}
		style={"top: " + (mouseY + offsetY - layerY) + "px"}
	>
		<p></p>
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<section
		class="list"
		aria-label="Drag zone for the list of players in the {position} position"
		on:mousemove={function (ev) {
			ev.stopPropagation();
			drag(ev.clientY);
		}}
		on:touchmove={function (ev) {
			ev.stopPropagation();
			drag(ev.touches[0].clientY);
		}}
		on:mouseup={function (ev) {
			ev.stopPropagation();
			release();
		}}
		on:touchend={function (ev) {
			ev.stopPropagation();
			release();
		}}
	>
		{#each filtered_players as player, i (player.name ? player.name : JSON.stringify(player))}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<div
				role="listitem"
				id={grabbed && (player.name ? player.name : JSON.stringify(player)) == grabbed.dataset.id
					? "grabbed"
					: ""}
				class="item"
				class:item-secondary={isSecondary(player)}
				class:item-has-skill-gradient={$settings.show_skill_gradient}
				data-index={i}
				data-id={player.name ? player.name : JSON.stringify(player)}
				data-grabY="0"
				style={`--skill-color: ${getSkillColor(getSkill(player))}; --skill-fade-color: ${getSkillFadeColor(getSkill(player))};`}
				on:mousedown={function (ev) {
					grab(ev.clientY, ev.currentTarget as HTMLElement);
				}}
				on:touchstart={function (ev) {
					grab(ev.touches[0].clientY, ev.currentTarget as HTMLElement);
				}}
				on:mouseenter={function (ev) {
					ev.stopPropagation();
					dragEnter(ev.currentTarget as HTMLElement);
				}}
				on:touchmove={function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					touchEnter(ev.touches[0]);
				}}
				animate:flip={{ duration: 200 }}
			>
				<div class="buttons">
					<button
						class="up"
						aria-label="Move {player.name} up"
						style={"visibility: " + (i > 0 ? "" : "hidden") + ";"}
						on:click={function (ev) {
							moveDatum(i, i - 1);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"
							><path d="M0 0h24v24H0V0z" fill="none" /><path
								d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
							/></svg
						>
					</button>
					<button
						class="down"
						aria-label="Move {player.name} down"
						style={"visibility: " + (i < filtered_players.length - 1 ? "" : "hidden") + ";"}
						on:click={function (ev) {
							moveDatum(i, i + 1);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"
							><path d="M0 0h24v24H0V0z" fill="none" /><path
								d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
							/></svg
						>
					</button>
				</div>

				<div class="content">
					<span class="player-name">{player.name}</span>
					{#if isSecondary(player)}
						<span class="meta-row">
							<span class="pill role-pill role-secondary">2nd</span>
						</span>
					{/if}
				</div>

				<div class="buttons actions">
					<button
						class="edit"
						aria-label="Edit {player.name}"
						on:click={function () {
							openEditModal(player.name);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16"
							><path d="M0 0h24v24H0z" fill="none" /><path
								d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5a.996.996 0 0 0 0-1.41l-2.59-2.59a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0z"
							/></svg
						>
					</button>
					{#if removesItems}
						<button
							class="delete"
							aria-label="Remove {player.name} from the {position} position"
							on:click={function (ev) {
								removeDatum(i);
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16"
								><path d="M0 0h24v24H0z" fill="none" /><path
									d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
								/></svg
							>
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</section>
</main>

<PlayerEditModal
	open={show_edit_modal}
	playerName={editing_player_name}
	on:close={closeEditModal}
/>

<style>
	main {
		position: relative;
	}

	.list {
		cursor: grab;
		z-index: 5;
		display: flex;
		flex-direction: column;
	}

	.item {
		box-sizing: border-box;
		display: inline-flex;
		width: 100%;
		min-height: 2.1em;
		margin-bottom: 0.2em;
		background-color: var(--white);
		border: 1px solid var(--panel-border);
		border-radius: 10px;
		padding: 0.15rem 0.25rem;
		user-select: none;
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}

	.item::after {
		content: "";
		position: absolute;
		inset: 0 0 0 auto;
		width: 36%;
		background: linear-gradient(90deg, var(--skill-fade-color) 0%, var(--skill-color) 100%);
		opacity: 0;
		pointer-events: none;
		z-index: 0;
	}

	.item.item-has-skill-gradient::after {
		opacity: 0.35;
	}

	.item.item-secondary.item-has-skill-gradient::after {
		opacity: 0.22;
	}

	.item:last-child {
		margin-bottom: 0;
	}

	.item:not(#grabbed):not(#ghost) {
		z-index: 10;
	}

	.item > * {
		margin: auto;
		position: relative;
		z-index: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.15rem;
		padding: 0.1rem 0.25rem;
	}

	.player-name {
		font-weight: 600;
		line-height: 1.1;
	}

	.meta-row {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		flex-wrap: wrap;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		padding: 0.05rem 0.4rem;
		border-radius: 999px;
		font-size: 0.68rem;
		line-height: 1.15;
		border: 1px solid transparent;
		background: rgba(255, 255, 255, 0.75);
	}

	.role-pill.role-secondary {
		border-color: rgba(30, 64, 175, 0.28);
		color: #1e40af;
		background: rgba(219, 234, 254, 0.9);
	}

	.buttons {
		width: 32px;
		min-width: 32px;
		margin: auto 0;
		display: flex;
		flex-direction: column;
	}

	.buttons button {
		cursor: pointer;
		width: 18px;
		height: 18px;
		margin: 0 auto;
		padding: 0;
		border: 1px solid rgba(0, 0, 0, 0);
		background-color: inherit;
	}

	.buttons button:focus {
		border: 1px solid var(--panel-border);
	}

	.buttons.actions {
		gap: 0.2rem;
	}

	.buttons.actions button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		padding: 0.15rem;
		border: 1px solid transparent;
		background: transparent;
	}

	.buttons.actions button:hover,
	.buttons.actions button:focus {
		background: var(--button-hover-colour);
		border: 1px solid var(--panel-border);
	}

	#grabbed {
		opacity: 0;
	}

	#ghost {
		pointer-events: none;
		z-index: -5;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	#ghost * {
		pointer-events: none;
	}

	#ghost.haunting {
		z-index: 20;
		opacity: 1;
	}

	@media screen and (max-width: 700px) {
		div.content {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.meta-row {
			white-space: normal;
		}
	}
</style>
