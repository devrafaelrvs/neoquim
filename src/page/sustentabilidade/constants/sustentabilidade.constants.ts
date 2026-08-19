export interface PilarSustentabilidade {
  titulo: string;
  descricao: string;
  imagem: string;
  imagemAlt: string;
}

export const SUSTENTABILIDADE_PAGE = {
  heroTitulo: 'Compromisso com a Sustentabilidade.',
  heroSubtitulo:
    'Atuamos com foco na economia circular por meio do reaproveitamento da água industrial, autogeração de energia limpa e fabricação de produtos de origem renovável.',
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
      'Energia Solar FotovoltaicaInstalação de usina solar conectada à rede (on-grid), gerando economia real e sustentabilidade para o seu negócio.',
    imagem: '/images/usina-solar.jpg',
    imagemAlt:
      'Vista aérea das placas fotovoltaicas instaladas sobre os galpões da Neoquim',
  },
  {
    titulo: 'Linhas de Produtos Biodegradáveis',
    descricao:
      'Inovação em Sustentabilidade:  Nossa linha de ésteres de base renovável oferecem uma alternativa biodegradável de alta performance. São soluções ideais para lubrificação, veículos de formulação e fluidos de perfuração,aliando eficiência tecnológica à preservação ambiental.',
    imagem: '/images/tanques-verdes.jpg',
    imagemAlt: 'Tanques verdes de estocagem a granel no pátio da Neoquim',
  },
];
