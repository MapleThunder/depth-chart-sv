import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";
import HowToUseContent from "../../../src/routes/HowToUseContent.svelte";

describe("HowToUseContent", () => {
	it("lets users preview player row cues with interactive controls", async () => {
		render(HowToUseContent);

		const demo_row = screen.getByTestId("row-demo-item");
		const skill_select = screen.getByLabelText("Demo skill level");
		const gradient_toggle = screen.getByLabelText("Show skill gradient");
		const secondary_toggle = screen.getByLabelText("Show secondary pill");

		expect(screen.getByText("Reading Player Rows")).toBeTruthy();
		expect(screen.getByText("2nd")).toBeTruthy();
		expect(demo_row.className.includes("demo-item-has-skill-gradient")).toBe(true);

		await userEvent.selectOptions(skill_select, "high");
		expect(demo_row.getAttribute("style")?.includes("hsl(120 52% 45%)")).toBe(true);
		expect((skill_select as HTMLSelectElement).value).toBe("high");

		await userEvent.click(secondary_toggle);
		expect(screen.queryByText("2nd")).toBeNull();

		await userEvent.click(gradient_toggle);
		expect(demo_row.className.includes("demo-item-has-skill-gradient")).toBe(false);
	});
});
