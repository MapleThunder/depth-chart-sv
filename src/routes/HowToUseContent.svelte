<script lang="ts">
	import TermTooltip from "$lib/TermTooltip.svelte";

	type SkillLevel = "low" | "mid" | "high";

	let demo_skill: SkillLevel = "mid";
	let demo_show_gradient = true;
	let demo_show_secondary = true;

	function getSkillColour(skill: SkillLevel): string {
		if (skill === "low") return "hsl(8 78% 56%)";
		if (skill === "high") return "hsl(120 52% 45%)";
		return "hsl(46 92% 54%)";
	}

	function getSkillFadeColour(skill: SkillLevel): string {
		if (skill === "low") return "hsl(8 78% 56% / 0)";
		if (skill === "high") return "hsl(120 52% 45% / 0)";
		return "hsl(46 92% 54% / 0)";
	}
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
		icon to edit a player, set their primary position, choose ability level (high, mid, or low), and
		add secondary positions. Click the X to remove a player from a specific position. If a player has
		no remaining positions, they are removed from the chart.
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
				<p>
					Sorts players by skill, high to low, with primary positions above secondary when skill is
					equal.
				</p>
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

	<h2>Reading Player Rows</h2>
	<p>
		Use this demo row to see what each visual cue means. Change the options to preview how settings
		affect what you see in each position list.
	</p>
	<section class="row-demo" aria-label="Player row demo">
		<div class="row-demo-controls">
			<label class="row-demo-control">
				<span>Skill Level</span>
				<select
					class="row-demo-skill-select"
					bind:value={demo_skill}
					aria-label="Demo skill level"
					style={`--skill-color: ${getSkillColour(demo_skill)}`}
				>
					<option value="high">High</option>
					<option value="mid">Mid</option>
					<option value="low">Low</option>
				</select>
			</label>
			<label class="row-demo-toggle">
				<input type="checkbox" bind:checked={demo_show_gradient} />
				<span>Show skill gradient</span>
			</label>
			<label class="row-demo-toggle">
				<input type="checkbox" bind:checked={demo_show_secondary} />
				<span>Show secondary pill</span>
			</label>
		</div>

		<article
			class="demo-item"
			class:demo-item-secondary={demo_show_secondary}
			class:demo-item-has-skill-gradient={demo_show_gradient}
			style={`--skill-color: ${getSkillColour(demo_skill)}; --skill-fade-color: ${getSkillFadeColour(demo_skill)};`}
			data-testid="row-demo-item"
		>
			<div class="demo-buttons" aria-hidden="true">
				<span></span>
				<span></span>
			</div>
			<div class="demo-content">
				<span class="player-name">Jordan Example</span>
				<span class="meta-row">
					<span class="pill role-pill role-primary">Primary: ST</span>
					{#if demo_show_secondary}
						<span class="pill role-pill role-secondary">2nd</span>
					{/if}
				</span>
			</div>
			<div class="demo-buttons actions" aria-hidden="true">
				<span></span>
				<span></span>
			</div>
		</article>

		<div class="row-demo-notes" aria-label="Row cue legend">
			<p class="row-demo-note-row">
				<span class="row-demo-inline-note">
					<TermTooltip label="i" tooltip_id="row-primary-pill-note-tooltip-how-to">
						Only shown when a player appears under a secondary position
					</TermTooltip>
				</span>
				<span class="row-demo-note-text"
					><strong>Primary: ST</strong> identifies the player’s main role.</span
				>
			</p>
			<p class="row-demo-note-row">
				<span class="row-demo-inline-note">
					<TermTooltip label="i" tooltip_id="row-secondary-pill-note-tooltip-how-to">
						Only shown when a player appears under a secondary position
					</TermTooltip>
				</span>
				<span class="row-demo-note-text"
					><strong>2nd pill</strong> means this player is shown here as a secondary position.</span
				>
			</p>
			<p class="row-demo-note-row">
				<span class="row-demo-inline-note row-demo-inline-note--placeholder" aria-hidden="true"
					>i</span
				>
				<span class="row-demo-note-text"
					><strong>Right-side gradient</strong> reflects skill level when enabled in Settings.</span
				>
			</p>
		</div>
	</section>

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
		width: 100%;
		max-width: var(--column);
		margin-inline: auto;
		box-sizing: border-box;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}

	.how-to-use-content > * {
		min-width: 0;
		max-width: 100%;
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
		overflow-wrap: anywhere;
	}

	.how-to-use-content > p:last-child {
		margin-bottom: 0.9rem;
	}

	.intro {
		font-size: 1.03rem;
	}

	.quick-start-grid {
		display: grid;
		gap: 0.7rem;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		width: 100%;
		min-width: 0;
		height: auto;
		overflow: visible;
		border: 0;
		outline: 0;
		max-width: 100%;
	}

	.quick-start-grid > * {
		min-width: 0;
		max-width: 100%;
	}

	.step-card {
		border: var(--border);
		border-radius: 10px;
		padding: 0.8rem;
		background: linear-gradient(160deg, hsl(0, 0%, 100%), hsl(210, 18%, 97%));
		min-width: 0;
		width: 100%;
		box-sizing: border-box;
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
		min-width: 0;
	}

	.chip-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
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

	.action-chip > span:last-child {
		min-width: 0;
		overflow-wrap: anywhere;
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
		min-width: 0;
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

	.row-demo {
		border: var(--border);
		border-radius: 12px;
		padding: 0.75rem;
		background: linear-gradient(160deg, hsl(0, 0%, 100%), hsl(210, 18%, 97%));
		display: grid;
		gap: 0.7rem;
	}

	.row-demo-controls {
		display: flex;
		gap: 0.8rem;
		flex-wrap: wrap;
		align-items: flex-end;
	}

	.row-demo-control {
		display: inline-flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.88rem;
		font-weight: 600;
	}

	.row-demo-skill-select {
		appearance: none;
		border-radius: 999px;
		border: 1px solid transparent;
		width: 34px;
		height: 34px;
		padding: 0;
		min-width: 34px;
		background: var(--skill-color);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--skill-color), #000 18%);
		color: transparent;
		text-indent: -999px;
		cursor: pointer;
	}

	.row-demo-skill-select option {
		background: var(--white);
		color: var(--text-dark);
	}

	.row-demo-skill-select option:hover,
	.row-demo-skill-select option:focus,
	.row-demo-skill-select option:checked {
		background: color-mix(in srgb, var(--skill-color), #fff 70%);
		color: var(--text-dark);
	}

	.row-demo-skill-select:focus {
		outline: 2px solid color-mix(in srgb, var(--skill-color), #000 35%);
		outline-offset: 2px;
	}

	.row-demo-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.88rem;
	}

	.demo-item {
		box-sizing: border-box;
		display: inline-flex;
		width: 100%;
		min-height: 2.2em;
		background-color: var(--white);
		border: 1px solid var(--panel-border);
		border-radius: 10px;
		padding: 0.15rem 0.25rem;
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}

	.demo-item::after {
		content: "";
		position: absolute;
		inset: 0 0 0 auto;
		width: 36%;
		background: linear-gradient(90deg, var(--skill-fade-color) 0%, var(--skill-color) 100%);
		opacity: 0;
		pointer-events: none;
		z-index: 0;
	}

	.demo-item.demo-item-has-skill-gradient::after {
		opacity: 0.35;
	}

	.demo-item.demo-item-secondary.demo-item-has-skill-gradient::after {
		opacity: 0.22;
	}

	.demo-item > * {
		margin: auto;
		position: relative;
		z-index: 1;
	}

	.demo-content {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.2rem;
		padding: 0.12rem 0.25rem;
	}

	.demo-buttons {
		width: 26px;
		min-width: 26px;
		display: flex;
		flex-direction: column;
		gap: 0.22rem;
	}

	.demo-buttons span {
		display: block;
		width: 14px;
		height: 14px;
		border-radius: 999px;
		background: hsl(210, 22%, 87%);
	}

	.demo-buttons.actions span {
		background: hsl(210, 22%, 82%);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		padding: 0.05rem 0.4rem;
		border-radius: 999px;
		font-size: 0.68rem;
		line-height: 1.15;
		border: 1px solid transparent;
		background: rgba(255, 255, 255, 0.75);
	}

	.role-pill.role-primary {
		border-color: rgba(30, 58, 138, 0.2);
		color: #1e3a8a;
		background: rgba(219, 234, 254, 0.78);
	}

	.role-pill.role-secondary {
		border-color: rgba(30, 64, 175, 0.28);
		color: #1e40af;
		background: rgba(219, 234, 254, 0.9);
	}

	.row-demo-notes {
		display: grid;
		gap: 0.4rem;
		font-size: 0.88rem;
	}

	.row-demo-note-row {
		margin: 0;
		display: flex;
		align-items: flex-start;
		gap: 0.34rem;
	}

	.row-demo-inline-note {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 1.05rem;
		width: 1.05rem;
		height: 1.05rem;
		margin-top: 0.05rem;
	}

	.row-demo-note-text {
		display: inline;
		min-width: 0;
		overflow-wrap: anywhere;
	}

	.row-demo-inline-note :global(.tooltip-trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.05rem;
		height: 1.05rem;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 700;
		text-decoration: none;
		background: hsl(210, 24%, 90%);
		color: hsl(210, 40%, 28%);
		line-height: 1;
	}

	.row-demo-inline-note--placeholder {
		visibility: hidden;
	}

	@media screen and (max-width: 900px) {
		.how-to-use-content {
			padding: 1rem;
		}

		.quick-start-grid {
			display: flex;
			flex-direction: column;
		}

		.action-strip {
			grid-template-columns: 1fr;
		}

		.depth-legend {
			grid-template-columns: 1fr;
		}

		.row-demo-controls {
			flex-direction: column;
			align-items: stretch;
		}

		.row-demo-control {
			align-items: flex-start;
		}

		.action-chip {
			border-radius: 12px;
			align-items: flex-start;
		}
	}

	@media screen and (max-width: 1080px) {
		.quick-start-grid {
			grid-template-columns: 1fr;
		}
	}

	@media screen and (max-width: 560px) {
		.how-to-use-content {
			padding: 0.85rem;
		}

		.row-demo {
			padding: 0.65rem;
		}
	}
</style>
