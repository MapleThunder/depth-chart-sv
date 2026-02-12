<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy } from "svelte";
	import { createEventDispatcher } from "svelte";
	import HowToUseContent from "./HowToUseContent.svelte";

	export let open = false;

	const dispatch = createEventDispatcher<{ close: void }>();

	function close(): void {
		dispatch("close");
	}

	let previous_body_overflow = "";
	let body_scroll_locked = false;

	$: if (browser) {
		if (open && !body_scroll_locked) {
			previous_body_overflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			body_scroll_locked = true;
		} else if (!open && body_scroll_locked) {
			document.body.style.overflow = previous_body_overflow;
			body_scroll_locked = false;
		}
	}

	onDestroy(() => {
		if (!browser) {
			return;
		}
		if (!body_scroll_locked) {
			return;
		}
		document.body.style.overflow = previous_body_overflow;
	});
</script>

{#if open}
	<div
		class="modal-backdrop"
		role="button"
		tabindex="0"
		aria-label="Close how to use modal"
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
			aria-label="How to use"
			tabindex="-1"
			on:click|stopPropagation
			on:keydown|stopPropagation={() => {}}
		>
			<header class="modal-header">
				<h2>How to Use</h2>
				<button class="modal-close" aria-label="Close how to use modal" on:click={close}>×</button>
			</header>
			<div class="modal-body">
				<HowToUseContent />
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 1001;
		background: rgba(10, 12, 16, 0.55);
		display: grid;
		place-items: center;
		padding: 1rem;
		overflow: hidden;
	}

	.modal {
		width: min(920px, 100%);
		max-height: 90vh;
		display: flex;
		flex-direction: column;
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
		padding: 1rem 1rem 1.4rem;
		overflow: auto;
		min-height: 0;
		display: flex;
		justify-content: center;
	}

	@media screen and (max-width: 900px) {
		.modal-backdrop {
			padding: 0.6rem;
		}

		.modal-body {
			padding: 0.7rem 0.7rem 1rem;
		}
	}

	@media screen and (max-width: 560px) {
		.modal-header {
			padding: 0.75rem 0.8rem;
		}

		.modal-body {
			padding: 0.55rem 0.55rem 0.85rem;
		}
	}
</style>
