import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/svelte";
import PositionBox from "../../../src/routes/PositionBox.svelte";
import { Position } from "$lib/positions";
import { Formation, formation } from "$lib/stores/formation_store";
import { players } from "$lib/stores/player_store";

describe("PositionBox", () => {
	beforeEach(() => {
		localStorage.clear();
		players.set([]);
		formation.set(Formation.FourFourTwo);
	});

	it("shows depth-bad when no players are assigned", () => {
		const { container } = render(PositionBox, {
			positionData: { position: Position.CentreMid, amount: 2 },
		});

		const header = container.querySelector(".position-header");
		expect(header?.getAttribute("style")).toContain("var(--depth-bad)");
	});

	it("shows depth-okay when at least one player is assigned", () => {
		players.set([
			{
				name: "Alex",
				positions: [{ position: Position.CentreMid, weight: 0, role: "primary" }],
			},
		]);

		const { container } = render(PositionBox, {
			positionData: { position: Position.CentreMid, amount: 2 },
		});

		const header = container.querySelector(".position-header");
		expect(header?.getAttribute("style")).toContain("var(--depth-okay)");
	});

	it("shows depth-good when assigned player count reaches double the amount", () => {
		players.set([
			{
				name: "A",
				positions: [{ position: Position.CentreMid, weight: 0, role: "primary" }],
			},
			{
				name: "B",
				positions: [{ position: Position.CentreMid, weight: 1, role: "primary" }],
			},
			{
				name: "C",
				positions: [{ position: Position.CentreMid, weight: 2, role: "primary" }],
			},
			{
				name: "D",
				positions: [{ position: Position.CentreMid, weight: 3, role: "primary" }],
			},
		]);

		const { container } = render(PositionBox, {
			positionData: { position: Position.CentreMid, amount: 2 },
		});

		const header = container.querySelector(".position-header");
		expect(header?.getAttribute("style")).toContain("var(--depth-good)");
	});

	it("maps wingback and CDM positions to the expected grid areas", () => {
		const { container: leftWingback } = render(PositionBox, {
			positionData: { position: Position.LeftWingback, amount: 1 },
		});
		const { container: cdm } = render(PositionBox, {
			positionData: { position: Position.CentreDefensiveMid, amount: 1 },
		});
		const { container: rightWingback } = render(PositionBox, {
			positionData: { position: Position.RightWingback, amount: 1 },
		});

		expect(leftWingback.querySelector(".position-box-wrapper")?.getAttribute("style")).toContain(
			"grid-area: lb",
		);
		expect(cdm.querySelector(".position-box-wrapper")?.getAttribute("style")).toContain(
			"grid-area: cm",
		);
		expect(rightWingback.querySelector(".position-box-wrapper")?.getAttribute("style")).toContain(
			"grid-area: rb",
		);
	});
});
