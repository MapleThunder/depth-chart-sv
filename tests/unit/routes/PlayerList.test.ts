import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/svelte";
import PlayerList from "../../../src/routes/PlayerList.svelte";
import { Position } from "$lib/positions";
import { Formation, formation } from "$lib/stores/formation_store";
import { players } from "$lib/stores/player_store";
import { settings } from "$lib/stores/settings_store";

describe("PlayerList", () => {
	beforeEach(() => {
		localStorage.clear();
		formation.set(Formation.FourFourTwo);
		players.set([]);
		settings.set({
			show_skill_gradient: true,
			show_secondary_positions: true,
			player_sort_mode: "custom",
		});
	});

	it("lets a secondary-position player move above primary-position players in custom sort mode", async () => {
		players.set([
			{
				name: "Primary CM",
				positions: [{ position: Position.CentreMid, weight: 0, role: "primary" }],
			},
			{
				name: "Secondary CM",
				positions: [
					{ position: Position.Striker, weight: 0, role: "primary" },
					{ position: Position.CentreMid, weight: 1, role: "secondary", skill: "mid" },
				],
			},
		]);

		const { container } = render(PlayerList, {
			position: Position.CentreMid,
			removesItems: false,
			show_secondary_positions: true,
		});

		const getOrder = (): string[] =>
			Array.from(container.querySelectorAll("section.list [role='listitem'] .player-name")).map(
				(node) => node.textContent?.trim() ?? "",
			);

		expect(getOrder()).toEqual(["Primary CM", "Secondary CM"]);

		await userEvent.click(screen.getByRole("button", { name: "Move Secondary CM up" }));

		await waitFor(() => {
			expect(getOrder()).toEqual(["Secondary CM", "Primary CM"]);
		});

		const rows = container.querySelectorAll("section.list [role='listitem']");
		expect(within(rows[0] as HTMLElement).getByText("Primary: ST")).toBeTruthy();
		expect(within(rows[0] as HTMLElement).getByText("2nd")).toBeTruthy();
		expect(within(rows[1] as HTMLElement).queryByText(/Primary:/)).toBeNull();
	});
});
