<script lang="ts">
	import { game } from '$stores/game';

	let name: string = '';
	let initiative: number = NaN;

	function resetForm() {
		name = '';
		initiative = NaN;
	}
</script>

<form
	class="flex flex-col gap-8 p-6 border-2 rounded-lg"
	on:submit={() => {
		if (name && initiative) {
			game.addPlayer(name, initiative);
			resetForm();
		}
	}}
>
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
			min="0"
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
