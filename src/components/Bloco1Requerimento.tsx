import React, { useState } from 'react';
import { FileText, Copy, Check, Edit3, Save, User, Building, Mail, Award, Clock, GraduationCap } from 'lucide-react';
import { ServidorInfo } from '../types';
import { copySeiBlockToClipboard } from '../utils/seiClipboard';

interface Bloco1Props {
  servidor: ServidorInfo;
  onUpdateServidor: (novoServidor: ServidorInfo) => void;
}

export const Bloco1Requerimento: React.FC<Bloco1Props> = ({
  servidor,
  onUpdateServidor,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ServidorInfo>(servidor);

  const handleCopySei = () => {
    const text = `BLOCO 1: FORMULÁRIO PADRÃO DE REQUERIMENTO
- Nome do Servidor: ${servidor.nome}
- Matrícula SIAPE: ${servidor.matriculaSiape}
- Cargo / Nível: ${servidor.cargo} (${servidor.nivelCargo})
- Lotação / Campus: ${servidor.lotacao} - ${servidor.campus}
- E-mail Institucional: ${servidor.email}
- Telefone: ${servidor.telefone || 'Não informado'}
- Tempo de Serviço Público: ${servidor.tempoServicoPublico || 'Não informado'}
- Titulação Atual: ${servidor.titulacaoAtual || 'Graduação'}
- Nível de RSC Solicitado: ${servidor.nivelRscSolicitado} (${servidor.equivalenciaTitulacao || 'Decreto nº 13.048/2026'})
- Solicitação: Requeiro a concessão do Reconhecimento de Saberes e Competências (RSC-PCCTAE), conforme documentação e Memorial Descritivo em anexo, nos termos do Decreto nº 13.048/2026.`;

    copySeiBlockToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  const handleSave = () => {
    onUpdateServidor(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
            1
          </span>
          <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase">
            BLOCO 1: Formulário Padrão de Requerimento
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (isEditing) handleSave();
              else {
                setFormData(servidor);
                setIsEditing(true);
              }
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Salvar</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-slate-300" />
                <span>Editar</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopySei}
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded transition-colors ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
            }`}
            title="Copiar Bloco 1 formatado para o editor do SEI"
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
      </div>

      {/* Content */}
      <div className="p-5">
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nome do Servidor:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Matrícula SIAPE:</label>
              <input
                type="text"
                value={formData.matriculaSiape}
                onChange={(e) => setFormData({ ...formData, matriculaSiape: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cargo:</label>
              <input
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nível / Classe:</label>
              <input
                type="text"
                value={formData.nivelCargo}
                onChange={(e) => setFormData({ ...formData, nivelCargo: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lotação / Setor:</label>
              <input
                type="text"
                value={formData.lotacao}
                onChange={(e) => setFormData({ ...formData, lotacao: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Campus / Unidade:</label>
              <input
                type="text"
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">E-mail:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nível de RSC Solicitado:</label>
              <select
                value={formData.nivelRscSolicitado}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nivelRscSolicitado: e.target.value as any,
                    equivalenciaTitulacao:
                      e.target.value === 'RSC-I'
                        ? 'Equivalência a Especialização (Decreto nº 13.048/2026)'
                        : e.target.value === 'RSC-II'
                          ? 'Equivalência a Mestrado (Decreto nº 13.048/2026)'
                          : 'Equivalência a Doutorado (Decreto nº 13.048/2026)',
                  })
                }
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium bg-white"
              >
                <option value="RSC-I">RSC-I</option>
                <option value="RSC-II">RSC-II</option>
                <option value="RSC-III">RSC-III</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Grid of Extracted Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start space-x-2.5">
                <User className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Nome do Servidor
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {servidor.nome}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start space-x-2.5">
                <FileText className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Matrícula SIAPE
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                    {servidor.matriculaSiape}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start space-x-2.5">
                <Award className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Cargo / Nível
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {servidor.cargo} <span className="text-xs text-slate-600 font-normal">({servidor.nivelCargo})</span>
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start space-x-2.5">
                <Building className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Lotação / Campus
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                    {servidor.lotacao} &bull; {servidor.campus}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start space-x-2.5">
                <GraduationCap className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Nível RSC Solicitado
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-800">
                    {servidor.nivelRscSolicitado}{' '}
                    <span className="text-[11px] text-slate-600 font-normal">
                      ({servidor.equivalenciaTitulacao || 'Decreto nº 13.048/2026'})
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    E-mail Institucional
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                    {servidor.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Formal Request Sentence */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block mb-1">
                Solicitação Formal:
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                Requeiro a concessão do <strong>Reconhecimento de Saberes e Competências (RSC-PCCTAE)</strong>, no nível{' '}
                <strong>{servidor.nivelRscSolicitado}</strong>, conforme documentação comprobatória e Memorial Descritivo em anexo, com base nos critérios estabelecidos no <strong>Decreto nº 13.048/2026</strong> e regulamentações do PCCTAE.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
