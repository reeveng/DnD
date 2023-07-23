<!-- eventually create a mobile friendly table :) -->

<script lang="ts">
	import type { Player } from '$lib';
	import { game } from '$stores/game';
	import { ArrowUturnLeft, Check, Icon, Trash } from 'svelte-hero-icons';

	let players: Player[];
	let currentPlayer: number = -1;
	game.subscribe((value) => {
		players = value.players;
		currentPlayer = value.currentPlayer;
	});

	function capitalize(word: string) {
		return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
	}

	let changes: boolean = false;
</script>

{#if players && players[0]}
	<div class="w-full mb-10">
		<table class="table w-full">
			<thead>
				<tr>
					{#each Object.keys(players[0]) as key}
						<th class="text-left">{capitalize(key)}</th>
					{/each}
					<th class="text-left">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each players as { name, initiative }, index}
					<tr
						id={index == currentPlayer ? 'current' : ''}
						aria-current={index == currentPlayer ? 'true' : undefined}
					>
						<td>
							{name}
						</td>
						<td>
							<input
								min="0"
								type="number"
								pattern="\d+"
								bind:value={initiative}
								class="bg-transparent w-16 outline-none border-none text-center"
								on:input={() => (changes = true)}
							/>
						</td>
						<td>
							<button
								title="remove player"
								type="button"
								class="ml-2 bg-neutral-500 hover:bg-neutral-950 text-white font-bold p-2 rounded-full"
								on:click={() => game.deletePlayer(index)}
							>
								<Icon class="h-4 w-4" src={Trash} />
								<span class="sr-only">Remove player</span>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		{#if changes}
			<div class="flex flex-row gap-5">
				<button
					type="button"
					class="ml-auto flex bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
					on:click={() => {
						game.undoChanges();
						changes = false;
					}}
				>
					<Icon class="h-6 w-6 mr-2 transform" src={ArrowUturnLeft} />
					Undo changes
				</button>
				<button
					type="button"
					class="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4"
					on:click={() => {
						game.confirmChanges();
						changes = false;
					}}
				>
					<Icon class="h-6 w-6 mr-2" src={Check} />
					Confirm changes
				</button>
			</div>
		{/if}
	</div>
{:else}
	<p>You need to add players in order to start the game.</p>
{/if}

<style lang="postcss">
	/* ----------------------------------
		Table
	   ---------------------------------- */
	table {
		@apply table-auto rounded-lg overflow-hidden border-fuchsia-600;
	}

	tr {
		@apply border-neutral-500 border-b-4 bg-neutral-700;
	}

	tr:last-of-type {
		@apply border-none;
	}

	th {
		@apply font-bold text-xl bg-fuchsia-800;
	}

	tr:nth-child(even) {
		@apply bg-neutral-800;
	}

	th {
		@apply text-white py-2 px-4;
	}

	td {
		@apply py-2 px-4;
	}

	#current {
		@apply bg-yellow-50 text-neutral-950;
	}
	/* ----------------------------------
		Table end
	   ---------------------------------- */
</style>
