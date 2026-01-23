---
applyTo: "**/*.{ts,tsx}"
---

## React + TypeScript conventions
- Use TypeScript strictly; avoid `any`.
- Prefer named exports for components.
- Keep components small and single-responsibility.
- Use shadcn-ui components from `src/components/ui/` before creating custom UI primitives.
- Use `@/` path alias for `src/` imports.
- Prefer React Hook Form + Zod for forms.
- Use TanStack React Query for server state and handle loading/error states.
- Use Tailwind utility classes and `cn()` helper for conditional classes.