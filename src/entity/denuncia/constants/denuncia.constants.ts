import type { DenunciaAssunto } from '@/entity/denuncia/denuncia.entity';

export const DENUNCIA_ASSUNTO_LABELS: Record<DenunciaAssunto, string> = {
  'assedio-moral': 'Assédio moral',
  'assedio-sexual': 'Assédio sexual',
  discriminacao: 'Discriminação',
  'fraude-ou-corrupcao': 'Fraude ou corrupção',
  'conflito-de-interesses': 'Conflito de interesses',
  'sigilo-de-informacoes': 'Quebra de sigilo de informações',
  'meio-ambiente-e-seguranca': 'Meio ambiente e segurança',
  outro: 'Outro',
};

export const DENUNCIA_LABELS = {
  assunto: 'Assunto da denúncia',
  relato: 'Relato',
  nome: 'Nome (opcional)',
  contato: 'E-mail ou telefone para retorno (opcional)',
} as const;

export const DENUNCIA_FORM = {
  titulo: 'Registrar denúncia',
  selectPlaceholder: 'Selecione o assunto',
  relatoAjuda:
    'Descreva o que aconteceu com o máximo de detalhe possível: o que foi feito, por quem, quando e onde. Quanto mais concreto o relato, mais efetiva a apuração.',
  anonimatoAviso:
    'Os dois campos abaixo são opcionais. Deixe-os em branco para denunciar de forma anônima.',
  submit: 'Enviar denúncia',
  submitLoading: 'Enviando…',
  sucesso:
    'Denúncia registrada. Ela foi encaminhada ao departamento responsável para apuração. Se você deixou um contato, retornaremos sobre o andamento.',
  erroValidacao: 'Revise os campos destacados.',
  erroGenerico:
    'Não foi possível registrar a denúncia agora. Tente novamente em alguns minutos.',
} as const;
