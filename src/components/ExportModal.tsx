import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  Copy,
  Check,
  Printer,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
} from 'lucide-react';
import { ProcessoRSC } from '../types';
import { exportProcessoToPdf } from '../utils/pdfExport';
import { exportProcessoToWord } from '../utils/wordExport';
import { generateSeiFormattedText, copySeiBlockToClipboard } from '../utils/seiClipboard';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  processo: ProcessoRSC;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  processo,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const handleCopyFullSei = () => {
    const fullText = generateSeiFormattedText(processo);
    copySeiBlockToClipboard(fullText).then((ok) => {
      if (ok) {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2500);
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(processo, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dossie_RSC_${processo.servidor.matriculaSiape}_Backup.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <Download className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">Exportar Processo SEI Completo</h2>
              <p className="text-xs text-slate-400">
                Minutas consolidadas dos 4 Blocos para autuação administrativa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Options Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* PDF Option */}
            <div
              onClick={() => exportProcessoToPdf(processo)}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer transition-all flex items-start space-x-3 group"
            >
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Gerar PDF Oficial Federal</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Layout A4 com Brasão, cabeçalho do MEC, tabelas e termos de assinatura
                </p>
              </div>
            </div>

            {/* Word DOCX Option */}
            <div
              onClick={() => exportProcessoToWord(processo)}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all flex items-start space-x-3 group"
            >
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Documento Microsoft Word</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Arquivo editável formatado em Times New Roman 12pt e tabelas
                </p>
              </div>
            </div>

            {/* Copy Full SEI Text */}
            <div
              onClick={handleCopyFullSei}
              className="p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/30 cursor-pointer transition-all flex items-start space-x-3 group"
            >
              <div className="p-2 bg-purple-100 text-purple-700 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                {copiedAll ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {copiedAll ? 'Copiado com Sucesso!' : 'Copiar Tudo (Texto SEI)'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Texto contínuo com os 4 Blocos pronto para colar no editor do SEI
                </p>
              </div>
            </div>

            {/* Backup JSON */}
            <div
              onClick={handleExportJson}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 cursor-pointer transition-all flex items-start space-x-3 group"
            >
              <div className="p-2 bg-slate-100 text-slate-700 rounded-lg group-hover:bg-slate-800 group-hover:text-white transition-colors">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Backup Estruturado (JSON)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Salvar os dados completos para restauração ou auditoria futura
                </p>
              </div>
            </div>
          </div>

          {/* Quick Print Button */}
          <div className="pt-2">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Visualizar Impressão</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
