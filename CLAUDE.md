# CLAUDE.md — Site Neoquim Indústrias Químicas

Guia de arquitetura e conteúdo deste projeto. Leia antes de escrever qualquer código.

---

## 1. Visão geral

Site institucional da **Neoquim Indústrias Químicas Ltda** — fabricante de insumos químicos de
Itaquaquecetuba/SP, em operação desde 1983. Atende dois mercados: **tintas e vernizes** e
**perfuração de petróleo**, além de revenda/importação de matérias-primas.

**Objetivo do site:** apresentar a empresa e o portfólio e **captar lead B2B** — o visitante é um
comprador técnico ou formulador procurando fornecedor de insumo. Todo caminho deve levar a um dos
dois canais de conversão: o **formulário de contato** ou o **WhatsApp**.

Existe um protótipo em `https://neoquim-lp-builder.lovable.app/` construído no Lovable. Ele é
**referência visual e de conteúdo apenas** — não porte código de lá. Este projeto é escrito do zero.

---

## 2. Stack

| Camada | Escolha | Versão instalada |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.3 |
| UI | React | 19.2 |
| Linguagem | TypeScript em modo `strict` | 5.9 |
| Estilo | Tailwind CSS (tokens via `@theme` no CSS) | 4.3 |
| Validação | Zod | 4.4 |
| E-mail | Resend, disparado por Server Action | 6.18 |
| Utilitários | `clsx` + `tailwind-merge` (helper `cn`) | — |
| Renderização | SSG — as 19 rotas saem estáticas do build | — |

**Não há** banco de dados, autenticação, CMS ou área logada. Conteúdo mora em constants TypeScript.
Não adicione dependência de estado global (Redux, Zustand) — este site não tem estado de aplicação.

---

## 3. Arquitetura de pastas

```
src/
├── app/                          # SOMENTE roteamento
│   ├── layout.tsx                # <html lang="pt-BR">, Inter, Header, Footer, WhatsAppFab
│   ├── globals.css               # tokens + @theme do Tailwind
│   ├── page.tsx                  # → page/home
│   ├── sobre/page.tsx            # → page/sobre
│   ├── produtos/
│   │   ├── page.tsx              # → page/produtos
│   │   └── [slug]/page.tsx       # → page/produto-detalhe
│   ├── contato/page.tsx          # → page/contato
│   ├── not-found.tsx
│   ├── sitemap.ts
│   └── robots.ts
│
├── page/                         # camada de PÁGINA — uma pasta por rota
│   ├── home/
│   │   ├── page.tsx              # HomePage — composição da página
│   │   ├── components/           # seções exclusivas desta rota
│   │   │   ├── HeroSection.tsx
│   │   │   ├── QuemSomosSection.tsx
│   │   │   ├── MercadosSection.tsx
│   │   │   ├── ProdutosDestaqueSection.tsx
│   │   │   └── CtaEspecificacaoSection.tsx
│   │   └── constants/
│   │       └── home.constants.ts # hero, mercados, títulos de seção, CTA
│   ├── sobre/                    # QuemSomosSobre, TrajetoriaSection, QualidadeSection
│   ├── produtos/                 # page.tsx + produtos.constants.ts
│   ├── produto-detalhe/          # page.tsx + Breadcrumb + constants
│   └── contato/                  # page.tsx + contato.constants.ts
│
├── entity/                       # camada de DOMÍNIO — reutilizável entre páginas
│   ├── product/
│   │   ├── product.entity.ts     # PRODUCT_SLUGS, type Product, type ProductSlug
│   │   ├── constants/products.constants.ts   # os 11 produtos
│   │   ├── components/ProductCard.tsx, ProductGrid.tsx,
│   │   │              ProductHighlight.tsx, RelatedProducts.tsx
│   │   └── services/product.service.ts       # getAll, getBySlug, getHome,
│   │                                         # getFeatured, getListed, getRelated
│   ├── contact/
│   │   ├── contact.entity.ts     # schema Zod, ContactFormState, tipos
│   │   ├── action/sendContactMessage.ts      # "use server"
│   │   ├── services/email.service.ts         # Resend + escape de HTML
│   │   ├── components/ContactForm.tsx, ContactInfo.tsx, ContactMap.tsx
│   │   ├── hooks/useContactForm.ts           # useActionState
│   │   └── constants/contact.constants.ts
│   └── company/
│       ├── company.entity.ts
│       ├── constants/company.constants.ts    # NAP, ISO, timeline, WHATSAPP
│       └── components/Timeline.tsx, CertificationBanner.tsx
│
├── components/                   # UI compartilhada, sem domínio
│   ├── layout/Header.tsx, Footer.tsx, Logo.tsx, NavLinks.tsx,
│   │          MobileMenu.tsx, PageHero.tsx
│   ├── ui/Button.tsx (Button + ButtonLink), Card.tsx, Container.tsx,
│   │       Section.tsx (Section + SectionTitle), Field.tsx (Field + Input +
│   │       Select + Textarea), Icons.tsx
│   ├── WhatsAppFab.tsx
│   └── JsonLd.tsx                # dados estruturados LocalBusiness
│
├── constants/routes.constants.ts, navigation.constants.ts, seo.constants.ts
├── hooks/                        # hooks genéricos (vazio por ora)
└── utils/cn.ts, url.utils.ts     # cn, toWhatsAppUrl, toTelHref, toMailtoHref
```

