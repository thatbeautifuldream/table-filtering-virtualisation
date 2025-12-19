# Table Filtering & Virtualization

React table application with filtering, sorting, and virtual scrolling for handling large datasets efficiently.

## Tech Stack

- React 19 + TypeScript
- TanStack Router
- TanStack Virtual
- Tailwind CSS v4
- shadcn/ui components
- Vitest + Testing Library
- Storybook
- Biome (linter/formatter)

## Features

- Virtual scrolling for 1000+ rows
- Row selection
- Search by name/location
- Health status filtering
- Power level sorting
- Viewed/unviewed tracking

## Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

## Scripts

```bash
pnpm dev                  # Dev server (port 3000)
pnpm build                # Production build
pnpm preview              # Preview build
pnpm test                 # Run tests
pnpm test:ui              # Test UI
pnpm check                # Lint + format check
pnpm format               # Format code
pnpm lint                 # Lint code
pnpm storybook            # Storybook (port 6006)
pnpm build-storybook      # Build Storybook
```

## Project Structure

```
src/
├── components/ui/        # UI components with tests & stories
├── data/                 # Data generators
├── routes/               # Router pages
└── test/                 # Test config
```
