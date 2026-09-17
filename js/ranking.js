/* ===================================================
   Desafio 4 - Ranking de Produtos
   =================================================== */

// Vetor (array) que vai guardar os produtos cadastrados pelo usuário.
// Cada posição é um objeto no formato { nome: "...", quantidade: ... }
var produtosVendidos = [];

// Função chamada pelo botão "Adicionar produto"
function adicionarProdutoRanking() {
  var nome = document.getElementById("nomeProdutoRanking").value.trim();
  var quantidade = parseInt(document.getElementById("quantidadeVendidaRanking").value);
  var mensagemErro = document.getElementById("mensagemErroRanking");

  mensagemErro.textContent = "";

  // Validações simples com estrutura condicional
  if (nome === "") {
    mensagemErro.textContent = "Digite o nome do produto.";
    return;
  }
  if (isNaN(quantidade) || quantidade <= 0) {
    mensagemErro.textContent = "Informe uma quantidade válida.";
    return;
  }

  // Adiciona o novo produto no final do array
  produtosVendidos.push({ nome: nome, quantidade: quantidade });

  // Limpa os campos para o próximo cadastro
  document.getElementById("nomeProdutoRanking").value = "";
  document.getElementById("quantidadeVendidaRanking").value = "";

  renderizarTabelaProdutos();
}

// Mostra a tabela "crua" (na ordem em que foram cadastrados, sem ranking ainda)
function renderizarTabelaProdutos() {
  var corpoTabela = document.getElementById("corpoTabelaProdutos");
  corpoTabela.innerHTML = "";

  if (produtosVendidos.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="2" class="text-center text-muted">Nenhum produto cadastrado</td></tr>';
    return;
  }

  for (var i = 0; i < produtosVendidos.length; i++) {
    var linha = document.createElement("tr");
    linha.innerHTML = "<td>" + produtosVendidos[i].nome + "</td><td>" + produtosVendidos[i].quantidade + "</td>";
    corpoTabela.appendChild(linha);
  }
}

// Função chamada pelo botão "Gerar ranking"
function gerarRanking() {
  var caixaResultado = document.getElementById("caixaResultadoRanking");
  var lista = document.getElementById("listaRanking");
  lista.innerHTML = "";

  if (produtosVendidos.length === 0) {
    document.getElementById("mensagemErroRanking").textContent = "Cadastre pelo menos um produto antes de gerar o ranking.";
    return;
  }

  // Criamos uma cópia do array para não alterar a ordem da tabela de cadastro,
  // e ordenamos do maior para o menor número de vendas.
  var ranking = produtosVendidos.slice(); // slice() sem argumentos copia o array
  ranking.sort(function (produtoA, produtoB) {
    return produtoB.quantidade - produtoA.quantidade; // ordem decrescente
  });

  // Percorre o ranking já ordenado e monta a lista na tela
  for (var i = 0; i < ranking.length; i++) {
    var item = document.createElement("li");
    var texto = ranking[i].nome + " - " + ranking[i].quantidade + " unidades vendidas";

    if (i === 0) {
      texto = "🏆 " + texto + " (mais vendido)";
      item.classList.add("fw-bold");
    }

    item.textContent = texto;
    lista.appendChild(item);
  }

  caixaResultado.classList.add("mostrar");
}
