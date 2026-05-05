import React, { useState, useMemo, useEffect } from 'react';
import { getTransactions, saveTransaction, deleteTransaction, getMonthlyTotals } from '../services/storage';
import { useToast } from '../components/ui/Toast';
import TransactionFormCreate from '../components/crud/TransactionFormCreate';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const allocation = [
  { name: 'Missões', value: 35, color: '#8b2c6b' },
  { name: 'Programas', value: 25, color: '#c23a7d' },
  { name: 'Operações', value: 20, color: '#4a1c6b' },
  { name: 'Reserva', value: 15, color: '#16213e' },
  { name: 'Outros', value: 5, color: '#666' },
];

const cashFlow = [
  { month: 'Jan', entrada: 8500, saida: 3200 },
  { month: 'Fev', entrada: 7200, saida: 2800 },
  { month: 'Mar', entrada: 9100, saida: 3500 },
  { month: 'Abr', entrada: 6800, saida: 2400 },
  { month: 'Mai', entrada: 7540, saida: 3200 },
  { month: 'Jun', entrada: 8200, saida: 3000 },
];

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState('visao');
  const [transactions, setTransactions] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTxId, setDeletingTxId] = useState(null);
  const { success } = useToast();

  useEffect(() => {
    const stored = getTransactions();
    if (stored.length > 0) {
      setTransactions(stored);
    }
  }, []);

  const totals = useMemo(() => {
    const entrada = transactions.filter(t => t.type === 'entrada').reduce((acc, t) => acc + t.amount, 0);
    const saida = transactions.filter(t => t.type === 'saida').reduce((acc, t) => acc + Math.abs(t.amount), 0);
    return {
      capital: entrada - saida + 54200,
      monthCollected: entrada,
      expenses: saida,
    };
  }, [transactions]);

  const handleCreate = (formData) => {
    saveTransaction(formData);
    setTransactions(getTransactions());
    success('Transação criada!');
  };

  const handleDelete = (id) => {
    setDeletingTxId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteTransaction(deletingTxId);
    setTransactions(getTransactions());
    success('Transação excluída!');
    setDeletingTxId(null);
  };

  const goalProgress = (totals.monthCollected / 10000) * 100;

  return (
    <div className="min-h-screen bg-cosmic p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Financeiro ✝</h1>
            <p className="text-gray-400">Gestão financeira da congregação</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span>➕</span> Nova Transação
            </button>
            <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span>📊</span> Relatório
            </button>
          </div>
        </div>

        {/* Capital Operacional */}
        <div className="card-glass rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm">Capital Operacional</p>
              <p className="text-3xl md:text-4xl font-bold text-white">
                R$ {totals.capital.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-right">
              <div>
                <p className="text-gray-400 text-sm">Receita mês</p>
                <p className="text-xl font-bold text-green-400">
                  +R$ {totals.monthCollected.toLocaleString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Despesas</p>
                <p className="text-xl font-bold text-red-400">
                  -R$ {totals.expenses.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metas vs Realizado */}
        <div className="card-glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Dízimos e Metas</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Meta mensal</span>
                <span className="text-gray-300">R$ 10.000</span>
              </div>
              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                  style={{ width: `${Math.min(goalProgress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-400">Arrecadado: R$ {totals.monthCollected.toLocaleString('pt-BR')}</span>
                <span className="text-gray-400">{goalProgress.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fluxo de Caixa */}
        <div className="card-glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Fluxo de Caixa</h3>
          <div className="h-48 flex items-end gap-2">
            {cashFlow.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5">
                  <div 
                    className="w-full bg-green-500/70 rounded-t"
                    style={{ height: `${(item.entrada / 10000) * 150}px` }}
                  />
                  <div 
                    className="w-full bg-red-500/70"
                    style={{ height: `${(item.saida / 10000) * 150}px` }}
                  />
                </div>
                <span className="text-gray-400 text-xs">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500/70" />
              <span className="text-gray-400 text-sm">Entradas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500/70" />
              <span className="text-gray-400 text-sm">Saídas</span>
            </div>
          </div>
        </div>

        {/* Alocação de Fundos */}
        <div className="card-glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Alocação de Fundos</h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-40 h-40">
                {allocation.map((item, index) => {
                  const previous = allocation.slice(0, index).reduce((acc, i) => acc + i.value, 0);
                  const dashArray = item.value;
                  const dashOffset = 100 - previous;
                  return (
                    <circle
                      key={item.name}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="20"
                      strokeDasharray={`${dashArray} ${100 - dashArray}`}
                      strokeDashoffset={-dashOffset}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">100%</span>
              </div>
            </div>
            <div className="space-y-2">
              {allocation.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-gray-500 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transações Recentes */}
        <div className="card-glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Transações Recentes</h3>
          <div className="space-y-3">
            {transactions.slice(0, 10).map((tx) => (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xl ${tx.type === 'entrada' ? '📥' : '📤'}`}>
                    {tx.type === 'entrada' ? '📥' : '📤'}
                  </span>
                  <div>
                    <p className="text-white">{tx.description}</p>
                    <p className="text-gray-500 text-sm">{tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={tx.type === 'entrada' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type === 'entrada' ? '+' : '-'}R$ {tx.amount.toLocaleString('pt-BR')}
                  </span>
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-gray-400 text-center p-4">Nenhuma transação</p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <TransactionFormCreate
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreate}
      />
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setDeletingTxId(null); }}
        title="Excluir Transação"
        message="Tem certeza que deseja excluir esta transação?"
        onConfirm={confirmDelete}
      />
    </div>
  );
}