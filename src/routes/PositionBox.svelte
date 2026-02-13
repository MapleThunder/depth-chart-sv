<script lang="ts">
	import { getPositionSelectOptions, getPositionUILabel, type PositionData } from "$lib/positions";
	import { getVisibleAssignedPosition } from "$lib/player_visibility";
	import { formation } from "$lib/stores/formation_store";
	import PlayerList from "./PlayerList.svelte";
	import { players, type PlayerRecord } from "$lib/stores/player_store";

	export let positionData: PositionData;
	export let show_secondary_positions = false;

	$: visible_positions = new Set(
		getPositionSelectOptions($formation).map((option) => option.value),
	);

	$: primary_players = $players
		.filter((plyr) => getVisibleAssignedPosition(plyr, visible_positions) === positionData.position)
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
		width: 100%;
		min-width: 0;
		min-height: 8.2rem;
		box-shadow: var(--panel-shadow-soft);
	}

	div.position-header {
		padding: 0.38rem 0.34rem;
		border-bottom: var(--border);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		font-weight: 600;
	}

	div.header-content {
		display: flex;
		justify-content: space-between;
		gap: 0.35rem;
		align-items: center;
		font-size: clamp(0.58rem, 2.2vw, 0.9rem);
	}

	div.position-header span {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	div.depth-ratio {
		font-size: clamp(0.53rem, 1.7vw, 0.78rem);
		white-space: nowrap;
		min-width: fit-content;
	}

	div.player-list {
		width: 100%;
		height: 100%;
	}

	@media screen and (min-width: 390px) {
		div.position-box-wrapper {
			min-height: 9rem;
		}
	}

	@media screen and (min-width: 768px) {
		div.position-box-wrapper {
			width: 100%;
		}

		div.position-header {
			padding: 0.5rem 0.55rem;
		}
	}

	@media screen and (min-width: 810px) {
		div.position-box-wrapper {
			min-height: 9.4rem;
		}

		div.header-content {
			font-size: 0.9rem;
			gap: 0.5rem;
		}

		div.depth-ratio {
			font-size: 0.76rem;
		}
	}

	@media screen and (min-width: 1366px) {
		div.position-box-wrapper {
			min-height: 9.8rem;
		}
	}
</style>
