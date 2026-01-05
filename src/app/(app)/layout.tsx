import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <main className="transition-[margin-left] duration-300 ease-in-out lg:ml-64">
          <AppHeader />
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
  );
}
