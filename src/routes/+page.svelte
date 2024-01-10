<script lang="ts">
	import PlayerEntryForm from "./PlayerEntryForm.svelte";
	import { formation } from "$lib/stores/formation_store";
	import { getPositionsForFormation, Position, type PositionData } from "$lib/positions";
	import PositionBox from "./PositionBox.svelte";
	import Legend from "./Legend.svelte";

	let positions: PositionData[];
	$: $formation, (positions = getPositionsForFormation($formation));
</script>

<div id="content">
	<div id="left-column">
		<PlayerEntryForm />
		<Legend />
	</div>

	<div class="position-boxes">
		{#each positions as positionData}
			<PositionBox {positionData} />
		{/each}
	</div>
</div>

<style>
	div#content {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 20px;
		margin: 0 auto;
		max-width: var(--column);
	}

	div#left-column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.position-boxes {
		margin-top: 1rem;
		display: grid;
		gap: 5px;
		grid-template-areas:
			".. ST .."
			"LW CAM RW"
			"LM CM RM"
			"LB CB RB"
			".. GK ..";
	}

	@media screen and (max-width: 700px) {
		div#content {
			display: flex;
			flex-direction: column;
		}

		.position-boxes {
			padding: 20px 0;
			grid-gap: 2px;
			margin-top: 10px;
		}
	}
</style>
