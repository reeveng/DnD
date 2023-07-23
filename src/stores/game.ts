import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store'; // Use a type-only import for Writable
import type { GameContext, Player } from '$lib';
import { comparePlayers } from '$lib/comparePlayers';
import { browser } from '$app/environment';

function readFromLocalStorage(): GameContext | null {
	if (browser) {
		const data = localStorage.getItem('gameContext');
		return data ? JSON.parse(data) : null;
	}

	return null;
}

const createGameStore = () => {
	// Initialize the store with the initial state from localStorage
	const initialData = readFromLocalStorage();
	const { subscribe, set, update }: Writable<GameContext> = writable(
		initialData || {
			currentPlayer: -1,
			players: []
		}
	);

	subscribe((context) => {
		if (browser) localStorage.setItem('gameContext', JSON.stringify(context));
	});

	const addPlayer = (name: string, initiative: number) => {
		update((context) => {
			if (name && initiative) {
				// Find the index of the next player to remain equal
				const nextPlayerIndex = context.currentPlayer + 1;

				// Add the new player to the context
				context.players.push({
					name: name,
					initiative: initiative
				});

				// Sort the players based on their initiative in descending order
				context.players.sort((a: Player, b: Player) => b.initiative - a.initiative);

				// Check if the next player to remain equal exists and compare
				if (
					nextPlayerIndex < context.players.length &&
					!comparePlayers(context.players[nextPlayerIndex], context.players[context.currentPlayer])
				) {
					context.currentPlayer = nextPlayerIndex; // Move to the next player if they are not equal
				}

				return context;
			}

			// Return the original context if name or initiative is missing
			return context;
		});
	};

	const nextPlayer = () => {
		update((context) => {
			if (context.players.length > 0) {
				context.currentPlayer = (context.currentPlayer + 1) % context.players.length;
			}

			return context;
		});
	};

	const reset = () => {
		const resetValue: GameContext = {
			players: [],
			currentPlayer: -1
		};

		// Use the update function to reset the context
		update(() => resetValue);
	};

	const deletePlayer = (index: number) => {
		update((context) => {
			if (index >= 0 && index < context.players.length) {
				context.players.splice(index, 1);

				if (context.currentPlayer >= index) {
					context.currentPlayer = Math.max(0, context.currentPlayer - 1);
				}

				context.players.sort((a: Player, b: Player) => b.initiative - a.initiative);

				// Return the updated context
				return context;
			}

			// Return the original context if the index is out of bounds
			return context;
		});
	};

	const confirmChanges = () => {
		update((context) => {
			context.players.sort((a: Player, b: Player) => b.initiative - a.initiative);

			if (browser) localStorage.setItem('gameContext', JSON.stringify(context));

			return context;
		});
	};
	const undoChanges = () => {
		// Retrieve the original data from localStorage and update the store with it
		const originalData = readFromLocalStorage();
		set(originalData || { currentPlayer: -1, players: [] });
	};

	return {
		subscribe,
		set,
		update,
		addPlayer,
		nextPlayer,
		deletePlayer,
		reset,
		undoChanges,
		confirmChanges
	};
};

export const game = createGameStore();
