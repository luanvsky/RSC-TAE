import React from 'react';
import { Award, CheckCircle2, AlertCircle, BarChart3, ShieldAlert, FileText, Check } from 'lucide-react';
import { ProcessoRSC } from '../types';

interface ResumoPontuacaoProps {
  processo: ProcessoRSC;
}

export const ResumoPontuacaoCard: React.FC<ResumoPontuacaoProps> = ({ processo }) => {
  const { resumoPontuacao, servidor, parecerPreliminarIA } = processo;
  const { totalPontos, minimoExigido, aptoParaConcessao, porEixo } = resumoPontuacao;

  const percentual = Math.min(100, Math.round((totalPontos / minimoExigido) * 100));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Main Score Gauge */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 shadow-inner ${
                  aptoParaConcessao
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : 'border-amber-500 bg-amber-50 text-amber-900'
                }`}
              >
                <span className="text-2xl font-black leading-none">{totalPontos}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">Pontos</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Parecer Preliminar
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded-full flex items-center gap-1 ${
                    aptoParaConcessao
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {aptoParaConcessao ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      APTO PARA CONCESSÃO ({servidor.nivelRscSolicitado})
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      EM COMPLEMENTAÇÃO
                    </>
                  )}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Piso regulamentar do <strong>Decreto nº 13.048/2026</strong>: <strong>{minimoExigido} pontos</strong> para{' '}
                <strong className="text-emerald-700">{servidor.nivelRscSolicitado}</strong> ({percentual}% atingido).
              </p>
            </div>
          </div>

          {/* Breakdown across Eixos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 min-w-[280px]">
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                Eixo I: Qualificação
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-sm font-black text-slate-900">{porEixo.eixoI} pts</span>
                <span className="text-[10px] text-slate-600">teto 30</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (porEixo.eixoI / 30) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                Eixo II: Prod. Técnica
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-sm font-black text-slate-900">{porEixo.eixoII} pts</span>
                <span className="text-[10px] text-slate-600">teto 45</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (porEixo.eixoII / 45) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                Eixo III: Gestão
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-sm font-black text-slate-900">{porEixo.eixoIII} pts</span>
                <span className="text-[10px] text-slate-600">teto 35</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (porEixo.eixoIII / 35) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block truncate">
                Eixo IV: Ensino/Ext.
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-sm font-black text-slate-900">{porEixo.eixoIV} pts</span>
                <span className="text-[10px] text-slate-600">teto 25</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (porEixo.eixoIV / 25) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preliminary IA Audit Note */}
        {parecerPreliminarIA && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-start space-x-2 text-xs text-slate-600">
            <span className="font-bold text-emerald-800 uppercase shrink-0">
              Parecer Técnico do Sistema:
            </span>
            <span className="leading-relaxed text-slate-700">{parecerPreliminarIA}</span>
          </div>
        )}
      </div>
    </div>
  );
};
