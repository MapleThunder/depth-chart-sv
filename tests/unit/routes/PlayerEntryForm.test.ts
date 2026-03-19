// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { get } from "svelte/store";
import { render, screen } from "@testing-library/svelte";
import PlayerEntryForm from "../../../src/routes/PlayerEntryForm.svelte";
import { Formation, formation } from "$lib/stores/formation_store";
import { Position } from "$lib/positions";
import { players } from "$lib/stores/player_store";

describe("PlayerEntryForm", () => {
	beforeEach(() => {
		players.set([]);
		formation.set(Formation.FourFourTwo);
		vi.unstubAllGlobals();
	});

	it("adds a player and resets only the name field after submit", async () => {
		render(PlayerEntryForm);

		const nameInput = screen.getByRole("textbox");
		const positionSelect = screen.getByRole("combobox");
		const addButton = screen.getByRole("button", { name: "Add Player" });

		await userEvent.type(nameInput, "Taylor");
		await userEvent.selectOptions(positionSelect, Position.CentreMid);
		await userEvent.click(addButton);

		const values = get(players);
		expect(values).toHaveLength(1);
		expect(values[0].name).toBe("Taylor");
		expect(values[0].positions[0].position).toBe(Position.CentreMid);
		expect((nameInput as HTMLInputElement).value).toBe("");
		expect((positionSelect as HTMLSelectElement).value).toBe(Position.CentreMid);
	});
});
