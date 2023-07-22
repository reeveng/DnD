<script lang="ts">
	import '../app.css';
</script>

<main class="mx-auto container">
	<slot />
</main>

<style lang="postcss">
	:global(html),
	:global(body) {
		@apply bg-neutral-900 min-w-full min-h-full m-0 p-0 text-neutral-200 w-full h-full;
		font-family: 'JetBrains Mono', monospace, system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(main) {
		@apply min-h-full flex items-center justify-center flex-col gap-10 pb-10;
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
