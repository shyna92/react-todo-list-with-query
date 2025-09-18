# React Query Sample (TypeScript)

A compact React + TypeScript sample demonstrating:
- API integration with `fetch` (JSONPlaceholder Users & Todos)
- State management using **@tanstack/react-query**
- Reusable components and controlled inputs
- Basic unit test using **Vitest** + **Testing Library**

## Quick Start
```bash
npm install
npm run dev
```

## Test
```bash
npm test
```

## What to look at
- `src/App.tsx`: App shell with tabs and shared query client
- `src/features/users/Users.tsx`: List + search + click to view details
- `src/features/todos/Todos.tsx`: List + toggle filter (completed/all)
- `src/lib/queryClient.ts`: React Query client config (retry, staleTime)
- `src/components/SearchInput.tsx`: Reusable input with `useDebounce`
- `tests/App.test.tsx`: smoke test for the app boot

## Notes
- Public API: https://jsonplaceholder.typicode.com
- No private/client code; safe to share for interview purposes.
