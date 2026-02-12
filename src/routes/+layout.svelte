<script lang="ts">
	import "../styles.css";
	import SettingsModal from "./SettingsModal.svelte";

	const currentYear = new Date().getFullYear();
	let show_settings_modal = false;

	function openSettingsModal(): void {
		show_settings_modal = true;
	}

	function closeSettingsModal(): void {
		show_settings_modal = false;
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</svelte:head>

<header>
	<div class="header-content">
		<a id="home-link" href="/">Depth Chart</a>

		<div class="header-controls">
			<a href="/how-to-use" class="help-link">How to Use</a>
			<button
				type="button"
				class="settings-link"
				aria-label="Settings"
				title="Settings"
				on:click={openSettingsModal}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
					<path
						d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.28 7.28 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.22-1.13.54-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.4 1.05.72 1.63.94l.36 2.54a.5.5 0 0 0 .49.42h3.8a.5.5 0 0 0 .49-.42l.36-2.54c.58-.22 1.13-.54 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>

<main><slot /></main>

<footer>
	<div id="footer-content">
		<span>
			&copy; {currentYear}
			<a href="http://CodBodDesigns.ca" target="_blank" rel="noopener noreferrer">
				Cod Bod Designs
			</a>
		</span>
		<a href="/how-to-use" class="help-link">How to Use the App</a>
	</div>
</footer>

<SettingsModal open={show_settings_modal} on:close={closeSettingsModal} />

<style>
	header,
	footer {
		width: 100%;
		min-height: 3rem;
		color: var(--text-light);
		background-color: var(--primary);
	}

	header {
		box-shadow: 0 8px 22px rgba(10, 14, 22, 0.2);
	}

	.header-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: var(--column);
		padding: 0.75rem var(--side);
		margin: 0 auto;
		flex-shrink: 0;
		color: var(--white);
	}
	.header-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.settings-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--text-light);
		transition: color 0.2s ease;
	}

	.settings-link svg {
		display: block;
		fill: currentColor;
	}

	.settings-link:hover,
	.settings-link:focus {
		color: var(--accent);
	}

	a {
		color: var(--text-light);
		text-decoration: none;
		border-bottom: 2px solid transparent;
		transition: border-color 0.2s ease;
	}
	a:hover,
	a:focus {
		border-bottom: 2px solid var(--accent);
	}

	a#home-link {
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: 0.2px;
	}

	main {
		flex-grow: 1;
	}

	footer {
		display: flex;
		align-self: flex-end;
		flex-shrink: 0;
		margin-top: 1rem;
		padding: 14px 10px;
		box-shadow: 0 -8px 20px rgba(10, 14, 22, 0.18);
	}

	#footer-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: clamp(1rem, 2rem, 4rem);
	}

	#footer-content > ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 8px 0 0;
		padding: 0;
	}

	#footer-content > ul li::before {
		content: "+ ";
	}

	@media screen and (max-width: 700px) {
		div.header-content {
			padding: 0 5px;
		}

		#footer-content {
			flex-direction: column;
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
