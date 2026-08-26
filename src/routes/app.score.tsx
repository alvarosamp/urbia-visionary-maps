import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/urbia/AppShell";
import { celulas, fontesDados, pesosScore } from "@/lib/urbia-data";

export const Route = createFileRoute("/app/score")({
  head: () => ({
    meta: [
      { title: "Score Explicável — Urbia" },
      {
        name: "description",
        content:
          "Entenda a composição do score territorial da Urbia: pesos, fatores e linhagem das fontes de dados.",
      },
      { property: "og:title", content: "Score Explicável — Urbia" },
      {
        property: "og:description",
        content: "Pesos, fatores e linhagem completa por trás de cada score territorial.",
      },
    ],
  }),
  component: ScorePage,
});

function ScorePage() {
  const [idSelecionado, setIdSelecionado] = useState(celulas[0]!.id);
  const celula = celulas.find((c) => c.id === idSelecionado)!;

  return (
    <AppShell
      titulo="Score Explicável"
      descricao="Cada avaliação acompanha pesos e linhagem dos dados"
      acoes={
        <select
          value={idSelecionado}
          onChange={(e) => setIdSelecionado(e.target.value)}
          className="rounded-sm border border-border bg-background px-2 py-2 font-mono text-[11px] uppercase outline-none focus:border-primary"
        >
          {celulas.slice(0, 40).map((c) => (
            <option key={c.id} value={c.id}>
              {c.bairro} — {c.score}
            </option>
          ))}
        </select>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-sm border border-border p-6 lg:col-span-2">
          <div className="mb-6 flex items-end justify-between border-b border-border pb-4">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {celula.id}
              </div>
              <div className="text-2xl font-bold tracking-tight">{celula.bairro}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Score final
              </div>
              <div className="font-mono text-4xl font-extrabold text-primary">
                {celula.score}
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-5">
            {pesosScore.map((p, i) => {
              const contribuicao = Math.round(
                Math.min(100, celula.score + (i % 2 === 0 ? 6 : -8) + i * 2),
              );
              return (
                <li key={p.fator}>
                  <div className="mb-1 flex items-baseline justify-between text-sm">
                    <span>{p.fator}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      peso {(p.peso * 100).toFixed(0)}% · {contribuicao}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-accent">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${contribuicao}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-sm border border-border p-6">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Linhagem dos dados
          </div>
          <ul className="flex flex-col divide-y divide-border">
            {fontesDados.map((f) => (
              <li key={f.nome} className="py-3">
                <div className="text-sm font-medium">{f.nome}</div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground">
                  atualizado {f.atualizacao} · cobertura {f.cobertura}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            O score é uma média ponderada normalizada (0—100) por célula H3 nível 8. Pesos podem
            ser recalibrados por perfil de uso em Configurações.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
