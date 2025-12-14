import { auth } from "@/lib/auth";
import {
  PageHeader,
  SectionCard,
  StatCard,
  StatCardGrid,
} from "@/components";
import { Users, ShieldCheck, Key, Rocket } from "lucide-react";
import { api } from "@/lib/trpc/server";

export default async function DashboardPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  // Only fetch user count if admin
  let userCount = 0;
  if (isAdmin) {
    try {
      userCount = await api.user.count();
    } catch {
      // Ignore error if not authorized
    }
  }

  return (
    <>
      <PageHeader
        title={`Welcome back, ${session?.user?.name || "User"}!`}
        description="Next.js + tRPC + Mongoose Boilerplate Dashboard"
      />

      <div className="p-6 space-y-6">
        {/* Statistics Grid - Only show to admins */}
        {isAdmin && (
          <StatCardGrid columns={3}>
            <StatCard
              label="Total Users"
              value={userCount}
              icon={Users}
              variant="blue"
            />
            <StatCard
              label="Your Role"
              value={session?.user?.role || "user"}
              icon={ShieldCheck}
              variant="teal"
            />
            <StatCard
              label="API Endpoints"
              value={8}
              icon={Key}
              variant="indigo"
            />
          </StatCardGrid>
        )}

        {/* Features Section */}
        <SectionCard
          title="Boilerplate Features"
          description="This boilerplate includes everything you need to build a full-stack application"
          icon={Rocket}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Core Stack</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50" />
                  Next.js 16 with App Router
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50" />
                  React 19 with React Compiler
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50" />
                  TypeScript 5 (strict mode)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50" />
                  TailwindCSS v4 + shadcn/ui
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Backend & Data</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-success shadow-sm shadow-success/50" />
                  tRPC v11 for type-safe APIs
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-success shadow-sm shadow-success/50" />
                  Mongoose v9 with MongoDB
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-success shadow-sm shadow-success/50" />
                  NextAuth v5 authentication
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-success shadow-sm shadow-success/50" />
                  Zod v4 for validation
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Authentication</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-chart-4 shadow-sm shadow-chart-4/50" />
                  JWT-based sessions
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-chart-4 shadow-sm shadow-chart-4/50" />
                  Role-based access (admin/user)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-chart-4 shadow-sm shadow-chart-4/50" />
                  Password reset flow
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-chart-4 shadow-sm shadow-chart-4/50" />
                  Protected routes & procedures
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">DevOps</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-warning shadow-sm shadow-warning/50" />
                  Docker support (full stack)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-warning shadow-sm shadow-warning/50" />
                  Database migrations
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-warning shadow-sm shadow-warning/50" />
                  Seed scripts
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-warning shadow-sm shadow-warning/50" />
                  ESLint configured
                </li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* Getting Started Section */}
        <SectionCard
          title="Getting Started"
          description="Quick steps to start building your application"
        >
          <div className="space-y-4">
            <div className="rounded-xl bg-accent/50 border border-border p-4 transition-colors hover:bg-accent/70">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-2">
                1. Customize the User model
              </h4>
              <p className="text-sm text-muted-foreground">
                Edit <code className="text-primary font-medium px-1.5 py-0.5 rounded bg-primary/10">src/lib/db/models/user.ts</code> to
                add fields specific to your application.
              </p>
            </div>
            <div className="rounded-xl bg-accent/50 border border-border p-4 transition-colors hover:bg-accent/70">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-2">
                2. Create new tRPC routers
              </h4>
              <p className="text-sm text-muted-foreground">
                Add routers in <code className="text-primary font-medium px-1.5 py-0.5 rounded bg-primary/10">src/lib/trpc/routers/</code> and
                register them in the index file.
              </p>
            </div>
            <div className="rounded-xl bg-accent/50 border border-border p-4 transition-colors hover:bg-accent/70">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-2">
                3. Add new pages
              </h4>
              <p className="text-sm text-muted-foreground">
                Create pages in <code className="text-primary font-medium px-1.5 py-0.5 rounded bg-primary/10">src/app/(dashboard)/</code> using
                the existing UI components.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
