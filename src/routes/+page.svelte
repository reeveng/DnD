<script lang="ts">
	import { browser } from '$app/environment';
	import type { GameContext, Player } from '$lib';
	import { onMount } from 'svelte';
	import Table from '../components/Table.svelte';
	import { comparePlayers } from '$lib/comparePlayers';

	let context: GameContext = {
		currentPlayer: -1,
		players: []
	};

	function reloadLocalstorage() {
		if (browser && localStorage.getItem('gameContext') != '') {
			context = JSON.parse(localStorage.getItem('gameContext') ?? '');
		}
	}

	onMount(() => {
		reloadLocalstorage();
	});

	let name: string = '';
	let initiative: number = NaN;

	function updateLocalstorage() {
		if (browser) localStorage.setItem('gameContext', JSON.stringify(context));
	}

	function addPlayer(event: any) {
		event.preventDefault();

		if (name && initiative) {
			let nextPlayerToRemainEqual: Player | null = null;

			if (
				context.currentPlayer != -1 &&
				context.currentPlayer < context.players.length &&
				context.players[context.currentPlayer]
			) {
				nextPlayerToRemainEqual = context.players[context.currentPlayer];
			}

			// Add the new player to the context
			context.players.push({
				name: name,
				initiative: initiative
			});

			context.players = context.players.sort((a, b) => b.initiative - a.initiative);

			if (
				nextPlayerToRemainEqual &&
				!comparePlayers(nextPlayerToRemainEqual, context.players[context.currentPlayer])
			) {
				nextPlayer();
			}

			// Clear the input fields after adding the player
			name = '';
			initiative = NaN;
			context = context;
			updateLocalstorage();

			const nameInput = document.getElementById('name');

			if (nameInput) {
				nameInput.focus();
			}
		}
	}

	function nextPlayer() {
		if (context.players.length > 0) {
			context.currentPlayer = (context.currentPlayer + 1) % context.players.length;
		}

		context = context;
		updateLocalstorage();
	}

	function resetInfo() {
		const resetValue: GameContext = {
			players: [],
			currentPlayer: -1
		};

		context = resetValue;
	}
</script>

<div class="flex flex-col gap-10 w-full">
	<h1 class="text-3xl font-bold mt-10 mb-16 text-center">Initiative tracker</h1>

	<Table
		data={context.players}
		currentPlayer={context.currentPlayer}
		{updateLocalstorage}
		{reloadLocalstorage}
	/>

	{#if context.players.length > 1}
		<button
			class="bg-fuchsia-600 hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded mb-5 md:mb-10"
			on:click={nextPlayer}
		>
			{context.currentPlayer == -1 ? 'Start game' : 'Next Player'}
		</button>
	{/if}

	<form class="flex flex-col gap-8 p-6 border-2 rounded-lg" on:submit={addPlayer}>
		<h2 class="mb-2 mt-0">Add player</h2>
		<div>
			<label class="block text-neutral-300 text-sm font-bold mb-2" for="name">Name</label>
			<input
				type="text"
				placeholder="Player name"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
				id="name"
				bind:value={name}
			/>
		</div>
		<div>
			<label class="block text-neutral-300 text-sm font-bold mb-2" for="initiative">
				Initiative
			</label>
			<input
				type="number"
				placeholder="10"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
				id="initiative"
				bind:value={initiative}
			/>
		</div>

		<button
			class="bg-fuchsia-600 hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded"
			type="submit"
		>
			Add Player
		</button>
	</form>

	<button
		type="button"
		class="bg-fuchsia-600 hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded"
		on:click={resetInfo}
	>
		Reset game
	</button>
</div>
