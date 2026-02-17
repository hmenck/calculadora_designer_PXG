import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 max-w-4xl mx-auto mt-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-linear-to-r from-yellow-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
          Calculadora Designer Workshop PokeXGames
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Calcule o custo para cada item da Designer Workshop de acordo com o preço dos materiais no mercado. O custo estimado não inclui o valor dos pontos coletados.
        </p>
      </section>

      <section className="bg-gray-800/50 rounded-3xl border border-gray-700 p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-yellow-500 pl-4">
          Como utilizar a plataforma?
        </h2>

        <div className="space-y-8">

          <div className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-green-500/20 rounded-2xl border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-xl font-mono">
              01
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-1">Veja as receitas na Workshop</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Na aba <Link href="/designer-workshop" className="text-green-400 hover:underline">Workshop</Link>, busque pelo item que deseja craftar. Você verá a receita e outras informações sobre o craft.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-blue-500/20 rounded-2xl border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xl font-mono">
              02
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-1">Defina os Preços de Mercado</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Acesse a aba de <Link href="/precos" className="text-blue-400 hover:underline">Mercado</Link> e insira os valores atuais dos materiais base. Os valores são salvos localmente no seu navegador para consultas futuras.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="shrink-0 w-12 h-12 bg-purple-500/20 rounded-2xl border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xl font-mono">
              03
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-1">Navegação Inteligente</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Utilize as buscas cruzadas: clique em um item da receita para ajustar seu preço, ou clique na lupa em um preço para ver em quais receitas aquele material é utilizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-left mt-10 mb-10">
        <h3 className="text-lg font-bold text-gray-200 mb-1">Sobre o projeto</h3>
        <p className="text-gray-400">
          Essa calculadora foi planejada para uso próprio, com o objetivo de facilitar a compra de itens para os crafts. O projeto acabou sendo expandido para desenvolver minhas habilidades em programação.
        </p>
        <p className="text-gray-400">
          Todas as informações e imagens foram obitdas diretamente no jogo <Link href="https://pokexgames.com/" target="_blank" className="text-blue-400 hover:underline">PokeXGames</Link> ou na <Link href="https://wiki.pokexgames.com/index.php/Designer_Workshop" target="_blank" className="text-blue-400 hover:underline">página da workshop na Wiki</Link>. Nenhuma informação contida no site é de minha propriedade, e todas elas estão sujeitas a alterações.
        </p>
      </section>

      <footer className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-widest">
        <span>Desenvolvido por: <Link href="https://github.com/hmenck" target="_blank" className="text-blue-400 hover:underline">Henrique Menck</Link></span>
        <span>Solucco / Aurora</span>
      </footer>
    </main>
  );
}