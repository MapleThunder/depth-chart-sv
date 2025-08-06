# Project Structure

## Directory Organization

```
src/
├── lib/                    # Shared library code ($lib alias)
│   ├── stores/            # Svelte stores for state management
│   ├── config.ts          # Site configuration constants
│   ├── positions.ts       # Football position definitions and logic
│   └── index.ts           # Library exports
├── routes/                # SvelteKit pages and components
│   ├── how-to-use/        # Help/documentation page
│   ├── +layout.svelte     # Root layout component
│   ├── +layout.ts         # Layout load function
│   ├── +page.svelte       # Home page component
│   └── *.svelte           # Page-specific components
├── app.html               # HTML template
├── app.d.ts               # Global type definitions
└── styles.css             # Global CSS styles
```

## Architecture Patterns

### State Management

- **Stores Location**: `src/lib/stores/`
- **Pattern**: Writable stores with localStorage persistence
- **Key Stores**:
  - `formation_store.ts`: Current formation selection
  - `player_store.ts`: Player data and position assignments

### Component Organization

- **Page Components**: Located in `src/routes/` alongside route files
- **Shared Components**: Use `$lib` imports for reusable components
- **Component Naming**: PascalCase for component files (e.g., `PlayerList.svelte`)

### Type Definitions

- **Enums**: Used for positions and formations (e.g., `Position`, `Formation`)
- **Types**: Defined close to usage, exported from relevant modules
- **Global Types**: Declared in `src/app.d.ts`

### Business Logic

- **Position Logic**: Centralized in `src/lib/positions.ts`
- **Formation Mapping**: Functions to map formations to required positions
- **Data Helpers**: Store manipulation functions exported from store files

## File Naming Conventions

- **Components**: PascalCase (e.g., `PlayerEntryForm.svelte`)
- **Stores**: snake_case with `_store` suffix (e.g., `player_store.ts`)
- **Utilities**: snake_case (e.g., `positions.ts`)
- **Routes**: SvelteKit conventions (`+page.svelte`, `+layout.svelte`)

## Import Patterns

- Use `$lib` alias for library imports: `import { Position } from '$lib/positions'`
- Use `$app` for SvelteKit imports: `import { browser } from '$app/environment'`
- Relative imports only within the same directory level
