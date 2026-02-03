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
		grid-template-columns: minmax(280px, 360px) 1fr;
		gap: 1.2rem;
		margin: 0 auto;
		max-width: var(--column);
		padding: 1.2rem var(--side);
	}

	div#left-column {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	div.form-wrapper {
		grid-area: "FORM";
		height: fit-content;
		padding: 1.2rem;
		background-color: var(--paper);
		border-radius: var(--border-radius);
		border: var(--border);
		box-shadow: var(--panel-shadow-soft);
	}

	.button-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.position-boxes {
		padding: 0.5rem 0.3rem 1rem;
		display: grid;
		gap: 12px;
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
			padding: 0.7rem var(--side);
		}

		.position-boxes {
			padding: 16px 0;
			grid-gap: 10px;
			margin-top: 10px;
		}
	}
</style>
