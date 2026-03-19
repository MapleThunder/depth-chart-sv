import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/svelte";
import Page from "../../../src/routes/+page.svelte";
import { Position } from "$lib/positions";
import { Formation, formation } from "$lib/stores/formation_store";
import { players } from "$lib/stores/player_store";
import { settings } from "$lib/stores/settings_store";

describe("+page", () => {
	beforeEach(() => {
		localStorage.clear();
		players.set([]);
		formation.set(Formation.FourFourTwo);
		settings.set({
			show_skill_gradient: true,
			show_secondary_positions: false,
			player_sort_mode: "default",
		});
	});

	it("shows and hides the unassigned panel when formation changes visibility", async () => {
		players.set([
			{
				name: "Wingback Player",
				positions: [{ position: Position.LeftWingback, weight: 0, role: "primary" }],
			},
		]);

		render(Page);

		expect(screen.getByText("Not Shown In This Formation")).toBeTruthy();
		expect(screen.getByText("Wingback Player")).toBeTruthy();

		formation.set(Formation.FiveThreeTwo);

		await waitFor(() => {
			expect(screen.queryByText("Not Shown In This Formation")).toBeNull();
		});
	});

	it("shows secondary assignments in extra lists when toggle is enabled", async () => {
		players.set([
			{
				name: "Dual Role Player",
				positions: [
					{ position: Position.Striker, weight: 0, role: "primary" },
					{ position: Position.CentreMid, weight: 1, role: "secondary", skill: "mid" },
				],
			},
		]);

		render(Page);

		expect(screen.getAllByText("Dual Role Player")).toHaveLength(1);

		settings.update((current) => ({ ...current, show_secondary_positions: true }));

		await waitFor(() => {
			expect(screen.getAllByText("Dual Role Player")).toHaveLength(2);
		});
	});
});
