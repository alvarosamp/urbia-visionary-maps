import { createFileRoute, Link } from "@tanstack/react-router";
import mapaH3 from "@/assets/mapa-h3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Urbia — Inteligência Territorial de Precisão" },
      {
        name: "description",
        content:
          "Plataforma de inteligência territorial: grade H3, Plano Diretor, NDVI/NDBI e score explicável para decisões de investimento imobiliário.",
      },
      { property: "og:title", content: "Urbia — Inteligência Territorial de Precisão" },
      {
        property: "og:description",
        content:
          "Transforme dados geoespaciais e o Plano Diretor em decisões de capital, com score explicável por área.",
      },
    ],
  }),
  component: Index,
});

const capacidades = [
  {
    tag: "01 // GEO-ANÁLISE",
    titulo: "Grade H3 Uber",
    texto:
      "Indexação espacial de alta performance para análise granular de micro-mercados urbanos.",
  },
  {
    tag: "02 // LEGAL",
    titulo: "Plano Diretor Digital",
    texto:
      "Mapeamento instantâneo de restrições legais, recuos e potencial construtivo por lote.",
  },
  {
    tag: "03 // AMBIENTAL",
    titulo: "Índices NDVI/NDBI",
    texto:
      "Sensoriamento remoto para identificar ilhas de calor e permeabilidade do solo em tempo real.",
  },
  {
    tag: "04 // MERCADO",
    titulo: "Pricing Preditivo",
    texto:
      "Modelos que estimam VGV e liquidez com base em históricos transacionais da região.",
  },
  {
    tag: "05 // EXPANSÃO",
    titulo: "Gap Analysis",
    texto:
      "Identificação de vazios urbanos e carência de serviços essenciais para novos negócios.",
  },
  {
    tag: "06 // TRANSPARÊNCIA",
    titulo: "Score Explicável",
    texto:
      "Cada avaliação territorial acompanha a linhagem completa dos dados e pesos utilizados.",
  },
];

const perfis = [
  {
    titulo: "Incorporadoras",
    texto:
      "Identifique o próximo terreno ideal antes da concorrência com análise de potencial construtivo.",
  },
  {
    titulo: "Investidores",
    texto:
      "Mitigue riscos diversificando capital em áreas com score de liquidez comprovado.",
  },
  {
    titulo: "Poder Público",
    texto:
      "Monitore a expansão urbana e planeje infraestrutura baseada em dados de sensoriamento.",
  },
  {
    titulo: "Corretores",
    texto:
      "Entregue argumentos técnicos e laudos territoriais irrefutáveis para seus clientes.",
  },
];

const metricas = [
  { rotulo: "Score Médio Região", valor: "84.2", destaque: false },
  { rotulo: "Liquidez Estimada", valor: "Alta", destaque: true },
  { rotulo: "Área Mapeada", valor: "142km²", destaque: false },
  { rotulo: "Resolução H3", valor: "Nível 8", destaque: false },
];

