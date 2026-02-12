import { beforeEach, describe, expect, it, vi } from "vitest";
import { get } from "svelte/store";
import { Position } from "$lib/positions";
import {
	addPlayer,
	players,
	removePlayer,
	resetPlayers,
	updatePlayer,
	updatePlayers,
} from "$lib/stores/player_store";

describe("player_store", () => {
	beforeEach(() => {
		players.set([]);
		vi.unstubAllGlobals();
	});

	it("normalizes added players with a primary role and normalized skill names", () => {
		addPlayer({
			name: "Alex",
			positions: [
				{ position: Position.CentreMid, weight: 4, skill: "medium" },
				{ position: Position.Striker, weight: 7, role: "secondary" },
			],
		});

		const [alex] = get(players);
		expect(alex.positions[0].role).toBe("primary");
		expect(alex.positions[0].skill).toBe("mid");
		expect(alex.positions[1].role).toBe("secondary");
		expect(alex.positions[1].skill).toBe("mid");
	});

	it("defaults missing primary skill to high", () => {
		addPlayer({
			name: "Taylor",
			positions: [
				{ position: Position.LeftFullback, weight: 0, role: "primary" },
				{ position: Position.CentreBack, weight: 1, role: "secondary", skill: "low" },
			],
		});

		const [taylor] = get(players);
		const primary = taylor.positions.find((pos) => pos.role === "primary");
		expect(primary?.skill).toBe("high");
	});

	it("merges new positions for an existing player without duplicates", () => {
		addPlayer({
			name: "Alex",
			positions: [{ position: Position.CentreMid, weight: 2, role: "primary" }],
		});
		addPlayer({
			name: "Alex",
			positions: [
				{ position: Position.CentreMid, weight: 9, role: "secondary" },
				{ position: Position.RightWing, weight: 3, role: "secondary" },
			],
		});

		const [alex] = get(players);
		const positions = alex.positions.map((pos) => pos.position);
		expect(positions).toContain(Position.CentreMid);
		expect(positions).toContain(Position.RightWing);
		expect(positions.filter((pos) => pos === Position.CentreMid)).toHaveLength(1);
	});

	it("updates an existing player and ignores updates to unknown players", () => {
		addPlayer({
			name: "Alex",
			positions: [{ position: Position.CentreMid, weight: 2, role: "primary" }],
		});

		updatePlayer({
			name: "Alex",
			positions: [
				{ position: Position.RightWing, weight: 1, role: "primary" },
				{ position: Position.Striker, weight: 2, role: "secondary", skill: "high" },
			],
		});
		updatePlayer({
			name: "Missing",
			positions: [{ position: Position.GoalKeeper, weight: 1 }],
		});

		const values = get(players);
		expect(values).toHaveLength(1);
		expect(values[0].positions.map((pos) => pos.position)).toEqual([
			Position.RightWing,
			Position.Striker,
		]);
	});

	it("removes only selected positions and removes the player when no positions remain", () => {
		addPlayer({
			name: "Alex",
			positions: [
				{ position: Position.CentreMid, weight: 2, role: "primary" },
				{ position: Position.Striker, weight: 5, role: "secondary" },
			],
		});

		removePlayer({
			name: "Alex",
			positions: [{ position: Position.CentreMid, weight: 0 }],
		});

		let values = get(players);
		expect(values).toHaveLength(1);
		expect(values[0].positions).toHaveLength(1);
		expect(values[0].positions[0].position).toBe(Position.Striker);
		expect(values[0].positions[0].role).toBe("primary");

		removePlayer({
			name: "Alex",
			positions: [{ position: Position.Striker, weight: 0 }],
		});

		values = get(players);
		expect(values).toHaveLength(0);
	});

	it("updates player weights for drag-and-drop reorder updates", () => {
		addPlayer({
			name: "Alex",
			positions: [
				{ position: Position.CentreMid, weight: 9, role: "primary" },
				{ position: Position.Striker, weight: 3, role: "secondary" },
			],
		});
		addPlayer({
			name: "Blair",
			positions: [{ position: Position.CentreMid, weight: 8, role: "primary" }],
		});

		updatePlayers([
			{ name: "Alex", positions: [{ position: Position.CentreMid, weight: 0 }] },
			{ name: "Blair", positions: [{ position: Position.CentreMid, weight: 1 }] },
		]);

		const values = get(players);
		const alex = values.find((player) => player.name === "Alex");
		const blair = values.find((player) => player.name === "Blair");

		expect(alex?.positions.find((pos) => pos.position === Position.CentreMid)?.weight).toBe(0);
		expect(alex?.positions.find((pos) => pos.position === Position.Striker)?.weight).toBe(3);
		expect(blair?.positions.find((pos) => pos.position === Position.CentreMid)?.weight).toBe(1);
	});

	it("resets all players only when confirmation succeeds", () => {
		addPlayer({
			name: "Alex",
			positions: [{ position: Position.CentreMid, weight: 2, role: "primary" }],
		});

		vi.stubGlobal("confirm", vi.fn(() => false));
		resetPlayers();
		expect(get(players)).toHaveLength(1);

		vi.stubGlobal("confirm", vi.fn(() => true));
		resetPlayers();
		expect(get(players)).toHaveLength(0);
	});
});
