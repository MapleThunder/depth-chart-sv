<script lang="ts">
	import ReorderableList from "./ReorderablePlayerList.svelte";
	import { getPositionUILabel, type PositionData } from "$lib/positions";
	import { players, type PlayerRecord } from "$lib/stores/player_store";
	import PlayerList from "./PlayerList.svelte";

	export let positionData: PositionData;
	$: filtered_players = $players.filter(
		(player) => player.positions.filter((p) => p.position === positionData.position).length > 0,
	);

	function getHeaderBackgroundStyle(list: PlayerRecord[]): string {
		if (list.length >= positionData.amount * 2) {
			return "var(--depth-good)";
		} else if (list.length >= 1) {
			return "var(--depth-okay)";
		} else {
			return "var(--depth-bad)";
		}
	}

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
	<div class="position-header" style:background-color={getHeaderBackgroundStyle(filtered_players)}>
		<div class="header-content">
			<span>{getPositionUILabel(positionData?.position)}</span>
			<div class="depth-ratio">
				{filtered_players.length} / {positionData.amount * 2}
			</div>
		</div>
	</div>
	<div class="player-list">
		<PlayerList list={filtered_players} position={positionData?.position} />
		<!-- <ReorderableList list={filtered_players} position={positionData?.position} /> -->
	</div>
</div>

<style>
	div.position-box-wrapper {
		border: var(--border);
		border-radius: var(--border-radius);
		background-color: var(--paper);
		width: 300px;
		min-height: 150px;
	}

	div.position-header {
		padding: 0.5rem;
		border-bottom: var(--border);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
	}

	div.header-content {
		display: flex;
		justify-content: space-between;
		gap: 5px;
		align-items: center;
	}

	div.player-list {
		width: 100%;
		height: 100%;
	}

	@media screen and (max-width: 700px) {
		div.position-box-wrapper {
			max-width: 126px;
			font-size: 0.9rem;
		}

		div.position-header span {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		div.depth-ratio {
			font-size: 0.7rem;
			min-width: fit-content;
		}
	}
</style>
