# Copilot Instructions for confetti-quester

## Project Overview
This is a React application built with Vite, TypeScript, and modern UI libraries. The project uses shadcn-ui components with Tailwind CSS for styling.

## Tech Stack
- **Framework**: React 18.3+ with Vite 5.4+
- **Language**: TypeScript 5.5+
- **Styling**: Tailwind CSS with shadcn-ui components
- **Routing**: React Router DOM v6
- **State Management**: TanStack React Query v5
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives via shadcn-ui

## Code Style & Best Practices

### TypeScript
- Use strict TypeScript - avoid `any` types
- Prefer interfaces for object shapes and type aliases for unions
- Use proper type inference; don't over-annotate
- Define prop types using interfaces or types

### React Components
- Use functional components with hooks
- Prefer named exports for components
- Use proper component composition and separation of concerns
- Keep components focused and single-responsibility
- Use React.memo() for expensive components that re-render frequently

### Hooks
- Follow the Rules of Hooks
- Custom hooks should start with `use` prefix
- Prefer hooks over HOCs and render props

### Forms
- Use React Hook Form for all forms
- Validate with Zod schemas
- Define schemas separately from components for reusability
```typescript
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof formSchema>;
```

### Data Fetching
- Use TanStack React Query for server state
- Define query keys as constants
- Use proper error and loading states
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

### Styling
- Use Tailwind CSS utility classes
- Leverage shadcn-ui components from `@/components/ui/`
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Follow mobile-first responsive design

### File Structure
- Components go in `src/components/`
- UI primitives (shadcn) go in `src/components/ui/`
- Pages/routes go in `src/pages/` or route-specific folders
- Hooks go in `src/hooks/`
- Utilities go in `src/lib/`
- Types go in `src/types/`

## shadcn-ui Components
- Use existing shadcn components from `src/components/ui/` before creating custom ones
- When adding new shadcn components, use the CLI: `npx shadcn@latest add [component-name]`
- Import components from `@/components/ui/[component-name]`
- Customize component variants using `class-variance-authority`

## Path Aliases
- Use `@/` alias for imports from `src/` directory
```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
```

## Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserData`, `ApiResponse`)

## Testing
- Write tests for critical business logic
- Test user interactions, not implementation details
- Use descriptive test names that explain the expected behavior

## Performance
- Lazy load routes and heavy components using `React.lazy()`
- Optimize images and assets
- Use proper React Query caching strategies
- Memoize expensive calculations with `useMemo`
- Memoize callbacks with `useCallback` when passing to child components

## Error Handling
- Use error boundaries for component error handling
- Provide meaningful error messages
- Handle async errors with try/catch or React Query error states
- Log errors appropriately for debugging

## Accessibility
- Use semantic HTML elements
- Include proper ARIA labels when needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper color contrast ratios

## Build & Development
- Run dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## Environment
- Use `.env` files for environment variables
- Prefix client-side variables with `VITE_`
- Never commit sensitive credentials

## Git & Commits
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Test before committing

## Additional Notes
- This project is managed via Lovable platform
- Changes can be made through Lovable UI or traditional development workflow
- Prettier is configured for code formatting
- ESLint is configured for code quality