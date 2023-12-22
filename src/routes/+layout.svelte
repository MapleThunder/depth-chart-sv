<script>
	import '../styles.css';
</script>

<header>
	<a href="/"> Depth Chart </a>

	<div class="clear">
		<button>Clear</button>
	</div>
</header>

<main><slot /></main>

<footer>
	<p>Created by Niko Bentley</p>
</footer>

<style>
	header,
	footer {
		display: flex;
		width: 100%;
		height: 3rem;
		align-items: center;
		max-width: var(--column);
		padding: 0 var(--side);
		color: var(--accent);
	}

	header {
		justify-content: space-between;
	}

	footer {
		justify-content: center;
		align-self: flex-end;
	}
</style>
