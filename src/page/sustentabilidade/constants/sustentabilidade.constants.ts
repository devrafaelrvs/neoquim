export interface PilarSustentabilidade {
  titulo: string;
  descricao: string;
  imagem: string;
  imagemAlt: string;
}

export const SUSTENTABILIDADE_PAGE = {
  heroTitulo: 'Sustentabilidade',
  heroSubtitulo:
    'Reaproveitamento total da água de processo, geração própria de energia limpa e uma linha de produtos de base renovável.',
  ctaTitulo: 'Quer saber mais sobre nossas práticas?',
  ctaTexto:
    'Nosso time técnico detalha os processos e fornece as informações que sua auditoria ou cadeia de suprimentos precisar.',
  ctaBotao: 'Falar com o comercial',
} as const;

/**
 * Os três pilares, na ordem em que a Neoquim os apresenta.
 *
 * Textos conforme enviados pela empresa — o de biodegradáveis é a linha
 * NEOGREEN/UNIGREEN, os ésteres de base renovável do portfólio.
 */
export const PILARES: PilarSustentabilidade[] = [
  {
    titulo: 'Tratamento de Efluentes',
    descricao:
      'Estação de tratamento própria, com reaproveitamento de 100% da água utilizada em nossa produção.',
    imagem: '/images/ete-efluentes.jpg',
    imagemAlt:
      'Estação de tratamento de efluentes da Neoquim, com os tanques de decantação',
  },
  {
    titulo: 'Usina Solar Fotovoltaica',
    descricao:
      'Instalação de uma Usina Solar Fotovoltaica com injeção na rede elétrica.',
    imagem: '/images/usina-solar.jpg',
    imagemAlt:
      'Vista aérea das placas fotovoltaicas instaladas sobre os galpões da Neoquim',
  },
  {
    titulo: 'Linhas de Produtos Biodegradáveis',
    descricao:
      'Ésteres de base renovável das linhas NEOGREEN e UNIGREEN, desenvolvidos como alternativa biodegradável para lubrificação, veículo de formulação e fluidos de perfuração.',
    imagem: '/images/tanques-verdes.jpg',
    imagemAlt: 'Tanques verdes de estocagem a granel no pátio da Neoquim',
  },
];