As imagens ficam em `public/images/` e o logo em `public/logo/`.

### Template de cada camada

- **`page/<rota>/`** → `page.tsx` + `components/` + `constants/`
- **`entity/<dominio>/`** → `action/` + `services/` + `hooks/` + `constants/` + `components/` + `utils/`

Cada entidade usa **só o que precisa** — não crie pasta vazia para cumprir tabela. Na árvore acima,
`product` não tem `action/` nem `hooks/` porque é dado estático e só lido no servidor; `contact` usa
as seis porque tem mutação, formulário e estado de cliente. Se `product` ganhar uma mutação depois,
ela entra em `entity/product/action/`.

### ⚠️ NUNCA renomeie `src/page` para `src/pages`

`pages` (plural) é **diretório reservado do Next.js**. Mesmo com o App Router ativo, o Next continua
lendo `src/pages` como Pages Router legado e transforma os arquivos em rotas — `src/page/home/page.tsx`
viraria a URL `/home/page` e quebraria o build. O singular é intencional. O mesmo vale para `entity`.

### Regra de dependência

```
app  →  page  →  entity  →  components / constants / hooks / utils
```

O fluxo é de mão única.

- `entity` **nunca** importa de `page` ou de `app`.
- `page/home` **nunca** importa de `page/contato` — se dois páginas precisam da mesma coisa, ela sobe
  para `entity` (se tem domínio) ou para `components` (se é UI pura).
- `components/` não conhece produto, contato nem empresa. Um `Button` não sabe o que é um secante.

**Onde colocar um componente novo:**

| Pergunta | Destino |
|---|---|
| É usado por uma rota só e é uma seção dela? | `page/<rota>/components/` |
| Representa dado de negócio (produto, contato, empresa)? | `entity/<dominio>/components/` |
| É UI genérica, serviria em qualquer site? | `components/ui/` |

---

## 4. Convenções de código

**Nomes de arquivo**

| Tipo | Padrão | Exemplo |
|---|---|---|
| Componente | PascalCase | `ProductCard.tsx` |
| Constants | `*.constants.ts` | `products.constants.ts` |
| Service | `*.service.ts` | `email.service.ts` |
| Entidade/tipos | `*.entity.ts` | `contact.entity.ts` |
| Hook | `use*.ts` | `useContactForm.ts` |
| Util | `*.utils.ts` ou nome direto | `cn.ts` |

**Imports** — sempre por alias `@/*` (configure `"@/*": ["./src/*"]` no `tsconfig.json`).
Nunca `../../../`.

**Server vs Client** — tudo é Server Component por padrão. Hoje só **quatro** arquivos carregam
`"use client"`, e cada um tem um motivo concreto:

| Arquivo | Por quê |
|---|---|
| `entity/contact/components/ContactForm.tsx` | estado do formulário via `useActionState` |
| `entity/contact/hooks/useContactForm.ts` | hook do React |
| `components/layout/MobileMenu.tsx` | abre/fecha e trava o scroll |
| `components/layout/NavLinks.tsx` | `usePathname` para destacar a rota ativa |

