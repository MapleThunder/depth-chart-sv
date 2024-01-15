<script lang="ts">
	import { type Position } from "$lib/positions";
	import { players, removePlayer, updatePlayers } from "$lib/stores/player_store";
	import { flip } from "svelte/animate";

	export let position: Position;
	export let removesItems = false;

	$: filtered_players = $players
		.filter((plyr) => plyr.positions.filter((pos) => pos.position === position).length > 0)
		.toSorted((a, b) => {
			// Find the target position in player a
			const positionA = a.positions.find((p) => p.position === position);
			const weightA = positionA ? positionA.weight : Number.MAX_VALUE; // Fallback if position not found

			// Find the target position in player b
			const positionB = b.positions.find((p) => p.position === position);
			const weightB = positionB ? positionB.weight : Number.MAX_VALUE; // Fallback if position not found

			// Compare the weights
			return weightA - weightB;
		});

	let ghost: Element;
	let grabbed: HTMLElement | null;

	let lastTarget: any;

	let mouseY = 0; // pointer y coordinate within client
	let offsetY = 0; // y distance from top of grabbed element to pointer
	let layerY = 0; // distance from top of list to top of client

	function grab(clientY: number, element: HTMLElement) {
		// modify grabbed element
		grabbed = element;
		grabbed.dataset.grabY = clientY;

		// modify ghost element (which is actually dragged)
		ghost.innerHTML = grabbed.innerHTML;

		// record offset from cursor to top of element
		// (used for positioning ghost)
		offsetY = grabbed.getBoundingClientRect().y - clientY;
		drag(clientY);
	}

	// drag handler updates cursor position
	function drag(clientY: number) {
		if (grabbed) {
			mouseY = clientY;
			layerY = ghost.parentNode?.getBoundingClientRect().y;
		}
	}

	// touchEnter handler emulates the mouseenter event for touch input
	// (more or less)
	function touchEnter(ev: MouseEvent) {
		drag(ev.clientY);
		// trigger dragEnter the first time the cursor moves over a list item
		let target = document.elementFromPoint(ev.clientX, ev.clientY).closest(".item");
		if (target && target != lastTarget) {
			lastTarget = target;
			dragEnter(ev, target);
		}
	}

	function dragEnter(ev: MouseEvent, target: Element) {
		// swap items in data
		if (grabbed && target != grabbed && target.classList.contains("item")) {
			moveDatum(parseInt(grabbed.dataset.index), parseInt(target.dataset.index));
		}
	}

	// does the actual moving of items in data
	function moveDatum(from: number, to: number) {
		let temp = filtered_players[from];
		filtered_players = [...filtered_players.slice(0, from), ...filtered_players.slice(from + 1)];
		filtered_players = [...filtered_players.slice(0, to), temp, ...filtered_players.slice(to)];

		const updated_player_weights = filtered_players.map((plyr, idx) => {
			const updated_plyr = {
				name: plyr.name,
				positions: plyr.positions.map((pos) => {
					if (pos.position === position) {
						return { position, weight: idx };
					} else {
						return pos;
					}
				}),
			};

			return updated_plyr;
		});

		updatePlayers(updated_player_weights);
	}

	function release(ev: MouseEvent) {
		grabbed = null;
	}

	function removeDatum(index: number) {
		removePlayer({ name: filtered_players[index].name, positions: [{ position, weight: 0 }] });
	}
</script>

<main class="dragdroplist">
	<div
		bind:this={ghost}
		id="ghost"
		class={grabbed ? "item haunting" : "item"}
		style={"top: " + (mouseY + offsetY - layerY) + "px"}
	>
		<p></p>
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<section
		class="list"
		aria-label="Drag zone for the list of players in the {position} position"
		on:mousemove={function (ev) {
			ev.stopPropagation();
			drag(ev.clientY);
		}}
		on:touchmove={function (ev) {
			ev.stopPropagation();
			drag(ev.touches[0].clientY);
		}}
		on:mouseup={function (ev) {
			ev.stopPropagation();
			release(ev);
		}}
		on:touchend={function (ev) {
			ev.stopPropagation();
			release(ev.touches[0]);
		}}
	>
		{#each filtered_players as player, i (player.name ? player.name : JSON.stringify(player))}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<div
				role="listitem"
				id={grabbed && (player.name ? player.name : JSON.stringify(player)) == grabbed.dataset.id
					? "grabbed"
					: ""}
				class="item"
				data-index={i}
				data-id={player.name ? player.name : JSON.stringify(player)}
				data-grabY="0"
				on:mousedown={function (ev) {
					grab(ev.clientY, this);
				}}
				on:touchstart={function (ev) {
					grab(ev.touches[0].clientY, this);
				}}
				on:mouseenter={function (ev) {
					ev.stopPropagation();
					dragEnter(ev, ev.target);
				}}
				on:touchmove={function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					touchEnter(ev.touches[0]);
				}}
				animate:flip={{ duration: 200 }}
			>
				<div class="buttons">
					<button
						class="up"
						style={"visibility: " + (i > 0 ? "" : "hidden") + ";"}
						on:click={function (ev) {
							moveDatum(i, i - 1);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"
							><path d="M0 0h24v24H0V0z" fill="none" /><path
								d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
							/></svg
						>
					</button>
					<button
						class="down"
						style={"visibility: " + (i < filtered_players.length - 1 ? "" : "hidden") + ";"}
						on:click={function (ev) {
							moveDatum(i, i + 1);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"
							><path d="M0 0h24v24H0V0z" fill="none" /><path
								d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
							/></svg
						>
					</button>
				</div>

				<div class="content">
					{player.name}
				</div>

				<div class="buttons delete">
					{#if removesItems}
						<button
							on:click={function (ev) {
								removeDatum(i);
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16"
								><path d="M0 0h24v24H0z" fill="none" /><path
									d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
								/></svg
							>
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</section>
</main>

<style>
	main {
		position: relative;
	}

	.list {
		cursor: grab;
		z-index: 5;
		display: flex;
		flex-direction: column;
	}

	.item {
		box-sizing: border-box;
		display: inline-flex;
		width: 100%;
		min-height: 2em;
		margin-bottom: 0.1em;
		background-color: white;
		user-select: none;
	}

	.item:last-child {
		margin-bottom: 0;
		border-radius: 0 0 var(--border-radius) var(--border-radius);
	}

	.item:not(#grabbed):not(#ghost) {
		z-index: 10;
	}

	.item > * {
		margin: auto;
	}

	.buttons {
		width: 32px;
		min-width: 32px;
		margin: auto 0;
		display: flex;
		flex-direction: column;
	}

	.buttons button {
		cursor: pointer;
		width: 18px;
		height: 18px;
		margin: 0 auto;
		padding: 0;
		border: 1px solid rgba(0, 0, 0, 0);
		background-color: inherit;
	}

	.buttons button:focus {
		border: 1px solid black;
	}

	.delete {
		width: 32px;
	}

	#grabbed {
		opacity: 0;
	}

	#ghost {
		pointer-events: none;
		z-index: -5;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	#ghost * {
		pointer-events: none;
	}

	#ghost.haunting {
		z-index: 20;
		opacity: 1;
	}

	@media screen and (max-width: 700px) {
		div.content {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
