<script lang="ts">
	import { formation, getFormationSelectOptions } from "$lib/stores/formation_store";
	import "../styles.css";

	const formationOptions = getFormationSelectOptions();
</script>

<header>
	<div class="header-content">
		<a href="/"> Depth Chart </a>

		<div class="header-controls">
			<div class="formation-selection">
				<select bind:value={$formation}>
					{#each formationOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<div class="clear-btn-wrapper">
				<!-- TODO: Add clear functionality to clear all data from local storage -->
				<button id="clear-btn">Clear Players</button>
			</div>
		</div>
	</div>
</header>

<main><slot /></main>

<footer>
	<p>Created by Niko Bentley</p>
</footer>

<style>
	header,
	footer {
		width: 100%;
		height: 3rem;
		color: var(--text-light);
		background-color: var(--primary);
	}

	header a {
		color: var(--text-light);
	}

	.header-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: var(--column);
		padding: 0 var(--side);
		margin: 0 auto;
		flex-shrink: 0;
	}
	.header-controls {
		display: flex;
		gap: 1rem;
	}
	.formation-selection {
		display: flex;
		align-items: center;
	}

	button#clear-btn {
		background-color: var(--error);
		border: 1px solid transparent;
		padding: 0.4rem 1rem;
		color: var(--text-light);
		border-radius: var(--border-radius);
	}

	main {
		flex-grow: 1;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: flex-end;
		flex-shrink: 0;
	}
</style>