Antes de marcar mais um componente como cliente, reveja — quase sempre dá para resolver no
servidor ou com CSS. `WhatsAppFab` e `JsonLd`, por exemplo, são Server Components: só renderizam
markup a partir de constants e variáveis de ambiente.

**Textos** — nenhum texto de conteúdo hardcoded no JSX. Todo copy vive em um arquivo de constants
(da página ou da entidade). O JSX consome. Isso permite revisar o texto sem tocar em layout.

**Rotas** — nunca escreva `/produtos/resinas-alquidicas` à mão. Use `ROUTES` de
`constants/routes.constants.ts`.

**`params` é Promise** — no App Router atual, `params` e `searchParams` são assíncronos:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

---

## 5. Design system

### Tokens

Cores extraídas do logo e do site. Definidas uma vez em `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand:      #445492;  /* azul da marca (extraído do logo)        */
  --color-brand-deep: #2f3b68;  /* variação escura                        */
  --color-accent:     #5fb0d4;  /* azul-claro dos botões do site          */
  --color-ink:        #1c2340;  /* texto principal                        */
  --color-muted:      #5a6178;  /* texto secundário                       */
  --color-line:       #e5e8f0;  /* linhas e divisórias                    */
  --color-bg:         #f5f6fa;  /* fundo da página                        */
  --color-card:       #ffffff;  /* fundo do cartão                        */
  --color-ok:         #1f7a5a;  /* estado de sucesso (verde AA no branco) */
  --color-product:    #2a9d7f;  /* verde dos cards de produto             */
  --color-whatsapp:   #25d366;  /* verde oficial da marca WhatsApp        */

  --font-sans: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI',
               Roboto, Helvetica, Arial, sans-serif;
}
```

Isso gera automaticamente as utilitárias: `bg-brand`, `text-ink`, `border-line`, `bg-accent`,
`text-muted`, `bg-card`, `text-ok`, `bg-product`, `bg-whatsapp`.

Os dois últimos tokens nasceram na implementação: o verde dos cards de produto e o verde oficial do
WhatsApp não estavam na paleta original, mas viraram token em vez de hex solto — que é exatamente o
que a regra abaixo manda fazer.

> Se o projeto acabar em Tailwind v3, os mesmos valores vão para `theme.extend.colors` no
> `tailwind.config.ts` — os nomes das classes não mudam.

**Regra dura: nenhum hex solto no JSX ou no CSS de componente.** Se precisa de uma cor que não está
na lista, ela vira token novo aqui — não uma exceção inline.

**Fonte:** Inter, carregada via `next/font/google` no `layout.tsx` (evita FOUT e request externo).

### Uso das cores

| Token | Onde |
|---|---|
| `brand` | header, botões primários, títulos de seção |
| `brand-deep` | ponta escura dos gradientes, footer |
| `accent` | botão "Fale com o comercial", links de destaque, ícones |
| `ink` | corpo de texto e títulos |
| `muted` | descrições, legendas, texto de apoio |
| `line` | bordas de card, divisórias |
| `bg` | fundo da página |
| `card` | fundo de card e do formulário |
| `ok` | mensagem de sucesso do formulário |

### Gradientes

Dois gradientes recorrentes no site:

- **Header, hero e bloco de CTA:** `brand-deep` → `brand`, na diagonal (`bg-gradient-to-br`).
  No hero há ainda uma foto de fundo com overlay do gradiente por cima, em opacidade que preserve
  contraste do texto branco.
- **Cards de produto:** verde-esmeralda sólido com texto branco (os cards da grade de produtos).

### Padrão de card

Fundo `card`, borda `1px` em `line`, `rounded-xl`, sombra sutil, hover elevando levemente com
transição de ~200ms. Cards clicáveis são `<Link>` envolvendo o conteúdo inteiro — não um botão
"saiba mais" isolado (área de toque maior no mobile).

### Tipografia

Mobile-first com escala fluida no hero. Títulos em peso 700, corpo em 400, `leading-relaxed` no
texto corrido. Largura de leitura confortável — não deixe parágrafo passar de ~70 caracteres.

### Container

