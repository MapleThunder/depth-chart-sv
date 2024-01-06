<script lang="ts">
	import ReorderableList from "./ReorderablePlayerList.svelte";
	import { getPositionUILabel, type PositionData } from "$lib/positions";
	import { players } from "$lib/stores/player_store";

	export let positionData: PositionData;
	$: filtered_players = $players.filter((player) =>
		player.positions.includes(positionData.position),
	);

	function mapPositionToGridArea(position: string): string {
		switch (position) {
			case "LWB":
				return "LB";
			case "CDM":
				return "CM";
			case "RWB":
				return "RB";
			default:
				return position;
		}
	}
</script>

<div
	class="position-box-wrapper"
	style="grid-area: {mapPositionToGridArea(positionData?.position)}"
>
	<div class="position-header">
		{getPositionUILabel(positionData?.position)}
		<!-- TODO: Background colour should change based on position and depth preference -->
	</div>
	<div class="player-list">
		<ReorderableList list={filtered_players} />
	</div>
</div>

<style>
	.position-box-wrapper {
		border: var(--border);
		border-radius: var(--border-radius);
		background-color: var(--paper);
		width: 300px;
		min-height: 150px;
	}

	.position-header {
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: var(--border);
	}

	.player-list {
		width: 100%;
		height: 100%;
	}
</style>
