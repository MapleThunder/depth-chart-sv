// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { get } from "svelte/store";
import { render, screen } from "@testing-library/svelte";
import ClearAllButton from "../../../src/routes/ClearAllButton.svelte";
import { Position } from "$lib/positions";
import { addPlayer, players } from "$lib/stores/player_store";

describe("ClearAllButton", () => {
	beforeEach(() => {
		players.set([]);
		vi.unstubAllGlobals();
	});

	it("clears players when confirmation succeeds", async () => {
		addPlayer({
			name: "Alex",
			positions: [{ position: Position.CentreMid, weight: 0 }],
		});
		vi.stubGlobal("confirm", vi.fn(() => true));

		render(ClearAllButton);
		await userEvent.click(screen.getByRole("button", { name: "Clear All Players" }));

		expect(get(players)).toHaveLength(0);
	});

	it("keeps players when confirmation is cancelled", async () => {
		addPlayer({
			name: "Alex",
			positions: [{ position: Position.CentreMid, weight: 0 }],
		});
		vi.stubGlobal("confirm", vi.fn(() => false));

		render(ClearAllButton);
		await userEvent.click(screen.getByRole("button", { name: "Clear All Players" }));

		expect(get(players)).toHaveLength(1);
	});
});
