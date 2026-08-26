import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/urbia/AppShell";
import { celulas } from "@/lib/urbia-data";

export const Route = createFileRoute("/app/comparar")({
  head: () => ({
    meta: [
      { title: "Comparar Áreas — Urbia" },
      {
        name: "description",
        content:
          "Compare lado a lado células H3 por score, liquidez, potencial construtivo e índices ambientais.",
      },
      { property: "og:title", content: "Comparar Áreas — Urbia" },
      {
        property: "og:description",
        content: "Comparação lado a lado de micro-mercados urbanos.",
      },
    ],
  }),
  component: CompararPage,
});

const linhas = [
  { chave: "score", rotulo: "Score" },
  { chave: "liquidez", rotulo: "Liquidez" },
  { chave: "potencial", rotulo: "Potencial construtivo" },
  { chave: "precoM2", rotulo: "Preço m² (R$)" },
  { chave: "coefAproveitamento", rotulo: "Coef. de aproveitamento" },
  { chave: "ndvi", rotulo: "NDVI" },
  { chave: "ndbi", rotulo: "NDBI" },
] as const;

function CompararPage() {
  const [ids, setIds] = useState<string[]>([celulas[0]!.id, celulas[5]!.id, celulas[11]!.id]);
  const selecionadas = ids.map((id) => celulas.find((c) => c.id === id)!);

  return (
    <AppShell titulo="Comparar Áreas" descricao="Até três células H3 lado a lado">
      <div className="grid gap-4 md:grid-cols-3">
        {ids.map((id, i) => (
          <select
            key={i}
            value={id}
            onChange={(e) =>
              setIds((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
            }
            className="rounded-sm border border-border bg-background px-3 py-2 font-mono text-[11px] uppercase outline-none focus:border-primary"
          >
            {celulas.slice(0, 40).map((c) => (
              <option key={c.id} value={c.id}>
                {c.bairro} — {c.id.slice(-6)}
              </option>
            ))}
          </select>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-sm border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 text-left">Indicador</th>
              {selecionadas.map((c, i) => (
                <th key={i} className="px-4 py-3 text-right">
                  {c.bairro}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => {
              const valores = selecionadas.map((c) => Number(c[l.chave]));
              const melhor =
                l.chave === "precoM2" || l.chave === "ndbi"
                  ? Math.min(...valores)
                  : Math.max(...valores);
              return (
                <tr key={l.chave} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-muted-foreground">{l.rotulo}</td>
                  {valores.map((v, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 text-right font-mono ${
                        v === melhor ? "font-bold text-primary" : ""
                      }`}
                    >
                      {l.chave === "precoM2" ? v.toLocaleString("pt-BR") : v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
