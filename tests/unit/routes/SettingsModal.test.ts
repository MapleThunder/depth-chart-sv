import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";
import { get } from "svelte/store";
import SettingsModal from "../../../src/routes/SettingsModal.svelte";
import { settings } from "$lib/stores/settings_store";

describe("SettingsModal", () => {
	beforeEach(() => {
		settings.set({
			show_skill_gradient: true,
			show_secondary_positions: false,
			player_sort_mode: "default",
		});
	});

	it("shows sort mode select and its helper tooltip copy", () => {
		render(SettingsModal, { open: true });

		expect(screen.getByLabelText("Sort Mode")).toBeTruthy();
		expect(screen.getByText(/Default keeps players grouped by role/)).toBeTruthy();
	});

	it("updates sort mode in settings when the select changes", async () => {
		render(SettingsModal, { open: true });
		const select = screen.getByLabelText("Sort Mode") as HTMLSelectElement;

		await userEvent.selectOptions(select, "custom");

		expect(get(settings).player_sort_mode).toBe("custom");
	});
});
