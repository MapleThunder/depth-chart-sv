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
		gap: 0.8rem;
	}

	.formation-selection label {
		font-size: 1rem;
		font-weight: 600;
	}

	.formation-selection select {
		padding: 0.45rem 0.7rem;
		border-radius: 10px;
		border: 1px solid var(--panel-border);
		background-color: var(--white);
	}

</style>
