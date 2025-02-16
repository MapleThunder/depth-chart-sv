<script>
	import { resetPlayers } from "$lib/stores/player_store";

</script>

<button type="button" on:click|preventDefault={() => resetPlayers()}>
  Clear All Players
</button>

<style>
  button {
		border: 1px solid transparent;
    background-color: var(--red-dark);
		padding: 7px;
		width: 80%;
		align-self: center;
		color: var(--text-light);
		border-radius: var(--border-radius);
	}

  button:hover,
	button:focus {
		background-color: var(--red-light);
		color: var(--text-dark);
		border: 1px solid var(--black);
	}
</style>