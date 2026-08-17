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
| E-mail | SMTP via nodemailer, disparado por Server Action | 9.0 |
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
│   ├── sobre/                    # QuemSomosSobre, MissaoVisaoValoresSection,
│   │                             # TrajetoriaSection, QualidadeSection
│   ├── produtos/                 # page.tsx + produtos.constants.ts
│   ├── produto-detalhe/          # page.tsx + Breadcrumb + constants
│   ├── sustentabilidade/         # page.tsx + PilarSection + constants
│   ├── canal-denuncias/          # page.tsx + constants (texto legal)
│   ├── admin/                    # painel restrito — page.tsx + constants
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
│   │   ├── services/email.service.ts         # monta o HTML do lead
│   │   ├── components/ContactForm.tsx, ContactInfo.tsx, ContactMap.tsx
│   │   ├── hooks/useContactForm.ts           # useActionState
│   │   └── constants/contact.constants.ts
│   ├── denuncia/
│   │   ├── denuncia.entity.ts    # schema Zod, assuntos, DenunciaFormState
│   │   ├── action/sendDenuncia.ts            # "use server"
│   │   ├── services/denuncia-email.service.ts # HTML + caixa de compliance
│   │   ├── components/DenunciaForm.tsx
│   │   ├── hooks/useDenunciaForm.ts
│   │   └── constants/denuncia.constants.ts
│   ├── admin/                    # login da área restrita (sessão HMAC em cookie,
│   │                             # bloqueio após 5 erros)
│   ├── certificate/              # certificado ISO no Vercel Blob (store privado)
│   └── company/
│       ├── company.entity.ts
│       ├── constants/company.constants.ts    # NAP, ISO, timeline, WHATSAPP,
│       │                                     # missão/visão/valores, política SGQ
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
├── services/                     # INFRAESTRUTURA compartilhada entre entidades
│   └── mailer.service.ts         # único ponto que conhece SMTP (nodemailer)
│
├── constants/routes.constants.ts, navigation.constants.ts, seo.constants.ts
├── hooks/                        # hooks genéricos (vazio por ora)
└── utils/cn.ts, url.utils.ts,    # cn, toWhatsAppUrl, toTelHref, toMailtoHref,
    format.utils.ts, html.utils.ts # formatMinutos, escapeHtml
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
app  →  page  →  entity  →  components / constants / hooks / services / utils
```

O fluxo é de mão única.

**`src/services/` vs `src/utils/`** — os dois são acessíveis por `entity`, mas não são a mesma coisa.
`utils/` são funções puras: entra valor, sai valor, sem efeito nem configuração (`cn`, `escapeHtml`,
`toTelHref`). `services/` é infraestrutura: lê variável de ambiente, abre conexão, fala com o mundo
de fora.

`mailer.service.ts` nasceu aqui porque **duas** entidades precisam do mesmo transporte SMTP
(`contact` e `denuncia`) e a regra acima proíbe uma entidade importar da outra. Um service dentro de
`entity/contact/` obrigaria `entity/denuncia/` a atravessar lateralmente.

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
| `entity/denuncia/components/DenunciaForm.tsx` | idem, no canal de denúncias |
| `entity/denuncia/hooks/useDenunciaForm.ts` | hook do React |
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
  --color-brand:       #3d4095; /* azul da marca — ponta ESCURA do gradiente */
  --color-brand-light: #4f53ad; /* ponta CLARA do gradiente (direita)      */
  --color-brand-deep:  #2c2e6d; /* variação escura — hover e menu mobile   */
  --color-accent:      #5fb0d4; /* azul-claro dos botões do site          */
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
| `brand` | ponta escura (esquerda) dos gradientes, botões primários, títulos de seção |
| `brand-light` | ponta clara (direita) dos gradientes — **só em gradiente**, nunca como fundo chapado |
| `brand-deep` | hover do botão primário e fundo do menu mobile |
| `accent` | botão "Fale com o comercial", links de destaque, ícones |
| `ink` | corpo de texto e títulos |
| `muted` | descrições, legendas, texto de apoio |
| `line` | bordas de card, divisórias |
| `bg` | fundo da página |
| `card` | fundo de card e do formulário |
| `ok` | mensagem de sucesso do formulário |

### Gradientes

Dois gradientes recorrentes no site:

- **Header, footer, heros, bloco de CTA e faixa de sustentabilidade:** `brand` → `brand-light`,
  **na horizontal** (`bg-linear-to-r`) — escuro na esquerda, mais claro na direita. A direção é
  a mesma em todos os sete pontos de propósito: são faixas que se empilham na mesma página e uma
  diagonal solta quebra a leitura de continuidade. No hero da home há ainda uma foto de fundo com
  overlay do gradiente por cima (`from-brand/90 to-brand-light/80`), opacidade calibrada para
  preservar contraste do texto branco.
- **Cards de produto:** verde-esmeralda sólido com texto branco (os cards da grade de produtos).

**Por que `brand` é a ponta escura e não a clara.** `brand` também pinta botão primário e título de
seção sobre fundo branco. Se ele virasse a ponta clara do gradiente, esses dois usos cairiam para
~5,4:1 de contraste. Como está, `brand` (#3d4095) dá 8,9:1 sobre branco e `brand-light` (#4f53ad)
dá 6,6:1 com texto branco por cima — a coluna direita do footer, que usa `text-white/80`, fica em
4,8:1. Ao mexer em qualquer um dos dois, refaça essa conta antes.

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
            ├─ contactSchema.safeParse()      ← validação que vale
            └─ email.service.ts               ← monta o HTML, resolve CONTACT_EMAIL_TO
                 └─ services/mailer.service.ts → SMTP (nodemailer)
```

