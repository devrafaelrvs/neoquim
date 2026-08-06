import type { Product } from '@/entity/product/product.entity';

/**
 * Fonte única de verdade do portfólio.
 *
 * ATENÇÃO: `linha` só está preenchida para `secantes-octoatos-naftenatos`, que é o
 * único produto cujo conteúdo foi levantado do site atual. Os demais precisam da
 * lista de itens com o time técnico da Neoquim — não preencha por dedução.
 */
export const PRODUCTS: Product[] = [
  {
    slug: 'petroleo-perfuracao',
    titulo: 'Petróleo Perfuração',
    descricao:
      'Lubrificantes, Redutores, Emulsificantes primários e secundários.',
    detalhe:
      'Linha de insumos para fluidos de perfuração de poços de petróleo, atividade de origem da Neoquim desde 1983.',
    linha: [],
    imagem: '/images/petroleo.jpg',
    destaqueHome: true,
  },
  {
    slug: 'secantes-octoatos-naftenatos',
    titulo: 'Secantes — Octoatos e Naftenatos',
    descricao:
      'Sabões metálicos para secagem de tintas industriais, produzidos desde 1987.',
    detalhe:
      'Linha de sabões metálicos para aplicação industrial em tintas, fabricada pela Neoquim desde 1987.',
    linha: [
      'Octoatos de cobalto, manganês, zircônio, cálcio e zinco',
      'Naftenatos metálicos',
      'Secantes combinados sob especificação do cliente',
    ],
    imagem: '/images/reatores.jpg',
    destaqueHome: true,
  },
  {
    slug: 'resinas-alquidicas',
    titulo: 'Resinas Alquídicas',
    descricao:
      'Resinas curtas, médias e longas em óleo para tintas e vernizes.',
    detalhe:
      'Produção própria de resinas alquídicas para o mercado de tintas e vernizes, iniciada em 1989.',
    linha: [],
    imagem: '/images/reatores.jpg',
    destaqueHome: true,
  },
  {
    slug: 'acidos-graxos',
    titulo: 'Ácidos Graxos',
    descricao:
      'Matéria-prima para resinas, dispersantes e formulações industriais.',
    detalhe:
      'Ácidos graxos empregados como matéria-prima na produção de resinas, dispersantes e formulações industriais.',
    linha: [],
    imagem: '/images/reatores.jpg',
    destaqueHome: true,
  },
  {
    slug: 'catalisadores',
    titulo: 'Catalisadores',
    descricao: 'Catalisadores para processos de esterificação e polimerização.',
    detalhe:
      'Catalisadores aplicados em processos de esterificação e polimerização.',
    linha: [],
    imagem: '/images/reatores.jpg',
    destaqueHome: true,
  },
  {
    slug: 'ester',
    titulo: 'Éster — NEOGREEN e UNIGREEN',
    descricao:
      'Linha de ésteres de base renovável para aplicações de alto desempenho.',
    detalhe:
      'Linhas NEOGREEN e UNIGREEN: ésteres de base renovável desenvolvidos para aplicações de alto desempenho.',
    linha: [],
    imagem: '/images/reatores.jpg',
    destaqueHome: true,
  },
  {
    slug: 'tinta-base-solvente',
    titulo: 'Tinta Base Solvente',
    descricao: 'Insumos completos para formulações base solvente.',
    detalhe:
      'Conjunto de insumos para formulações de tintas em base solvente.',
    linha: [],
    imagem: '/images/tintas.jpg',
    destaqueHome: true,
  },
  {
    slug: 'tinta-base-agua',
    titulo: "Tinta Base D'água",
    descricao: 'Aditivos e secantes desenvolvidos para sistemas aquosos.',
    detalhe:
      'Aditivos e secantes desenvolvidos especificamente para sistemas aquosos.',
    linha: [],
    imagem: '/images/tintas.jpg',
    destaqueHome: true,
  },
  {
    slug: 'tinta-off-set',
    titulo: 'Tinta Off-Set',
    descricao: 'Insumos para tintas gráficas de impressão off-set.',
    detalhe:
      'Insumos destinados à formulação de tintas gráficas para impressão off-set.',
    linha: [],
    imagem: '/images/tintas.jpg',
    destaqueHome: false,
  },
  {
    slug: 'revenda-materia-prima',
    titulo: 'Revenda de Matéria Prima',
    descricao:
      'Distribuição de matérias-primas químicas nacionais e importadas.',
    detalhe:
      'Distribuição de matérias-primas químicas nacionais e importadas para a indústria.',
    linha: [],
    imagem: '/images/planta-aerea.jpg',
    destaqueHome: false,
  },
  {
    slug: 'dispersantes-inibidores',
    titulo: 'Dispersantes e Inibidores',
    descricao: 'Dispersantes de pigmentos e inibidores de secatividade.',
    detalhe:
      'Dispersantes de pigmentos e inibidores de secatividade para a indústria de tintas e vernizes.',
    linha: [],
    imagem: '/images/tintas.jpg',
    destaqueHome: false,
  },
];

/** Produto exibido em destaque no topo de /produtos. */
export const FEATURED_PRODUCT_SLUG = 'petroleo-perfuracao';

export const PRODUCT_DOC_NOTE =
  'Especificações técnicas, fichas de segurança e amostras podem ser solicitadas ao nosso time comercial.';
