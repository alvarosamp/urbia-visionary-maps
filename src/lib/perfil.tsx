import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { paginas, perfis, type PerfilId } from "./urbia-data";

const CHAVE = "urbia:perfil";

type Ctx = {
  perfil: PerfilId;
  setPerfil: (p: PerfilId) => void;
  paginasVisiveis: typeof paginas;
};

const PerfilContext = createContext<Ctx | null>(null);

export function PerfilProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfilState] = useState<PerfilId>("investidor");

  useEffect(() => {
    const salvo = window.localStorage.getItem(CHAVE) as PerfilId | null;
    if (salvo && perfis.some((p) => p.id === salvo)) setPerfilState(salvo);
  }, []);

  const valor = useMemo<Ctx>(
    () => ({
      perfil,
      setPerfil: (p) => {
        setPerfilState(p);
        window.localStorage.setItem(CHAVE, p);
      },
      paginasVisiveis: paginas.filter((pg) => pg.perfis.includes(perfil)),
    }),
    [perfil],
  );

  return <PerfilContext.Provider value={valor}>{children}</PerfilContext.Provider>;
}

export function usePerfil() {
  const ctx = useContext(PerfilContext);
  if (!ctx) throw new Error("usePerfil precisa estar dentro de PerfilProvider");
  return ctx;
}
