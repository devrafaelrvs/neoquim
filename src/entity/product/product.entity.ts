export const PRODUCT_SLUGS = [
  'petroleo-perfuracao',
  'secantes-octoatos-naftenatos',
  'resinas-alquidicas',
  'acidos-graxos',
  'catalisadores',
  'ester',
  'tinta-base-solvente',
  'tinta-base-agua',
  'tinta-off-set',
  'revenda-materia-prima',
  'dispersantes-inibidores',
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export interface Product {
  slug: ProductSlug;
  titulo: string;
  /** Frase curta usada nos cards e como subtítulo da página de detalhe. */
  descricao: string;
  /** Parágrafo de abertura da página de detalhe. */
  detalhe: string;
  /** Itens de "Linha e aplicações". Vazio = conteúdo ainda não levantado. */
  linha: string[];
  imagem: string;
  /** Aparece na grade de destaques da home. */
  destaqueHome: boolean;
}
