<script lang="ts">
	import PlayerEntryForm from "./PlayerEntryForm.svelte";
	import { formation } from "$lib/stores/formation_store";
	import { getPositionsForFormation, type PositionData } from "$lib/positions";
	import PositionBox from "./PositionBox.svelte";

	let positions: PositionData[];
	$: $formation, (positions = getPositionsForFormation($formation));
</script>

<div class="content">
	<PlayerEntryForm />

	<div class="position-boxes">
		{#each positions as positionData}
			<PositionBox {positionData} />
		{/each}
	</div>
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 20px;
		margin: 0 auto;
		max-width: var(--column);
	}

	.position-boxes {
		margin-top: 1rem;
		display: grid;
		gap: 5px;
		grid-template-areas:
			".. ST .."
			"LW CAM RW"
			"LM CM RM"
			"LWB CDM RWB"
			"LB CB RB"
			".. GK ..";
	}
</style>