O canal de denúncias tem o mesmo desenho (`DenunciaForm` → `useDenunciaForm` → `sendDenuncia` →
`denuncia-email.service.ts` → `mailer.service.ts`). **O transporte é compartilhado; as caixas de
destino não** — `CONTACT_EMAIL_TO` e `DENUNCIA_EMAIL_TO` são endereços diferentes.

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
SMTP_HOST=smtp.zcs.jetmailx.com.br          # host do PROVEDOR, não o CNAME
SMTP_PORT=465                               # 465 = SSL · 587 = STARTTLS
SMTP_SECURE=true                            # sem valor, é deduzido da porta
SMTP_USER=postmaster@neoquim.com.br         # e-mail COMPLETO da caixa
SMTP_PASSWORD="senha-entre-aspas"
MAIL_FROM=                                  # vazio = usa SMTP_USER
CONTACT_EMAIL_TO=vendas@neoquim.com.br      # destino do lead
```

O provedor de e-mail é a **jetmailx** (Zimbra). Quatro coisas que fazem o SMTP falhar:

- **`SMTP_HOST` não pode ser `smtp.neoquim.com.br`.** Esse nome é CNAME para
  `smtp.zcs.jetmailx.com.br`, mas o certificado do servidor cobre só `*.zcs.jetmailx.com.br`,
  `*.jetmailx.com.br` e o domínio de alguns outros clientes — **não o da Neoquim**. Conectar pelo
  CNAME estoura `ERR_TLS_CERT_ALTNAME_INVALID`. Nunca "resolva" isso com
  `tls: { rejectUnauthorized: false }`: desligar a validação expõe a senha da caixa a MITM. Se
  quiser usar o CNAME, peça à jetmailx para incluir `smtp.neoquim.com.br` no certificado — eles já
  fazem isso para outros clientes.
- **`SMTP_PASSWORD` sem aspas** — o parser de `.env` corta no primeiro `#` e a senha chega truncada,
  sem erro. Já aconteceu neste projeto com `ADMIN_PASSWORD`. O sintoma é `EAUTH`, que parece
  credencial errada.
- **`MAIL_FROM` diferente de `SMTP_USER`** — hospedagem compartilhada recusa relay de remetente que
  não seja o autenticado, e o que passa cai em spam por SPF. Deixe vazio.
