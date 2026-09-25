import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProcessoRSC } from '../types';

export function exportProcessoToPdf(processo: ProcessoRSC) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 20;

  // Header - Brazilian Federal Standard
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('REPÚBLICA FEDERATIVA DO BRASIL', pageWidth / 2, currentY, { align: 'center' });
  currentY += 5;
  doc.text('MINISTÉRIO DA EDUCAÇÃO', pageWidth / 2, currentY, { align: 'center' });
  currentY += 5;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.text('REDE FEDERAL DE EDUCAÇÃO PROFISSIONAL, CIENTÍFICA E TECNOLÓGICA', pageWidth / 2, currentY, { align: 'center' });
  currentY += 5;
  doc.text('SISTEMA ELETRÔNICO DE INFORMAÇÕES - SEI / RSC-PCCTAE', pageWidth / 2, currentY, { align: 'center' });
  currentY += 4;

  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 8;

  // Title
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.text('PROCESSO ADMINISTRATIVO DE RECONHECIMENTO DE SABERES E COMPETÊNCIAS', pageWidth / 2, currentY, { align: 'center' });
  currentY += 5;
  doc.setFontSize(11);
  doc.text(`RSC-PCCTAE (DECRETO Nº 13.048/2026) - ${processo.servidor.nivelRscSolicitado}`, pageWidth / 2, currentY, { align: 'center' });
  currentY += 4;
  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.text(`Processo SEI nº: ${processo.numeroProcessoSei || 'A autuar'} | Data: ${processo.dataCriacao}`, pageWidth / 2, currentY, { align: 'center' });
  currentY += 8;

  // BLOCO 1
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, currentY - 4, contentWidth, 7, 'F');
  doc.text('BLOCO 1: FORMULÁRIO PADRÃO DE REQUERIMENTO', margin + 2, currentY + 1);
  currentY += 8;

  doc.setFont('times', 'normal');
  doc.setFontSize(10);

  const reqLines = [
    `Nome do Servidor: ${processo.servidor.nome}`,
    `Matrícula SIAPE: ${processo.servidor.matriculaSiape} | Cargo: ${processo.servidor.cargo} (${processo.servidor.nivelCargo})`,
    `Lotação / Campus: ${processo.servidor.lotacao} - ${processo.servidor.campus}`,
    `E-mail: ${processo.servidor.email} | Tempo de Serviço: ${processo.servidor.tempoServicoPublico || 'Não informado'}`,
    `Titulação Atual: ${processo.servidor.titulacaoAtual || 'Graduação'}`,
    `Nível de RSC Solicitado: ${processo.servidor.nivelRscSolicitado} (${processo.servidor.equivalenciaTitulacao || 'Decreto nº 13.048/2026'})`,
  ];

  reqLines.forEach((line) => {
    doc.text(line, margin, currentY);
    currentY += 5.5;
  });

  doc.setFont('times', 'bold');
  doc.text('Solicitação Formal:', margin, currentY);
  currentY += 4.5;
  doc.setFont('times', 'normal');
  const solText = 'Requeiro à Comissão Especial de Avaliação a concessão do Reconhecimento de Saberes e Competências (RSC-PCCTAE), em conformidade com as diretrizes do Decreto nº 13.048/2026, com base nas comprovações documentais anexadas e no Memorial Descritivo a seguir exposto.';
  const splitSol = doc.splitTextToSize(solText, contentWidth);
  doc.text(splitSol, margin, currentY);
  currentY += splitSol.length * 4.5 + 6;

  // BLOCO 2
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, currentY - 4, contentWidth, 7, 'F');
  doc.text('BLOCO 2: DECLARAÇÕES DE CONFORMIDADE LEGAL E CIÊNCIA', margin + 2, currentY + 1);
  currentY += 8;

  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.text('1. Declaração de Veracidade Documental:', margin, currentY);
  currentY += 4.5;
  doc.setFont('times', 'normal');
  const splitVer = doc.splitTextToSize(processo.declaracoes.declaracaoVeracidade, contentWidth);
  doc.text(splitVer, margin, currentY);
  currentY += splitVer.length * 4.5 + 4;

  doc.setFont('times', 'bold');
  doc.text('2. Declaração de Conformidade com o Decreto nº 13.048/2026:', margin, currentY);
  currentY += 4.5;
  doc.setFont('times', 'normal');
  const splitConf = doc.splitTextToSize(processo.declaracoes.declaracaoConformidade, contentWidth);
  doc.text(splitConf, margin, currentY);
  currentY += splitConf.length * 4.5 + 4;

  if (processo.declaracoes.declaracaoNaoAcumulo) {
    doc.setFont('times', 'bold');
    doc.text('3. Declaração de Inexistência de Duplicidade / Acúmulo Indevido:', margin, currentY);
    currentY += 4.5;
    doc.setFont('times', 'normal');
    const splitNaoAc = doc.splitTextToSize(processo.declaracoes.declaracaoNaoAcumulo, contentWidth);
    doc.text(splitNaoAc, margin, currentY);
    currentY += splitNaoAc.length * 4.5 + 4;
  }

  // Page break for Memorial Descritivo
  doc.addPage();
  currentY = 20;

  // BLOCO 3
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, currentY - 4, contentWidth, 7, 'F');
  doc.text('BLOCO 3: MEMORIAL DESCRITIVO COMPLETO', margin + 2, currentY + 1);
  currentY += 8;

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.text('1. Apresentação e Trajetória Funcional', margin, currentY);
  currentY += 5;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  const splitApres = doc.splitTextToSize(processo.memorial.apresentacaoTrajetoria, contentWidth);
  doc.text(splitApres, margin, currentY);
  currentY += splitApres.length * 4.8 + 6;

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.text('2. Desenvolvimento de Saberes e Competências (Decreto nº 13.048/2026)', margin, currentY);
  currentY += 5;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  const splitSab = doc.splitTextToSize(processo.memorial.desenvolvimentoSaberes, contentWidth);
  doc.text(splitSab, margin, currentY);
  currentY += splitSab.length * 4.8 + 6;

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.text('3. Impacto Institucional (Ensino, Pesquisa, Extensão ou Gestão)', margin, currentY);
  currentY += 5;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  const splitImp = doc.splitTextToSize(processo.memorial.impactoInstitucional, contentWidth);
  doc.text(splitImp, margin, currentY);
  currentY += splitImp.length * 4.8 + 6;

  if (processo.memorial.conclusao) {
    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.text('4. Conclusão e Requerimento', margin, currentY);
    currentY += 5;
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    const splitConc = doc.splitTextToSize(processo.memorial.conclusao, contentWidth);
    doc.text(splitConc, margin, currentY);
    currentY += splitConc.length * 4.8 + 6;
  }

  // Page break for Table
  doc.addPage();
  currentY = 20;

  // BLOCO 4
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(240, 243, 246);
  doc.rect(margin, currentY - 4, contentWidth, 7, 'F');
  doc.text('BLOCO 4: ORGANIZAÇÃO DA DOCUMENTAÇÃO COMPROBATÓRIA (INDEXAÇÃO)', margin + 2, currentY + 1);
  currentY += 8;

  const tableRows = processo.indexacaoComprovantes.map((item, idx) => [
    `${idx + 1}. ${item.itemCriterio}`,
    item.descricaoAtividade,
    `${item.documentoCorrespondente}\n[${item.pontuacaoAtribuida} pts] - ${item.statusValidacao}`,
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Item / Critério (Decreto nº 13.048/2026)', 'Descrição da Atividade / Experiência', 'Documento Comprobatório Correspondente']],
    body: tableRows,
    theme: 'grid',
    styles: {
      font: 'times',
      fontSize: 9,
      cellPadding: 3,
      valign: 'top',
    },
    headStyles: {
      fillColor: [30, 58, 95],
      textColor: 255,
      fontStyle: 'bold',
    },
    margin: { left: margin, right: margin },
  });

  const lastTableY = (doc as any).lastAutoTable?.finalY;
  const finalY = (typeof lastTableY === 'number' ? lastTableY : currentY + 50) + 8;

  // Summary box
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.text(`PONTUAÇÃO TOTAL ESTIMADA: ${processo.resumoPontuacao.totalPontos} PONTOS (Mínimo exigido: ${processo.resumoPontuacao.minimoExigido} pts)`, margin, finalY);
  doc.setFont('times', 'normal');
  doc.text(`Status: ${processo.resumoPontuacao.aptoParaConcessao ? 'APTO PARA CONCESSÃO' : 'EM ANÁLISE'} | Eixo I: ${processo.resumoPontuacao.porEixo.eixoI} pts | Eixo II: ${processo.resumoPontuacao.porEixo.eixoII} pts | Eixo III: ${processo.resumoPontuacao.porEixo.eixoIII} pts | Eixo IV: ${processo.resumoPontuacao.porEixo.eixoIV} pts`, margin, finalY + 5);

  // Signatures
  const signY = finalY + 25;
  if (signY < 270) {
    doc.line(margin + 20, signY, pageWidth - margin - 20, signY);
    doc.setFont('times', 'normal');
    doc.setFontSize(9.5);
    doc.text(processo.servidor.nome, pageWidth / 2, signY + 4, { align: 'center' });
    doc.text(`Matrícula SIAPE nº ${processo.servidor.matriculaSiape} - ${processo.servidor.cargo}`, pageWidth / 2, signY + 8, { align: 'center' });
    doc.text('Documento assinado eletronicamente conforme MP nº 2.200-2/2001 e Decreto nº 8.539/2015', pageWidth / 2, signY + 12, { align: 'center' });
  }

  // Footer on all pages
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.text(`Processo RSC-PCCTAE (Decreto nº 13.048/2026) - Página ${i} de ${pageCount}`, pageWidth / 2, 288, { align: 'center' });
  }

  doc.save(`Processo_RSC_PCCTAE_${processo.servidor.matriculaSiape}_${processo.servidor.nivelRscSolicitado}.pdf`);
}
