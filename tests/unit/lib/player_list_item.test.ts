import { describe, expect, it } from "vitest";
import { Position } from "$lib/positions";
import type { PlayerRecord } from "$lib/stores/player_store";
import {
	comparePlayersForPosition,
	getSkillForPosition,
	isSecondaryForPosition,
} from "$lib/player_list_item";

function player(
	name: string,
	role: "primary" | "secondary",
	weight: number,
	skill?: "low" | "mid" | "high",
): PlayerRecord {
	return {
		name,
		positions: [{ position: Position.CentreMid, role, weight, skill }],
	};
}

describe("player_list_item", () => {
	it("detects secondary role for a list position", () => {
		expect(isSecondaryForPosition(player("A", "secondary", 1), Position.CentreMid)).toBe(true);
		expect(isSecondaryForPosition(player("B", "primary", 1), Position.CentreMid)).toBe(false);
	});

	it("uses configured skill for primary role with high fallback", () => {
		expect(getSkillForPosition(player("A", "primary", 1, "low"), Position.CentreMid)).toBe("low");
		expect(getSkillForPosition(player("B", "primary", 1), Position.CentreMid)).toBe("high");
	});

	it("uses configured skill for secondary role with mid fallback", () => {
		expect(getSkillForPosition(player("A", "secondary", 1, "low"), Position.CentreMid)).toBe("low");
		expect(getSkillForPosition(player("B", "secondary", 1, "high"), Position.CentreMid)).toBe("high");
		expect(getSkillForPosition(player("C", "secondary", 1), Position.CentreMid)).toBe("mid");
	});

	it("sorts by skill before role", () => {
		const primary_mid = player("A", "primary", 99, "mid");
		const secondary_high = player("B", "secondary", 0, "high");
		expect(comparePlayersForPosition(primary_mid, secondary_high, Position.CentreMid)).toBeGreaterThan(0);
		expect(comparePlayersForPosition(secondary_high, primary_mid, Position.CentreMid)).toBeLessThan(0);
	});

	it("sorts primary entries above secondary entries when skills tie", () => {
		const primary = player("A", "primary", 99, "mid");
		const secondary = player("B", "secondary", 0, "mid");
		expect(comparePlayersForPosition(primary, secondary, Position.CentreMid)).toBeLessThan(0);
		expect(comparePlayersForPosition(secondary, primary, Position.CentreMid)).toBeGreaterThan(0);
	});

	it("sorts by weight within the same role and skill group", () => {
		const a = player("A", "secondary", 1);
		const b = player("B", "secondary", 3);
		expect(comparePlayersForPosition(a, b, Position.CentreMid)).toBeLessThan(0);
		expect(comparePlayersForPosition(b, a, Position.CentreMid)).toBeGreaterThan(0);
	});

	it("sorts by name when role, skill, and weight are equal", () => {
		const a = player("Alex", "secondary", 1, "mid");
		const b = player("Blair", "secondary", 1, "mid");
		expect(comparePlayersForPosition(a, b, Position.CentreMid)).toBeLessThan(0);
		expect(comparePlayersForPosition(b, a, Position.CentreMid)).toBeGreaterThan(0);
	});
});
