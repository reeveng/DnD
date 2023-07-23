import type { Player } from '$lib';

export function comparePlayers(player1: Player, player2: Player): boolean {
	if (!player1 || !player2) {
		// Handle the case where either player is undefined or null
		return false;
	}

	return player1.initiative === player2.initiative;
}
