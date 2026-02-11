<script lang="ts">
	import { getAllPositionSelectOptions, type Position } from "$lib/positions";
	import { players, type PlayerPosition, updatePlayer } from "$lib/stores/player_store";
	import { createEventDispatcher } from "svelte";

	type SkillLevel = "low" | "mid" | "high";

	export let open = false;
	export let playerName = "";

	const dispatch = createEventDispatcher<{ close: void }>();

	let edit_primary_position: Position | undefined;
	let edit_secondary_positions: Position[] = [];
	let edit_secondary_skills: Partial<Record<Position, SkillLevel>> = {};
	let initialized_for_player = "";

	$: all_position_options = getAllPositionSelectOptions();
	$: available_secondary_positions = all_position_options
		.map((option) => option.value)
		.filter((pos) => pos !== edit_primary_position && !edit_secondary_positions.includes(pos));

	$: if (open && playerName && initialized_for_player !== playerName) {
		loadPlayer(playerName);
		initialized_for_player = playerName;
	}

	$: if (!open) {
		initialized_for_player = "";
	}

	$: if (edit_primary_position) {
		edit_secondary_positions = edit_secondary_positions.filter((pos) => pos !== edit_primary_position);
		if (edit_primary_position in edit_secondary_skills) {
			const { [edit_primary_position]: _, ...rest } = edit_secondary_skills;
			edit_secondary_skills = rest;
		}
	}

	function loadPlayer(name: string): void {
		const existing_player = $players.find((player) => player.name === name);
		if (!existing_player) {
			close();
			return;
		}

		const primary_position =
			existing_player.positions.find((pos) => pos.role === "primary") ??
			existing_player.positions[0];
		edit_primary_position = primary_position?.position;
		edit_secondary_positions = existing_player.positions
			.filter((pos) => pos.position !== primary_position?.position)
			.map((pos) => pos.position);
		edit_secondary_skills = existing_player.positions.reduce(
			(acc, pos) => {
				if (pos.position !== primary_position?.position) {
					const skill = pos.skill === "medium" ? "mid" : (pos.skill ?? "mid");
					acc[pos.position] = skill;
				}
				return acc;
			},
			{} as Partial<Record<Position, SkillLevel>>,
		);
	}

	function close(): void {
		dispatch("close");
	}

	function save(): void {
		const existing_player = $players.find((player) => player.name === playerName);
		if (!existing_player || !edit_primary_position) {
			return;
		}

		const positions_to_set = [
			edit_primary_position,
			...edit_secondary_positions.filter((pos) => pos !== edit_primary_position),
		];
		const unique_positions = Array.from(new Set(positions_to_set));

		const updated_positions: PlayerPosition[] = unique_positions.map((pos) => {
			const existing_position = existing_player.positions.find(
				(existing) => existing.position === pos,
			);
			return {
				position: pos,
				weight: existing_position?.weight ?? 9,
				role: pos === edit_primary_position ? "primary" : "secondary",
				skill:
					pos === edit_primary_position
						? existing_position?.skill === "medium"
							? "mid"
							: (existing_position?.skill ?? "mid")
						: (edit_secondary_skills[pos] ??
							(existing_position?.skill === "medium"
								? "mid"
								: (existing_position?.skill ?? "mid"))),
			};
		});

		updatePlayer({
			name: existing_player.name,
			positions: updated_positions,
		});

		close();
	}

	function addSecondaryRow(): void {
		const next_position = available_secondary_positions[0];
		if (!next_position) {
			return;
		}
		edit_secondary_positions = [...edit_secondary_positions, next_position];
		edit_secondary_skills = {
			...edit_secondary_skills,
			[next_position]: edit_secondary_skills[next_position] ?? "mid",
		};
	}

	function removeSecondaryRow(pos: Position): void {
		edit_secondary_positions = edit_secondary_positions.filter((p) => p !== pos);
		const { [pos]: _, ...rest } = edit_secondary_skills;
		edit_secondary_skills = rest;
	}

	function updateSecondaryPosition(index: number, next_position: Position): void {
		const current_position = edit_secondary_positions[index];
		if (!current_position || current_position === next_position) {
			return;
		}
		if (edit_secondary_positions.includes(next_position)) {
			return;
		}

		const updated_positions = [...edit_secondary_positions];
		updated_positions[index] = next_position;
		edit_secondary_positions = updated_positions;

		const current_skill = edit_secondary_skills[current_position] ?? "mid";
		const { [current_position]: _, ...rest } = edit_secondary_skills;
		edit_secondary_skills = {
			...rest,
			[next_position]: edit_secondary_skills[next_position] ?? current_skill,
		};
	}

	function getSecondaryOptionsForRow(current?: Position) {
		return all_position_options.filter(
			(option) =>
				option.value !== edit_primary_position &&
				(option.value === current || !edit_secondary_positions.includes(option.value)),
		);
	}

	function setSecondarySkill(pos: Position, skill: SkillLevel): void {
		edit_secondary_skills = {
			...edit_secondary_skills,
			[pos]: skill,
		};
	}

	function getSkillColor(skill: SkillLevel): string {
		if (skill === "low") return "hsl(8, 78%, 56%)";
		if (skill === "high") return "hsl(120, 52%, 45%)";
		return "hsl(46, 92%, 54%)";
	}
