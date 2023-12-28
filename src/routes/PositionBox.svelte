<script lang="ts">
	import { getPositionUILabel, type PositionData } from "$lib/positions";
	import PlayerRow from "./PlayerRow.svelte";

	export let positionData: PositionData;
</script>

<div class="position-box-wrapper" style="grid-area: {positionData?.position}">
	<div class="position-header">
		{getPositionUILabel(positionData?.position)}
		<!-- TODO: Background colour should change based on position and depth preference -->
	</div>
	<div class="player-list">
		<ul>
			<!-- TODO: Loop over players for this position & display them -->
			<PlayerRow />
		</ul>
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
		padding: 0 1rem 1rem 1rem;
		width: 100%;
		height: 100%;
	}

	ul {
		margin: 0;
		padding: 0 0 0 10px;
	}
</style>