- **Porta 25** — bloqueada na Vercel. Só 465 ou 587 (as duas estão abertas na jetmailx).

Para separar "credencial errada" de "código errado", `mailer.service.ts` exporta `verifySmtp()`, que
testa host, porta e login sem enviar mensagem.

**Regras de segurança — não negociáveis**

1. As `SMTP_*` **nunca** com prefixo `NEXT_PUBLIC_` — a senha da caixa iria para o bundle do
   navegador. Só são lidas dentro de `services/mailer.service.ts`, que por sua vez só é importado
   pelos services de entidade, chamados apenas pelas Server Actions. Endurecimento opcional:
   instalar o pacote `server-only` e importá-lo no topo do mailer, para o build quebrar se alguém
   encostar esse arquivo em um componente de cliente.
2. Validação no servidor é a que conta. A validação no cliente existe só para UX.
3. `reply-to` do e-mail = e-mail do lead, para o comercial responder direto na thread. **No canal de
   denúncias, `reply-to` é proibido** — responder por reflexo a uma denúncia anônima é o vazamento
   que o canal existe para evitar. Por isso o parâmetro é opcional em `sendMail`.
4. Honeypot obrigatório contra bot.
5. Nunca interpole dado do formulário cru no HTML do e-mail — escape antes com `escapeHtml`
   (`utils/html.utils.ts`).
6. Mensagem de erro ao usuário é genérica. Detalhe técnico vai para o log do servidor, não para a
   tela. No canal de denúncias, **o log também não recebe o conteúdo do relato** — só a falha.

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
| `/sustentabilidade` | Sustentabilidade |
| `/contato` | Contato |
| `/canal-de-denuncias` | Canal de Denúncias |

Navegação do header: Home · Sobre nós · Produtos · Sustentabilidade · Contato + botão
**"Fale com o comercial"**.

O **Canal de Denúncias fica fora do menu**, só no rodapé, junto do Código de Ética — é um bloco de
compliance (`FOOTER_COMPLIANCE`), separado da navegação institucional (`FOOTER_NAV`). Precisa estar
achável de qualquer página, mas não disputa espaço com o funil comercial.

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
subtítulo → descrição → seção "Linha e aplicações" → nota *"Especificações técnicas,
fichas de segurança e amostras podem ser solicitadas ao nosso time comercial."* → CTA "Solicitar
informações" (→ `/contato`) → imagem → 4 produtos relacionados.

**"Linha e aplicações"** (`ProductLine.tsx`) é uma lista de grupos, cada um com `titulo` opcional e
itens `{ nome, descricao }` — nome comercial em negrito, descrição técnica ao lado. O `titulo` separa
aplicações dentro do mesmo produto: Catalisadores divide em Resina Alquídica e Resina Poliéster,
Revenda em Ácidos e Outros, Secantes em Octoatos, Off-set, Misturas e Naftenatos. Produto sem essa
divisão traz um único grupo sem título.

As descrições são **transcrição literal** da apresentação comercial da Neoquim. Percentual, faixa de
temperatura e proporção de uso são informação de formulação — não reescreva.

O material da Neoquim é organizado por mercado e o site por produto. Onde um slide de mercado
descreve algo que tem página própria, o conteúdo mora na página específica e não é duplicado: as
resinas alquídicas, os octoatos e os dispersantes que aparecem sob "Tinta Base Solvente" no material
estão em `/produtos/resinas-alquidicas`, `/produtos/secantes-octoatos-naftenatos` e
`/produtos/dispersantes-inibidores`. `tinta-base-solvente` fica com o NEOMUL.

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

### Sustentabilidade

Três pilares, cada um foto de um lado e texto do outro, alternando o lado a cada bloco no desktop
(`PilarSection`, com `invertido` e `fundoClaro` derivados do índice).