const hexOpacidades = [
  "bg-foreground",
  "bg-foreground opacity-50",
  "bg-primary",
  "bg-foreground opacity-30",
  "bg-foreground",
  "bg-foreground opacity-60",
  "bg-foreground",
  "bg-foreground",
  "bg-primary opacity-80",
  "bg-foreground",
  "bg-foreground",
  "bg-foreground opacity-40",
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold uppercase tracking-tighter">Urbia</span>
            <div className="hidden gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex">
              <a href="#capacidades" className="transition-colors hover:text-foreground">
                Explorar
              </a>
              <a href="#fontes" className="transition-colors hover:text-foreground">
                Dados Geográficos
              </a>
              <a href="#capacidades" className="transition-colors hover:text-foreground">
                Metodologia
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase">
            <a href="#acesso" className="rounded px-3 py-1 transition-colors hover:bg-accent">
              Acesso
            </a>
            <Link
              to="/app"
              className="rounded-sm bg-foreground px-4 py-2 text-background transition-colors hover:bg-primary"
            >
              Abrir Plataforma
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-32">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded bg-primary/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Piloto: Pouso Alegre, MG
            </div>
            <h1 className="mb-8 text-balance text-5xl font-extrabold leading-[0.9] tracking-tighter lg:text-7xl">
              INTELIGÊNCIA
              <br />
              TERRITORIAL DE
              <br />
              PRECISÃO.
            </h1>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
              Transforme dados geoespaciais e o Plano Diretor em decisões de capital. Grade H3
              com explicabilidade de score para cada metro quadrado.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/app"
                className="bg-foreground px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-background ring-primary ring-offset-2 transition-all duration-300 hover:bg-primary focus:ring-2"
              >
                Iniciar Análise
              </Link>
              <a
                href="#capacidades"
                className="border border-foreground/20 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest transition-all hover:bg-accent"
              >
                Ver Metodologia
              </a>
            </div>
          </div>

          <div className="animate-fade-up relative [animation-delay:200ms]">
            <div className="grid grid-cols-6 gap-2 opacity-20">
              {hexOpacidades.map((classe, i) => (
                <div key={i} className={`hex-clip aspect-square ${classe}`} />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 rounded-sm border border-primary/40 bg-background p-4 shadow-2xl">
                <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    Zoneamento H3-L8
                  </span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">
                    45.9248° W
                  </span>
                </div>
                <img
                  src={mapaH3}
                  alt="Grade hexagonal H3 sobreposta ao mapa de um distrito urbano com destaques de calor"
                  width={1200}
                  height={800}
                  className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-border"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-surface">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-8 px-6 py-4">
            {metricas.map((m) => (
              <div key={m.rotulo} className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-tighter text-muted-foreground">
                  {m.rotulo}
                </span>
                <span
                  className={`font-mono text-xl font-bold ${m.destaque ? "text-primary" : ""}`}
                >
                  {m.valor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section id="capacidades" className="border-b border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <h2 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              Capacidades Técnicas
            </h2>
            <p className="text-3xl font-bold tracking-tight">
              Uma infraestrutura de dados desenhada para mitigar riscos imobiliários.
            </p>
          </div>

          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {capacidades.map((c) => (
              <div
                key={c.tag}
                className="bg-background p-8 transition-colors hover:bg-surface"
              >
                <div className="mb-6 font-mono text-[10px] text-muted-foreground">{c.tag}</div>
                <h3 className="mb-4 text-xl font-bold">{c.titulo}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fontes" className="bg-foreground py-12 text-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6">
          <div className="flex flex-wrap items-center gap-4 border-l border-primary/30 pl-6">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-primary">
              Fontes Primárias
            </span>
            <div className="flex flex-wrap gap-8 text-[11px] font-bold uppercase tracking-tighter opacity-70">
              <span>IBGE Maps</span>
              <span>Prefeitura Municipal</span>
              <span>Sentinel-2 L2A</span>
              <span>Registros Imobiliários</span>
            </div>
          </div>
          <div className="max-w-xs font-mono text-[9px] uppercase leading-tight opacity-50 md:text-right">
            Dados processados via URBIA Engine. Atualização mensal sincronizada com o Diário
            Oficial.
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {perfis.map((p, i) => (
              <div
                key={p.titulo}
                className={`pt-6 ${i === 0 ? "border-t-2 border-primary" : "border-t border-border"}`}
              >
                <h3 className="mb-2 font-bold">{p.titulo}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="acesso" className="relative bg-background py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-4xl font-extrabold tracking-tighter md:text-6xl">
            O TERRITÓRIO AGORA É LEGÍVEL.
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Agende uma demonstração personalizada com nossos engenheiros de dados e conheça o
            potencial de Pouso Alegre.
          </p>
          <a
            href="mailto:contato@urbia.com.br"
            className="inline-block rounded-sm bg-primary px-12 py-5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110"
          >
            Solicitar Demo Técnica
          </a>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 md:flex-row">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-extrabold uppercase tracking-tighter">Urbia</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">
              © 2026 Inteligência Territorial
            </span>
          </div>
          <div className="grid grid-cols-2 gap-12 font-mono text-[11px] uppercase tracking-widest md:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="font-bold text-foreground">Produto</span>
              <a href="#capacidades" className="text-muted-foreground hover:text-primary">
                Mapa H3
              </a>
              <a href="#capacidades" className="text-muted-foreground hover:text-primary">
                API Geo
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-foreground">Empresa</span>
              <a href="#fontes" className="text-muted-foreground hover:text-primary">
                Sobre
              </a>
              <a href="#acesso" className="text-muted-foreground hover:text-primary">
                Contato
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-bold text-foreground">Legal</span>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Privacidade
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Termos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
