<script lang="ts">
	import TermTooltip from "$lib/TermTooltip.svelte";
</script>

<section class="how-to-use-content">
	<h1>How to use the Depth Chart</h1>

	<p class="intro">Set your formation, add players, and manage depth in a few quick steps.</p>

	<h2>Quick Start</h2>
	<div class="quick-start-grid" aria-label="Quick start steps">
		<article class="step-card">
			<span class="step-number">1</span>
			<h3>Select a Formation</h3>
			<p>Choose your shape from the Formation Selection menu.</p>
		</article>
		<article class="step-card">
			<span class="step-number">2</span>
			<h3>Add Players</h3>
			<p>Use the Add a Player form and assign each player a primary position.</p>
		</article>
		<article class="step-card">
			<span class="step-number">3</span>
			<h3>Set Order</h3>
			<p>Reorder players with drag-and-drop or the up/down controls.</p>
		</article>
	</div>

	<h2>Managing Players</h2>
	<div class="action-strip" aria-label="Player actions">
		<div class="action-chip">
			<span class="chip-icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" width="12">
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5a.996.996 0 0 0 0-1.41l-2.59-2.59a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0z"
					></path>
				</svg>
			</span>
			<span>Edit player details</span>
		</div>
		<div class="action-chip">
			<span class="chip-icon" aria-hidden="true">+</span>
			<span>Add secondary positions</span>
		</div>
		<div class="action-chip">
			<span class="chip-icon" aria-hidden="true">X</span>
			<span>Remove from a position</span>
		</div>
	</div>

	<p>
		Each position box shows players assigned to that role. Click the
		<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" width="12">
			<path d="M0 0h24v24H0z" fill="none"></path>
			<path
				d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm18-11.5a.996.996 0 0 0 0-1.41l-2.59-2.59a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0z"
			></path>
		</svg>
		icon to edit a player, set their primary position, choose ability level (high, mid, or low), and add
		secondary positions. Click
		the X to remove a player from a specific position. If a player has no remaining positions, they are
		removed from the chart.
	</p>

	<p>
		Use the
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
			<path
				d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.22-1.13.54-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.4 1.05.72 1.63.94l.36 2.54a.5.5 0 0 0 .49.42h3.8a.5.5 0 0 0 .49-.42l.36-2.54c.58-.22 1.13-.54 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"
			/>
		</svg>
		icon in the header to open Settings. From there you can turn on Show Secondary Positions to include
		secondary roles in the lists, and toggle the
		<TermTooltip label="Player Skill Colour Gradient" tooltip_id="skill-gradient-tooltip-how-to">
			a subtle colour on each player row based on skill level:
			<span class="tooltip-skill-high">high</span>,
			<span class="tooltip-skill-mid">mid</span>, and
			<span class="tooltip-skill-low">low</span>
		</TermTooltip>
		on or off. Depth totals and header colours always use primary positions only.
	</p>

	<h2>Sorting</h2>
	<p>Open Settings and choose a Sort Mode for player lists:</p>
	<div class="depth-legend" aria-label="Sort mode options">
		<div class="depth-item">
			<div>
				<strong>Default</strong>
				<p>Groups primary players above secondary players, then uses list order.</p>
			</div>
		</div>
		<div class="depth-item">
			<div>
				<strong>Custom</strong>
				<p>Uses your manual list order only, so any player can be moved anywhere.</p>
			</div>
		</div>
	</div>

	<h2>Depth & Colours</h2>

	<p>
		The header fraction is: primary players in that position / target depth for the formation.
		Target depth is twice the starting requirement (for example, a two-CB formation targets four
		total CBs).
	</p>

	<div class="depth-legend" aria-label="Depth colour legend">
		<div class="depth-item depth-good">
			<span class="depth-dot"></span>
			<div>
				<strong>Green</strong>
				<p>Target depth met or exceeded</p>
			</div>
		</div>
		<div class="depth-item depth-okay">
			<span class="depth-dot"></span>
			<div>
				<strong>Yellow</strong>
				<p>At least one primary player, below target depth</p>
			</div>
		</div>
		<div class="depth-item depth-bad">
			<span class="depth-dot"></span>
			<div>
				<strong>Red</strong>
				<p>No primary players for that position</p>
			</div>
		</div>
	</div>

	<h2>Sharing & Saving</h2>
	<div class="action-strip" aria-label="Share and save actions">
		<div class="action-chip">
			<span class="chip-icon" aria-hidden="true">PNG</span>
			<span>Share Image exports a PNG</span>
		</div>
		<div class="action-chip">
			<span class="chip-icon" aria-hidden="true">!</span>
			<span>Clear All Players removes all entries</span>
		</div>
		<div class="action-chip">
			<span class="chip-icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 24 24" width="12">
					<path
						d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zM12 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM6 8V5h9v3H6z"
					></path>
				</svg>
			</span>
			<span>Changes save automatically in this browser</span>
		</div>
	</div>

	<p>
		Use Share Image to download a PNG of the position grid. Clear All Players will remove everyone
		after confirmation. Your depth chart is saved automatically in this browser.
	</p>