`Container` centraliza com `max-w-6xl` e padding lateral que cresce com o breakpoint
(`px-4 sm:px-6 lg:px-8`). Toda seção usa `Container` — nunca aplique largura máxima solta.

---

## 6. Responsividade

**Mobile-first é obrigatório.** Escreva o estilo base para telas pequenas e use `sm: md: lg: xl:`
para ampliar. Nunca o inverso.

| Breakpoint | Largura |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

Comportamento esperado por bloco:

| Bloco | Mobile | Tablet | Desktop |
|---|---|---|---|
| Header | logo + hambúrguer | idem | nav horizontal completa + CTA (`md:`) |
| Hero | altura reduzida, título fluido, CTAs empilhados full-width | — | CTAs lado a lado |
| Mercados atendidos | 1 coluna | 2 colunas | 3 colunas |
| Grade de produtos | 1 coluna | 2 colunas | 4 colunas |
| Trajetória (timeline) | 1 coluna empilhada | 2 colunas | 4 colunas |
| Contato (info + form) | empilhado, form abaixo | idem | 2 colunas lado a lado |
| Campos do formulário | 1 coluna | pares lado a lado (`sm:`) | idem |
| Footer | 1 coluna | 2 colunas | 3 colunas |

**Regras de acessibilidade e toque**

- Alvo de toque mínimo **44×44px** em todo link e botão.
- Imagens sempre com `next/image`, `sizes` correto e `alt` descritivo. Só o hero leva `priority`.
- Contraste mínimo AA. Texto branco sobre foto exige overlay — nunca texto direto na imagem.
- Nenhum scroll horizontal em nenhuma largura. Teste em 320px.
- Foco visível no teclado em todos os interativos.

---

## 7. Botão flutuante de WhatsApp

`components/WhatsAppFab.tsx` — `"use client"`, renderizado uma vez no `layout.tsx`, presente em
todas as rotas.

**Comportamento**

- Posição `fixed`, canto inferior direito: `bottom-5 right-5 md:bottom-8 md:right-8`.
- Círculo de ~56px com ícone do WhatsApp, sombra, hover com leve escala.
- `z-index` acima do conteúdo, **abaixo** do menu mobile aberto (o menu não pode ficar atrás dele).
- Abre `https://wa.me/<numero>?text=<mensagem>` em nova aba, com `rel="noopener noreferrer"`.
- `aria-label="Falar com a Neoquim no WhatsApp"` — o ícone sozinho não é acessível.

**Configuração**

```
NEXT_PUBLIC_WHATSAPP_NUMBER=55119XXXXXXXX   # E.164 SEM o "+" e sem máscara
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Gostaria de falar com o time comercial da Neoquim.
```

A mensagem pré-preenchida passa por `encodeURIComponent`. Monte a URL com o helper
`toWhatsAppUrl()` em `utils/url.utils.ts` — não concatene string na mão.

**⚠️ Não deixe o FAB cobrir o botão "Enviar mensagem"** do formulário no mobile. A página `/contato`
precisa de padding inferior extra (`pb-24 md:pb-0`) para que o botão de submit nunca fique atrás do FAB.

---

## 8. Formulário de contato

Fluxo ponta a ponta:

```
ContactForm ("use client")
  └─ useContactForm (useActionState)
       └─ sendContactMessage  ("use server")
            ├─ contactSchema.safeParse()   ← validação que vale
            └─ email.service.ts → Resend
```

**Campos** (todos obrigatórios): Nome, Empresa, E-mail, Telefone, Produto de interesse (select),
Mensagem. Botão: "Enviar mensagem".

**`contact.entity.ts`** — schema Zod, fonte única de verdade dos tipos:

- `nome`, `empresa`: string não vazia, com limite máximo.
- `email`: formato de e-mail válido.
- `telefone`: telefone brasileiro (10 ou 11 dígitos após limpar a máscara).
- `produtoInteresse`: `z.enum` derivado dos slugs dos 11 produtos — não aceite string livre.
- `mensagem`: mínimo razoável de caracteres, máximo para conter abuso.
- `website`: honeypot. Se vier preenchido, retorne sucesso falso e **não** envie o e-mail.

