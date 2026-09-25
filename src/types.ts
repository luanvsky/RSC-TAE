export interface ServidorInfo {
  nome: string;
  matriculaSiape: string;
  cargo: string;
  nivelCargo: string; // Ex: Nível D ou Nível E
  campus: string;
  lotacao: string;
  email: string;
  telefone?: string;
  tempoServicoPublico?: string;
  titulacaoAtual?: string;
  nivelRscSolicitado: 'RSC-I' | 'RSC-II' | 'RSC-III';
  equivalenciaTitulacao?: string; // Ex: RSC-I = Especialização, RSC-II = Mestrado, RSC-III = Doutorado
}

export interface ComprovanteItem {
  id: string;
  itemCriterio: string; // Ex: Cap. II, Art. 4º, Inciso I - Formação Continuada
  eixo: 'I - Formação e Qualificação' | 'II - Produção Técnica e Tecnológica' | 'III - Gestão e Governança' | 'IV - Extensão e Ensino';
  descricaoAtividade: string;
  documentoCorrespondente: string;
  periodoHoras?: string;
  pontuacaoAtribuida: number;
  pontuacaoMaximaPermitida?: number;
  statusValidacao: 'Validade Confirmada' | 'Pendente de Conferência' | 'Em Conformidade';
  observacao?: string;
}

export interface MemorialDescritivo {
  apresentacaoTrajetoria: string;
  desenvolvimentoSaberes: string;
  impactoInstitucional: string;
  conclusao?: string;
}

export interface DeclaracoesConformidade {
  declaracaoVeracidade: string;
  declaracaoConformidade: string;
  declaracaoNaoAcumulo?: string;
  declaracaoCienciaRegulamento?: string;
}

export interface ProcessoRSC {
  id: string;
  tituloDossie: string;
  dataCriacao: string;
  numeroProcessoSei?: string;
  servidor: ServidorInfo;
  declaracoes: DeclaracoesConformidade;
  memorial: MemorialDescritivo;
  indexacaoComprovantes: ComprovanteItem[];
  resumoPontuacao: {
    totalPontos: number;
    minimoExigido: number;
    aptoParaConcessao: boolean;
    porEixo: {
      eixoI: number;
      eixoII: number;
      eixoIII: number;
      eixoIV: number;
    };
  };
  parecerPreliminarIA?: string;
}

export interface UploadedFileMeta {
  name: string;
  size: number;
  type: string;
  contentBase64?: string;
  textContent?: string;
  status: 'enviado' | 'processando' | 'processado' | 'erro';
}
