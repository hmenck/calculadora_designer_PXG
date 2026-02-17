"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; 
import workshopData from '@/data/designer-workshop.json'; 
import { WorkshopData, Recipe } from '@/types/designer-workshop';

function WorkshopContent() {
  const data = workshopData as WorkshopData;
  const searchParams = useSearchParams();
  
  const [precos, setPrecos] = useState<Record<string, number>>({});
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const salvo = localStorage.getItem('precos_craft');
    if (salvo) setPrecos(JSON.parse(salvo));

    const termoUrl = searchParams.get('q');
    if (termoUrl) setBusca(termoUrl);
  }, [searchParams]);

  const getMaterialName = (id: string) => {
    const item = data.materials.find(m => m.id === id);
    return item ? item.name : "Item não encontrado";
  };

  const receitasFiltradas = data.recipes.filter(recipe => {
    const termo = busca.toLowerCase();
    const matchNomeReceita = recipe.name.toLowerCase().includes(termo);
    const matchIngrediente = recipe.ingredients.some(ing => 
      getMaterialName(ing.materialId).toLowerCase().includes(termo)
    );
    return matchNomeReceita || matchIngrediente;
  });

  return (
    <>
      {/* Header e Busca */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Designer Workshop</h1>
        
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Pesquisar receita ou material..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-10 py-2 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all placeholder-gray-500"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          {busca && (
            <button 
              onClick={() => setBusca('')}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors"
              title="Limpar busca"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {receitasFiltradas.length === 0 && (
        <div className="text-center py-20 text-gray-500 bg-gray-800/50 rounded-2xl border border-gray-700 border-dashed">
          <p className="text-xl">Nenhuma receita encontrada para "<span className="text-white">{busca}</span>"</p>
        </div>
      )}

      <div className="flex flex-col gap-12">
        {receitasFiltradas.map((recipe: Recipe) => {
          
          const custoMateriais = recipe.ingredients.reduce((acc, ing) => {
            const precoUnitario = precos[ing.materialId] || 0;
            return acc + (precoUnitario * ing.quantity);
          }, 0);
          const total = custoMateriais;

          return (
            <div key={recipe.id} className="bg-gray-900 rounded-3xl border border-gray-700 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              
              <div className="lg:w-95 bg-gray-800 p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-700">
                
                <div className="w-full h-56 rounded-xl overflow-hidden mb-6 border border-gray-700 shadow-lg bg-black flex items-center justify-center">
                   <img 
                      src={`/prints/${recipe.id}.png`} 
                      alt={`Print de ${recipe.name}`}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = 'none' }} 
                   />
                </div>

                <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                   <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-600 shrink-0">
                      <img 
                        src={`/icons/${recipe.id}.gif`} 
                        className="w-8 h-8 object-contain"
                        onError={(e) => { 
                          const target = e.currentTarget;
                          if (target.src.endsWith('.gif')) target.src = `/icons/${recipe.id}.png`;
                        }}
                      />
                   </div>
                   <h2 className="text-2xl font-bold text-yellow-500 leading-tight">{recipe.name}</h2>
                </div>
                  
                <div className="grid grid-cols-2 gap-3 w-full mb-6">
                  <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-700/50 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Level Necessário</p>
                    <p className="text-white font-mono font-bold">{recipe.level}</p>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-700/50 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Tempo de Craft</p>
                    <p className="text-white font-mono font-bold">{recipe.craftTime}</p>
                  </div>
                </div>

                <div className="w-full bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0">
                    <img 
                        src="/icons/nightmare_style_point.gif" 
                        className="w-5 h-5 object-contain"
                        onError={(e) => { 
                            const target = e.currentTarget;
                            if (target.src.endsWith('.gif')) target.src = `/icons/nightmare_style_point.png`;
                        }}
                      />
                  </div>
                  <div>
                    <p className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Recurso</p>
                    <p className="text-sm text-white font-medium">{recipe.stylePoints} Nightmare Style Points</p>
                  </div>
                </div>

                <div className="mt-auto w-full pt-4 border-t border-gray-700/50 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Custo Total Estimado</p>
                  <p className="text-4xl font-mono font-bold text-green-400">
                    ${total.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-900/30 p-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 pl-2 border-l-4 border-yellow-500">
                  Lista de Materiais
                </h3>
                
                <div className="flex flex-col gap-2">
                  {recipe.ingredients.map((ing) => {
                      const nomeItem = getMaterialName(ing.materialId);
                      const precoUnitario = precos[ing.materialId] || 0;
                      const precoTotalItem = precoUnitario * ing.quantity;
                      
                      return (
                        <Link 
                          key={ing.materialId} 
                          href={`/precos?q=${encodeURIComponent(nomeItem)}`}
                          className="group flex items-center justify-between p-3 rounded-lg bg-gray-800 border border-gray-700/50 hover:bg-gray-700 hover:border-yellow-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center border border-gray-700 group-hover:border-yellow-500/30 transition-colors">
                              <img 
                                 src={`/icons/${ing.materialId}.gif`} 
                                 className="w-6 h-6 object-contain"
                                 onError={(e) => { 
                                   const target = e.currentTarget;
                                   if (target.src.endsWith('.gif')) target.src = `/icons/${ing.materialId}.png`;
                                   else target.style.display = 'none';
                                 }}
                              />
                            </div>
                            <span className="text-gray-200 font-medium group-hover:text-yellow-400 transition-colors">
                               {nomeItem}
                            </span>
                          </div>

                          <div className="text-right flex items-center gap-6">
                             <div className="text-sm text-gray-500 font-mono">
                               <span className="text-gray-300 font-bold">{ing.quantity}x</span> 
                               <span className="ml-1 opacity-60">(${precoUnitario.toLocaleString('pt-BR')}/un)</span>
                             </div>

                             <div className="text-gray-200 font-mono font-bold text-sm min-w-20">
                               ${precoTotalItem.toLocaleString('pt-BR')}
                             </div>
                          </div>
                        </Link>
                      );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
}

export default function WorkshopPage() {
  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto bg-gray-900 min-h-screen">
      <Suspense fallback={<div className="text-white text-center mt-20">Carregando workshop...</div>}>
        <WorkshopContent />
      </Suspense>
    </main>
  );
}