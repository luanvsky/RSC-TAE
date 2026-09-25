import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { UploadAndExtractionPanel } from './components/UploadAndExtractionPanel';
import { ResumoPontuacaoCard } from './components/ResumoPontuacaoCard';
import { Bloco1Requerimento } from './components/Bloco1Requerimento';
import { Bloco2Declaracoes } from './components/Bloco2Declaracoes';
import { Bloco3Memorial } from './components/Bloco3Memorial';
import { Bloco4Indexacao } from './components/Bloco4Indexacao';
import { DecretoInfoModal } from './components/DecretoInfoModal';
import { ExportModal } from './components/ExportModal';
import { ProcessoRSC, ServidorInfo, DeclaracoesConformidade, MemorialDescritivo, ComprovanteItem } from './types';
import { mockDossiers } from './data/mockDossiers';
import { FileCheck, Award, ShieldCheck, Download, Copy, Check } from 'lucide-react';
import { generateSeiFormattedText, copySeiBlockToClipboard } from './utils/seiClipboard';

export default function App() {
  const [processo, setProcesso] = useState<ProcessoRSC>(mockDossiers[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDecretoModalOpen, setIsDecretoModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedQuick, setCopiedQuick] = useState(false);

  // Recalculate score breakdown when items or desired level change
  const currentProcessoWithRecalc = useMemo(() => {
    const items = processo.indexacaoComprovantes || [];
    let e1 = 0, e2 = 0, e3 = 0, e4 = 0;

    items.forEach((item) => {
      const pts = Number(item.pontuacaoAtribuida) || 0;
      if (item.eixo.startsWith('I -')) e1 += pts;
      else if (item.eixo.startsWith('II -')) e2 += pts;
      else if (item.eixo.startsWith('III -')) e3 += pts;
      else if (item.eixo.startsWith('IV -')) e4 += pts;
    });

    const total = e1 + e2 + e3 + e4;
    const nivel = processo.servidor.nivelRscSolicitado || 'RSC-II';
    const minExigido = nivel === 'RSC-I' ? 45 : nivel === 'RSC-II' ? 52 : 60;
    const apto = total >= minExigido;

    return {
      ...processo,
      resumoPontuacao: {
        totalPontos: total,
        minimoExigido: minExigido,
        aptoParaConcessao: apto,
        porEixo: {
          eixoI: e1,
          eixoII: e2,
          eixoIII: e3,
          eixoIV: e4,
        },
      },
    };
  }, [processo]);

  const handleUpdateServidor = (novoServidor: ServidorInfo) => {
    setProcesso((prev) => ({
      ...prev,
      servidor: novoServidor,
    }));
  };

  const handleUpdateDeclaracoes = (novasDeclaracoes: DeclaracoesConformidade) => {
    setProcesso((prev) => ({
      ...prev,
      declaracoes: novasDeclaracoes,
    }));
  };

  const handleUpdateMemorial = (novoMemorial: MemorialDescritivo) => {
    setProcesso((prev) => ({
      ...prev,
      memorial: novoMemorial,
    }));
  };

  const handleUpdateComprovantes = (novosComprovantes: ComprovanteItem[]) => {
    setProcesso((prev) => ({
      ...prev,
      indexacaoComprovantes: novosComprovantes,
    }));
  };

  const handleCopyAllSEI = () => {
    const fullText = generateSeiFormattedText(currentProcessoWithRecalc);
    copySeiBlockToClipboard(fullText).then((ok) => {
      if (ok) {
        setCopiedQuick(true);
        setTimeout(() => setCopiedQuick(false), 2000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 font-sans antialiased flex flex-col">
      {/* Header */}
      <Header
        processo={currentProcessoWithRecalc}
        onOpenDecretoModal={() => setIsDecretoModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onResetToDefault={() => setProcesso(mockDossiers[0])}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Upload & Autonomous AI Analysis Engine */}
        <UploadAndExtractionPanel
          currentProcesso={currentProcessoWithRecalc}
          onProcessoUpdate={(newProc) => setProcesso(newProc)}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />

        {/* Scoring & Compliance Gauge */}
        <ResumoPontuacaoCard processo={currentProcessoWithRecalc} />

        {/* Quick Toolbar for SEI Generation */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              Dossiê Processual SEI Ativo:
            </span>
            <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono font-medium">
              {currentProcessoWithRecalc.numeroProcessoSei || '23000.014820/2026-42'}
            </span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={handleCopyAllSEI}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                copiedQuick
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
              }`}
              title="Copiar texto consolidado de todos os 4 blocos para colar diretamente no SEI"
            >
              {copiedQuick ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Todos os 4 Blocos p/ SEI</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar PDF/Word</span>
            </button>
          </div>
        </div>

        {/* THE 4 MANDATORY SEI BLOCKS */}
        <div className="space-y-6">
          {/* BLOCO 1: FORMULÁRIO PADRÃO DE REQUERIMENTO */}
          <Bloco1Requerimento
            servidor={currentProcessoWithRecalc.servidor}
            onUpdateServidor={handleUpdateServidor}
          />

          {/* BLOCO 2: DECLARAÇÕES DE CONFORMIDADE LEGAL E CIÊNCIA */}
          <Bloco2Declaracoes
            declaracoes={currentProcessoWithRecalc.declaracoes}
            onUpdateDeclaracoes={handleUpdateDeclaracoes}
          />

          {/* BLOCO 3: MEMORIAL DESCRITIVO COMPLETO */}
          <Bloco3Memorial
            memorial={currentProcessoWithRecalc.memorial}
            servidor={currentProcessoWithRecalc.servidor}
            onUpdateMemorial={handleUpdateMemorial}
          />

          {/* BLOCO 4: ORGANIZAÇÃO DA DOCUMENTAÇÃO COMPROBATÓRIA (INDEXAÇÃO) */}
          <Bloco4Indexacao
            comprovantes={currentProcessoWithRecalc.indexacaoComprovantes}
            onUpdateComprovantes={handleUpdateComprovantes}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-300">
              Sistema Autônomo Especialista na Instrução do Processo de RSC-PCCTAE
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Conformidade estrita com o Decreto Presidencial nº 13.048/2026 e Lei Federal nº 11.091/2005
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>SEI / SouGov</span>
            <span>&bull;</span>
            <span>MEC / Setec</span>
            <span>&bull;</span>
            <span>Rede Federal de EPCT</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DecretoInfoModal
        isOpen={isDecretoModalOpen}
        onClose={() => setIsDecretoModalOpen(false)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        processo={currentProcessoWithRecalc}
      />
    </div>
  );
}
