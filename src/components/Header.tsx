import React from 'react';
import { FileText, Award, Download, BookOpen, ShieldCheck, RefreshCw } from 'lucide-react';
import { ProcessoRSC } from '../types';

interface HeaderProps {
  processo: ProcessoRSC;
  onOpenDecretoModal: () => void;
  onOpenExportModal: () => void;
  onResetToDefault: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  processo,
  onOpenDecretoModal,
  onOpenExportModal,
  onResetToDefault,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Federal Bar */}
      <div className="bg-emerald-900/80 px-4 py-1.5 text-xs text-emerald-100 flex items-center justify-between border-b border-emerald-800/60">
        <div className="flex items-center space-x-2">
          <span className="font-bold tracking-wider uppercase">Brasil</span>
          <span className="text-emerald-400">|</span>
          <span>Ministério da Educação (MEC) &bull; PCCTAE (Lei nº 11.091/2005)</span>
        </div>
        <div className="flex items-center space-x-3 text-emerald-200">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Decreto nº 13.048/2026 Vigente
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">SEI - Sistema Eletrônico de Informações</span>
        </div>
      </div>

      {/* Main Navigation & App Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3">
            <div className="p-2.5 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-emerald-400 shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Sistema Autônomo RSC-PCCTAE
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Decreto nº 13.048/2026
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  {processo.servidor.nivelRscSolicitado}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Instrução processual e geração autônoma dos 4 Blocos padronizados para abertura de processo no SEI
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-info-decreto"
              onClick={onOpenDecretoModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors shadow-sm"
              title="Consultar diretrizes e pontuações do Decreto nº 13.048/2026"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Regulamento & Critérios</span>
            </button>

            <button
              id="btn-export-dossier"
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-sm shadow-emerald-950/40"
              title="Exportar Documentação Completa (PDF, Word, SEI)"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Processo SEI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
