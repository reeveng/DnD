<!-- eventually create a mobile friendly table :) -->

<script lang="ts">
	export let data: any[] = [];
	export let currentPlayer: number = -1;

	function capitalize(word: string) {
		return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
	}
</script>

{#if data && data[0]}
	<table class="table">
		<thead>
			<tr>
				{#each Object.keys(data[0]) as key}
					<th class="text-left">{capitalize(key)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as item, index}
				<tr id={index == currentPlayer ? 'current' : ''}>
					{#each Object.values(item) as value}
						<td>{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>You need to add players in order to start the game.</p>
{/if}

<style lang="postcss">
	/* ----------------------------------
		Table
	   ---------------------------------- */
	table {
		@apply table-auto rounded-lg overflow-hidden mb-10 border-fuchsia-600;
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
