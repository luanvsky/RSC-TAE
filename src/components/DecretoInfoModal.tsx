import React from 'react';
import { X, BookOpen, Scale, Award, Layers, CheckSquare } from 'lucide-react';
import { decretoInfo } from '../data/mockDossiers';

interface DecretoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DecretoInfoModal: React.FC<DecretoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <Scale className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {decretoInfo.numero} &bull; Diretrizes e Critérios
              </h2>
              <p className="text-xs text-slate-400">
                Regulamentação do Reconhecimento de Saberes e Competências (RSC-PCCTAE)
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          {/* Ementa */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-900 block mb-1 uppercase text-xs">
              Ementa Normativa:
            </span>
            <p className="leading-relaxed italic">{decretoInfo.ementa}</p>
          </div>

          {/* Níveis de RSC */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-1.5 mb-3">
              <Award className="w-4 h-4 text-emerald-600" />
              Níveis e Equivalências de Titulação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {decretoInfo.niveis.map((lvl) => (
                <div
                  key={lvl.nivel}
                  className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      {lvl.nivel}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Mín. {lvl.pontuacaoMinima} pts
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mt-2">{lvl.equivalencia}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {lvl.requisitos}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Os 4 Eixos */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-1.5 mb-3">
              <Layers className="w-4 h-4 text-blue-600" />
              Os 4 Eixos Avaliativos do PCCTAE
            </h3>
            <div className="space-y-2.5">
              {decretoInfo.eixos.map((eixo) => (
                <div
                  key={eixo.eixo}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{eixo.eixo}</span>
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      {eixo.teto}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {eixo.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Passo a Passo no SEI */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
            <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <CheckSquare className="w-4 h-4 text-emerald-700" />
              Checklist de Autuação do Processo no SEI:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-emerald-900 leading-relaxed">
              <li>Iniciar processo no SEI tipo: <strong>&ldquo;Pessoal: Reconhecimento de Saberes e Competências (RSC-PCCTAE)&rdquo;</strong>.</li>
              <li>Inserir documento tipo <strong>&ldquo;Requerimento&rdquo;</strong> e colar o <strong>BLOCO 1</strong>.</li>
              <li>Inserir documento tipo <strong>&ldquo;Termo de Declaração&rdquo;</strong> e colar o <strong>BLOCO 2</strong>.</li>
              <li>Inserir documento tipo <strong>&ldquo;Memorial Descritivo&rdquo;</strong> e colar o <strong>BLOCO 3</strong>.</li>
              <li>Inserir documento tipo <strong>&ldquo;Tabela de Indexação Comprobatória&rdquo;</strong> e colar o <strong>BLOCO 4</strong>.</li>
              <li>Anexar em sequência os arquivos PDFs comprovatórios exatamente numerados conforme a tabela de indexação.</li>
              <li>Assinar digitalmente com credenciais do SouGov/Gov.br ou certificado ICP-Brasil e tramitar à Comissão de Avaliação.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors"
          >
            Entendido / Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
