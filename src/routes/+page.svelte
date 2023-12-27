<script>
	import PlayerEntryForm from "./PlayerEntryForm.svelte";
	import { formation } from "$lib/stores/formation_store";
	import { getPositionsForFormation } from "$lib/positions";
	import PositionBox from "./PositionBox.svelte";

	// TODO: Get the current formation and the positions associated with it
	const positions = getPositionsForFormation($formation);
</script>

<div class="content">
	<PlayerEntryForm />

	<div class="position-boxes">
		<!-- TODO: Loop over positions for the selected formation and render the boxes -->
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
	}
</style>
