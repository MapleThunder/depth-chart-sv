<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import TermTooltip from "$lib/TermTooltip.svelte";
	import { settings, type AppSettings } from "$lib/stores/settings_store";

	export let open = false;

	const dispatch = createEventDispatcher<{ close: void }>();

	function close(): void {
		dispatch("close");
	}

	function updateSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): void {
		settings.update((current) => ({ ...current, [key]: value }));
	}
</script>

{#if open}
	<div
		class="modal-backdrop"
		role="button"
		tabindex="0"
		aria-label="Close settings modal"
		on:click={close}
		on:keydown={(ev) => {
			if (ev.key === "Escape" || ev.key === "Enter" || ev.key === " ") {
				ev.preventDefault();
				close();
			}
		}}
	>
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-label="Settings"
			tabindex="-1"
			on:click|stopPropagation
			on:keydown|stopPropagation={() => {}}
		>
			<header class="modal-header">
				<h2>Settings</h2>
				<button class="modal-close" aria-label="Close settings" on:click={close}>×</button>
			</header>
			<div class="modal-body">
				<label class="setting-row" for="player-sort-mode">
					<div>
						<span class="setting-title setting-title-inline">
							<span>Sort Mode</span>
							<span class="setting-info-icon">
								<TermTooltip label="i" tooltip_id="sort-mode-tooltip-settings">
									Default keeps players grouped by role (primary before secondary), then orders by
									list position. Custom uses your manual list order only, so you can place players
									anywhere.
								</TermTooltip>
							</span>
						</span>
						<span class="setting-copy"
							>Choose how players are ordered within each position list.</span
						>
					</div>
					<select
						id="player-sort-mode"
						class="setting-select"
						aria-label="Sort Mode"
						value={$settings.player_sort_mode}
						on:change={(event) => {
							const target = event.currentTarget as HTMLSelectElement;
							updateSetting("player_sort_mode", target.value as AppSettings["player_sort_mode"]);
						}}
					>
						<option value="default">Default (Skill)</option>
						<option value="custom">Custom (Manual)</option>
					</select>
				</label>

				<label class="setting-row" for="show-skill-gradient">
					<div>
						<span class="setting-title">
							<TermTooltip
								label="Player Skill Colour Gradient"
								tooltip_id="skill-gradient-tooltip-settings"
							>
								a subtle colour on each player row based on skill level:
								<span class="tooltip-skill-high">high</span>,
								<span class="tooltip-skill-mid">mid</span>, and
								<span class="tooltip-skill-low">low</span>
							</TermTooltip>
						</span>
						<span class="setting-copy">Show the right-side colour gradient on player rows.</span>
					</div>
					<span class="switch">
						<input
							id="show-skill-gradient"
							type="checkbox"
							checked={$settings.show_skill_gradient}
							on:change={(event) => {
								const target = event.currentTarget as HTMLInputElement;
								updateSetting("show_skill_gradient", target.checked);
							}}
						/>
						<span class="slider" aria-hidden="true"></span>
					</span>
				</label>

				<label class="setting-row" for="show-secondary-positions">
					<div>
						<span class="setting-title">Show Secondary Positions</span>
						<span class="setting-copy"
							>Display players in their secondary roles on the depth chart.</span
						>
					</div>
					<span class="switch">
						<input
							id="show-secondary-positions"
							type="checkbox"
							checked={$settings.show_secondary_positions}
							on:change={(event) => {
								const target = event.currentTarget as HTMLInputElement;
								updateSetting("show_secondary_positions", target.checked);
							}}
						/>
						<span class="slider" aria-hidden="true"></span>
					</span>
				</label>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(10, 12, 16, 0.55);
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.modal {
		width: min(560px, 100%);
		max-height: 90vh;
		overflow: auto;
		background: var(--paper);
		border: var(--border);
		border-radius: var(--border-radius);
		box-shadow: 0 24px 52px rgba(0, 0, 0, 0.25);
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.9rem 1rem;
		border-radius: var(--border-radius) var(--border-radius) 0 0;
		border-bottom: 1px solid color-mix(in srgb, var(--primary) 80%, #000 20%);
		background:
			linear-gradient(
				135deg,
				color-mix(in srgb, color-mix(in srgb, var(--primary), #000 8%) 80%, transparent),
				color-mix(in srgb, var(--primary) 80%, transparent)
			),
			linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 70%);
		color: var(--text-light);
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.2rem;
	}

	.modal-close {
		font-size: 1.3rem;
		line-height: 1;
		width: 32px;
		height: 32px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
		color: var(--text-light);
	}

	.modal-close:hover,
	.modal-close:focus {
		background: rgba(255, 255, 255, 0.24);
		border-color: rgba(255, 255, 255, 0.35);
	}

	.modal-body {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.setting-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.setting-title {
		display: block;
		font-weight: 600;
	}

	.setting-title-inline {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.setting-info-icon :global(.tooltip-trigger) {
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
	}

	.setting-select {
		min-width: 175px;
		padding: 0.35rem 0.45rem;
		border-radius: 8px;
		border: 1px solid var(--panel-border);
		background: var(--white);
		color: var(--text-dark);
		font-size: 0.9rem;
	}

	.setting-copy {
		display: block;
		font-size: 0.9rem;
		color: hsl(210, 14%, 38%);
	}

	.switch {
		position: relative;
		display: inline-flex;
		width: 42px;
		height: 24px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		inset: 0;
		background-color: hsl(210, 20%, 90%);
		border-radius: 999px;
		transition: background-color 0.2s ease;
		border: 1px solid var(--panel-border);
	}

	.slider::before {
		content: "";
		position: absolute;
		height: 18px;
		width: 18px;
		left: 3px;
		top: 50%;
		transform: translateY(-50%);
		background-color: var(--white);
		border-radius: 50%;
		transition: transform 0.2s ease;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
	}

	.switch input:checked + .slider {
		background-color: var(--primary);
	}

	.switch input:checked + .slider::before {
		transform: translate(18px, -50%);
	}
</style>