| Pilar | Texto | Imagem |
|---|---|---|
| Tratamento de Efluentes | Estação própria, com reaproveitamento de 100% da água utilizada na produção. | `ete-efluentes.jpg` |
| Usina Solar Fotovoltaica | Instalação de uma Usina Solar Fotovoltaica com injeção na rede elétrica. | `usina-solar.jpg` |
| Linhas de Produtos Biodegradáveis | Ésteres de base renovável NEOGREEN e UNIGREEN. | `tanques-verdes.jpg` |

Os dois primeiros textos são da Neoquim. O terceiro veio sem redação definida e sem foto indicada:
o texto foi escrito a partir do que o material técnico diz das linhas NEOGREEN/UNIGREEN e a foto é a
que mais se aproxima do tema. **Confirmar os dois com o comercial** (ver §12).

### Canal de Denúncias

Texto institucional + citação legal + formulário, em duas colunas no desktop.

O bloco **IMPORTANTE** cita o § 1º Art. 23 da Lei 14.457/2022 e o art. 216-A do Código Penal —
avisa que o canal não substitui o procedimento penal. É **citação legal literal: não reescreva,
não resuma, não "melhore"**. O mesmo vale para os três parágrafos de abertura, que são texto
aprovado pela empresa.

Na mesma página, link para o Código de Ética (`DOCUMENTOS.codigoEtica`), que abre o PDF em nova aba.

### Missão, visão, valores e política (no /sobre)

Entre "Quem somos" e "Nossa trajetória". Missão e visão em cards, valores em lista (Agilidade ·
Pontualidade · Qualidade), e a Política do Sistema de Gestão em bloco com o gradiente da marca.

Moram em `entity/company/constants/company.constants.ts`, não na pasta da página: são dados
institucionais da empresa, não copy de rota. A **Política do Sistema de Gestão é transcrição
literal do CEC-8.5** — mesmo texto auditado na ISO 9001. Alteração só vem do responsável pelo SGQ.

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

São **fotos reais da unidade de Itaquaquecetuba**, entregues pela Neoquim. As quatro imagens de IA
que existiam antes foram substituídas — não gere imagem sintética para este site.

| Arquivo | Dimensões | Foto | Uso |
|---|---|---|---|
| `planta-aerea.jpg` | 1686×1081 | vista aérea da unidade | hero da home, "Quem somos" no /sobre, card Revenda, Open Graph, JSON-LD |
| `petroleo.jpg` | 1296×968 | parque de tanques de armazenagem | card Petróleo, destaque em /produtos |
| `tintas.jpg` | 968×1296 | galpão com tambores paletizados | card Tintas e Vernizes, produto Dispersantes |
| `reatores.jpg` | 968×1296 | interior da fábrica com os reatores | Qualidade certificada, produto Secantes |
| `torre-reacao.jpg` | 968×1296 | torre de reação e tanques inox | produto Resinas Alquídicas |
| `tanques-verdes.jpg` | 968×1296 | tanques verdes de estocagem | produto Ácidos Graxos |
| `tanques-inox.jpg` | 968×1296 | tanques inox ao pé da torre | produto Catalisadores |
| `carregamento-granel.jpg` | 968×1296 | caminhão-tanque carregando | produto Éster |
| `tambores-galpao.jpg` | 968×1296 | corredor de tambores | produto Tinta Base Solvente |
| `tanques-processo.jpg` | 968×1296 | tanques de processo e utilidades | produto Tinta Base D'água |
| `armazem-tambores.jpg` | 968×1296 | armazém com tambores em pallets | produto Tinta Off-Set |
| `importacao-container.jpg` | 1296×968 | carreta com contêiner em descarga | produto Revenda de Matéria Prima |
| `logo-neoquim-branco.png` | 1483×799 | — | header e footer (variante reversa) |
| `logo-neoquim.png` | 612×408 | — | JSON-LD (`Organization.logo`), fundo claro |

Só `planta-aerea`, `petroleo` e `importacao-container` são **paisagem**; o resto é retrato em slots
que renderizam paisagem. O `object-cover` recorta pelo centro e funciona porque o assunto ocupa o
quadro inteiro — mas, ao trocar por outra foto, prefira paisagem.

