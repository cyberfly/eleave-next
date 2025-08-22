# eLeave - AI Coding Agent Instructions

## Project Overview
This is a Next.js SaaS application for employee leave management, built on a starter template with authentication, Stripe payments, and role-based access control. The app has been customized to add leave application and approval workflows for HR management.

## Architecture & Key Patterns

### Database & ORM (Drizzle)
- **Schema**: `lib/db/schema.ts` - PostgreSQL with Drizzle ORM
- **Core entities**: `users`, `teams`, `leave_applications`, `teamMembers`, `activityLogs`
- **Key pattern**: Use table aliases for self-joins: `const approver = alias(users, "approver")`
- **Migrations**: Auto-generated in `lib/db/migrations/` via `pnpm db:generate && pnpm db:migrate`

### Authentication & Authorization
- **Session-based**: JWT tokens stored in HTTP-only cookies
- **Middleware**: Global route protection in `middleware.ts` with `protectedRouteList`
- **Role system**: `member`, `admin`, `manager` roles with RBAC checks in components
- **Helper**: `getUser()` from `lib/db/queries.ts` for server-side user context

### Route Structure (App Router)
- **Route groups**: `(login)` for auth pages, `(dashboard)` for protected pages
- **Layout hierarchy**: Root layout → Dashboard layout with navigation
- **Server Actions**: Located in `lib/actions/` (e.g., `leave_actions.ts`)
- **API routes**: Minimal usage, prefer Server Actions

### Leave Management Domain
- **Core entities**: `leave_applications` with `status` (pending/approved/rejected)
- **Approval workflow**: Members apply → Admins/Managers approve → Status updates
- **Key files**: 
  - `lib/actions/leave_actions.ts` - All leave CRUD operations
  - `app/(dashboard)/dashboard/leave_approvals/` - Admin approval interface
  - `app/(dashboard)/dashboard/leaves/` - Member leave management

### Form Handling Pattern
```typescript
// Server Actions with Zod validation
const FormSchema = z.object({ /* fields */ });

export async function actionName(prevState: any, formData: FormData) {
  const validation = FormSchema.safeParse(/* data */);
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }
  // Process & redirect
}
```

### Database Query Patterns
- **Pagination**: Manual offset/limit with metadata (`totalPages`, `hasNextPage`)
- **Filtering**: Build `whereConditions` array and combine with `and(...conditions)`
- **Joins**: Use `leftJoin` with aliases for complex queries
- **Type safety**: Import schemas and use Drizzle's inferred types

## Development Workflows

### Essential Commands
```bash
pnpm dev                    # Development server with Turbopack
pnpm db:setup               # One-time DB setup (creates .env)
pnpm db:migrate             # Run pending migrations
pnpm db:seed                # Seed with test user (test@test.com/admin123)
pnpm db:studio              # Visual DB browser
pnpm db:seed_leaves         # Seed leave applications
```

### Database Workflow
1. Modify `lib/db/schema.ts`
2. `pnpm db:generate` (creates migration)
3. `pnpm db:migrate` (applies migration)
4. Update types/queries as needed

### Component Patterns
- **shadcn/ui**: Components in `components/ui/` (Button, Card, etc.)
- **Server Components**: Default for data fetching
- **Client Components**: Mark with `"use client"` for interactivity
- **Form handling**: Use `useActionState` hook with Server Actions

### Filter & Search Implementation
- **URL state**: Sync filters with search params for bookmarkable URLs
- **Pattern**: `useSearchParams` + `buildUrl` helper function
- **Pagination**: Preserve filters in pagination links
- **Backend**: Use `ilike` for case-insensitive search, `or()` for multiple fields

## Critical Integration Points

### Authentication Flow
- **Sign up**: Creates user + team + team membership atomically
- **Protected routes**: Middleware checks session + redirects to `/sign-in`
- **Session refresh**: Automatic token renewal on GET requests

### Data Access Layer
- **Queries**: Centralized in `lib/db/queries.ts`
- **Actions**: Domain-specific in `lib/actions/`
- **Validation**: Zod schemas co-located with actions
- **Error handling**: Return structured errors for form display

## Testing & Debugging
- **Test credentials**: `test@test.com` / `admin123` (from seed)
- **Stripe test**: Use `4242 4242 4242 4242` card
- **DB inspection**: Use `pnpm db:studio` for visual queries
- **Logs**: Server Actions log extensively via `console.log`

## Common Gotchas
- **Server Actions**: Always use `"use server"` directive
- **ID types**: Convert string IDs to integers for DB queries: `parseInt(id)`
- **Revalidation**: Call `revalidatePath()` after mutations
- **Type errors**: Import proper types from schema file
- **Middleware**: Add new protected routes to `protectedRouteList`
