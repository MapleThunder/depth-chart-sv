import { describe, expect, it } from "vitest";
import { get } from "svelte/store";
import { Formation, formation, getFormationSelectOptions } from "$lib/stores/formation_store";

describe("formation_store", () => {
	it("initializes with 4-4-2 by default", () => {
		expect(get(formation)).toBe(Formation.FourFourTwo);
	});

	it("allows changing the selected formation", () => {
		formation.set(Formation.FiveThreeTwo);
		expect(get(formation)).toBe(Formation.FiveThreeTwo);

		formation.set(Formation.FourFourTwo);
	});

	it("returns select options for each formation enum value", () => {
		const options = getFormationSelectOptions();
		const optionValues = options.map((option) => option.value);
		const enumValues = Object.values(Formation);

		expect(optionValues).toHaveLength(enumValues.length);
		for (const value of enumValues) {
			expect(optionValues).toContain(value);
		}
	});
});
