<script>
	import { page } from '$app/stores';
	import picture404 from '$lib/assets/404treasurechest.png';
</script>

<div class="h-full w-full flex justify-center items-center flex-col gap-10">
	<img
		class="flex max-w-xs w-full rounded-full shadow-2xl shadow-fuchsia-600"
		src={picture404}
		alt="Pixel art of an empty treasure chest on a island with a palm tree"
	/>

	<h1 class="text-fuchsia-500">{$page.status}: {$page.error?.message}</h1>

	<p class="text-center">Looking for treasures are we?</p>

	<p>
		Would you like to return to your
		<a
			href="/"
			type="button"
			class="bg-lime-600 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded">starting zone</a
		> and rethink your life choices?!?!
	</p>
</div>

<style>
	h1 {
		text-shadow: -5px 2px #a3e635;
	}
</style>
