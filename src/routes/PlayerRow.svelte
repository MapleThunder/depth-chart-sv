<script lang="ts">
	import type { PlayerRecord } from "$lib/stores/player_store";

	export let player: PlayerRecord;
</script>

<li>
	<!-- TODO: Display the drag handle -->
	{player.name}
	<!-- TODO: Display the edit button -->
</li>
