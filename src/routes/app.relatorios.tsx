import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/urbia/AppShell";
import { usePerfil } from "@/lib/perfil";
import { oportunidades } from "@/lib/urbia-data";

export const Route = createFileRoute("/app/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — Urbia" },
      {
        name: "description",
        content:
          "Gere laudos territoriais e relatórios de viabilidade com linhagem de dados para clientes e órgãos públicos.",
      },
      { property: "og:title", content: "Relatórios — Urbia" },
      {
        property: "og:description",
        content: "Laudos territoriais e relatórios de viabilidade prontos para apresentação.",
      },
    ],
  }),
  component: RelatoriosPage,
});

const modelos = {
  corretor: [
    { nome: "Laudo territorial do imóvel", prazo: "Instantâneo" },
    { nome: "Comparativo de bairros para cliente", prazo: "Instantâneo" },
  ],
  incorporadora: [
    { nome: "Estudo de viabilidade e VGV", prazo: "2 min" },
    { nome: "Restrições do Plano Diretor por lote", prazo: "Instantâneo" },
  ],
  publico: [
    { nome: "Diagnóstico de expansão urbana", prazo: "5 min" },
    { nome: "Mapa de carência de serviços", prazo: "2 min" },
  ],
  investidor: [{ nome: "Carteira territorial e risco", prazo: "2 min" }],
} as const;

function RelatoriosPage() {
  const { perfil } = usePerfil();

  return (
    <AppShell titulo="Relatórios" descricao="Modelos ajustados ao seu perfil de uso">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-sm border border-border p-6">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Modelos disponíveis
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {modelos[perfil].map((m) => (
              <li key={m.nome} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <div className="text-sm font-medium">{m.nome}</div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">
                    geração {m.prazo}
                  </div>
                </div>
                <button className="rounded-sm bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-background transition-colors hover:bg-primary">
                  Gerar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-sm border border-border p-6">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Áreas incluídas por padrão
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {oportunidades.slice(0, 6).map((c) => (
              <li key={c.id} className="flex items-center justify-between py-3 text-sm">
                <span>{c.bairro}</span>
                <span className="font-mono text-xs font-bold text-primary">{c.score}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            Todo relatório embarca a linhagem das fontes e a data de processamento, permitindo
            auditoria técnica das conclusões.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
