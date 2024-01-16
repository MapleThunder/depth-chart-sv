<script>
</script>

<div id="content">
	<section>
		<h1>How To Use The Site</h1>

		<p>Simple quick-start steps:</p>

		<ol>
			<li>Select a formation from the header</li>
			<li>Add players using the form to different positions</li>
			<li>Reorder players in their positions as desired</li>
		</ol>

		<h2>Positions</h2>

		<p>
			There are boxes that signify different positions on the pitch (striker, winger, midfielder,
			etc.) arranged depending on the formation chosen. The colour of the header bar for each
			position box changes as you add or remove players to the different positions. A player can be
			added to multiple positions and when the "X" is clicked on a player they are only removed from
			that position. The position headers also include a fraction. The fraction represents the
			(number of players added) / (ideal number of players in the position for the chosen formation)
		</p>

		<p>The position box header colours have the following meanings:</p>

		<ul>
			<li>Red: not enough players to start</li>
			<li>Yellow: enough players to start but more depth needed</li>
			<li>Green: enough depth in this posiion</li>
		</ul>
	</section>
</div>

<style>
	div#content {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		max-width: var(--column);
	}

	section {
		background-color: var(--paper);
		padding: 1rem;
		border-radius: var(--border-radius);
		margin-top: 1rem;
		max-width: var(--column);
	}
</style>
