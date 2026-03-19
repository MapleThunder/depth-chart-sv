<script lang="ts">
	import HowToUseContent from "../HowToUseContent.svelte";
</script>

<div id="content">
	<HowToUseContent />
</div>

<style>
	#content {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		max-width: var(--column);
		padding: 1rem var(--side);
	}
</style>