**Server Action** `sendContactMessage(prevState, formData)` — retorna estado tipado
`{ status: 'idle' | 'success' | 'error', errors?, message? }`. O `useActionState` do React consome
esse retorno e o `useFormStatus` dá o estado de "enviando".

**Variáveis de ambiente**

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL_TO=vendas@neoquim.com.br      # destino do lead
CONTACT_EMAIL_FROM=site@neoquim.com.br      # remetente de domínio verificado no Resend
```

**Regras de segurança — não negociáveis**

1. `RESEND_API_KEY` **nunca** com prefixo `NEXT_PUBLIC_`. Só é lida dentro de `email.service.ts`,
   que por sua vez só é importado pela Server Action. Endurecimento opcional: instalar o pacote
   `server-only` e importá-lo no topo do service, para que o build quebre se alguém encostar esse
   arquivo em um componente de cliente.
2. Validação no servidor é a que conta. A validação no cliente existe só para UX.
3. `reply-to` do e-mail = e-mail do lead, para o comercial responder direto na thread.
4. Honeypot obrigatório contra bot.
5. Nunca interpole dado do formulário cru no HTML do e-mail — escape antes.
6. Mensagem de erro ao usuário é genérica. Detalhe técnico vai para o log do servidor, não para a tela.

**Estados da UI:** repouso → enviando (botão desabilitado, label muda) → sucesso (mensagem em
`text-ok`, formulário limpo) → erro (mensagem por campo e mensagem geral). Erros de campo ligados
ao input por `aria-describedby`.

---

## 9. Inventário de conteúdo

Fonte da verdade para popular as constants. Textos verbatim do site atual.

### Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/sobre` | Sobre nós |
| `/produtos` | Listagem de produtos |
| `/produtos/[slug]` | Detalhe do produto |
| `/contato` | Contato |

Navegação do header: Home · Sobre nós · Produtos · Contato + botão **"Fale com o comercial"**.

### Os 11 produtos

| # | Slug | Título | Descrição |
|---|---|---|---|
| 1 | `petroleo-perfuracao` | Petróleo Perfuração | Lubrificantes, Redutores, Emulsificantes primários e secundários. |
| 2 | `secantes-octoatos-naftenatos` | Secantes — Octoatos e Naftenatos | Sabões metálicos para secagem de tintas industriais, produzidos desde 1987. |
| 3 | `resinas-alquidicas` | Resinas Alquídicas | Resinas curtas, médias e longas em óleo para tintas e vernizes. |
| 4 | `acidos-graxos` | Ácidos Graxos | Matéria-prima para resinas, dispersantes e formulações industriais. |
| 5 | `catalisadores` | Catalisadores | Catalisadores para processos de esterificação e polimerização. |
| 6 | `ester` | Éster — NEOGREEN e UNIGREEN | Linha de ésteres de base renovável para aplicações de alto desempenho. |
| 7 | `tinta-base-solvente` | Tinta Base Solvente | Insumos completos para formulações base solvente. |
| 8 | `tinta-base-agua` | Tinta Base D'água | Aditivos e secantes desenvolvidos para sistemas aquosos. |
| 9 | `tinta-off-set` | Tinta Off-Set | Insumos para tintas gráficas de impressão off-set. |
| 10 | `revenda-materia-prima` | Revenda de Matéria Prima | Distribuição de matérias-primas químicas nacionais e importadas. |
| 11 | `dispersantes-inibidores` | Dispersantes e Inibidores | Dispersantes de pigmentos e inibidores de secatividade. |

`petroleo-perfuracao` é o **destaque** no topo de `/produtos`, em card largo com imagem.
A home mostra **8** deles (ver Pendências, §12). `/produtos` mostra os 11.

**Estrutura da página de detalhe:** breadcrumb (Home › Produtos › nome) → hero com título e
subtítulo → descrição → seção "Linha e aplicações" (lista de itens) → nota *"Especificações técnicas,
fichas de segurança e amostras podem ser solicitadas ao nosso time comercial."* → CTA "Solicitar
informações" (→ `/contato`) → imagem → 4 produtos relacionados.

Exemplo de "Linha e aplicações" (secantes): Octoatos de cobalto, manganês, zircônio, cálcio e zinco ·
Naftenatos metálicos · Secantes combinados sob especificação do cliente.

### Home

