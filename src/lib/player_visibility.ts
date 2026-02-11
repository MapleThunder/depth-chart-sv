import type { Position } from "$lib/positions";
import type { PlayerRecord } from "$lib/stores/player_store";

function getSkillScore(skill: PlayerRecord["positions"][number]["skill"]): number {
	switch (skill) {
		case "high":
			return 3;
		case "mid":
			return 2;
		case "low":
			return 1;
		default:
			return 2;
	}
}

function getPrimaryPosition(player: PlayerRecord): Position | undefined {
	return (
		player.positions.find((pos) => pos.role === "primary")?.position ?? player.positions[0]?.position
	);
}

/**
 * Returns the position a player should be shown in for the current formation.
 * Priority:
 * 1) Primary position if visible
 * 2) First visible secondary position in the player's listed order
 */
export function getVisibleAssignedPosition(
	player: PlayerRecord,
	visiblePositions: Set<Position>,
): Position | undefined {
	const primaryPosition = getPrimaryPosition(player);
	if (primaryPosition && visiblePositions.has(primaryPosition)) {
		return primaryPosition;
	}

	const visibleSecondaries = player.positions.filter(
		(pos) => pos.role !== "primary" && visiblePositions.has(pos.position),
	);
	if (visibleSecondaries.length === 0) {
		return undefined;
	}

	const bestSecondary = visibleSecondaries.reduce((best, current) =>
		getSkillScore(current.skill) > getSkillScore(best.skill) ? current : best,
	);
	return bestSecondary.position;
}
