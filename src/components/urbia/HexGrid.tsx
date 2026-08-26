import { celulas, corDoScore, type Celula } from "@/lib/urbia-data";

export function HexGrid({
  selecionada,
  onSelecionar,
  filtroMin = 0,
}: {
  selecionada?: Celula | null;
  onSelecionar?: (c: Celula) => void;
  filtroMin?: number;
}) {
  const linhas = Array.from(new Set(celulas.map((c) => c.r)));

  return (
    <div className="relative overflow-hidden rounded-sm border border-border bg-surface p-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_6%,transparent)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="relative flex flex-col gap-1">
        {linhas.map((r) => (
          <div
            key={r}
            className="flex gap-1"
            style={{ marginLeft: r % 2 === 1 ? "1.6%" : undefined }}
          >
            {celulas
              .filter((c) => c.r === r)
              .map((c) => {
                const apagada = c.score < filtroMin;
                const ativa = selecionada?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelecionar?.(c)}
                    title={`${c.bairro} — score ${c.score}`}
                    className={`hex-clip aspect-square flex-1 transition-all duration-200 ${corDoScore(
                      c.score,
                    )} ${apagada ? "opacity-10" : "opacity-90 hover:opacity-100"} ${
                      ativa ? "scale-110 outline outline-2 outline-primary" : ""
                    }`}
                  />
                );
              })}
          </div>
        ))}
      </div>
      <div className="relative mt-6 flex flex-wrap items-center gap-6 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        <span>Legenda</span>
        <span className="flex items-center gap-2">
          <span className="hex-clip size-3 bg-primary" /> 80+
        </span>
        <span className="flex items-center gap-2">
          <span className="hex-clip size-3 bg-primary/60" /> 65—79
        </span>
        <span className="flex items-center gap-2">
          <span className="hex-clip size-3 bg-foreground/35" /> 50—64
        </span>
        <span className="flex items-center gap-2">
          <span className="hex-clip size-3 bg-foreground/15" /> &lt; 50
        </span>
      </div>
    </div>
  );
}
