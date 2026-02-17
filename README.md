# Calculadora Designer Workshop PokeXGames

Ferramenta desenvolvida para facilitar o cálculo do custo de fabricação de itens dentro do jogo PokeXGames.

## Sobre o Projeto
Essa calculadora foi planejada inicialmente para uso próprio, com o objetivo de facilitar a compra de itens para os crafts dentro do jogo. O projeto foi expandido para desenvolver minhas habilidades em programação, gerando essa primeira versão que já cumpre o objetivo inicial, mas com muitas oportunidades de melhorias futuras.

> **Nota Legal:** Todas as informações e imagens foram obtidas diretamente no jogo PokeXGames ou na página da workshop na Wiki. Nenhuma informação contida no site é de minha propriedade, e todas elas estão sujeitas a alterações pelos desenvolvedores do jogo.

## Tecnologias Utilizadas
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) para tipagem estática e segurança de código.
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) para uma interface responsiva e moderna.
* **Persistência:** LocalStorage API para armazenamento de preços do usuário.

## Funcionalidades Principais
* **Cálculo em Tempo Real:** O sistema processa o custo total de fabricação instantaneamente conforme os preços de mercado são atualizados.
* **Busca Inteligente:** Filtro que varre tanto os nomes das receitas quanto os materiais necessários.
* **Navegação Cruzada:** Ao visualizar uma receita, clique em um material para ser levado diretamente à edição de seu preço. Na página de preços, clique na lupa ao lado do item para filtrar todas as receitas que o utilizam.
* **Interface Adaptativa:** Suporte a imagens dinâmicas (GIF/PNG) com sistema de fallback automático.

## Estrutura de Dados
O projeto utiliza um arquivo JSON centralizado que separa `materials` de `recipes`. Isso permite que a manutenção do banco de dados do jogo seja independente da lógica da aplicação, facilitando atualizações futuras.

## Passos Futuros
- [ ] **Expansão do Banco de Dados:** Adicionar todos os crafts remanescentes da Workshop.
- [ ] **Filtros Avançados:** Implementar funcionalidade para filtrar crafts por level e ordenar por tipo ou custo.
- [ ] **Showcase in-game:** Capturar e adicionar prints reais de cada item dentro do jogo para visualização prévia.
- [ ] **Expandir o projeto:** Inserir outras Workshops no projeto.

---
Desenvolvido por **Henrique Menck** - Estudante de Engenharia de Computação na UTFPR.