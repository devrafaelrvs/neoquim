export const PRODUCT_SLUGS = [
  'petroleo-perfuracao',
  'secantes-octoatos',
  'resinas-alquidicas',
  'acidos-graxos',
  'catalisadores',
  'ester',
  'tinta-base-solvente',
  'tinta-off-set',
  'revenda-materia-prima',
  'dispersantes-inibidores',
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

/** Um produto comercial da linha, com o nome que o cliente pede na compra. */
export interface ProductLineItem {
  /** Nome comercial, como consta no material técnico. Ex.: `NEOLUB AGTD 5`. */
  nome: string;
  /**
   * Descrição técnica transcrita do material da Neoquim.
   *
   * Não reescreva por conta própria: quem lê está formulando, e percentual ou
   * faixa de temperatura errada tem consequência real na linha de produção.
   */
  descricao: string;
}

/**
 * Bloco da seção "Linha e aplicações".
 *
 * O `titulo` separa aplicações dentro do mesmo produto — Catalisadores divide
 * em Resina Alquídica e Resina Poliéster, Revenda divide em Ácidos e Outros.
 * Produto sem essa divisão traz um único grupo sem título.
 */
export interface ProductLineGroup {
  titulo?: string;
  itens: ProductLineItem[];
}

export interface Product {
  slug: ProductSlug;
  titulo: string;
  /** Frase curta usada nos cards e como subtítulo da página de detalhe. */
  descricao: string;
  /** Parágrafo de abertura da página de detalhe. */
  detalhe: string;
  /** Grupos de "Linha e aplicações". Vazio = conteúdo ainda não levantado. */
  linha: ProductLineGroup[];
  imagem: string;
  /**
   * Descreve o que aparece na foto, não o produto.
   *
   * As fotos são da unidade de Itaquaquecetuba e não retratam o produto em si —
   * dizer "Ácidos Graxos" numa foto de tanques não ajuda quem usa leitor de
   * tela. Ao trocar `imagem`, troque este texto junto.
   */
  imagemAlt: string;
  /** Aparece na grade de destaques da home. */
  destaqueHome: boolean;
}
