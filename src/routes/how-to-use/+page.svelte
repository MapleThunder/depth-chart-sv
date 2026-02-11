<script>
</script>

<div id="content">
	<section>
		<h1>How To Use The Depth Chart</h1>

		<p>Quick start:</p>

		<ol>
			<li>Select a formation from the Formation Selection menu</li>
			<li>Add players with a primary position using the Add a Player form</li>
			<li>Reorder players within a position by dragging or using the up/down arrows</li>
		</ol>

		<h2>Managing Players</h2>

		<p>
			Each position box shows players assigned to that role. Click the pencil icon to edit a player,
			set their primary position, and add secondary positions with a skill level (high, mid, or
			low). Click the X to remove a player from a specific position. If a player has no remaining
			positions, they are removed from the chart.
		</p>

		<p>
			Use the Show secondary positions toggle to include secondary roles in the lists. Depth totals
			and header colours always use primary positions only.
		</p>

		<h2>Depth & Colours</h2>

		<p>
			The header fraction is: primary players in that position / target depth for the formation.
			Target depth is twice the starting requirement (for example, a two-CB formation targets four
			total CBs).
		</p>

		<p>Header colours reflect primary depth:</p>

		<ul>
			<li>Green: target depth met or exceeded</li>
			<li>Yellow: at least one primary player, but below target depth</li>
			<li>Red: no primary players for that position</li>
		</ul>

		<h2>Sharing & Saving</h2>

		<p>
			Use Share Image to download a PNG of the position grid. Clear All Players will remove everyone
			after confirmation. Your depth chart is saved automatically in this browser.
		</p>
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
