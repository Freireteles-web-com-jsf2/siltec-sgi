import React from 'react';
import { getTransactions, getMembers } from '../../services/storage';

const TitheReportTable = () => {
  const titheData = React.useMemo(() => {
    const transactions = getTransactions().filter(t => 
      t.category?.toLowerCase().includes('dizimo') || 
      t.description?.toLowerCase().includes('dizimo')
    );
    const members = getMembers();
    
    // Group by member
    const memberTithes = {};
    transactions.forEach(tx => {
      if (!tx.memberId && !tx.memberName) return;
      
      const memberId = tx.memberId || 'unknown';
      const memberName = tx.memberName || 
        members.find(m => m.id === tx.memberId)?.name || 
        'Desconhecido';
      
      if (!memberTithes[memberId]) {
        memberTithes[memberId] = {
          id: memberId,
          name: memberName,
          total: 0,
          count: 0
        };
      }
      memberTithes[memberId].total += parseFloat(tx.amount) || 0;
      memberTithes[memberId].count += 1;
    });
    
    return Object.values(memberTithes)
      .sort((a, b) => b.total - a.total);
  }, []);

  const totalTithes = titheData.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Relatório de Dízimos por Membro</h3>
      
      {titheData.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          Nenhum dízimo encontrado
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="pb-2">Membro</th>
                  <th className="pb-2 text-right">Total</th>
                  <th className="pb-2 text-right">Transações</th>
                  <th className="pb-2 text-right">Média</th>
                </tr>
              </thead>
              <tbody>
                {titheData.map((item, idx) => (
                  <tr key={item.id} className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                    <td className="py-3 text-white">{item.name}</td>
                    <td className="py-3 text-right text-emerald-400">
                      R$ {item.total.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 text-right text-gray-300">{item.count}</td>
                    <td className="py-3 text-right text-gray-300">
                      R$ {(item.total / item.count).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total de membros:</span>
            <span className="text-white font-bold">{titheData.length}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400 text-sm">Total dízimos:</span>
            <span className="text-emerald-400 font-bold">
              R$ {totalTithes.toLocaleString('pt-BR')}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TitheReportTable;