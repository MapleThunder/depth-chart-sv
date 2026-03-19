import type { Position } from "$lib/positions";
import type { PlayerSortMode } from "$lib/stores/settings_store";
import type { PlayerPosition, PlayerRecord } from "$lib/stores/player_store";

export function getPositionForList(
	player: PlayerRecord,
	position: Position,
): PlayerPosition | undefined {
	return player.positions.find((pos) => pos.position === position);
}

export function isSecondaryForPosition(player: PlayerRecord, position: Position): boolean {
	return getPositionForList(player, position)?.role === "secondary";
}

export function getSkillForPosition(
	player: PlayerRecord,
	position: Position,
): "low" | "mid" | "high" {
	const list_position = getPositionForList(player, position);
	const skill = list_position?.skill;
	if (skill === "low" || skill === "high") {
		return skill;
	}
	if (skill === "mid") {
		return "mid";
	}
	if (list_position?.role === "primary") {
		return "high";
	}
	return "mid";
}

function getSkillScore(skill: "low" | "mid" | "high"): number {
	if (skill === "high") return 3;
	if (skill === "mid") return 2;
	return 1;
}

export function comparePlayersForPosition(
	a: PlayerRecord,
	b: PlayerRecord,
	position: Position,
	sort_mode: PlayerSortMode = "default",
): number {
	if (sort_mode === "custom") {
		const weightA = getPositionForList(a, position)?.weight ?? Number.MAX_VALUE;
		const weightB = getPositionForList(b, position)?.weight ?? Number.MAX_VALUE;
		if (weightA !== weightB) {
			return weightA - weightB;
		}
		return a.name.localeCompare(b.name);
	}

	const skill_a = getSkillScore(getSkillForPosition(a, position));
	const skill_b = getSkillScore(getSkillForPosition(b, position));
	if (skill_a !== skill_b) {
		return skill_b - skill_a;
	}

	const roleA = isSecondaryForPosition(a, position) ? 1 : 0;
	const roleB = isSecondaryForPosition(b, position) ? 1 : 0;
	if (roleA !== roleB) {
		return roleA - roleB;
	}

	const positionA = getPositionForList(a, position);
	const positionB = getPositionForList(b, position);
	const weightA = positionA ? positionA.weight : Number.MAX_VALUE;
	const weightB = positionB ? positionB.weight : Number.MAX_VALUE;
	if (weightA !== weightB) {
		return weightA - weightB;
	}

	return a.name.localeCompare(b.name);
}
