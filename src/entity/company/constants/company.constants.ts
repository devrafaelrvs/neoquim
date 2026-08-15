import type {
  CompanyAddress,
  CompanyContactChannel,
  TimelineEntry,
} from '@/entity/company/company.entity';

export const COMPANY = {
  nome: 'Neoquim',
  razaoSocial: 'NEOQUIM INDÚSTRIAS QUÍMICAS LTDA',
  atividade:
    'Industrialização, Comercialização, Importação e Exportação de Produtos Químicos.',
  fundacao: 1983,
  horario: 'Seg. a sex., 8h às 17h',
} as const;

export const ADDRESS: CompanyAddress = {
  logradouro: 'Rua do Alumínio, nº 141',
  bairro: 'Corredor',
  cidade: 'Itaquaquecetuba',
  uf: 'SP',
  cep: '08586-220',
  completo:
    'Rua do Alumínio, nº 141, Corredor — Itaquaquecetuba/SP, CEP 08586-220',
};

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    'Rua do Alumínio, 141, Itaquaquecetuba, SP, 08586-220',
  );

export const CONTACT_CHANNELS: CompanyContactChannel[] = [
  {
    label: 'Comercial',
    email: 'vendas@neoquim.com.br',
    telefones: ['(11) 5090-5411', '(11) 5533-5411'],
  },
  {
    label: 'Fábrica',
    telefones: ['(11) 4646-2444', '(11) 4648-6445'],
  },
];

export const CERTIFICATION = {
  norma: 'ISO 9001:2015',
  organismo: 'TÜV NORD Brasil',
  texto:
    'A Neoquim Indústrias Químicas Ltda possui seu Sistema de Gestão da Qualidade certificado conforme requisitos da norma ISO 9001:2015, pelo organismo TÜV NORD Brasil.',
  complemento:
    'Cada lote é acompanhado por controle laboratorial próprio, garantindo repetibilidade e rastreabilidade em toda a linha de produção.',
} as const;

/**
 * Missão, visão e valores — texto oficial da Neoquim.
 *
 * `valores` é uma lista porque a empresa os declara como três itens
 * ("Agilidade, pontualidade e qualidade"), não como uma frase corrida.
 */
export const MISSAO_VISAO_VALORES = {
  missao: {
    titulo: 'Missão',
    texto:
      'Fornecer soluções que melhorem a qualidade e o desempenho da indústria química brasileira. Nosso crescimento e sustentabilidade dependem diretamente dessa fidelidade.',
  },
  visao: {
    titulo: 'Visão',
    texto:
      'Ser uma referência no fornecimento de resinas, secantes e aditivos no ramo em que atua.',
  },
  valores: {
    titulo: 'Valores',
    itens: ['Agilidade', 'Pontualidade', 'Qualidade'],
  },
} as const;

/**
 * Política do Sistema de Gestão — transcrição literal do CEC-8.5.
 *
 * É documento controlado do SGQ e o mesmo texto auditado na ISO 9001. Não
 * reescreva nem resuma: qualquer ajuste tem de vir do responsável pelo SGQ.
 */
export const POLITICA_SISTEMA_GESTAO = {
  titulo: 'Política do Sistema de Gestão',
  texto:
    'A NEOQUIM INDÚSTRIAS QUÍMICAS, empresa fabricante e de revenda de insumos para a indústria de tintas, se compromete em manter sua atividade sólida e atuante no mercado, de maneira a fornecer soluções que atendam aos requisitos de seus clientes, aumentando a sua satisfação, por meio da melhoria contínua do seu desempenho e da eficácia de suas aplicações e serviços, da parceria de seus colaboradores e fornecedores e do atendimento aos requisitos das demais partes interessadas.',
} as const;

export const QUEM_SOMOS_PARAGRAFOS = [
  'A empresa foi constituída no início da década de 80 (1983), com o objetivo de fabricar produtos utilizados na perfuração de poços de Petróleo. Unidade fabril instalada na cidade de Itaquaquecetuba, no Estado de São Paulo, participa hoje ativamente dentro do Mercado de Insumos para a Indústria de Tintas e Vernizes.',
  'A partir de 1987 iniciou sua fabricação de Octoatos e Naftenatos de sabões metálicos utilizados para secagem de tintas industriais. Por possuir capacidade de produção ociosa, em 1989 iniciou a produção de Resinas Alquídicas comercializadas para o mesmo mercado. Dentro deste período foram agregados vários produtos, como dispersantes, inibidores de secatividade e revenda de matérias-primas.',
] as const;

export const TIMELINE: TimelineEntry[] = [
  {
    marco: '1983',
    texto:
      'Constituição da empresa, voltada a produtos para perfuração de poços de petróleo.',
  },
  {
    marco: '1987',
    texto:
      'Início da fabricação de Octoatos e Naftenatos de sabões metálicos para secagem de tintas industriais.',
  },
  {
    marco: '1989',
    texto:
      'Início da produção de Resinas Alquídicas para o mercado de tintas e vernizes.',
  },
  {
    marco: 'Hoje',
    texto:
      'Portfólio ampliado com dispersantes, inibidores de secatividade e revenda de matérias-primas.',
  },
];

export const WHATSAPP = {
  numero: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
  mensagem: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? '',
} as const;