**Hero** — eyebrow: `DESDE 1983 · ITAQUAQUECETUBA/SP`
Título: *"Química industrial para tintas, vernizes e perfuração de petróleo"*
Subtítulo: *"Secantes metálicos, resinas alquídicas, dispersantes e insumos para fluidos de
perfuração — fabricados com Sistema de Gestão da Qualidade certificado."*
CTAs: **Ver produtos** (→ `/produtos`) · **Solicitar orçamento** (→ `/contato`)

**Faixa de certificação** — *"A Neoquim Indústrias Químicas Ltda possui seu Sistema de Gestão da
Qualidade certificado conforme requisitos da norma **ISO 9001:2015**, pelo organismo TÜV NORD Brasil."*

**Mercados atendidos** (3 cards com imagem)

| Título | Descrição | Imagem |
|---|---|---|
| Petróleo Perfuração | Lubrificantes, Redutores, Emulsificantes primários e secundários. | `petroleo.jpg` |
| Tintas e Vernizes | Secantes, resinas alquídicas, dispersantes e inibidores de secatividade. | `tintas.jpg` |
| Revenda e Importação | Distribuição de matérias-primas químicas nacionais e importadas. | `planta-aerea.jpg` |

**Bloco de CTA** — *"Precisa de um insumo sob especificação?"* / *"Nossa equipe técnica desenvolve
formulações e ajusta produtos conforme a necessidade da sua linha de produção."* → **Falar com o comercial**

### Sobre nós

**Hero:** *"Mais de quatro décadas produzindo química industrial em Itaquaquecetuba, São Paulo."*

**Quem somos** (2 parágrafos, também usados na home):

> A empresa foi constituída no início da década de 80 (1983), com o objetivo de fabricar produtos
> utilizados na perfuração de poços de Petróleo. Unidade fabril instalada na cidade de Itaquaquecetuba,
> no Estado de São Paulo, participa hoje ativamente dentro do Mercado de Insumos para a Indústria de
> Tintas e Vernizes.

> A partir de 1987 iniciou sua fabricação de Octoatos e Naftenatos de sabões metálicos utilizados para
> secagem de tintas industriais. Por possuir capacidade de produção ociosa, em 1989 iniciou a produção
> de Resinas Alquídicas comercializadas para o mesmo mercado. Dentro deste período foram agregados
> vários produtos, como dispersantes, inibidores de secatividade e revenda de matérias-primas.

**Nossa trajetória** (4 cards)

| Marco | Texto |
|---|---|
| 1983 | Constituição da empresa, voltada a produtos para perfuração de poços de petróleo. |
| 1987 | Início da fabricação de Octoatos e Naftenatos de sabões metálicos para secagem de tintas industriais. |
| 1989 | Início da produção de Resinas Alquídicas para o mercado de tintas e vernizes. |
| HOJE | Portfólio ampliado com dispersantes, inibidores de secatividade e revenda de matérias-primas. |

**Qualidade certificada** (com `reatores.jpg`) — texto da ISO acima, mais:
*"Cada lote é acompanhado por controle laboratorial próprio, garantindo repetibilidade e
rastreabilidade em toda a linha de produção."* → CTA **Fale conosco**

### Produtos

Hero: *"Principais Produtos e Matérias Primas"* /
*"Produção própria e revenda de insumos para a indústria de tintas, vernizes e para o setor de petróleo."*

### Contato

Hero: *"Contato"* / *"Nosso time comercial e técnico está à disposição para orçamentos, amostras e
especificações."*

### Dados da empresa (`company.constants.ts`)

| Campo | Valor |
|---|---|
| Razão social | NEOQUIM INDÚSTRIAS QUÍMICAS LTDA |
| Atividade | Industrialização, Comercialização, Importação e Exportação de Produtos Químicos. |
| Endereço | Rua do Alumínio, nº 141, Corredor — Itaquaquecetuba/SP, CEP 08586-220 |
| Comercial | vendas@neoquim.com.br · (11) 5090-5411 · (11) 5533-5411 |
| Fábrica | (11) 4646-2444 · (11) 4648-6445 |
| Horário | Seg. a sex., 8h às 17h |
| Certificação | ISO 9001:2015 — TÜV NORD Brasil |

