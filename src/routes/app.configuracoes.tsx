import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/urbia/AppShell";
import { usePerfil } from "@/lib/perfil";
import { fontesDados, perfis, pesosScore } from "@/lib/urbia-data";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Urbia" },
      {
        name: "description",
        content:
          "Ajuste o perfil de uso, a calibração de pesos do score e acompanhe a atualização das fontes de dados.",
      },
      { property: "og:title", content: "Configurações — Urbia" },
      {
        property: "og:description",
        content: "Perfil de uso, calibração do score e status das fontes de dados.",
      },
    ],
  }),
  component: ConfigPage,
});

function ConfigPage() {
  const { perfil, setPerfil } = usePerfil();

  return (
    <AppShell titulo="Configurações" descricao="Perfil, calibração e fontes">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border border-border p-6">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Perfil de uso
          </div>
          <div className="grid gap-3">
            {perfis.map((p) => (
              <button
                key={p.id}
                onClick={() => setPerfil(p.id)}
                className={`rounded-sm border p-4 text-left transition-colors ${
                  perfil === p.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-surface"
                }`}
              >
                <div className="text-sm font-bold">{p.nome}</div>
                <div className="text-xs text-muted-foreground">{p.descricao}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-sm border border-border p-6">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Calibração do score
            </div>
            <ul className="flex flex-col gap-3">
              {pesosScore.map((p) => (
                <li key={p.fator} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{p.fator}</span>
                  <span className="font-mono font-bold">{(p.peso * 100).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-border p-6">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Fontes de dados
            </div>
            <ul className="flex flex-col divide-y divide-border">
              {fontesDados.map((f) => (
                <li key={f.nome} className="flex items-center justify-between py-3 text-sm">
                  <span>{f.nome}</span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">
                    {f.atualizacao}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
