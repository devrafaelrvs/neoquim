export const HOME_HERO = {
  eyebrow: 'Desde 1983 · Itaquaquecetuba/SP',
  titulo: 'Química industrial para tintas, vernizes e perfuração de petróleo',
  subtitulo:
    'Secantes metálicos, resinas alquídicas, dispersantes e insumos para fluidos de perfuração — fabricados com Sistema de Gestão da Qualidade certificado.',
  imagem: '/images/planta-aerea.jpg',
  imagemAlt: 'Vista aérea da unidade fabril da Neoquim em Itaquaquecetuba/SP',
  ctaPrimario: 'Ver produtos',
  ctaSecundario: 'Solicitar orçamento',
} as const;

export interface Mercado {
  titulo: string;
  descricao: string;
  imagem: string;
  imagemAlt: string;
}

export const MERCADOS: Mercado[] = [
  {
    titulo: 'Petróleo Perfuração',
    descricao:
      'Lubrificantes, Redutores, Emulsificantes primários e secundários.',
    imagem: '/images/petroleo.jpg',
    imagemAlt: 'Plataforma de perfuração de petróleo ao entardecer',
  },
  {
    titulo: 'Tintas e Vernizes',
    descricao:
      'Secantes, resinas alquídicas, dispersantes e inibidores de secatividade.',
    imagem: '/images/tintas.jpg',
    imagemAlt: 'Mistura de pigmentos coloridos',
  },
  {
    titulo: 'Revenda e Importação',
    descricao:
      'Distribuição de matérias-primas químicas nacionais e importadas.',
    imagem: '/images/planta-aerea.jpg',
    imagemAlt: 'Vista aérea dos tanques de armazenagem da Neoquim',
  },
];

export const HOME_SECOES = {
  quemSomos: 'Quem somos',
  quemSomosCta: 'Sobre nós',
  mercados: 'Mercados atendidos',
  produtos: 'Principais Produtos e Matérias Primas',
  produtosCta: 'Ver linha completa',
} as const;

export const HOME_CTA = {
  titulo: 'Precisa de um insumo sob especificação?',
  texto:
    'Nossa equipe técnica desenvolve formulações e ajusta produtos conforme a necessidade da sua linha de produção.',
  botao: 'Falar com o comercial',
} as const;
