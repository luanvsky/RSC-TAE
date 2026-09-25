import { ProcessoRSC } from '../types';

export function generateSeiFormattedText(processo: ProcessoRSC): string {
  return `================================================================================
MINISTÉRIO DA EDUCAÇÃO
REDE FEDERAL DE EDUCAÇÃO PROFISSIONAL, CIENTÍFICA E TECNOLÓGICA
SISTEMA ELETRÔNICO DE INFORMAÇÕES (SEI)
REQUERIMENTO DE RECONHECIMENTO DE SABERES E COMPETÊNCIAS (RSC-PCCTAE)
REGULAMENTADO PELO DECRETO Nº 13.048/2026
================================================================================

--------------------------------------------------------------------------------
BLOCO 1: FORMULÁRIO PADRÃO DE REQUERIMENTO
--------------------------------------------------------------------------------

- Nome do Servidor: ${processo.servidor.nome}
- Matrícula SIAPE: ${processo.servidor.matriculaSiape}
- Cargo / Nível: ${processo.servidor.cargo} (${processo.servidor.nivelCargo})
- Lotação / Campus: ${processo.servidor.lotacao} - ${processo.servidor.campus}
- E-mail Institucional: ${processo.servidor.email}
- Telefone: ${processo.servidor.telefone || 'Não informado'}
- Tempo de Efetivo Exercício: ${processo.servidor.tempoServicoPublico || 'Não informado'}
- Titulação Atual Registrada: ${processo.servidor.titulacaoAtual || 'Graduação'}
- Nível de RSC Solicitado: ${processo.servidor.nivelRscSolicitado} (${processo.servidor.equivalenciaTitulacao || 'Decreto nº 13.048/2026'})

SOLICITAÇÃO FORMAL:
Requeiro a concessão do Reconhecimento de Saberes e Competências (RSC-PCCTAE), conforme documentação comprobatória e Memorial Descritivo em anexo, com fulcro no Decreto nº 13.048/2026 e na regulamentação institucional correlata.

--------------------------------------------------------------------------------
BLOCO 2: DECLARAÇÕES DE CONFORMIDADE LEGAL E CIÊNCIA
--------------------------------------------------------------------------------

1. DECLARAÇÃO DE VERACIDADE:
"${processo.declaracoes.declaracaoVeracidade}"

2. DECLARAÇÃO DE CONFORMIDADE:
"${processo.declaracoes.declaracaoConformidade}"

${processo.declaracoes.declaracaoNaoAcumulo ? `3. DECLARAÇÃO DE NÃO DUPLICIDADE DE BENEFÍCIOS:\n"${processo.declaracoes.declaracaoNaoAcumulo}"\n` : ''}
${processo.declaracoes.declaracaoCienciaRegulamento ? `4. DECLARAÇÃO DE CIÊNCIA DOS TRÂMITES PROCESSUAIS:\n"${processo.declaracoes.declaracaoCienciaRegulamento}"\n` : ''}

--------------------------------------------------------------------------------
BLOCO 3: MEMORIAL DESCRITIVO COMPLETO
--------------------------------------------------------------------------------

1. APRESENTAÇÃO E TRAJETÓRIA FUNCIONAL
${processo.memorial.apresentacaoTrajetoria}

2. DESENVOLVIMENTO DE SABERES E COMPETÊNCIAS (DECRETO Nº 13.048/2026)
${processo.memorial.desenvolvimentoSaberes}

3. IMPACTO INSTITUCIONAL (ENSINO, PESQUISA, EXTENSÃO OU GESTÃO)
${processo.memorial.impactoInstitucional}

${processo.memorial.conclusao ? `4. CONCLUSÃO E REQUERIMENTO FINAL\n${processo.memorial.conclusao}\n` : ''}

--------------------------------------------------------------------------------
BLOCO 4: ORGANIZAÇÃO DA DOCUMENTAÇÃO COMPROBATÓRIA (INDEXAÇÃO)
--------------------------------------------------------------------------------

| Item / Critério (Decreto nº 13.048/2026) | Descrição da Atividade / Experiência | Documento Comprobatório Correspondente |
| :--- | :--- | :--- |
${processo.indexacaoComprovantes
  .map(
    (item) =>
      `| ${item.itemCriterio} | ${item.descricaoAtividade} | ${item.documentoCorrespondente} (${item.pontuacaoAtribuida} pts - ${item.statusValidacao}) |`
  )
  .join('\n')}

================================================================================
RESUMO DA PONTUAÇÃO ALCANÇADA:
- Total de Pontos Validados: ${processo.resumoPontuacao.totalPontos} pontos
- Pontuação Mínima Exigida para ${processo.servidor.nivelRscSolicitado}: ${processo.resumoPontuacao.minimoExigido} pontos
- Resultado Preliminar: ${processo.resumoPontuacao.aptoParaConcessao ? 'DEFERIMENTO INDICADO / APTO' : 'EM COMPLEMENTAÇÃO'}
- Distribuição por Eixos:
  * Eixo I (Formação e Qualificação): ${processo.resumoPontuacao.porEixo.eixoI} pts
  * Eixo II (Produção Técnica e Tecnológica): ${processo.resumoPontuacao.porEixo.eixoII} pts
  * Eixo III (Gestão e Governança): ${processo.resumoPontuacao.porEixo.eixoIII} pts
  * Eixo IV (Extensão e Ensino): ${processo.resumoPontuacao.porEixo.eixoIV} pts
================================================================================
`;
}

export function copySeiBlockToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}
