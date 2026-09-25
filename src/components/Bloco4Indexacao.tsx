import React, { useState } from 'react';
import {
  Table,
  Copy,
  Check,
  Plus,
  Trash2,
  Edit2,
  FileCheck,
  Tag,
  Award,
  Filter,
} from 'lucide-react';
import { ComprovanteItem } from '../types';
import { copySeiBlockToClipboard } from '../utils/seiClipboard';

interface Bloco4Props {
  comprovantes: ComprovanteItem[];
  onUpdateComprovantes: (novosComprovantes: ComprovanteItem[]) => void;
}

export const Bloco4Indexacao: React.FC<Bloco4Props> = ({
  comprovantes,
  onUpdateComprovantes,
}) => {
  const [copied, setCopied] = useState(false);
  const [filterEixo, setFilterEixo] = useState<string>('todos');
  const [editingItem, setEditingItem] = useState<ComprovanteItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [newItem, setNewItem] = useState<ComprovanteItem>({
    id: `comp-${Date.now()}`,
    itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, I (Capacitação e Qualificação)',
    eixo: 'I - Formação e Qualificação',
    descricaoAtividade: '',
    documentoCorrespondente: '',
    periodoHoras: '60 horas',
    pontuacaoAtribuida: 10,
    pontuacaoMaximaPermitida: 15,
    statusValidacao: 'Validade Confirmada',
    observacao: '',
  });

  const handleCopySei = () => {
    const text = `BLOCO 4: ORGANIZAÇÃO DA DOCUMENTAÇÃO COMPROBATÓRIA (INDEXAÇÃO)

| Item / Critério (Decreto nº 13.048/2026) | Descrição da Atividade / Experiência | Documento Comprobatório Correspondente |
| :--- | :--- | :--- |
${comprovantes
  .map(
    (item) =>
      `| ${item.itemCriterio} | ${item.descricaoAtividade} | ${item.documentoCorrespondente} (${item.pontuacaoAtribuida} pts - ${item.statusValidacao}) |`
  )
  .join('\n')}`;

    copySeiBlockToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    const updated = comprovantes.map((c) =>
      c.id === editingItem.id ? editingItem : c
    );
    onUpdateComprovantes(updated);
    setEditingItem(null);
  };

  const handleSaveNew = () => {
    if (!newItem.descricaoAtividade || !newItem.documentoCorrespondente) return;
    const updated = [...comprovantes, { ...newItem, id: `comp-${Date.now()}` }];
    onUpdateComprovantes(updated);
    setIsAddingNew(false);
    setNewItem({
      id: `comp-${Date.now()}`,
      itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, I',
      eixo: 'I - Formação e Qualificação',
      descricaoAtividade: '',
      documentoCorrespondente: '',
      periodoHoras: '',
      pontuacaoAtribuida: 10,
      pontuacaoMaximaPermitida: 15,
      statusValidacao: 'Validade Confirmada',
    });
  };

  const handleDelete = (id: string) => {
    const updated = comprovantes.filter((c) => c.id !== id);
    onUpdateComprovantes(updated);
  };

  const filteredItems =
    filterEixo === 'todos'
      ? comprovantes
      : comprovantes.filter((c) => c.eixo.startsWith(filterEixo));

  const totalPoints = comprovantes.reduce((sum, c) => sum + (c.pontuacaoAtribuida || 0), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
            4
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-bold tracking-wide uppercase">
              BLOCO 4: Organização da Documentação Comprobatória (Indexação)
            </h2>
            <p className="text-[11px] text-slate-400 font-normal">
              Tabela organizada estritamente conforme critérios e requisitos do Decreto nº 13.048/2026
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAddingNew(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Comprovante</span>
          </button>

          <button
            onClick={handleCopySei}
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded transition-colors ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
            }`}
            title="Copiar Bloco 4 em formato tabela Markdown para o SEI"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Tabela SEI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter and Stats Bar */}
      <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">Filtrar Eixo:</span>
          <select
            value={filterEixo}
            onChange={(e) => setFilterEixo(e.target.value)}
            className="bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 text-xs font-medium"
          >
            <option value="todos">Todos os Eixos ({comprovantes.length})</option>
            <option value="I">Eixo I: Formação e Qualificação</option>
            <option value="II">Eixo II: Produção Técnica</option>
            <option value="III">Eixo III: Gestão e Governança</option>
            <option value="IV">Eixo IV: Extensão e Ensino</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-600">
            Total de Itens: <strong className="text-slate-900">{comprovantes.length}</strong>
          </span>
          <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
            Pontuação Somada: {totalPoints} pts
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-800 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-1/3">Item / Critério (Decreto nº 13.048/2026)</th>
              <th className="py-3 px-4 w-1/3">Descrição da Atividade / Experiência</th>
              <th className="py-3 px-4 w-1/4">Documento Comprobatório Correspondente</th>
              <th className="py-3 px-3 text-center w-20">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredItems.map((item, idx) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/80 transition-colors text-slate-800"
              >
                <td className="py-3 px-4 align-top">
                  <div className="font-bold text-slate-900 leading-snug">
                    {item.itemCriterio}
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-200 text-slate-800">
                    {item.eixo}
                  </span>
                  {item.periodoHoras && (
                    <div className="text-[11px] text-slate-600 mt-1">
                      Carga/Período: {item.periodoHoras}
                    </div>
                  )}
                </td>

                <td className="py-3 px-4 align-top leading-relaxed text-slate-700">
                  <p>{item.descricaoAtividade}</p>
                  {item.observacao && (
                    <p className="text-[11px] text-slate-600 mt-1 italic">
                      Obs: {item.observacao}
                    </p>
                  )}
                </td>

                <td className="py-3 px-4 align-top">
                  <div className="font-semibold text-blue-900 flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item.documentoCorrespondente}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
                      +{item.pontuacaoAtribuida} pts
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.statusValidacao}
                    </span>
                  </div>
                </td>

                <td className="py-3 px-3 align-top text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded"
                      title="Editar item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded"
                      title="Excluir item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal / Inline Drawer */}
      {editingItem && (
        <div className="p-5 bg-slate-50 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-900 uppercase mb-3 flex items-center gap-1.5">
            <Edit2 className="w-4 h-4 text-emerald-600" />
            Editar Item de Indexação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Item / Critério (Decreto):</label>
              <input
                type="text"
                value={editingItem.itemCriterio}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, itemCriterio: e.target.value })
                }
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Eixo de Saberes:</label>
              <select
                value={editingItem.eixo}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, eixo: e.target.value as any })
                }
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              >
                <option value="I - Formação e Qualificação">I - Formação e Qualificação</option>
                <option value="II - Produção Técnica e Tecnológica">II - Produção Técnica e Tecnológica</option>
                <option value="III - Gestão e Governança">III - Gestão e Governança</option>
                <option value="IV - Extensão e Ensino">IV - Extensão e Ensino</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Descrição da Atividade:</label>
              <textarea
                value={editingItem.descricaoAtividade}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, descricaoAtividade: e.target.value })
                }
                rows={2}
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Documento Comprobatório (Nome / Fls.):</label>
              <input
                type="text"
                value={editingItem.documentoCorrespondente}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, documentoCorrespondente: e.target.value })
                }
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block font-semibold text-slate-700 mb-1">Pontos:</label>
                <input
                  type="number"
                  value={editingItem.pontuacaoAtribuida}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      pontuacaoAtribuida: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold text-slate-700 mb-1">Status:</label>
                <select
                  value={editingItem.statusValidacao}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      statusValidacao: e.target.value as any,
                    })
                  }
                  className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
                >
                  <option value="Validade Confirmada">Validade Confirmada</option>
                  <option value="Em Conformidade">Em Conformidade</option>
                  <option value="Pendente de Conferência">Pendente de Conferência</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={() => setEditingItem(null)}
              className="px-3 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Add New Item Modal / Drawer */}
      {isAddingNew && (
        <div className="p-5 bg-emerald-50/50 border-t border-emerald-200">
          <h3 className="text-xs font-bold text-emerald-950 uppercase mb-3 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-600" />
            Adicionar Novo Documento Comprobatório ao Processo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Item / Critério (Decreto nº 13.048/2026):</label>
              <input
                type="text"
                placeholder="Ex: Art. 6º, II - Manual Técnico de Procedimentos"
                value={newItem.itemCriterio}
                onChange={(e) => setNewItem({ ...newItem, itemCriterio: e.target.value })}
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Eixo de Saberes:</label>
              <select
                value={newItem.eixo}
                onChange={(e) => setNewItem({ ...newItem, eixo: e.target.value as any })}
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              >
                <option value="I - Formação e Qualificação">I - Formação e Qualificação</option>
                <option value="II - Produção Técnica e Tecnológica">II - Produção Técnica e Tecnológica</option>
                <option value="III - Gestão e Governança">III - Gestão e Governança</option>
                <option value="IV - Extensão e Ensino">IV - Extensão e Ensino</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Descrição da Atividade / Experiência:</label>
              <textarea
                placeholder="Descreva a atividade, período e relevância institucional..."
                value={newItem.descricaoAtividade}
                onChange={(e) =>
                  setNewItem({ ...newItem, descricaoAtividade: e.target.value })
                }
                rows={2}
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Documento Comprobatório Correspondente (Nome do Arquivo e Fls.):</label>
              <input
                type="text"
                placeholder="Ex: Portaria_Designacao_N42_2023.pdf (Fls. 14-16)"
                value={newItem.documentoCorrespondente}
                onChange={(e) =>
                  setNewItem({ ...newItem, documentoCorrespondente: e.target.value })
                }
                className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block font-semibold text-slate-700 mb-1">Pontuação Atribuída:</label>
                <input
                  type="number"
                  value={newItem.pontuacaoAtribuida}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      pontuacaoAtribuida: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold text-slate-700 mb-1">Status de Validação:</label>
                <select
                  value={newItem.statusValidacao}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      statusValidacao: e.target.value as any,
                    })
                  }
                  className="w-full p-2 border border-slate-300 rounded text-slate-900 bg-white"
                >
                  <option value="Validade Confirmada">Validade Confirmada</option>
                  <option value="Em Conformidade">Em Conformidade</option>
                  <option value="Pendente de Conferência">Pendente de Conferência</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveNew}
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
            >
              Incluir no Processo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