</section>

<style>
	.how-to-use-content {
		background-color: var(--paper);
		padding: 1.2rem;
		border-radius: var(--border-radius);
		max-width: var(--column);
		border: var(--border);
	}

	.how-to-use-content h1 {
		margin-top: 0;
	}

	.how-to-use-content h2 {
		margin-top: 1.35rem;
		margin-bottom: 0.7rem;
	}

	.how-to-use-content p {
		margin-top: 0.4rem;
	}

	.intro {
		font-size: 1.03rem;
	}

	.quick-start-grid {
		display: grid;
		gap: 0.7rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.step-card {
		border: var(--border);
		border-radius: 10px;
		padding: 0.8rem;
		background: linear-gradient(160deg, hsl(0, 0%, 100%), hsl(210, 18%, 97%));
	}

	.step-number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 999px;
		background: var(--primary);
		color: var(--white);
		font-weight: 700;
		margin-bottom: 0.35rem;
	}

	.step-card h3 {
		margin: 0 0 0.3rem;
		font-size: 0.98rem;
	}

	.step-card p {
		margin: 0;
		font-size: 0.9rem;
	}

	.action-strip {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.55rem;
	}

	.action-chip {
		border: var(--border);
		border-radius: 999px;
		padding: 0.35rem 0.6rem;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		background-color: var(--white);
		font-size: 0.88rem;
	}

	.chip-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.25rem;
		height: 1.25rem;
		border-radius: 999px;
		background: hsl(210, 26%, 91%);
		font-weight: 700;
		padding: 0 0.35rem;
		font-size: 0.7rem;
	}

	.chip-icon svg {
		display: block;
		fill: currentColor;
	}

	.depth-legend {
		display: grid;
		gap: 0.55rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.depth-item {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		padding: 0.65rem 0.75rem;
		border: 1px solid transparent;
		border-radius: 10px;
	}

	.depth-item p {
		margin: 0.12rem 0 0;
		font-size: 0.9rem;
	}

	.depth-good {
		background: hsl(138, 68%, 30%, 0.09);
		border-color: hsl(138, 68%, 30%, 0.25);
	}

	.depth-okay {
		background: hsl(46, 100%, 56%, 0.12);
		border-color: hsl(46, 100%, 40%, 0.28);
	}

	.depth-bad {
		background: hsl(6, 86%, 50%, 0.1);
		border-color: hsl(6, 86%, 50%, 0.25);
	}

	.depth-dot {
		flex-shrink: 0;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 999px;
		margin-top: 0.2rem;
	}

	.depth-good .depth-dot {
		background-color: var(--green);
	}

	.depth-okay .depth-dot {
		background-color: var(--yellow);
	}

	.depth-bad .depth-dot {
		background-color: var(--red);
	}

	@media screen and (max-width: 900px) {
		.quick-start-grid,
		.action-strip {
			grid-template-columns: 1fr;
		}

		.depth-legend {
			grid-template-columns: 1fr;
		}
	}
</style>
