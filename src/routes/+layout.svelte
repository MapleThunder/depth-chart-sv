<script>
	import { getFormationSelectOptions, formation } from "$lib/stores/formation_store";
	import "../styles.css";

	const formationOptions = getFormationSelectOptions();
</script>

<header>
	<div class="header-content">
		<a href="/"> Depth Chart </a>

		<div class="header-controls">
			<div class="formation-selection">
				<select
					bind:value={$formation}
					on:change={(e) => {
						console.log("FORMATION_CHANGE", e.target);
					}}
				>
					{#each formationOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<div class="clear">
				<!-- TODO: Add clear functionality to clear all data from local storage -->
				<button>Clear</button>
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
