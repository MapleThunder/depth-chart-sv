<script lang="ts">
	import { formation, getFormationSelectOptions } from "$lib/stores/formation_store";
	import { resetPlayers } from "$lib/stores/player_store";
	import "../styles.css";

	const formationOptions = getFormationSelectOptions();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</svelte:head>

<header>
	<div class="header-content">
		<a class="home-link" href="/">Depth Chart</a>

		<div class="header-controls">
			<a href="/how-to-use" class="help-link">How to Use</a>
			<div class="formation-selection">
				<select bind:value={$formation}>
					{#each formationOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<div class="clear-btn-wrapper">
				<button id="clear-btn" on:click={() => resetPlayers()}>Clear Players</button>
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
		min-height: 50px;
		color: var(--text-light);
		background-color: var(--primary);
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
		color: var(--white);
	}
	.header-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	.formation-selection {
		display: flex;
		align-items: center;
	}

	select {
		padding: 0.4rem;
		border-radius: var(--border-radius);
	}

	a {
		color: var(--text-light);
		text-decoration: none;
		border: 3px solid transparent;
	}
	a:hover,
	a:focus {
		border-bottom: 3px solid var(--accent);
	}

	a.home-link {
		font-size: 1.5rem;
	}

	button#clear-btn {
		background-color: var(--error);
		border: 1px solid transparent;
		padding: 0.4rem 1rem;
		color: var(--text-light);
		border-radius: var(--border-radius);
	}

	button#clear-btn:hover,
	button#clear-btn:focus {
		background-color: var(--red-dark);
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
		margin-top: 1rem;
	}
</style>