**Acervo completo:** as 17 fotos originais estão em `assets/fotos-neoquim/`, **fora de `public/`**,
com um README mapeando origem → destino. Isso é intencional: tudo que entra em `public/` é servido
publicamente e vai inteiro para o deploy. Para usar uma foto nova, copie para `public/images/` com
nome descritivo em kebab-case — nunca aponte o `src` para `assets/`.

**Todo `alt` descreve a foto, não o produto.** Uma foto de tanques com `alt="Ácidos Graxos"` não
ajuda quem usa leitor de tela. Os textos vivem em `home.constants.ts`, `sobre.constants.ts` e no
campo `imagemAlt` de cada produto em `products.constants.ts`. Ao trocar a imagem, troque o `alt`.

**O logo tem duas variantes e elas não são intercambiáveis.**

`logo-neoquim-branco.png` é a versão reversa: elipse branca sólida com o letreiro NEOQUIM **vazado**
(transparente). É a que o componente `Logo` renderiza, porque header e footer são seus dois únicos
consumidores e ambos rodam sobre o gradiente da marca. A versão colorida sumia ali — o azul do
letreiro é praticamente o mesmo azul do fundo, então sobrava só a elipse.

`logo-neoquim.png` (colorido, sobre fundo claro) fica reservado ao `Organization.logo` do JSON-LD,
que os buscadores exibem sobre branco. Sobre fundo claro a variante branca desaparece pelo motivo
simétrico — se o logo for para um card ou documento claro, é esta que se usa.

As duas têm proporção diferente (1483×799 contra 612×408), então trocar o `src` de uma pela outra
sem trocar `width`/`height` distorce a imagem.

---

## 10. SEO

- `metadata` exportada por rota. Título no padrão `<Página> | Neoquim Indústrias Químicas`.
- `/produtos/[slug]`: `generateStaticParams()` com os 11 slugs + `generateMetadata()` por produto.
  Slug desconhecido → `notFound()`.
- `metadataBase` e `openGraph` configurados no `layout.tsx` raiz, com imagem de preview.
- JSON-LD no `layout.tsx`: `Organization` e `LocalBusiness` com o NAP da §9 (endereço, telefones,
  horário). Em `/produtos/[slug]`, adicione `BreadcrumbList`.
- `sitemap.ts` gerando as 6 rotas fixas + as 11 de produto a partir das constants — nunca lista
  manual. `/canal-de-denuncias` entra com prioridade baixa (0.4): precisa ser indexável para quem
  busca pelo canal, mas não compete com as páginas comerciais.
- `/admin-fileconfig-neoquim` **nunca** entra no sitemap nem no `robots.txt` (ver
  `entity/admin/constants/auth.constants.ts`).
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
SMTP_HOST=
SMTP_PORT=465               # 465 = SSL · 587 = STARTTLS
SMTP_SECURE=true            # sem valor, é deduzido da porta
SMTP_USER=                  # e-mail COMPLETO da caixa
SMTP_PASSWORD=              # SEMPRE entre aspas
MAIL_FROM=                  # vazio = usa SMTP_USER
CONTACT_EMAIL_TO=
DENUNCIA_EMAIL_TO=          # caixa de compliance, SEPARADA da comercial
BLOB_READ_WRITE_TOKEN=      # injetado pela Vercel quando o store está conectado
ADMIN_USER=
ADMIN_PASSWORD=             # SEMPRE entre aspas
ADMIN_SESSION_SECRET=
```

**Senha entre aspas, sem exceção** — vale para `ADMIN_PASSWORD` e `SMTP_PASSWORD`. O parser de `.env`
corta valor sem aspas no primeiro `#`: `ADMIN_PASSWORD=abc@#123` chega ao servidor como `abc@` — sem
erro, sem aviso, e o login simplesmente nunca autentica. No SMTP o sintoma é um `EAUTH` que parece
credencial errada.

