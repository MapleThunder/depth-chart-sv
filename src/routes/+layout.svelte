<script lang="ts">
	import "../styles.css";

	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</svelte:head>

<header>
	<div class="header-content">
		<a id="home-link" href="/">Depth Chart</a>

		<div class="header-controls">
			<a href="/how-to-use" class="help-link">How to Use</a>
		</div>
	</div>
</header>

<main><slot /></main>

<footer>
	<div id="footer-content">
		<span>&copy; {currentYear} Niko Bentley</span>
		<ul>
			<li><a href="/how-to-use" class="help-link">How to Use the App</a></li>
			<li>
				<a href="https://github.com/MapleThunder/depth-chart-sv" class="help-link">
					Source on Github
				</a>
			</li>
		</ul>
	</div>
</footer>

<style>
	header,
	footer {
		width: 100%;
		min-height: 3rem;
		color: var(--text-light);
		background-color: var(--primary);
	}

	.header-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: var(--column);
		padding: 0 var(--side);
		margin: 0 auto;
		flex-shrink: 0;
		color: var(--white);
	}
	.header-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	a {
		color: var(--text-light);
		text-decoration: none;
		border: 3px solid transparent;
	}
	a:hover,
	a:focus {
		border-bottom: 3px solid var(--accent);
	}

	a#home-link {
		font-size: 1.5rem;
	}

	main {
		flex-grow: 1;
	}

	footer {
		display: flex;
		align-self: flex-end;
		flex-shrink: 0;
		margin-top: 1rem;
		padding: 10px;
	}

	#footer-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#footer-content > ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 10px 0;
		padding: 0;
	}

	#footer-content > ul li::before {
		content: "+ ";
	}

	@media screen and (max-width: 700px) {
		div.header-content {
			padding: 0 5px;
		}

		a#home-link {
			font-size: 0.9rem;
			width: fit-content;
		}

		div.header-controls a.help-link {
			display: none;
		}
	}
</style>
