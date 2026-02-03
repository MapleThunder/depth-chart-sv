<script>
	import { resetPlayers } from "$lib/stores/player_store";
</script>

<button type="button" on:click|preventDefault={() => resetPlayers()}>
  Clear All Players
</button>

<style>
  button {
		border: 1px solid transparent;
    background-color: var(--danger-button-bg);
		padding: 0.6rem 0.9rem;
		width: 100%;
		align-self: center;
		color: var(--text-light);
		border-radius: 999px;
		font-weight: 600;
		box-shadow: 0 6px 16px rgba(10, 14, 22, 0.18);
	}

  button:hover,
	button:focus {
		background-color: var(--danger-button-bg-hover);
		color: var(--text-light);
		border: 1px solid var(--panel-border);
	}
</style>
