<script lang="ts">
	export let label: string;
	export let tooltip_id: string;
	export let description = "";
</script>

<span class="tooltip-wrap">
	<span class="tooltip-trigger" tabindex="0" aria-describedby={tooltip_id}>{label}</span>
	<span class="tooltip-bubble" role="tooltip" id={tooltip_id}>
		<slot>{description}</slot>
	</span>
</span>

<style>
	.tooltip-wrap {
		position: relative;
		display: inline-flex;
	}

	.tooltip-trigger {
		display: inline;
		color: color-mix(in srgb, var(--text-dark) 86%, var(--primary));
		font-weight: 500;
		text-decoration-line: underline;
		text-decoration-style: solid;
		text-decoration-color: color-mix(in srgb, var(--primary) 40%, transparent);
		text-underline-offset: 2px;
		text-decoration-thickness: 1px;
		transition:
			color 0.15s ease,
			text-decoration-color 0.15s ease,
			text-decoration-thickness 0.15s ease;
	}

	.tooltip-wrap:hover .tooltip-trigger,
	.tooltip-wrap:focus-within .tooltip-trigger {
		color: color-mix(in srgb, var(--primary) 88%, #000 12%);
		text-decoration-color: color-mix(in srgb, var(--accent) 65%, var(--primary));
		text-decoration-thickness: 2px;
		cursor: help;
	}

	.tooltip-trigger:focus {
		outline: 2px solid hsl(210, 30%, 80%);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.tooltip-bubble {
		position: absolute;
		left: 50%;
		bottom: calc(100% + 0.45rem);
		transform: translate(-50%, 6px);
		width: min(22rem, 85vw);
		padding: 0.6rem 0.7rem;
		border-radius: 10px;
		border: var(--border);
		background: linear-gradient(160deg, hsl(0, 0%, 100%), hsl(210, 18%, 97%));
		color: var(--text-dark);
		font-size: 0.82rem;
		line-height: 1.3;
		box-shadow: var(--panel-shadow-soft);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s ease, transform 0.15s ease;
		z-index: 1105;
	}

	.tooltip-wrap:hover .tooltip-bubble,
	.tooltip-wrap:focus-within .tooltip-bubble {
		opacity: 1;
		transform: translate(-50%, 0);
	}

	:global(.tooltip-skill-high) {
		color: hsl(120 52% 45%);
		font-weight: 700;
	}

	:global(.tooltip-skill-mid) {
		color: hsl(46 92% 54%);
		font-weight: 700;
	}

	:global(.tooltip-skill-low) {
		color: hsl(8 78% 56%);
		font-weight: 700;
	}
</style>
