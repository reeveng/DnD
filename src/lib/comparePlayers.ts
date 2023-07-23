import type { Player } from '$lib';

export function samePlayer(a: Player, b: Player): boolean {
	if (!a || !b) {
		// Handle the case where either player is undefined or null
		return false;
	}

	return a.name === b.name && a.initiative === b.initiative;
}

export function sortPlayerByInitiative(a: Player, b: Player): number {
	if (!a || !b) {
		// Handle the case where either player is undefined or null
		return 0;
	}

	return b.initiative - a.initiative;
}
