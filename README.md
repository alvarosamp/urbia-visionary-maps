# Urbia Insights

Prompt para o Lovable — Redesign visual do Urbia

Cole o texto abaixo no Lovable. Antes de colar, substitua [LINK DO REPOSITÓRIO] pela URL do seu repositório no GitHub (ex: https://github.com/seu-usuario/RecomendacaoImobiliaria).

Contexto do produto

Estou construindo o Urbia, uma plataforma de inteligência territorial para apoiar decisões de investimento imobiliário, expansão urbana e implantação de serviços (o piloto é a cidade de Pouso Alegre, MG, mas a ferramenta é pensada para qualquer cidade). Ela combina dados geoespaciais (grade H3), zoneamento e Plano Diretor, sensoriamento remoto (NDVI/NDBI), dados de mercado imobiliário e um score explicável por área — mostrando não só "quanto vale" mas "por quê", incluindo restrições legais.

O público é investidor, incorporadora, corretor e poder público. O tom precisa transmitir confiança, rigor técnico e sofisticação — é uma ferramenta de decisão com dinheiro real envolvido, não um app consumer.

Repositório com o código atual (React + Vite): [LINK DO REPOSITÓRIO] — pasta do frontend é frontend/.

O que existe hoje

Stack: React 18 + Vite, react-router-dom para rotas, CSS puro em src/index.css (sem Tailwind, sem biblioteca de componentes), deck.gl + h3-js para o mapa hexagonal.

Identidade visual atual: paleta navy (#1B2A4A) + dourado (#C9A84C), fundo bege claro, tipografia Playfair Display (títulos, serifada) + Inter (corpo). Um estilo "imobiliária de alto padrão".

Estrutura de telas:

Landing page pública (LandingPage.jsx): nav, hero, grid de funcionalidades, seção "para quem" (perfis: incorporadoras, investidores, corretores, poder público), CTA final, footer.

Login / Cadastro (LoginPage.jsx, RegisterPage.jsx).

App logado, com sidebar fixa à esquerda (navy, com grupos de navegação "Explorar / Analisar / Criar", seletor de "modo de trabalho" por perfil, avatar e logout) e área de conteúdo à direita:

MapPage.jsx — mapa hexagonal (deck.gl) com scores por célula, filtros e slider temporal.

OpportunitiesPage.jsx — ranking/tabela de oportunidades.

CommercePage.jsx — comércios/serviços faltantes por região.

ValuationPage.jsx — avaliação de imóvel (modelo de preço).

LeadsPage.jsx — lead scoring.

ConceptStudioPage.jsx e CaseStudyPage.jsx — estudo de conceito/obra e estudo de caso por área.

Componentes reutilizados entre páginas: KpiBar, OpportunitiesTable, PricePanel, PipelinePanel, MlopsPanel, TimeSlider, SetupScreen.

O que eu quero do Lovable

Quero uma repaginada visual completa, tanto da landing page quanto do app logado (todas as telas listadas acima), mantendo a mesma estrutura de informação e funcionalidade — não é para mudar o que o produto faz, é para melhorar como ele se apresenta.

Você tem liberdade para propor uma nova direção visual — não estou preso à paleta navy/dourado atual. Pode manter esse caminho "premium clássico" e refiná-lo, ou sugerir algo mais próximo de um SaaS de dados moderno (tons neutros + um accent de destaque, tipografia mais neutra, dashboards mais "limpos"). Traga a opção que você acha que melhor comunica confiança + sofisticação + clareza de dados para esse público. Se fizer sentido, me mostre 1-2 direções antes de aplicar em tudo.

Pontos específicos para melhorar:

Hierarquia visual e respiro: hoje a sidebar e os painéis são bem densos; quero mais clareza entre o que é primário/secundário em cada tela, sem perder densidade de informação (isso é um dashboard analítico, não pode virar vazio).

Consistência de componentes: cards, tabelas, badges de prioridade/risco, botões e estados (loading, vazio, erro) devem seguir um sistema visual único em todas as páginas.

Landing page: precisa converter — hero mais forte, prova social/credibilidade (dados oficiais, explicabilidade, Plano Diretor), CTA claro. Hoje usa ícones emoji nos cards de funcionalidades; pode trocar por iconografia consistente.

Mapa e dados espaciais: o mapa (deck.gl) é o coração do produto — quero que os painéis/legendas/filtros ao redor dele fiquem elegantes sem competir com o mapa.

Responsividade: hoje é essencialmente desktop-first; melhore o comportamento em telas menores, mesmo que o uso principal continue sendo desktop.

Microinterações: transições suaves em hover/seleção da sidebar, dos cards e da tabela de oportunidades.

Restrições

Não altere lógica de negócio, chamadas de API (src/api.js), roteamento ou os dados/estados dos componentes — só a camada visual (HTML/CSS/classes/estrutura de layout). Se migrar para Tailwind ou um design system (ex: shadcn), tudo bem, desde que a funcionalidade existente continue intacta.

Mantenha todos os textos em português (pt-BR).

Preserve a integração com deck.gl/h3-js no mapa — não recrie o mapa do zero, apenas o visual ao redor dele.

Perfis de usuário (investidor, corretor, incorporadora, poder público) mudam quais páginas aparecem na sidebar — mantenha essa lógica condicional.

Pode começar propondo a direção visual (paleta, tipografia, tom) e a landing page primeiro; depois seguimos para o app logado.

https://github.com/alvarosamp/RecomendacaoImobiliaria

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://urbia-visionary-maps.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/59e012f1-edb1-4af5-ba40-64faf0b851f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
