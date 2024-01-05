<script lang="ts">
	/**
	 * The basis for this component was pulled from this REPL:
	 * https://svelte.dev/repl/2cf25d5fd92b4163a356679c4315d386?version=3.15.0
	 */
	import type { PlayerRecord } from "$lib/stores/player_store";

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
			_el.style.backgroundColor = "#e5e5e5";
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

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</svelte:head>

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
			<!-- TODO: Add drag handle to show users the player names can be dragged -->
			{player.name}
			<!-- TODO: Add an edit button to open an edit modal -->
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
		border: var(--debug-border); /* TODO: Remove debug border*/
		/* border: solid 1px grey; */
		padding: 10px;
		text-align: center;
		padding: 5px 0;
		width: 100%;
	}
</style>
