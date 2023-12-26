<script>
	import PlayerRow from './PlayerRow.svelte';
</script>

<div class="position-box-wrapper">
	<div class="position-header">
		<!-- TODO - Load in position title -->
		<!-- TODO - Background colour should change based on position and depth preference -->
	</div>
	<div class="player-list">
		<ul>
			<!-- TODO - Loop over players for this position & display them -->
			<PlayerRow />
		</ul>
	</div>
</div>

<style>
	.position-box-wrapper {
		border: dashed red 1px;
	}
</style>
