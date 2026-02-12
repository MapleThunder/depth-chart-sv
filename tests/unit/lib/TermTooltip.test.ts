import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/svelte";
import TermTooltip from "../../../src/lib/TermTooltip.svelte";

describe("TermTooltip", () => {
	it("portals the tooltip to document.body and toggles on hover", async () => {
		render(TermTooltip, {
			label: "i",
			tooltip_id: "tooltip-test",
			description: "Tooltip copy",
		});

		const trigger = screen.getByText("i");
		const tooltip = screen.getByRole("tooltip");

		expect(tooltip.parentElement).toBe(document.body);
		expect(tooltip.className.includes("is-open")).toBe(false);

		await fireEvent.mouseEnter(trigger);
		expect(tooltip.className.includes("is-open")).toBe(true);

		await fireEvent.mouseLeave(trigger);
		expect(tooltip.className.includes("is-open")).toBe(false);
	});

	it("supports tap toggling on coarse pointers", async () => {
		const original_match_media = window.matchMedia;
		window.matchMedia = vi.fn().mockReturnValue({
			matches: true,
			media: "(hover: none), (pointer: coarse)",
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		});

		render(TermTooltip, {
			label: "i",
			tooltip_id: "tooltip-tap-test",
			description: "Tooltip copy",
		});

		const trigger = screen.getByText("i");
		const tooltip = screen.getByRole("tooltip");

		await fireEvent.click(trigger);
		expect(tooltip.className.includes("is-open")).toBe(true);

		await fireEvent.click(trigger);
		expect(tooltip.className.includes("is-open")).toBe(false);

		window.matchMedia = original_match_media;
	});
});
