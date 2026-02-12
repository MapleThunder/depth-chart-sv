import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";
import { get } from "svelte/store";
import PlayerEditModal from "../../../src/routes/PlayerEditModal.svelte";
import { Position } from "$lib/positions";
import { players } from "$lib/stores/player_store";

function seedPlayer(positions: Array<{ position: Position; weight: number; role?: "primary" | "secondary"; skill?: "low" | "mid" | "high" | "medium" }>) {
	players.set([
		{
			name: "Alex",
			positions,
		},
	]);
}

describe("PlayerEditModal", () => {
	beforeEach(() => {
		players.set([]);
	});

	it("adds a secondary position and saves it with a default mid skill", async () => {
		seedPlayer([{ position: Position.CentreMid, weight: 2, role: "primary" }]);

		render(PlayerEditModal, { open: true, playerName: "Alex" });
		await userEvent.click(screen.getByRole("button", { name: "+ Add" }));
		await userEvent.click(screen.getByRole("button", { name: "Save" }));

		const [alex] = get(players);
		expect(alex.positions).toHaveLength(2);
		const secondary = alex.positions.find((pos) => pos.role === "secondary");
		expect(secondary).toBeTruthy();
		expect(secondary?.skill).toBe("mid");
	});

	it("removes an existing secondary position when requested", async () => {
		seedPlayer([
			{ position: Position.CentreMid, weight: 2, role: "primary" },
			{ position: Position.Striker, weight: 3, role: "secondary", skill: "low" },
		]);

		render(PlayerEditModal, { open: true, playerName: "Alex" });
		await userEvent.click(screen.getByRole("button", { name: "Remove ST secondary position" }));
		await userEvent.click(screen.getByRole("button", { name: "Save" }));

		const [alex] = get(players);
		expect(alex.positions).toHaveLength(1);
		expect(alex.positions[0].position).toBe(Position.CentreMid);
		expect(alex.positions[0].role).toBe("primary");
	});

	it("updates the primary position skill", async () => {
		seedPlayer([{ position: Position.CentreMid, weight: 2, role: "primary", skill: "high" }]);

		render(PlayerEditModal, { open: true, playerName: "Alex" });
		await userEvent.selectOptions(screen.getByRole("combobox", { name: "Skill" }), "mid");
		await userEvent.click(screen.getByRole("button", { name: "Save" }));

		const [alex] = get(players);
		const primary = alex.positions.find((pos) => pos.role === "primary");
		expect(primary?.skill).toBe("mid");
	});
});
