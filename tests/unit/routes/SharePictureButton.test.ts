import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";

const { html2canvasMock } = vi.hoisted(() => ({
	html2canvasMock: vi.fn(),
}));

vi.mock("html2canvas", () => ({
	default: html2canvasMock,
}));

import SharePictureButton from "../../../src/routes/SharePictureButton.svelte";

describe("SharePictureButton", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		html2canvasMock.mockReset();
	});

	it("captures the position boxes and triggers a png download", async () => {
		const boxes = document.createElement("div");
		boxes.id = "position-boxes";
		document.body.appendChild(boxes);

		const clickSpy = vi.fn();
		const originalCreateElement = document.createElement.bind(document);
		const createElementSpy = vi.spyOn(document, "createElement");
		createElementSpy.mockImplementation(((tagName: string) => {
			if (tagName === "a") {
				return {
					href: "",
					download: "",
					click: clickSpy,
				} as unknown as HTMLAnchorElement;
			}
			return originalCreateElement(tagName);
		}) as typeof document.createElement);

		html2canvasMock.mockResolvedValue({
			toDataURL: () => "data:image/png;base64,abc123",
		});

		render(SharePictureButton);
		await userEvent.click(screen.getByRole("button", { name: /share image/i }));

		expect(html2canvasMock).toHaveBeenCalledWith(
			boxes,
			expect.objectContaining({ backgroundColor: "hsl(132, 96%, 31%)" }),
		);
		expect(clickSpy).toHaveBeenCalledOnce();

		createElementSpy.mockRestore();
	});
});
