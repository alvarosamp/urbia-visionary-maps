import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { usePerfil } from "@/lib/perfil";
import { perfis } from "@/lib/urbia-data";

export function AppShell({
  titulo,
  descricao,
  acoes,
  children,
}: {
  titulo: string;
  descricao?: string;
  acoes?: ReactNode;
  children: ReactNode;
}) {
  const { perfil, setPerfil, paginasVisiveis } = usePerfil();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [aberto, setAberto] = useState(false);
  const grupos = ["Análise", "Decisão", "Conta"] as const;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-surface transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            aberto ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Link to="/" className="text-lg font-extrabold uppercase tracking-tighter">
              Urbia
            </Link>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              v0.9
            </span>
          </div>

          <div className="border-b border-border px-6 py-5">
            <label className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Perfil de uso
            </label>
            <select
              value={perfil}
              onChange={(e) => setPerfil(e.target.value as typeof perfil)}
              className="w-full rounded-sm border border-border bg-background px-2 py-2 font-mono text-[11px] uppercase tracking-tight outline-none focus:border-primary"
            >
              {perfis.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
              {perfis.find((p) => p.id === perfil)?.descricao}
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-5">
            {grupos.map((grupo) => {
              const itens = paginasVisiveis.filter((p) => p.grupo === grupo);
              if (itens.length === 0) return null;
              return (
                <div key={grupo} className="mb-6">
                  <div className="mb-2 px-3 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    {grupo}
                  </div>
                  <ul className="flex flex-col gap-1">
                    {itens.map((item) => {
                      const ativo =
                        item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
                      return (
                        <li key={item.id}>
                          <Link
                            to={item.to}
                            onClick={() => setAberto(false)}
                            className={`block rounded-sm px-3 py-2 text-sm transition-colors ${
                              ativo
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                          >
                            {item.rotulo}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>

          <div className="border-t border-border px-6 py-4 font-mono text-[9px] uppercase leading-relaxed text-muted-foreground">
            Piloto: Pouso Alegre, MG
            <br />
            H3 resolução 8
          </div>
        </aside>

        {aberto && (
          <button
            aria-label="Fechar menu"
            onClick={() => setAberto(false)}
            className="fixed inset-0 z-30 bg-foreground/30 lg:hidden"
          />
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAberto(true)}
                  className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase lg:hidden"
                >
                  Menu
                </button>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">{titulo}</h1>
                  {descricao && (
                    <p className="text-xs text-muted-foreground">{descricao}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">{acoes}</div>
            </div>
          </header>
          <main className="px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
