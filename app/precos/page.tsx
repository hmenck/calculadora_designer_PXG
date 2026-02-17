"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; 
import workshopData from '@/data/designer-workshop.json'; 

function PrecosContent() {
  const [precos, setPrecos] = useState<Record<string, number>>({});
  const [busca, setBusca] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const salvo = localStorage.getItem('precos_craft');
    if (salvo) setPrecos(JSON.parse(salvo));

    const termoUrl = searchParams.get('q');
    if (termoUrl) {
      setBusca(termoUrl);
    }
  }, [searchParams]);

  const handleChange = (id: string, valor: string) => {
    const valorLimpo = valor.replace(/\D/g, "");
    const novosPrecos = { 
      ...precos, 
      [id]: valorLimpo === "" ? 0 : Number(valorLimpo) 
    };
    setPrecos(novosPrecos);
    localStorage.setItem('precos_craft', JSON.stringify(novosPrecos));
  };

  const materiaisFiltrados = workshopData.materials
    .filter(item => item.id !== "nightmare_style_point")
    .filter(item => item.name.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Preços de Mercado</h1>
          <p className="text-gray-400 text-sm mt-1">Clique na lupa para ver receitas com o item</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input 
            type="text"
            placeholder="Buscar material..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-10 py-2 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-gray-500"
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {busca && (
            <button 
              onClick={() => setBusca('')}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors" title="Limpar">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        {materiaisFiltrados.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Nenhum material encontrado para "{busca}"
          </div>
        )}

        {materiaisFiltrados.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex items-center p-4 hover:bg-gray-750 transition-colors ${
              index !== materiaisFiltrados.length - 1 ? 'border-b border-gray-700' : ''
            }`}
          >
            <Link 
              href={`/designer-workshop?q=${encodeURIComponent(item.name)}`}
              className="mr-4 p-2 text-gray-500 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all"
              title={`Ver receitas que usam ${item.name}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            <div className="w-8 h-8 mr-3 bg-gray-900 rounded flex items-center justify-center border border-gray-700">
                 <img 
                    src={`/icons/${item.id}.gif`} 
                    className="w-6 h-6 object-contain"
                    onError={(e) => { 
                      const target = e.currentTarget;
                      if (target.src.endsWith('.gif')) target.src = `/icons/${item.id}.png`;
                      else target.style.display = 'none';
                    }}
                 />
            </div>

            <span className="flex-1 font-medium text-gray-200">{item.name}</span>
            
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-bold font-mono">$</span>
              <input
                type="text"
                inputMode="numeric"
                value={precos[item.id] ?? 0}
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="bg-gray-900 border border-gray-600 rounded-lg p-2 w-28 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-right font-mono text-white transition-all"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function PrecosPage() {
  return (
    <main className="p-8 max-w-2xl mx-auto bg-gray-900 min-h-screen">
      <Suspense fallback={<div className="text-white text-center mt-10">Carregando lista de preços...</div>}>
        <PrecosContent />
      </Suspense>
    </main>
  );
}