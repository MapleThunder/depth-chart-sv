// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { get } from "svelte/store";
import FormationSelect from "../../../src/routes/FormationSelect.svelte";
import { Formation, formation } from "$lib/stores/formation_store";

describe("FormationSelect", () => {
	beforeEach(() => {
		formation.set(Formation.FourFourTwo);
	});

	it("renders available formations and updates the selected store value", async () => {
		render(FormationSelect);

		const select = screen.getByLabelText("Formation Selection");
		expect(select).toBeTruthy();
		expect((select as HTMLSelectElement).value).toBe(Formation.FourFourTwo);

		await fireEvent.change(select, {
			target: { value: Formation.FourThreeThree },
		});

		expect(get(formation)).toBe(Formation.FourThreeThree);
	});
});
