export interface CompanyContactChannel {
  label: string;
  telefones: string[];
  email?: string;
}

export interface CompanyAddress {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  completo: string;
}

export interface TimelineEntry {
  marco: string;
  texto: string;
}
