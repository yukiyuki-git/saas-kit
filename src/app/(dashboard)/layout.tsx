import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-64 border-r p-4 flex-col">
        <DashboardSidebar />
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="container p-6 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
