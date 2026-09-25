import { ProcessoRSC } from '../types';

export function exportProcessoToWord(processo: ProcessoRSC) {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Processo RSC-PCCTAE - ${processo.servidor.nome}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; color: #000; margin: 30mm 20mm 20mm 20mm; }
        h1, h2, h3 { text-align: center; font-weight: bold; margin: 5px 0; }
        h1 { font-size: 14pt; }
        h2 { font-size: 12pt; }
        h3 { font-size: 11pt; font-weight: normal; }
        .block-header { background-color: #f0f0f0; border-top: 1.5pt solid #000; border-bottom: 1.5pt solid #000; padding: 6px 10px; font-weight: bold; font-size: 12pt; margin-top: 25px; margin-bottom: 12px; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        .info-table td { padding: 4px 6px; font-size: 11pt; }
        .bold { font-weight: bold; }
        .content-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
        .content-table th, .content-table td { border: 1pt solid #000; padding: 6px 8px; font-size: 10pt; text-align: left; }
        .content-table th { background-color: #e6e6e6; font-weight: bold; }
        .section-title { font-weight: bold; margin-top: 14px; margin-bottom: 4px; font-size: 11pt; }
        p { margin: 6px 0; text-align: justify; text-indent: 1.5cm; }
        .signature { margin-top: 50px; text-align: center; }
      </style>
    </head>
    <body>
      <h1>REPÚBLICA FEDERATIVA DO BRASIL</h1>
      <h2>MINISTÉRIO DA EDUCAÇÃO</h2>
      <h3>REDE FEDERAL DE EDUCAÇÃO PROFISSIONAL, CIENTÍFICA E TECNOLÓGICA</h3>
      <p style="text-align:center; text-indent:0; font-weight:bold; margin-top: 15px;">
        REQUERIMENTO DE RECONHECIMENTO DE SABERES E COMPETÊNCIAS (RSC-PCCTAE)<br>
        REGULAMENTADO PELO DECRETO Nº 13.048/2026
      </p>

      <div class="block-header">BLOCO 1: FORMULÁRIO PADRÃO DE REQUERIMENTO</div>
      <table class="info-table">
        <tr><td class="bold" width="30%">Nome do Servidor:</td><td>${processo.servidor.nome}</td></tr>
        <tr><td class="bold">Matrícula SIAPE:</td><td>${processo.servidor.matriculaSiape}</td></tr>
        <tr><td class="bold">Cargo / Nível:</td><td>${processo.servidor.cargo} (${processo.servidor.nivelCargo})</td></tr>
        <tr><td class="bold">Lotação / Campus:</td><td>${processo.servidor.lotacao} - ${processo.servidor.campus}</td></tr>
        <tr><td class="bold">E-mail:</td><td>${processo.servidor.email}</td></tr>
        <tr><td class="bold">Nível de RSC Solicitado:</td><td>${processo.servidor.nivelRscSolicitado} (${processo.servidor.equivalenciaTitulacao})</td></tr>
      </table>
      <p style="text-indent:0; font-weight:bold; margin-top:10px;">Solicitação:</p>
      <p>Requeiro a concessão do Reconhecimento de Saberes e Competências (RSC-PCCTAE), conforme documentação comprobatória e Memorial Descritivo em anexo, nos termos do Decreto nº 13.048/2026.</p>

      <div class="block-header">BLOCO 2: DECLARAÇÕES DE CONFORMIDADE LEGAL E CIÊNCIA</div>
      <div class="section-title">1. Declaração de Veracidade:</div>
      <p>${processo.declaracoes.declaracaoVeracidade}</p>
      <div class="section-title">2. Declaração de Conformidade:</div>
      <p>${processo.declaracoes.declaracaoConformidade}</p>
      ${processo.declaracoes.declaracaoNaoAcumulo ? `<div class="section-title">3. Declaração de Inexistência de Duplicidade:</div><p>${processo.declaracoes.declaracaoNaoAcumulo}</p>` : ''}

      <div class="block-header">BLOCO 3: MEMORIAL DESCRITIVO COMPLETO</div>
      <div class="section-title">1. Apresentação e Trajetória Funcional:</div>
      <p>${processo.memorial.apresentacaoTrajetoria}</p>
      <div class="section-title">2. Desenvolvimento de Saberes e Competências (Decreto nº 13.048/2026):</div>
      <p>${processo.memorial.desenvolvimentoSaberes}</p>
      <div class="section-title">3. Impacto Institucional (Ensino, Pesquisa, Extensão ou Gestão):</div>
      <p>${processo.memorial.impactoInstitucional}</p>
      ${processo.memorial.conclusao ? `<div class="section-title">4. Conclusão:</div><p>${processo.memorial.conclusao}</p>` : ''}

      <div class="block-header">BLOCO 4: ORGANIZAÇÃO DA DOCUMENTAÇÃO COMPROBATÓRIA (INDEXAÇÃO)</div>
      <table class="content-table">
        <thead>
          <tr>
            <th width="35%">Item / Critério (Decreto nº 13.048/2026)</th>
            <th width="35%">Descrição da Atividade / Experiência</th>
            <th width="30%">Documento Comprobatório Correspondente</th>
          </tr>
        </thead>
        <tbody>
          ${processo.indexacaoComprovantes
            .map(
              (item) => `
            <tr>
              <td>${item.itemCriterio}</td>
              <td>${item.descricaoAtividade}</td>
              <td>${item.documentoCorrespondente} <br><em>[${item.pontuacaoAtribuida} pts - ${item.statusValidacao}]</em></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>

      <p style="text-indent:0; font-weight:bold;">
        Pontuação Total Estimada: ${processo.resumoPontuacao.totalPontos} pontos (Mínimo exigido: ${processo.resumoPontuacao.minimoExigido} pontos)
      </p>

      <div class="signature">
        <br><br>
        _______________________________________________________<br>
        <strong>${processo.servidor.nome}</strong><br>
        Matrícula SIAPE nº ${processo.servidor.matriculaSiape}<br>
        ${processo.servidor.cargo}
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + content], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Processo_RSC_PCCTAE_${processo.servidor.matriculaSiape}_${processo.servidor.nivelRscSolicitado}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
