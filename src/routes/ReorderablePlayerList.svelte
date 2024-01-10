<script lang="ts">
	/**
	 * The basis for this component was pulled from this REPL:
	 * https://svelte.dev/repl/2cf25d5fd92b4163a356679c4315d386?version=3.15.0
	 */
	import Icon from "@iconify/svelte";
	import { removePlayer, type PlayerRecord } from "$lib/stores/player_store";

	export let list: PlayerRecord[];
	let _el: HTMLElement;
	let defaultBackgroundColour: string;

	function isBefore(el1: Node, el2: Node) {
		if (el2.parentNode === el1.parentNode)
			for (let cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
				if (cur === el2) return true;
		return false;
	}

	function dragStart(e: DragEvent) {
		console.log("dragStart()");
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/plain", "");
			if (e.target && e.target instanceof HTMLElement) {
				_el = e.target;
				defaultBackgroundColour = _el.style.backgroundColor;
				_el.style.backgroundColor = "var(--drag-highlight)";
			}
		}
	}

	function dragOver(e: DragEvent) {
		console.log("dragOver()");
		if (!e.target || !(e.target instanceof HTMLElement)) {
			return;
		}

		if (isBefore(_el, e.target)) {
			e.target.parentNode?.insertBefore(_el, e.target);
		} else {
			e.target.parentNode?.insertBefore(_el, e.target.nextSibling);
		}
	}

	function dragEnd(e: DragEvent) {
		console.log("dragEnd()");
		_el.style.backgroundColor = defaultBackgroundColour;
	}

	function touchStart(e: TouchEvent) {
		console.log("touchStart()");
		e.preventDefault();

		if (e.touches.length == 1 && e.targetTouches[0].target instanceof HTMLElement) {
			_el = e.targetTouches[0].target;
			defaultBackgroundColour = _el.style.backgroundColor;
			_el.style.backgroundColor = "var(--drag-highlight)";
		}
	}

	function touchMove(e: TouchEvent) {
		console.log("touchMove()");
		e.preventDefault();

		if (!e.target || !(e.target instanceof Node)) {
			return;
		}

		if (isBefore(_el, e.target)) {
			e.target.parentNode?.insertBefore(_el, e.target);
		} else {
			e.target.parentNode?.insertBefore(_el, e.target.nextSibling);
		}
	}

	function touchEnd(e: TouchEvent) {
		console.log("touchEnd()");
		_el.style.backgroundColor = defaultBackgroundColour;
	}
</script>

<ul>
	{#each list as player}
		<li
			draggable="true"
			on:dragstart={dragStart}
			on:dragover={dragOver}
			on:dragend={dragEnd}
			on:touchstart={touchStart}
			on:touchmove={touchMove}
			on:touchend={touchEnd}
		>
			<div class="row">
				<div class="player-name-wrapper">
					<Icon icon="system-uicons:drag" />
					{player.name}
				</div>
				<button
					id="remove-button"
					name="remove-player-button"
					on:click={() => removePlayer({ name: player.name, positions: [] })}
				>
					<Icon icon="material-symbols:close" />
				</button>
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		width: 100%;
		margin: 0;
		padding: 0;
		list-style-type: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	li {
		user-select: none;
		width: 200px;
		border-bottom: solid 1px hsl(0, 1%, 72%);
		padding: 10px;
		text-align: center;
		padding: 5px 0;
		width: 100%;
	}

	div.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 1rem;
	}

	div.player-name-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	button#remove-button {
		border: none;
		background-color: transparent;
		display: flex;
		align-items: center;
	}

	@media screen and (max-width: 700px) {
		div.player-name-wrapper {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		div.row {
			margin: 0 0 0 5px;
		}
	}
</style>
