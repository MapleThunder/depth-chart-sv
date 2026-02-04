<script lang="ts">
	import { getPositionUILabel, type PositionData } from "$lib/positions";
	import PlayerList from "./PlayerList.svelte";
	import { players, type PlayerRecord } from "$lib/stores/player_store";

	export let positionData: PositionData;
	export let show_secondary_positions = false;

	$: primary_players = $players
		.filter((plyr) =>
			plyr.positions.some(
				(pos) => pos.position === positionData.position && pos.role === "primary",
			),
		)
		.toSorted((a, b) => {
			// Find the target position in player a
			const positionA = a.positions.find((p) => p.position === positionData.position);
			const weightA = positionA ? positionA.weight : Number.MAX_VALUE; // Fallback if position not found

			// Find the target position in player b
			const positionB = b.positions.find((p) => p.position === positionData.position);
			const weightB = positionB ? positionB.weight : Number.MAX_VALUE; // Fallback if position not found

			// Compare the weights
			return weightA - weightB;
		});

	$: filtered_players = $players
		.filter((plyr) => {
			if (show_secondary_positions) {
				return plyr.positions.some((pos) => pos.position === positionData.position);
			}
			return plyr.positions.some(
				(pos) => pos.position === positionData.position && pos.role === "primary",
			);
		})
		.toSorted((a, b) => {
			// Find the target position in player a
			const positionA = a.positions.find((p) => p.position === positionData.position);
			const weightA = positionA ? positionA.weight : Number.MAX_VALUE; // Fallback if position not found

			// Find the target position in player b
			const positionB = b.positions.find((p) => p.position === positionData.position);
			const weightB = positionB ? positionB.weight : Number.MAX_VALUE; // Fallback if position not found

			// Compare the weights
			return weightA - weightB;
		});

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
	<div class="position-header" style:background-color={getHeaderBackgroundStyle(primary_players)}>
		<div class="header-content">
			<span>{getPositionUILabel(positionData?.position)}</span>
			<div class="depth-ratio">
				{primary_players.length} / {positionData.amount * 2}
			</div>
		</div>
	</div>
	<div class="player-list">
		<PlayerList position={positionData.position} removesItems={true} {show_secondary_positions} />
	</div>
</div>

<style>
	div.position-box-wrapper {
		border: var(--border);
		border-radius: var(--border-radius);
		background-color: var(--paper);
		width: 300px;
		min-height: 150px;
		box-shadow: var(--panel-shadow-soft);
	}

	div.position-header {
		padding: 0.55rem 0.7rem;
		border-bottom: var(--border);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		font-weight: 600;
	}

	div.header-content {
		display: flex;
		justify-content: space-between;
		gap: 5px;
		align-items: center;
		font-size: 0.95rem;
	}

	div.player-list {
		width: 100%;
		height: 100%;
	}

	@media screen and (max-width: 700px) {
		div.position-box-wrapper {
			max-width: 132px;
			font-size: 0.85rem;
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
