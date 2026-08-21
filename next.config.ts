import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Otimização de imagem — calibrada para a cota do plano Hobby da Vercel.
   *
   * A Vercel cobra uma transformação a cada cache MISS **e STALE** (HIT é de
   * graça). O default do Next é `minimumCacheTTL: 14400` — 4 horas —, o que
   * marcava toda variante como STALE 6×/dia e re-transformava as mesmas fotos
   * indefinidamente, mesmo sem nada mudar. Qualquer bot passando de hora em
   * hora mantinha o ciclo girando: `/_next/image` virou o top request path do
   * site e o maior consumidor da cota (5.000 transformações/mês).
   *
   * Ao estourar o limite, imagem nova responde 402 e o `alt` aparece no lugar
   * da foto — as já cacheadas continuam servindo.
   */
  images: {
    /**
     * 31 dias — o teto de retenção do CDN da Vercel para imagem local.
     * Não adianta pedir mais que isso; menos que isso é pagar revalidação à
     * toa, porque estas fotos não mudam.
     */
    minimumCacheTTL: 2678400,
    /**
     * Cada largura é uma chave de cache separada, então esta lista multiplica
     * o custo. O default traz 8 valores, incluindo 2048 e 3840 (4K) — que não
     * se justificam em foto de fundo com `object-cover`, onde o recorte já
     * descarta boa parte do quadro.
     */
    deviceSizes: [640, 828, 1200, 1920],
    /**
     * Só entra em jogo quando `sizes` indica imagem menor que a viewport.
     * Todas as fotos do site usam `fill` com `sizes` em vw, então isto é
     * quase inerte — fica enxuto para não abrir chave de cache à toa.
     */
    imageSizes: [128, 256, 384],
    /** Explícito: obrigatório no Next 16 e barra `q=` arbitrário na API. */
    qualities: [75],
    /** Um formato só. Somar AVIF dobraria as transformações e o cache. */
    formats: ['image/webp'],
    /**
     * Allowlist das duas únicas pastas de imagem do projeto. Sem isto,
     * `/_next/image?url=...` aceita qualquer caminho local e vira porta para
     * queimar cota de fora.
     */
    localPatterns: [
      { pathname: '/images/**', search: '' },
      { pathname: '/logo/**', search: '' },
    ],
  },
  experimental: {
    // O certificado sobe pela Server Action da área restrita. O padrão de 1 MB
    // não cabe um PDF escaneado; o teto da plataforma na Vercel é 4,5 MB.
    serverActions: { bodySizeLimit: '5mb' },
  },
};

export default nextConfig;
