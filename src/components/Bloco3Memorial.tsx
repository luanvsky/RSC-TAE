import React, { useState } from 'react';
import {
  BookOpen,
  Copy,
  Check,
  Edit3,
  Save,
  Sparkles,
  Award,
  History,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { MemorialDescritivo, ServidorInfo } from '../types';
import { copySeiBlockToClipboard } from '../utils/seiClipboard';

interface Bloco3Props {
  memorial: MemorialDescritivo;
  servidor: ServidorInfo;
  onUpdateMemorial: (novoMemorial: MemorialDescritivo) => void;
}

export const Bloco3Memorial: React.FC<Bloco3Props> = ({
  memorial,
  servidor,
  onUpdateMemorial,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<MemorialDescritivo>(memorial);
  const [isRefining, setIsRefining] = useState(false);
  const [refineSuccess, setRefineSuccess] = useState(false);

  const handleCopySei = () => {
    const text = `BLOCO 3: MEMORIAL DESCRITIVO COMPLETO

1. APRESENTAÇÃO E TRAJETÓRIA FUNCIONAL
${memorial.apresentacaoTrajetoria}

2. DESENVOLVIMENTO DE SABERES E COMPETÊNCIAS (DECRETO Nº 13.048/2026)
${memorial.desenvolvimentoSaberes}

3. IMPACTO INSTITUCIONAL (ENSINO, PESQUISA, EXTENSÃO OU GESTÃO)
${memorial.impactoInstitucional}

${memorial.conclusao ? `4. CONCLUSÃO E REQUERIMENTO FINAL\n${memorial.conclusao}` : ''}`;

    copySeiBlockToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  const handleSave = () => {
    onUpdateMemorial(formData);
    setIsEditing(false);
  };

  const handleRefineWithAI = async () => {
    setIsRefining(true);
    setRefineSuccess(false);
    try {
      const response = await fetch('/api/refine-memorial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memorialAtual: memorial,
          servidor: servidor,
          foco: 'Fundamentação rigorosa, cronologia clara e alinhamento aos critérios do Decreto nº 13.048/2026',
        }),
      });

      const data = await response.json();
      if (data.success && data.memorial) {
        onUpdateMemorial(data.memorial);
        setFormData(data.memorial);
        setRefineSuccess(true);
        setTimeout(() => setRefineSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Refine failed:', err);
    } finally {
      setIsRefining(false);
    }
  };

  const totalWords = (
    (memorial.apresentacaoTrajetoria || '').split(/\s+/).length +
    (memorial.desenvolvimentoSaberes || '').split(/\s+/).length +
    (memorial.impactoInstitucional || '').split(/\s+/).length +
    (memorial.conclusao || '').split(/\s+/).length
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
            3
          </span>
          <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase">
            BLOCO 3: Memorial Descritivo Completo
          </h2>
          <span className="text-[11px] font-normal text-slate-400">
            ({totalWords} palavras)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefineWithAI}
            disabled={isRefining}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/60 transition-colors disabled:opacity-50"
            title="Aprimorar redação e fundamentação com IA"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin-slow" />
            <span>{isRefining ? 'Aprimorando...' : 'Aprimorar com IA'}</span>
          </button>

          <button
            onClick={() => {
              if (isEditing) handleSave();
              else {
                setFormData(memorial);
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
            title="Copiar Bloco 3 formatado para o editor do SEI"
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

      {/* Refine Success Badge */}
      {refineSuccess && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2 text-xs font-medium text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Memorial descritivo aprimorado com sucesso e harmonizado com o Decreto nº 13.048/2026!</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-5">
        {isEditing ? (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <History className="w-4 h-4 text-emerald-600" />
                1. Apresentação e Trajetória Funcional:
              </label>
              <textarea
                value={formData.apresentacaoTrajetoria}
                onChange={(e) =>
                  setFormData({ ...formData, apresentacaoTrajetoria: e.target.value })
                }
                rows={5}
                className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 leading-relaxed font-sans"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                2. Desenvolvimento de Saberes e Competências (Decreto nº 13.048/2026):
              </label>
              <textarea
                value={formData.desenvolvimentoSaberes}
                onChange={(e) =>
                  setFormData({ ...formData, desenvolvimentoSaberes: e.target.value })
                }
                rows={6}
                className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 leading-relaxed font-sans"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                3. Impacto Institucional (Ensino, Pesquisa, Extensão ou Gestão):
              </label>
              <textarea
                value={formData.impactoInstitucional}
                onChange={(e) =>
                  setFormData({ ...formData, impactoInstitucional: e.target.value })
                }
                rows={5}
                className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 leading-relaxed font-sans"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-slate-600" />
                4. Conclusão e Requerimento:
              </label>
              <textarea
                value={formData.conclusao || ''}
                onChange={(e) => setFormData({ ...formData, conclusao: e.target.value })}
                rows={3}
                className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 leading-relaxed font-sans"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5 text-slate-800">
            {/* Section 1 */}
            <div className="border-l-4 border-emerald-600 pl-4 py-0.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-emerald-600" />
                1. Apresentação e Trajetória Funcional
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {memorial.apresentacaoTrajetoria}
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-l-4 border-blue-600 pl-4 py-0.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-blue-600" />
                2. Desenvolvimento de Saberes e Competências (Decreto nº 13.048/2026)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {memorial.desenvolvimentoSaberes}
              </p>
            </div>

            {/* Section 3 */}
            <div className="border-l-4 border-purple-600 pl-4 py-0.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                3. Impacto Institucional (Ensino, Pesquisa, Extensão ou Gestão)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {memorial.impactoInstitucional}
              </p>
            </div>

            {/* Section 4: Conclusão */}
            {memorial.conclusao && (
              <div className="border-l-4 border-slate-500 pl-4 py-0.5 bg-slate-50 p-3 rounded-r-lg">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-1.5">
                  <FileCheck className="w-4 h-4 text-slate-600" />
                  4. Conclusão e Requerimento
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {memorial.conclusao}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
