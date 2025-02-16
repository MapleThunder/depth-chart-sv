<script lang="ts">
  import Icon from "@iconify/svelte";
  import html2canvas from "html2canvas";

  async function shareDepthChartPicture() {
		const element = document.getElementById('position-boxes');
		if (!element) return;

		try {
			const canvas = await html2canvas(element, {
				backgroundColor: 'hsl(132, 96%, 31%)',
			});
			const dataURL = canvas.toDataURL('image/png'); // Or 'image/jpeg'

			const link = document.createElement('a');
			link.href = dataURL;
			link.download = 'depth-chart.png'; // Set the default filename
			link.click();
		} catch (error) {
			console.error('Error capturing image:', error);
		}
	}
</script>

<button id="export" type="button" on:click|preventDefault={() => shareDepthChartPicture()}>
  Share Image <Icon icon="fa:share-square" width="16px" height="16px" />
</button>

<style>
  	button#export {
		border: 1px solid transparent;
		padding: 7px;
		width: 80%;
		align-self: center;
		color: var(--text-light);
		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	button#export {
		background-color: var(--export-button-bg);
	}

	button#export:hover,
	button#export:focus {
		background-color: var(--export-button-bg-hover);
		color: var(--text-dark);
		border: 1px solid var(--black);
	}
</style>