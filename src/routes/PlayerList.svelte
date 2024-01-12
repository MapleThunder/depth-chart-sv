<script lang="ts">
	import { flip } from "svelte/animate";
	import Icon from "@iconify/svelte";
	import { dndzone, type DndEvent } from "svelte-dnd-action";
	import { removePlayer, type PlayerRecord, type PlayerPosition } from "$lib/stores/player_store";
	import type { Position } from "$lib/positions";

	type DndPlayerRecord = {
		id: number;
		name: string;
		positions: PlayerPosition[];
	};

	export let list: PlayerRecord[];
	export let position: Position;
	const flip_duration_ms = 100;

	const items: DndPlayerRecord[] = list.map((record, index) => ({
		id:
			record.positions.find((player_position) => player_position.position === position)?.weight ||
			index,
		name: record.name,
		positions: record.positions,
	}));

	function handleConsider(event: CustomEvent<DndEvent<DndPlayerRecord>>) {
		console.log("consider");
		list = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<DndPlayerRecord>>) {
		console.log("finalize");
		// TODO: Save the id/weight change to the player store so the order isn't lost on refresh
		list = event.detail.items;
	}
</script>

<section
	use:dndzone={{ items, flipDurationMs: flip_duration_ms }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each list as player (player.name)}
		<!-- <div class="card" > -->
		<div class="row" animate:flip={{ duration: flip_duration_ms }}>
			<div class="player-name-wrapper">
				<Icon icon="system-uicons:drag" />
				{player.name}
			</div>
			<button
				id="remove-button"
				name="remove-player-button"
				on:click={() => removePlayer({ name: player.name, positions: [position] })}
			>
				<Icon icon="material-symbols:close" />
			</button>
		</div>
		<!-- </div> -->
	{/each}
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
	div.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 1rem;
		border-bottom: solid 1px hsl(0, 1%, 72%);
		padding: 5px 0;
	}

	div.player-name-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	button#remove-button {
		border: none;
		background-color: transparent;
		display: flex;
		align-items: center;
	}

	@media screen and (max-width: 700px) {
		div.player-name-wrapper {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		div.row {
			margin: 0 0 0 5px;
		}
	}
</style>