**Para adicionar dependência**, `npm install <pacote>` incremental quebra neste projeto (ver §12):
edite o `package.json` à mão e rode `rm -rf node_modules package-lock.json && npm install`.

---

## 12. Pendências conhecidas

Itens em aberto — **pergunte ao responsável, não invente valor**.

### Valores provisórios em `.env.local` — trocar antes de publicar

| Variável | Valor atual | O que falta |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5511999999999` (genérico) | número comercial real da Neoquim |
| `CONTACT_EMAIL_TO` | caixa de teste pessoal | trocar por `vendas@neoquim.com.br` ou pela caixa dedicada a lead |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASSWORD` | vazios | credencial da caixa da Neoquim. **Enquanto estiverem vazios os dois formulários validam mas não enviam** — a action registra o erro no log e mostra a mensagem genérica. Confirmar host e porta com a hospedagem |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | domínio final (afeta OG, canonical, sitemap e JSON-LD) |
| `DENUNCIA_EMAIL_TO` | vazio | caixa de compliance (RH/Diretoria). **Não aponte para `vendas@`** — o CEC-8.5 exige sigilo do informante |
| `ADMIN_USER` / `ADMIN_PASSWORD` | credencial provisória | definir com o responsável da Neoquim |

### Conteúdo

1. **"Linha e aplicações" de `tinta-base-agua`** — os outros 10 produtos foram preenchidos com a
   transcrição literal da apresentação comercial da Neoquim. Este não tem slide correspondente no
   material recebido, então o campo `linha` segue vazio e a página mostra o texto de fallback.
   Preencher em `products.constants.ts` **com o time técnico** — descrição de produto químico errada
   tem consequência real para quem formula, e pelo mesmo motivo as descrições já transcritas não
   devem ser reescritas sem passar por eles.
2. **Quais 8 dos 11 produtos** vão na home. Hoje `destaqueHome: false` em Tinta Off-Set, Revenda de
   Matéria Prima e Dispersantes e Inibidores, espelhando o site atual — confirme se é intencional.
3. **Imagem de Open Graph** dedicada — hoje usa `planta-aerea.jpg`.
4. **Distribuição das fotos por produto** — cada um dos 11 já tem imagem distinta, mas a escolha foi
   feita por semelhança visual, sem o comercial. Nenhuma foto retrata o produto em si: são cenas da
   unidade. Confirmar se a associação faz sentido e se falta foto de algum processo específico.
   `ETE Neoquim` e as três da usina solar agora são usadas em `/sustentabilidade`.
5. ~~**PDF do Código de Ética não está no repositório.**~~ **Resolvido** — o original do CEC-8.5
   rev. 04 está em `public/documentos/codigo-de-etica-neoquim.pdf` e os links do rodapé e de
   `/canal-de-denuncias` abrem o arquivo. Ao publicar revisão nova, sobrescreva mantendo o nome em
   kebab-case ASCII (o nome de origem, com espaço, acento e parêntese, não serve como URL). Ver
   `public/documentos/LEIA-ME.md`.
6. **Terceiro pilar de sustentabilidade** — "Linhas de Produtos Biodegradáveis" veio sem redação e
   sem foto definida. O texto atual foi escrito a partir do que o material técnico diz das linhas
   NEOGREEN/UNIGREEN, e a foto (`tanques-verdes.jpg`) foi escolhida por aproximação. Validar os dois.

### Técnico

7. **`npm run lint`** ainda não tem ESLint configurado no projeto.
8. **Sem rate limiting** nos formulários. O honeypot pega bot burro; um limite por IP exige
   infraestrutura (Upstash, middleware) e ainda não foi decidido. Vale especialmente para o canal de
   denúncias, que é anônimo por natureza e portanto o alvo mais fácil de flood.
9. **npm incremental quebra neste projeto** — `npm install -D <pacote>` falha com
   `Invalid Version:` por um bug de dedupe do npm 11 com os binários de plataforma do Next 16.
   Para adicionar dependência: edite o `package.json` à mão e rode
   `rm -rf node_modules package-lock.json && npm install`.
