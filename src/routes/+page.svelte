<script lang="ts">
	import { browser } from '$app/environment';
	import type { GameContext } from '$lib';
	import { onMount } from 'svelte';
	import Table from '../components/Table.svelte';

	let context: GameContext = {
		currentPlayer: -1,
		players: []
	};

	onMount(() => {
		if (browser) context = JSON.parse(localStorage.getItem('gameContext') ?? '');
	});

	let name: string = '';
	let initiative: number = NaN;

	function updateLocalstorage() {
		if (browser) localStorage.setItem('gameContext', JSON.stringify(context));
	}

	function addPlayer(event: any) {
		event.preventDefault();

		if (name && initiative) {
			// Add the new player to the context
			context.players.push({
				name: name,
				initiative: initiative
			});

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
		data={context.players.sort((a, b) => b.initiative - a.initiative)}
		currentPlayer={context.currentPlayer}
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

<style lang="postcss">
	:global(html),
	:global(body) {
		@apply bg-neutral-900 min-w-full min-h-full m-0 p-0 text-neutral-200;
		font-family: 'JetBrains Mono', monospace, system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(main) {
		@apply min-h-full  flex items-center justify-center flex-col gap-10 pb-10;
	}

	:global(main > *) {
		max-width: 67%;
	}

	/* ----------------------------------
		Headings
	   ---------------------------------- */
	:global(h1) {
		@apply font-bold text-xl md:text-5xl mt-20;
		font-family: 'Press Start 2P', 'JetBrains Mono', monospace, system-ui, -apple-system,
			BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	:global(h2) {
		@apply font-bold text-lg md:text-3xl mt-20;
	}
</style>
