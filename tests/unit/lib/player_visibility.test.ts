import { describe, expect, it } from "vitest";
import { getVisibleAssignedPosition } from "$lib/player_visibility";
import { Position } from "$lib/positions";
import type { PlayerRecord } from "$lib/stores/player_store";

function makePlayer(positions: PlayerRecord["positions"]): PlayerRecord {
	return { name: "Player", positions };
}

describe("player_visibility", () => {
	it("prefers primary position when it is visible", () => {
		const player = makePlayer([
			{ position: Position.CentreMid, weight: 1, role: "primary" },
			{ position: Position.RightWing, weight: 2, role: "secondary", skill: "high" },
		]);

		const visible = new Set([Position.CentreMid, Position.RightWing]);
		expect(getVisibleAssignedPosition(player, visible)).toBe(Position.CentreMid);
	});

	it("falls back to the highest-skill visible secondary", () => {
		const player = makePlayer([
			{ position: Position.CentreMid, weight: 1, role: "primary" },
			{ position: Position.RightWing, weight: 2, role: "secondary", skill: "low" },
			{ position: Position.Striker, weight: 3, role: "secondary", skill: "high" },
		]);

		const visible = new Set([Position.RightWing, Position.Striker]);
		expect(getVisibleAssignedPosition(player, visible)).toBe(Position.Striker);
	});

	it("uses the first position when no explicit primary role exists", () => {
		const player = makePlayer([
			{ position: Position.LeftMid, weight: 1 },
			{ position: Position.RightMid, weight: 2, role: "secondary", skill: "high" },
		]);

		const visible = new Set([Position.LeftMid, Position.RightMid]);
		expect(getVisibleAssignedPosition(player, visible)).toBe(Position.LeftMid);
	});

	it("returns undefined when no positions are visible", () => {
		const player = makePlayer([
			{ position: Position.LeftMid, weight: 1, role: "primary" },
			{ position: Position.RightMid, weight: 2, role: "secondary", skill: "high" },
		]);

		const visible = new Set([Position.GoalKeeper]);
		expect(getVisibleAssignedPosition(player, visible)).toBeUndefined();
	});
});
