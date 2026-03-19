<script lang="ts">
	import { onDestroy, tick } from "svelte";

	export let label: string;
	export let tooltip_id: string;
	export let description = "";

	let wrap_el: HTMLSpanElement | null = null;
	let trigger_el: HTMLSpanElement | null = null;
	let bubble_el: HTMLSpanElement | null = null;
	let open = false;
	let placement: "top" | "bottom" = "top";
	let bubble_style = "";
	let has_coarse_pointer = false;
	let media_query: MediaQueryList | null = null;

	const TOOLTIP_GAP_PX = 8;
	const EDGE_GUTTER_PX = 8;

	function setupPointerMode(): void {
		if (typeof window === "undefined" || !window.matchMedia) {
			return;
		}

		media_query = window.matchMedia("(hover: none), (pointer: coarse)");
		has_coarse_pointer = media_query.matches;
		media_query.addEventListener("change", onPointerModeChange);
	}

	function onPointerModeChange(event: MediaQueryListEvent): void {
		has_coarse_pointer = event.matches;
	}

	async function updateTooltipPosition(): Promise<void> {
		if (!open || !trigger_el || !bubble_el || typeof window === "undefined") {
			return;
		}

		await tick();

		const trigger_rect = trigger_el.getBoundingClientRect();
		const bubble_rect = bubble_el.getBoundingClientRect();
		const viewport_width = window.innerWidth;
		const viewport_height = window.innerHeight;
		const max_left = Math.max(EDGE_GUTTER_PX, viewport_width - EDGE_GUTTER_PX - bubble_rect.width);
		const centred_left = trigger_rect.left + trigger_rect.width / 2 - bubble_rect.width / 2;
		const left = Math.min(Math.max(centred_left, EDGE_GUTTER_PX), max_left);
		const top_candidate = trigger_rect.top - TOOLTIP_GAP_PX - bubble_rect.height;
		const bottom_candidate = trigger_rect.bottom + TOOLTIP_GAP_PX;

		placement = top_candidate >= EDGE_GUTTER_PX ? "top" : "bottom";
		let top = placement === "top" ? top_candidate : bottom_candidate;
		top = Math.min(
			Math.max(top, EDGE_GUTTER_PX),
			Math.max(EDGE_GUTTER_PX, viewport_height - EDGE_GUTTER_PX - bubble_rect.height),
		);

		bubble_style = `left: ${Math.round(left)}px; top: ${Math.round(top)}px;`;
	}

	function openTooltip(): void {
		if (open) {
			void updateTooltipPosition();
			return;
		}

		open = true;
		void updateTooltipPosition();
	}

	function closeTooltip(): void {
		open = false;
	}

	function onPointerEnter(): void {
		if (!has_coarse_pointer) {
			openTooltip();
		}
	}

	function onPointerLeave(): void {
		if (!has_coarse_pointer) {
			closeTooltip();
		}
	}

	function onTriggerFocus(): void {
		openTooltip();
	}

	function onTriggerBlur(): void {
		closeTooltip();
	}

	function onTriggerClick(event: MouseEvent): void {
		if (!has_coarse_pointer) {
			return;
		}

		event.preventDefault();
		if (open) {
			closeTooltip();
			return;
		}

		openTooltip();
	}

	function onKeyDown(event: KeyboardEvent): void {
		if (event.key === "Escape") {
			closeTooltip();
		}
	}

	function onGlobalPointerDown(event: PointerEvent): void {
		if (!open) {
			return;
		}

		const target = event.target;
		if (!(target instanceof Node)) {
			closeTooltip();
			return;
		}

		if (wrap_el?.contains(target) || bubble_el?.contains(target)) {
			return;
		}

		closeTooltip();
	}

	function onWindowChange(): void {
		if (!open) {
			return;
		}

		void updateTooltipPosition();
	}

	function portal(node: HTMLElement): { destroy: () => void } {
		if (typeof document === "undefined") {
			return {
				destroy() {},
			};
		}

		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			},
		};
	}

	$: if (typeof window !== "undefined") {
		void updateTooltipPosition();
	}

	if (typeof window !== "undefined") {
		setupPointerMode();
		window.addEventListener("resize", onWindowChange);
		window.addEventListener("scroll", onWindowChange, true);
		window.addEventListener("orientationchange", onWindowChange);
		document.addEventListener("pointerdown", onGlobalPointerDown);
		document.addEventListener("keydown", onKeyDown);
	}

	onDestroy(() => {
		media_query?.removeEventListener("change", onPointerModeChange);
		if (typeof window !== "undefined") {
			window.removeEventListener("resize", onWindowChange);
			window.removeEventListener("scroll", onWindowChange, true);
			window.removeEventListener("orientationchange", onWindowChange);
			document.removeEventListener("pointerdown", onGlobalPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		}
	});
</script>

<span
	class="tooltip-wrap"
	bind:this={wrap_el}
>
	<button
		type="button"
		class="tooltip-trigger"
		aria-describedby={tooltip_id}
		bind:this={trigger_el}
		on:mouseenter={onPointerEnter}
		on:mouseleave={onPointerLeave}
		on:focus={onTriggerFocus}
		on:blur={onTriggerBlur}
		on:click={onTriggerClick}
	>
		{label}
	</button>
	<span
		class="tooltip-bubble"
		class:is-open={open}
		class:is-bottom={placement === "bottom"}
		role="tooltip"
		id={tooltip_id}
		bind:this={bubble_el}
		style={bubble_style}
		use:portal
	>
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
		padding: 0;
		border: none;
		background: transparent;
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
		position: fixed;
		transform: translateY(6px);
		max-width: min(22rem, calc(100vw - 1rem - env(safe-area-inset-left) - env(safe-area-inset-right)));
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
		overflow-wrap: break-word;
	}

	.tooltip-bubble.is-open {
		opacity: 1;
		transform: translateY(0);
	}

	.tooltip-bubble.is-open.is-bottom {
		transform: translateY(0);
	}

	@media (pointer: coarse) {
		.tooltip-trigger {
			cursor: pointer;
		}
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
