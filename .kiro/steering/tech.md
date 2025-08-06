# Technology Stack

## Framework & Build System

- **Frontend Framework**: SvelteKit 2.x with Svelte 5
- **Build Tool**: Vite 6.x
- **Language**: TypeScript with strict mode enabled
- **Package Manager**: pnpm (lockfile present)
- **Deployment**: Static site generation using `@sveltejs/adapter-static`

## Key Dependencies

- **Icons**: @iconify/svelte for icon components
- **Image Export**: html2canvas for generating shareable depth chart images
- **Styling**: Custom CSS with CSS custom properties (no framework)
- **State Management**: Svelte stores with localStorage persistence

## Development Tools

- **Type Checking**: svelte-check with TypeScript
- **Code Formatting**: Prettier with svelte plugin
- **Linting**: Built-in TypeScript strict mode

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run check        # Type check without watching
npm run check:watch  # Type check with file watching
npm run format       # Format code with Prettier
npm run lint         # Check code formatting

# Package Management
pnpm install         # Install dependencies (preferred)
```

## Architecture Notes

- **Module Type**: ESM (type: "module" in package.json)
- **Path Aliases**: Uses SvelteKit's built-in `$lib` alias for library imports
- **Browser APIs**: Relies on localStorage and browser environment detection
- **Static Generation**: Configured for static site deployment with fallback handling
