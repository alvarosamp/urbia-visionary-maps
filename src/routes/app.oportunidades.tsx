import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/urbia/AppShell";
import { celulas } from "@/lib/urbia-data";

export const Route = createFileRoute("/app/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades — Urbia" },
      {
        name: "description",
        content:
          "Ranking de células H3 com maior potencial de investimento, liquidez e potencial construtivo em Pouso Alegre.",
      },
      { property: "og:title", content: "Oportunidades — Urbia" },
      {
        property: "og:description",
        content: "Ranking territorial de oportunidades por score, liquidez e preço por m².",
      },
    ],
  }),
  component: OportunidadesPage,
});

type Ordem = "score" | "liquidez" | "potencial" | "precoM2";

function OportunidadesPage() {
  const [ordem, setOrdem] = useState<Ordem>("score");
  const [busca, setBusca] = useState("");

  const lista = celulas
    .filter((c) => c.bairro.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => (ordem === "precoM2" ? a[ordem] - b[ordem] : b[ordem] - a[ordem]))
    .slice(0, 24);

  return (
    <AppShell
      titulo="Oportunidades"
      descricao="Ranking de células priorizadas para o seu perfil"
      acoes={
        <div className="flex items-center gap-2">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar bairro"
            className="rounded-sm border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
          />
          <select
            value={ordem}
            onChange={(e) => setOrdem(e.target.value as Ordem)}
            className="rounded-sm border border-border bg-background px-2 py-2 font-mono text-[11px] uppercase outline-none focus:border-primary"
          >
            <option value="score">Score</option>
            <option value="liquidez">Liquidez</option>
            <option value="potencial">Potencial</option>
            <option value="precoM2">Menor preço m²</option>
          </select>
        </div>
      }
    >
      <div className="overflow-x-auto rounded-sm border border-border">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border bg-surface font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 text-left">Célula</th>
              <th className="px-4 py-3 text-left">Bairro</th>
              <th className="px-4 py-3 text-left">Zona</th>
              <th className="px-4 py-3 text-right">Score</th>
              <th className="px-4 py-3 text-right">Liquidez</th>
              <th className="px-4 py-3 text-right">Potencial</th>
              <th className="px-4 py-3 text-right">Preço m²</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{c.id}</td>
                <td className="px-4 py-3 font-medium">{c.bairro}</td>
                <td className="px-4 py-3 font-mono text-[11px]">{c.zoneamento}</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-primary">
                  {c.score}
                </td>
                <td className="px-4 py-3 text-right font-mono">{c.liquidez}</td>
                <td className="px-4 py-3 text-right font-mono">{c.potencial}</td>
                <td className="px-4 py-3 text-right font-mono">
                  R$ {c.precoM2.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
