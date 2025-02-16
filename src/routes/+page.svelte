<script lang="ts">
	import PlayerEntryForm from "./PlayerEntryForm.svelte";
	import { formation } from "$lib/stores/formation_store";
	import { getPositionsForFormation, Position, type PositionData } from "$lib/positions";
	import PositionBox from "./PositionBox.svelte";
	import Legend from "./Legend.svelte";
	import { base_url, site_description, site_name, site_title } from "$lib/config";
	import FormationSelect from "./FormationSelect.svelte";
	import SharePictureButton from "./SharePictureButton.svelte";
	import ClearAllButton from "./ClearAllButton.svelte";

	let positions: PositionData[];
	$: $formation, (positions = getPositionsForFormation($formation));
</script>

<svelte:head>
	<title>Depth Chart</title>
	<meta name="description" content={site_description} />

	<meta property="og:site_name" content={site_name} />
	<meta property="og:locale" content="en" />
	<meta property="og:url" content={base_url} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={site_title} />
	<meta property="og:description" content={site_description} />
</svelte:head>

<div id="content">
	<div id="left-column">
		<div class="form-wrapper">
			<FormationSelect />
			<PlayerEntryForm />
	
			<hr />
	
			<div class="button-wrapper">
				<SharePictureButton />
				<ClearAllButton />
			</div>
		</div>
		<Legend />
	</div>

	<div id="position-boxes" class="position-boxes">
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

	div.form-wrapper {
		grid-area: "FORM";
		height: fit-content;
		padding: 15px;
		background-color: var(--paper);
		border-radius: 0 0 5px 5px;
		border: var(--border);
		border-top: transparent;
	}

	.button-wrapper {
		width: 100%;
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