</script>

{#if open}
	<div
		class="modal-backdrop"
		role="button"
		tabindex="0"
		aria-label="Close edit modal"
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
			tabindex="-1"
			on:click|stopPropagation
			on:keydown|stopPropagation={() => {}}
		>
			<header class="modal-header">
				<h3>Edit {playerName}</h3>
				<button class="modal-close" aria-label="Close" on:click={close}>×</button>
			</header>
			<form class="modal-body" on:submit|preventDefault={save}>
				<label for="edit_primary">Primary Position</label>
				<select name="edit_primary" bind:value={edit_primary_position} disabled={!playerName}>
					<option value="">Select a primary position</option>
					{#each all_position_options as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>

				<div class="secondary-header">
					<span class="secondary-title">Secondary Position(s)</span>
					<button
						type="button"
						class="secondary-add"
						on:click={addSecondaryRow}
						disabled={available_secondary_positions.length === 0}
					>
						+ Add
					</button>
				</div>
				<div class="secondary-grid">
					<div class="secondary-sticky">
						<div class="secondary-row secondary-row-header">
							<span class="secondary-col-label">Position</span>
							<span class="secondary-col-label">Skill</span>
							<span class="secondary-col-label"> </span>
						</div>
						<div class="secondary-legend">
							<span class="legend-item">
								<span class="legend-dot legend-dot--high" aria-hidden="true"></span>
								<span>High</span>
							</span>
							<span class="legend-item">
								<span class="legend-dot legend-dot--mid" aria-hidden="true"></span>
								<span>Mid</span>
							</span>
							<span class="legend-item">
								<span class="legend-dot legend-dot--low" aria-hidden="true"></span>
								<span>Low</span>
							</span>
						</div>
					</div>
					{#each edit_secondary_positions as pos, idx (idx)}
						<div class="secondary-row">
							<select
								class="position-select"
								value={pos}
								on:change={(event) =>
									updateSecondaryPosition(
										idx,
										(event.target as HTMLSelectElement).value as Position,
									)}
							>
								{#each getSecondaryOptionsForRow(pos) as option}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
							<select
								class="skill-select"
								value={edit_secondary_skills[pos] ?? "mid"}
								style={`--skill-color: ${getSkillColor(edit_secondary_skills[pos] ?? "mid")}`}
								on:change={(event) =>
									setSecondarySkill(
										pos,
										(event.target as HTMLSelectElement).value as "low" | "mid" | "high",
									)}
							>
								<option value="high">High</option>
								<option value="mid">Mid</option>
								<option value="low">Low</option>
							</select>
							<button
								type="button"
								class="secondary-remove"
								aria-label="Remove {pos} secondary position"
								on:click={() => removeSecondaryRow(pos)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
									><path d="M0 0h24v24H0z" fill="none" /><path
										d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z"
									/></svg
								>
							</button>
						</div>
					{/each}
				</div>

				<div class="modal-actions">
					<button type="button" class="cancel" on:click={close}>Cancel</button>
					<button type="submit" disabled={!edit_primary_position}>Save</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 12, 16, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		padding: 1rem;
	}

	.modal {
		width: min(420px, 92vw);
		background: var(--paper);
		border: var(--border);
		border-radius: var(--border-radius);
		box-shadow: var(--panel-shadow-soft);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.8rem 1rem 0.4rem;
		border-bottom: var(--border);
	}

	.modal-header h3 {
		margin: 0;
		font-size: 1.05rem;
	}

	.modal-close {
		background: transparent;
		border: 1px solid transparent;
		font-size: 1.3rem;
		line-height: 1;
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		cursor: pointer;
	}

	.modal-body {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 0.9rem 1rem 1rem;
	}

	.modal-body label {
		font-size: 0.9rem;
		color: hsl(210, 15%, 30%);
		font-weight: 600;
	}

	.modal-body select {
		padding: 0.55rem 0.7rem;
		border-radius: 10px;
		border: 1px solid var(--panel-border);
	}

	.secondary-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.6rem;
	}

	.secondary-add {
		background: transparent;
		border: 1px dashed var(--panel-border);
		border-radius: 999px;
		padding: 0.3rem 0.75rem;
		font-weight: 600;
		cursor: pointer;
	}

	.secondary-add:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.secondary-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
		min-height: 120px;
		max-height: 240px;
		overflow: auto;
		border: 1px solid var(--panel-border);
		border-radius: 10px;
		padding: 0 0.7rem 0.5rem;
		background: var(--white);
	}

	.secondary-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto auto;
		align-items: center;
		gap: 0.7rem;
	}

	.secondary-row:not(.secondary-row-header) {
		margin-top: 0.45rem;
	}

	.secondary-sticky {
		position: sticky;
		top: 0;
		z-index: 2;
		background: var(--white);
		padding-top: 0.35rem;
		padding-bottom: 0.45rem;
	}

	.secondary-row-header {
		padding-bottom: 0.2rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: hsl(210, 12%, 40%);
	}

	.secondary-col-label {
		font-weight: 700;
	}

	.secondary-legend {
		display: flex;
		gap: 0.9rem;
		align-items: center;
		font-size: 0.75rem;
		color: hsl(210, 10%, 35%);
	}

	.legend-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
	}

	.legend-dot--high {
		background: hsl(120, 52%, 45%);
	}

	.legend-dot--mid {
		background: hsl(46, 92%, 54%);
	}

	.legend-dot--low {
		background: hsl(8, 78%, 56%);
	}

	.position-select {
		min-width: 0;
	}

	.skill-select {
		appearance: none;
		border-radius: 999px;
		border: 1px solid transparent;
		width: 30px;
		height: 30px;
		padding: 0;
		min-width: 30px;
		background: var(--skill-color);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--skill-color), #000 18%);
		color: transparent;
		text-indent: -999px;
		cursor: pointer;
	}

	.skill-select option {
		background: var(--white);
		color: var(--text-dark);
	}

	.skill-select option:hover,
	.skill-select option:focus,
	.skill-select option:checked {
		background: color-mix(in srgb, var(--skill-color), #fff 70%);
		color: var(--text-dark);
	}

	.skill-select:focus {
		outline: 2px solid color-mix(in srgb, var(--skill-color), #000 35%);
		outline-offset: 2px;
	}

	.secondary-remove {
		background: transparent;
		border: 1px solid transparent;
		border-radius: 8px;
		padding: 0.3rem;
		cursor: pointer;
	}

	.secondary-remove:hover,
	.secondary-remove:focus {
		background: var(--panel);
		border-color: var(--panel-border);
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.6rem;
		margin-top: 0.4rem;
	}

	.modal-actions button {
		background-color: var(--primary);
		color: var(--text-light);
		padding: 0.45rem 0.9rem;
		border-radius: 999px;
		border: 1px solid transparent;
		font-weight: 600;
	}

	.modal-actions .cancel {
		background: transparent;
		color: var(--text-dark);
		border: 1px solid var(--panel-border);
	}

	.modal-actions button:hover,
	.modal-actions button:focus {
		background-color: var(--button-hover-colour);
		color: var(--text-dark);
		border: 1px solid var(--panel-border);
	}
</style>
