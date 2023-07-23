<script lang="ts">
	import AddPlayer from '$components/AddPlayer.svelte';
	import type { Player } from '$lib';
	import Table from '../components/Table.svelte';
	import { game } from '../stores/game';

	let currentPlayer: number;
	let players: Player[];
	game.subscribe((value) => {
		players = value.players;
		currentPlayer = value.currentPlayer;
	});
</script>

<div class="flex flex-col gap-10 w-full">
	<h1 class="text-3xl font-bold mt-10 mb-16 text-center">Initiative tracker</h1>

	<Table />

	{#if players.length > 1}
		<button
			class="bg-fuchsia-600 hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded mb-5 md:mb-10"
			on:click={() => game.nextPlayer()}
		>
			{currentPlayer == -1 ? 'Start game' : 'Next Player'}
		</button>
	{/if}

	<AddPlayer />

	<button
		type="button"
		class="bg-fuchsia-600 hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded"
		on:click={() => game.reset()}
	>
		Reset game
	</button>
</div>
