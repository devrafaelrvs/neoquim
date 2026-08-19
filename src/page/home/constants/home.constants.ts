export const HOME_HERO = {
  eyebrow: 'Desde 1983 · Itaquaquecetuba/SP',
  titulo: 'Especialistas em Química Industrial',
  subtitulo:
    'Desenvolvemos insumos de alta performance para os setores de Tintas, Vernizes e Perfuração de Petróleo.',
  /** Bullets do hero: rótulo em negrito + o que ele entrega. */
  destaques: [
    {
      titulo: 'Portfólio Técnico',
      texto:
        'Secantes metálicos, resinas alquídicas, dispersantes e insumos para fluidos de perfuração.',
    },
    {
      titulo: 'Garantia de Excelência',
      texto:
        'Processos rigorosos com Sistema de Gestão da Qualidade certificado.',
    },
  ],
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
    titulo: 'Inovação Química na Indústria Petrolífera',
    descricao:
      'Atendemos às demandas mais complexas do setor de perfuração de petróleo com produtos rigorosamente testados. Através do fornecimento de lubrificantes especializados, redutores e sistemas de emulsificantes primários e secundários, entre outros. Entregamos a confiabilidade que sua operação exige no campo.',
    imagem: '/images/petroleo.jpg',
    imagemAlt:
      'Parque de tanques de armazenagem de matérias-primas da Neoquim',
  },
  {
    titulo: 'Tintas e Vernizes',
    descricao:
      'Parceiro estratégico para a indústria química. Fornecemos matérias-primas de alta tecnologia, incluindo resinas alquídicas, secantes, dispersantes e inibidores de secatividade, assegurando a padronização e a excelência que a sua produção exige.',
    imagem: '/images/tintas.jpg',
    imagemAlt:
      'Galpão da Neoquim com tambores de insumos químicos paletizados',
  },
  {
    titulo: 'Revenda e Importação',
    descricao:
      'Distribuição Química Global Logistica eficiente na revenda e importação de matérias-primas nacionais e internacionais de alta qualidade.',
    imagem: '/images/planta-aerea.jpg',
    imagemAlt:
      'Vista aérea dos galpões e do parque de tanques da Neoquim em Itaquaquecetuba/SP',
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
