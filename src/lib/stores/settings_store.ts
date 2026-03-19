import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type PlayerSortMode = "default" | "custom";

export type AppSettings = {
	show_skill_gradient: boolean;
	show_secondary_positions: boolean;
	player_sort_mode: PlayerSortMode;
};

const default_value: AppSettings = {
	show_skill_gradient: true,
	show_secondary_positions: false,
	player_sort_mode: "default",
};

const initial_value = loadInitialValue();
export const settings = writable<AppSettings>(initial_value);

settings.subscribe((value) => {
	if (!browser) {
		return;
	}
	window.localStorage.setItem("app_settings", JSON.stringify(value));
});

function loadInitialValue(): AppSettings {
	if (!browser) {
		return default_value;
	}

	const stored_data = window.localStorage.getItem("app_settings");
	if (!stored_data) {
		return default_value;
	}

	try {
		const parsed = JSON.parse(stored_data) as Partial<AppSettings>;
		const parsed_sort_mode =
			parsed.player_sort_mode === "custom" || parsed.player_sort_mode === "default"
				? parsed.player_sort_mode
				: default_value.player_sort_mode;

		return {
			show_skill_gradient: parsed.show_skill_gradient ?? default_value.show_skill_gradient,
			show_secondary_positions:
				parsed.show_secondary_positions ?? default_value.show_secondary_positions,
			player_sort_mode: parsed_sort_mode,
		};
	} catch {
		return default_value;
	}
}
