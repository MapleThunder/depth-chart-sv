<script lang="ts">
	import { getFormationSelectOptions } from "$lib/stores/formation_store";
  import { formation } from "$lib/stores/formation_store";

  const formationOptions = getFormationSelectOptions();
</script>

<div class="formation-selection">
  <label for="formation-select">Formation Selection</label>
  <select id="formation-select" name="formation-select" bind:value={$formation}>
    {#each formationOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>

<style>
  .formation-selection {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.formation-selection label {
		font-size: 1.2rem;
		font-weight: bold;
	}

</style>