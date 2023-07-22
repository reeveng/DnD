<!-- eventually create a mobile friendly table :) -->

<script lang="ts">
	import { ArrowPath, ArrowUturnDown, ArrowUturnLeft, Check, Icon } from 'svelte-hero-icons';

	export let data: any[] = [];
	export let currentPlayer: number = -1;
	export let updateLocalstorage: Function = () => {};
	export let reloadLocalstorage: Function = () => {};

	function capitalize(word: string) {
		return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
	}

	function sortDataByInitiative() {
		// Sort the data array by the 'initiative' property in descending order
		data = data.sort((a, b) => b.initiative - a.initiative);

		// If 'currentPlayer' is out of bounds after sorting, reset it
		if (currentPlayer < 0 || currentPlayer >= data.length) {
			currentPlayer = -1;
		}
	}

	let changes: boolean = false;
</script>

{#if data && data[0]}
	<div class="w-full mb-10">
		<table class="table w-full">
			<thead>
				<tr>
					{#each Object.keys(data[0]) as key}
						<th class="text-left">{capitalize(key)}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as { name, initiative }, index}
					<tr id={index == currentPlayer ? 'current' : ''}>
						<td>
							{name}
						</td>
						<td>
							<!-- Add a bound input to update the player's initiative -->
							<input
								type="number"
								pattern="\d+"
								bind:value={data[index].initiative}
								class="bg-transparent w-16 outline-none border-none text-center"
								on:input={() => (changes = true)}
							/>
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
						reloadLocalstorage();
						changes = false;
					}}
				>
					<Icon class="h-6 w-6 mr-2 transform" src={ArrowPath} />
					Undo changes
				</button>
				<button
					type="button"
					class="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-4"
					on:click={() => {
						sortDataByInitiative();
						updateLocalstorage();
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
