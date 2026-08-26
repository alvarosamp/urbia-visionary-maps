export type PerfilId = "investidor" | "corretor" | "incorporadora" | "publico";

export const perfis: { id: PerfilId; nome: string; descricao: string }[] = [
  {
    id: "investidor",
    nome: "Investidor",
    descricao: "Liquidez, risco e retorno estimado por micro-mercado.",
  },
  {
    id: "corretor",
    nome: "Corretor",
    descricao: "Argumentos técnicos e laudos territoriais para clientes.",
  },
  {
    id: "incorporadora",
    nome: "Incorporadora",
    descricao: "Potencial construtivo, VGV e restrições do Plano Diretor.",
  },
  {
    id: "publico",
    nome: "Poder Público",
    descricao: "Expansão urbana, vazios e carência de serviços.",
  },
];

export type PaginaId =
  | "mapa"
  | "oportunidades"
  | "score"
  | "comparar"
  | "relatorios"
  | "configuracoes";

export const paginas: {
  id: PaginaId;
  rotulo: string;
  to: string;
  perfis: PerfilId[];
  grupo: "Análise" | "Decisão" | "Conta";
}[] = [
  {
    id: "mapa",
    rotulo: "Mapa H3",
    to: "/app",
    perfis: ["investidor", "corretor", "incorporadora", "publico"],
    grupo: "Análise",
  },
  {
    id: "score",
    rotulo: "Score Explicável",
    to: "/app/score",
    perfis: ["investidor", "corretor", "incorporadora", "publico"],
    grupo: "Análise",
  },
  {
    id: "oportunidades",
    rotulo: "Oportunidades",
    to: "/app/oportunidades",
    perfis: ["investidor", "incorporadora", "corretor"],
    grupo: "Decisão",
  },
  {
    id: "comparar",
    rotulo: "Comparar Áreas",
    to: "/app/comparar",
    perfis: ["investidor", "incorporadora", "publico"],
    grupo: "Decisão",
  },
  {
    id: "relatorios",
    rotulo: "Relatórios",
    to: "/app/relatorios",
    perfis: ["corretor", "incorporadora", "publico"],
    grupo: "Decisão",
  },
  {
    id: "configuracoes",
    rotulo: "Configurações",
    to: "/app/configuracoes",
    perfis: ["investidor", "corretor", "incorporadora", "publico"],
    grupo: "Conta",
  },
];

export type Celula = {
  id: string;
  bairro: string;
  score: number;
  liquidez: number;
  potencial: number;
  ndvi: number;
  ndbi: number;
  precoM2: number;
  zoneamento: string;
  coefAproveitamento: number;
  q: number;
  r: number;
};

const bairros = [
  "Centro",
  "Jardim Alvorada",
  "São Geraldo",
  "Cidade Jardim",
  "Faisqueira",
  "Santa Rita",
  "Foch",
  "Primavera",
  "Belo Horizonte",
  "Pinheirinho",
];

const zonas = ["ZC-1", "ZR-2", "ZM-3", "ZEIS", "ZI-1", "ZPA"];

function pseudo(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export const celulas: Celula[] = (() => {
  const out: Celula[] = [];
  let i = 0;
  for (let r = 0; r < 9; r++) {
    for (let q = 0; q < 12; q++) {
      i++;
      const base = pseudo(i);
      const score = Math.round(38 + base * 58);
      out.push({
        id: `88a8100${i.toString(16).padStart(3, "0")}ffff`,
        bairro: bairros[Math.floor(pseudo(i + 7) * bairros.length)],
        score,
        liquidez: Math.round(30 + pseudo(i + 13) * 68),
        potencial: Math.round(25 + pseudo(i + 29) * 74),
        ndvi: Number((0.08 + pseudo(i + 41) * 0.62).toFixed(2)),
        ndbi: Number((-0.2 + pseudo(i + 53) * 0.6).toFixed(2)),
        precoM2: Math.round(1400 + pseudo(i + 61) * 4200),
        zoneamento: zonas[Math.floor(pseudo(i + 71) * zonas.length)],
        coefAproveitamento: Number((1 + pseudo(i + 83) * 3).toFixed(1)),
        q,
        r,
      });
    }
  }
  return out;
})();

export const pesosScore = [
  { fator: "Acessibilidade e mobilidade", peso: 0.24 },
  { fator: "Potencial construtivo (Plano Diretor)", peso: 0.21 },
  { fator: "Liquidez transacional histórica", peso: 0.19 },
  { fator: "Infraestrutura e serviços essenciais", peso: 0.16 },
  { fator: "Qualidade ambiental (NDVI/NDBI)", peso: 0.12 },
  { fator: "Risco e restrições legais", peso: 0.08 },
];

export const oportunidades = celulas
  .slice()
  .sort((a, b) => b.score - a.score)
  .slice(0, 8);

export function corDoScore(score: number) {
  if (score >= 80) return "bg-primary";
  if (score >= 65) return "bg-primary/60";
  if (score >= 50) return "bg-foreground/35";
  return "bg-foreground/15";
}

export const fontesDados = [
  { nome: "IBGE Malhas Territoriais", atualizacao: "2026-07", cobertura: "100%" },
  { nome: "Plano Diretor — Pouso Alegre", atualizacao: "2026-06", cobertura: "98%" },
  { nome: "Sentinel-2 L2A (NDVI/NDBI)", atualizacao: "2026-08", cobertura: "100%" },
  { nome: "Registros de transações", atualizacao: "2026-05", cobertura: "76%" },
];
