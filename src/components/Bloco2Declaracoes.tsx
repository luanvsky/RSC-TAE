import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, CheckCircle, AlertTriangle } from 'lucide-react';
import { DeclaracoesConformidade } from '../types';
import { copySeiBlockToClipboard } from '../utils/seiClipboard';

interface Bloco2Props {
  declaracoes: DeclaracoesConformidade;
  onUpdateDeclaracoes: (novasDeclaracoes: DeclaracoesConformidade) => void;
}

export const Bloco2Declaracoes: React.FC<Bloco2Props> = ({
  declaracoes,
  onUpdateDeclaracoes,
}) => {
  const [copied, setCopied] = useState(false);
  const [concordanciaVeracidade, setConcordanciaVeracidade] = useState(true);
  const [concordanciaDecreto, setConcordanciaDecreto] = useState(true);
  const [concordanciaNaoAcumulo, setConcordanciaNaoAcumulo] = useState(true);

  const handleCopySei = () => {
    const text = `BLOCO 2: DECLARAÇÕES DE CONFORMIDADE LEGAL E CIÊNCIA

1. DECLARAÇÃO DE VERACIDADE:
"${declaracoes.declaracaoVeracidade}"

2. DECLARAÇÃO DE CONFORMIDADE:
"${declaracoes.declaracaoConformidade}"

${declaracoes.declaracaoNaoAcumulo ? `3. DECLARAÇÃO DE NÃO DUPLICIDADE:\n"${declaracoes.declaracaoNaoAcumulo}"\n` : ''}
${declaracoes.declaracaoCienciaRegulamento ? `4. DECLARAÇÃO DE CIÊNCIA:\n"${declaracoes.declaracaoCienciaRegulamento}"` : ''}`;

    copySeiBlockToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
            2
          </span>
          <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase">
            BLOCO 2: Declarações de Conformidade Legal e Ciência
          </h2>
        </div>

        <button
          onClick={handleCopySei}
          className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded transition-colors ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
          }`}
          title="Copiar Bloco 2 formatado para o editor do SEI"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar p/ SEI</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Item 1: Veracidade */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                1. Declaração de Veracidade e Autenticidade Documental
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Obrigatória no SEI
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200/60 mb-2">
            &ldquo;{declaracoes.declaracaoVeracidade}&rdquo;
          </p>
          <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={concordanciaVeracidade}
              onChange={(e) => setConcordanciaVeracidade(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <span>Servidor manifestou ciência e confirmação de fé pública</span>
          </label>
        </div>

        {/* Item 2: Conformidade Decreto */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                2. Declaração de Conformidade com o Decreto nº 13.048/2026
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Base Legal
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200/60 mb-2">
            &ldquo;{declaracoes.declaracaoConformidade}&rdquo;
          </p>
          <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={concordanciaDecreto}
              onChange={(e) => setConcordanciaDecreto(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <span>Reconhecimento pleno dos critérios avaliativos e diretrizes regimentais</span>
          </label>
        </div>

        {/* Item 3: Não Acúmulo Indevido */}
        {declaracoes.declaracaoNaoAcumulo && (
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  3. Declaração de Não-Duplicidade de Pontuação (Incentivo à Qualificação)
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Segurança Jurídica
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200/60 mb-2">
              &ldquo;{declaracoes.declaracaoNaoAcumulo}&rdquo;
            </p>
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={concordanciaNaoAcumulo}
                onChange={(e) => setConcordanciaNaoAcumulo(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span>Inexistência de cômputo concomitante para o mesmo fato gerador</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
