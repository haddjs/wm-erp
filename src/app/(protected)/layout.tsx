import { AuthGuard } from "@/context/AuthGuard";
import Sidebar from "@/layout/Sidebar";
import { RoleGuard } from "@/components/RoleGuard";
import DemoDisclaimerBanner from "@/components/DemoDisclaimerBanner";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex flex-col h-screen overflow-hidden">
        <DemoDisclaimerBanner />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            <RoleGuard>{children}</RoleGuard>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
