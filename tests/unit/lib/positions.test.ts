import { describe, expect, it, vi } from "vitest";
import { Formation } from "$lib/stores/formation_store";
import {
	Position,
	addSpaceToCamelCaseWords,
	getAllPositionSelectOptions,
	getPositionSelectOptions,
	getPositionUILabel,
	getPositionsForFormation,
} from "$lib/positions";

describe("positions", () => {
	it("adds spaces between camel-case words", () => {
		expect(addSpaceToCamelCaseWords("CentreAttackingMid")).toBe("Centre Attacking Mid");
	});

	it("maps position codes to labels", () => {
		expect(getPositionUILabel(Position.CentreAttackingMid)).toBe("Centre Attacking Mid");
	});

	it("returns an empty label and logs for unknown position codes", () => {
		const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		expect(getPositionUILabel("NOT_A_POSITION")).toBe("");
		expect(errorSpy).toHaveBeenCalledOnce();

		errorSpy.mockRestore();
	});

	it("returns expected composition for a known formation", () => {
		const positions = getPositionsForFormation(Formation.FourFourTwo);
		const strikerEntry = positions.find((pos) => pos.position === Position.Striker);
		const keeperEntry = positions.find((pos) => pos.position === Position.GoalKeeper);
		const centreBackEntry = positions.find((pos) => pos.position === Position.Centreback);

		expect(strikerEntry?.amount).toBe(2);
		expect(keeperEntry?.amount).toBe(1);
		expect(centreBackEntry?.amount).toBe(2);
	});

	it("falls back to 4-4-2 for unknown formation strings", () => {
		const positions = getPositionsForFormation("unknown-formation");
		const strikerEntry = positions.find((pos) => pos.position === Position.Striker);
		const leftMidEntry = positions.find((pos) => pos.position === Position.LeftMid);

		expect(strikerEntry?.amount).toBe(2);
		expect(leftMidEntry?.amount).toBe(1);
	});

	it("returns alphabetically sorted formation position options", () => {
		const options = getPositionSelectOptions(Formation.FourFourTwo);
		const labels = options.map((option) => option.label);
		const sorted = [...labels].sort((a, b) => a.localeCompare(b));

		expect(labels).toEqual(sorted);
	});

	it("returns all unique position options sorted by label", () => {
		const options = getAllPositionSelectOptions();
		const labels = options.map((option) => option.label);
		const values = options.map((option) => option.value);
		const uniqueValues = new Set(values);
		const sortedLabels = [...labels].sort((a, b) => a.localeCompare(b));

		expect(uniqueValues.size).toBe(Object.values(Position).length);
		expect(labels).toEqual(sortedLabels);
	});
});
