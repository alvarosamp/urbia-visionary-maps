import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/urbia/AppShell";
import { HexGrid } from "@/components/urbia/HexGrid";
import { usePerfil } from "@/lib/perfil";
import { celulas, type Celula } from "@/lib/urbia-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Mapa H3 — Urbia" },
      {
        name: "description",
        content:
          "Explore a grade H3 de Pouso Alegre com score territorial, zoneamento e índices ambientais por célula.",
      },
      { property: "og:title", content: "Mapa H3 — Urbia" },
      {
        property: "og:description",
        content: "Grade hexagonal H3 com score explicável por célula urbana.",
      },
    ],
  }),
  component: MapaPage,
});

const destaquePorPerfil: Record<string, string> = {
  investidor: "Ordenado por liquidez estimada",
  corretor: "Ordenado por argumentos de venda",
  incorporadora: "Ordenado por potencial construtivo",
  publico: "Ordenado por carência de serviços",
};

function MapaPage() {
  const { perfil } = usePerfil();
  const [selecionada, setSelecionada] = useState<Celula | null>(celulas[0] ?? null);
  const [filtroMin, setFiltroMin] = useState(0);

  return (
    <AppShell
      titulo="Mapa H3"
      descricao={`Pouso Alegre, MG — ${destaquePorPerfil[perfil]}`}
      acoes={
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Score mínimo {filtroMin}
          </span>
          <input
            type="range"
            min={0}
            max={95}
            value={filtroMin}
            onChange={(e) => setFiltroMin(Number(e.target.value))}
            className="w-32 accent-[var(--primary)]"
          />
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <HexGrid
          selecionada={selecionada}
          onSelecionar={setSelecionada}
          filtroMin={filtroMin}
        />

        <aside className="flex flex-col gap-6">
          {selecionada && (
            <div className="rounded-sm border border-border">
              <div className="border-b border-border px-5 py-4">
                <div className="font-mono text-[9px] uppercase tracking-widest text-primary">
                  Célula selecionada
                </div>
                <div className="mt-1 text-lg font-bold">{selecionada.bairro}</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  {selecionada.id}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                <Metrica rotulo="Score" valor={String(selecionada.score)} destaque />
                <Metrica rotulo="Liquidez" valor={`${selecionada.liquidez}`} />
                <Metrica rotulo="Potencial" valor={`${selecionada.potencial}`} />
                <Metrica rotulo="Zoneamento" valor={selecionada.zoneamento} />
                <Metrica rotulo="Coef. aprov." valor={`${selecionada.coefAproveitamento}x`} />
                <Metrica
                  rotulo="Preço m²"
                  valor={`R$ ${selecionada.precoM2.toLocaleString("pt-BR")}`}
                />
                <Metrica rotulo="NDVI" valor={selecionada.ndvi.toFixed(2)} />
                <Metrica rotulo="NDBI" valor={selecionada.ndbi.toFixed(2)} />
              </div>
            </div>
          )}

          <div className="rounded-sm border border-border p-5">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Top células no recorte
            </div>
            <ul className="flex flex-col divide-y divide-border">
              {celulas
                .filter((c) => c.score >= filtroMin)
                .sort((a, b) => b.score - a.score)
                .slice(0, 6)
                .map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => setSelecionada(c)}
                      className="flex w-full items-center justify-between py-2 text-left text-sm transition-colors hover:text-primary"
                    >
                      <span>{c.bairro}</span>
                      <span className="font-mono text-xs font-bold">{c.score}</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Metrica({
  rotulo,
  valor,
  destaque,
}: {
  rotulo: string;
  valor: string;
  destaque?: boolean;
}) {
  return (
    <div className="bg-background px-5 py-4">
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        {rotulo}
      </div>
      <div className={`font-mono text-lg font-bold ${destaque ? "text-primary" : ""}`}>
        {valor}
      </div>
    </div>
  );
}
