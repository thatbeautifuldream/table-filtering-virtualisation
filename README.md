# Table Filtering & Virtualization

A performant React table application with filtering, sorting, searching, and virtualization capabilities. Built to efficiently handle 1000+ rows with minimal performance impact.

## Features

### Core Functionality

- **Row Selection**: Select individual rows or all rows with checkboxes
- **Real-time Search**: Search by character name or location
- **Health Filtering**: Multi-select dropdown to filter by health status (Healthy, Injured, Critical)
- **Power Sorting**: Sort table by power level in ascending or descending order
- **Viewed/Unviewed Tracking**: Mark selected rows as viewed or unviewed
- **Loading State**: Smooth loading indicator during data fetch
- **Virtual Scrolling**: Optimized rendering using @tanstack/react-virtual for 1000+ rows

### Technical Highlights

- **TypeScript**: Fully typed codebase with well-defined interfaces
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Performance**: Virtualized rendering handles large datasets efficiently
- **Responsive Design**: Clean UI built with Tailwind CSS
- **Testing**: Comprehensive test coverage using Vitest and Testing Library
- **Storybook**: Component documentation and visual testing

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook
- **Code Quality**: Biome (formatter + linter)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser at http://localhost:3000
```

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server on port 3000

# Build
pnpm build            # Build for production
pnpm preview          # Preview production build

# Testing
pnpm test             # Run tests with Vitest

# Code Quality
pnpm format           # Format code with Biome
pnpm lint             # Lint code with Biome
pnpm check            # Run both format and lint checks

# Storybook
pnpm storybook        # Start Storybook on port 6006
pnpm build-storybook  # Build Storybook for deployment
```

## Project Structure

```
src/
├── components/
│   └── ui/                      # Reusable UI components
│       ├── button.tsx           # Button component
│       ├── button.stories.tsx   # Button stories
│       ├── button.test.tsx      # Button tests
│       ├── checkbox.tsx         # Checkbox component
│       ├── search-input.tsx     # Search input component
│       ├── filter-dropdown.tsx  # Filter dropdown component
│       └── index.ts             # Barrel export
├── data/
│   └── demo.characters.ts       # Character data generator
├── routes/
│   ├── __root.tsx               # Root layout
│   └── index.tsx                # Main table page
├── test/
│   └── setup.ts                 # Test setup file
└── styles.css                   # Global styles
```

## Component Architecture

### UI Components

All UI components are built with:

- **TypeScript interfaces** for type safety
- **Accessibility best practices** (ARIA labels, semantic HTML)
- **Tailwind CSS** for consistent styling
- **Storybook stories** for documentation
- **Unit tests** for reliability

### Table Features

The main table component in `src/routes/index.tsx` demonstrates:

1. **State Management**: Uses React hooks for local state
2. **Memoization**: Efficient filtering/sorting with useMemo
3. **Virtualization**: Only renders visible rows using @tanstack/react-virtual
4. **Separation of Concerns**: UI components separated from business logic

## Testing

Tests are written using Vitest and Testing Library. Run tests with:

```bash
pnpm test
```

Test files are co-located with components:

- `*.test.tsx` - Component tests
- `src/test/setup.ts` - Test configuration

## Storybook

View and interact with components in isolation:

```bash
pnpm storybook
```

Stories are co-located with components:

- `*.stories.tsx` - Component stories

## Data Structure

Each character has the following shape:

```typescript
{
  id: string; // Unique identifier (e.g., "ch_001")
  name: string; // Character name
  location: "Konoha" | "Suna" | "Kiri" | "Iwa" | "Kumo";
  health: "Healthy" | "Injured" | "Critical";
  power: number; // Range: 100-10,000
}
```

## Performance Optimization

- **Virtual Scrolling**: Only renders ~10-15 visible rows at a time
- **Memoization**: Filtered/sorted data only recalculates when dependencies change
- **Efficient Updates**: Uses Set for O(1) selection lookups
- **Debouncing**: Search input updates state directly (can add debouncing if needed)

## Accessibility

- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation support
- ✅ Semantic HTML structure
- ✅ Focus management
- ✅ Screen reader compatible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential improvements:

- Server-side pagination
- Export to CSV/JSON
- Column resizing
- Column reordering
- Advanced filtering (date ranges, number ranges)
- Saved filter presets
- Debounced search input
- Keyboard shortcuts

## License

MIT

## Author

Built as a frontend engineer assignment demonstrating:

- Performance optimization techniques
- Clean, maintainable code structure
- Comprehensive testing practices
- Accessibility best practices
- Modern React patterns with TypeScript
