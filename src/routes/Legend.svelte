<script lang="ts">
	const levels = [
		{ colour: "green-50", text: "Enough depth to cover the position" },
		{ colour: "yellow-50", text: "Enough players in this position for a starting XI" },
		{ colour: "red-50", text: "Not enough players in this position" },
	];
</script>

<div id="legend">
	<h2>Header Colours</h2>
	<div id="colour-explanation">
		<p>
			The colour changes when you meet depth thresholds, this will change depending on the formation
			chosen.
		</p>
		{#each levels as level}
			<div class="row">
				<div class="colour-box" style:background-color={`var(--${level.colour})`}></div>
				<div class="explanation"><p>{level.text}</p></div>
			</div>
		{/each}
	</div>
</div>

<style>
	div#legend {
		background-color: var(--paper);
		border-radius: var(--border-radius);
		padding: 0 1rem 1rem 1rem;
		border: var(--border);
		grid-area: "FORM";
	}

	div#colour-explanation {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	div.row {
		width: 100%;
		display: flex;
		gap: 10px;
		align-items: center;
	}
	div.colour-box {
		min-height: 20px;
		max-height: 20px;
		min-width: 20px;
		max-width: 20px;
		border: 1px solid var(--black);
		border-radius: 3px;
	}

	h2 {
		margin-bottom: 0.4rem;
	}
	p {
		margin: 0;
	}

	@media screen and (max-width: 700px) {
		div#legend {
			grid-area: "LEGEND";
		}
	}
</style>
