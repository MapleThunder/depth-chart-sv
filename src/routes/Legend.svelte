<script lang="ts">
	const levels = [
		{ colour: "green-50", text: "Enough depth to cover the position" },
		{ colour: "yellow-50", text: "Enough players in this position for a starting XI" },
		{ colour: "red-50", text: "Not enough players in this position" },
	];
</script>

<div id="legend">
	<h2>Legend</h2>
	<div id="colour-explanation">
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
	}

	p {
		margin: 0;
	}
</style>