Telefones renderizados como `<a href="tel:+5511...">` e e-mails como `mailto:`.

### Imagens

Servidas de `public/images/` e `public/logo/`.

| Arquivo | Uso |
|---|---|
| `planta-aerea.jpg` (1600×1000) | hero da home, "Quem somos" no /sobre, card Revenda |
| `petroleo.jpg` | card Petróleo Perfuração, destaque em /produtos |
| `tintas.jpg` | card Tintas e Vernizes |
| `reatores.jpg` | seção Qualidade certificada |
| `logo-neoquim.png` | header e footer |

O logo é claro (elipse branca com texto azul) — funciona sobre o gradiente escuro do header e do
footer, **não** sobre fundo branco sem ajuste.

---

## 10. SEO

- `metadata` exportada por rota. Título no padrão `<Página> | Neoquim Indústrias Químicas`.
- `/produtos/[slug]`: `generateStaticParams()` com os 11 slugs + `generateMetadata()` por produto.
  Slug desconhecido → `notFound()`.
- `metadataBase` e `openGraph` configurados no `layout.tsx` raiz, com imagem de preview.
- JSON-LD no `layout.tsx`: `Organization` e `LocalBusiness` com o NAP da §9 (endereço, telefones,
  horário). Em `/produtos/[slug]`, adicione `BreadcrumbList`.
- `sitemap.ts` gerando as 5 rotas + as 11 de produto a partir das constants — nunca lista manual.
- `robots.ts` liberando tudo e apontando para o sitemap.
- `lang="pt-BR"` no `<html>`.
- Um único `<h1>` por página.

---

## 11. Comandos

```bash
npm run dev        # desenvolvimento
npm run build      # build de produção — precisa passar antes de qualquer entrega
npm run lint
npm run typecheck  # tsc --noEmit
```

`.env.local` (não versionar; mantenha um `.env.example` sem valores reais):

```
NEXT_PUBLIC_SITE_URL=https://www.neoquim.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_WHATSAPP_MESSAGE=
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=
```

---

## 12. Pendências conhecidas

Itens em aberto — **pergunte ao responsável, não invente valor**.

### Valores provisórios em `.env.local` — trocar antes de publicar

| Variável | Valor atual | O que falta |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5511999999999` (genérico) | número comercial real da Neoquim |
| `CONTACT_EMAIL_TO` | `contato@livpro.com.br` | trocar por `vendas@neoquim.com.br` ou pela caixa dedicada a lead |
| `CONTACT_EMAIL_FROM` | `onboarding@resend.dev` (sandbox) | remetente em domínio verificado no Resend |
| `RESEND_API_KEY` | vazio | **enquanto estiver vazio o formulário valida mas não envia** — a action registra o erro no log e mostra a mensagem genérica |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | domínio final (afeta OG, canonical, sitemap e JSON-LD) |

### Conteúdo

1. **"Linha e aplicações" de 10 dos 11 produtos** — só `secantes-octoatos-naftenatos` tem os itens
   reais. Nos demais o campo `linha` está vazio de propósito e a página mostra um texto de fallback.
   Preencher em `products.constants.ts` **com o time técnico** — descrição de produto químico errada
   tem consequência real para quem formula.
2. **Quais 8 dos 11 produtos** vão na home. Hoje `destaqueHome: false` em Tinta Off-Set, Revenda de
   Matéria Prima e Dispersantes e Inibidores, espelhando o site atual — confirme se é intencional.
3. **Imagem de Open Graph** dedicada — hoje usa `planta-aerea.jpg`.
4. **Imagens próprias por produto** — só existem 4 fotos, reaproveitadas entre os 11 produtos.

### Técnico

5. **`npm run lint`** ainda não tem ESLint configurado no projeto.
6. **Sem rate limiting** no formulário. O honeypot pega bot burro; um limite por IP exige
   infraestrutura (Upstash, middleware) e ainda não foi decidido.
7. **npm incremental quebra neste projeto** — `npm install -D <pacote>` falha com
   `Invalid Version:` por um bug de dedupe do npm 11 com os binários de plataforma do Next 16.
   Para adicionar dependência: edite o `package.json` à mão e rode
   `rm -rf node_modules package-lock.json && npm install`.
