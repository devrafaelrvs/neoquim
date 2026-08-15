import { DOCUMENTOS } from '@/constants/routes.constants';

/**
 * Texto do canal, conforme enviado pela Neoquim.
 *
 * O bloco `importante` é citação legal (Lei 14.457/2022 e Código Penal) —
 * **não reescreva nem resuma**. O aviso de que o canal não substitui o
 * procedimento penal é exigência da própria lei.
 */
export const CANAL_DENUNCIAS_PAGE = {
  heroTitulo: 'Canal de Denúncias',
  heroSubtitulo:
    'Um canal seguro e confidencial para relatar condutas em desacordo com nosso Código de Ética.',

  paragrafos: [
    'Nós da NEOQUIM INDÚSTRIAS QUÍMICAS buscamos permanentemente a melhora na comunicação e na transparência com todos à nossa volta. Prezando pelo nosso código de ética e conduta, respeitamos nosso propósito e valores, que constituem nossa identidade; assim como os princípios e regras da sociedade.',
    'Este canal foi criado para ouvirmos denúncias de fatos praticados por empregados ou terceiros relacionados com nossa empresa e que não estejam em conformidade com o código de ética e conduta.',
    'As denúncias aqui registradas serão encaminhadas para o departamento responsável para apuração dos fatos e devida resolução.',
  ],

  importanteRotulo: 'IMPORTANTE',
  importante:
    'Conforme § 1º Art. 23 da Lei 14.457/2022, o recebimento de denúncias a que se refere o inciso II do caput deste artigo não substitui o procedimento penal correspondente, caso a conduta denunciada pela vítima se encaixe na tipificação de assédio sexual contida no art. 216-A do Decreto-Lei nº 2.848, de 7 de dezembro de 1940 (Código Penal), ou em outros crimes de violência tipificados na legislação brasileira.',

  anonimato:
    'Você não precisa se identificar para enviar uma mensagem, porém se desejar saber sobre o andamento da denúncia, por favor, deixe um contato para podermos providenciar um retorno.',

  codigoEticaTexto: 'Conheça nosso Código de Ética e Conduta',
  codigoEticaLink: 'Abrir o Código de Ética',
  codigoEticaHref: DOCUMENTOS.codigoEtica,
} as const;
