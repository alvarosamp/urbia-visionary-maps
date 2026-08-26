import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PerfilProvider } from "@/lib/perfil";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <PerfilProvider>
      <Outlet />
    </PerfilProvider>
  );
}
