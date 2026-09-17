/* ===================================================
   Desafio 1 - Carrinho de Compras
   =================================================== */

// 1) "Banco de dados" simples do catálogo da loja.
//    É um vetor (array) de objetos. Cada objeto representa um produto.
var produtos = [
  { id: 1, nome: "Notebook",     preco: 3200.00 },
  { id: 2, nome: "Mouse",        preco: 45.00 },
  { id: 3, nome: "Teclado",      preco: 89.90 },
  { id: 4, nome: "Monitor",      preco: 750.00 },
  { id: 5, nome: "Headset",      preco: 120.00 }
];

// 2) Vetor que vai guardar os itens que o usuário adicionou ao carrinho.
//    Começa vazio.
var carrinho = [];

// Assim que a página carrega, preenchemos o <select> com os produtos do catálogo
window.onload = function () {
  var select = document.getElementById("selecaoProduto");

  // Percorremos o array "produtos" com um laço de repetição (for)
  for (var i = 0; i < produtos.length; i++) {
    var produtoAtual = produtos[i];

    var opcao = document.createElement("option");
    opcao.value = produtoAtual.id;
    opcao.textContent = produtoAtual.nome + " - " + formatarMoeda(produtoAtual.preco);

    select.appendChild(opcao);
  }
};

// 3) Função chamada pelo botão "Adicionar ao carrinho"
function adicionarAoCarrinho() {
  var idSelecionado = parseInt(document.getElementById("selecaoProduto").value);
  var quantidade = parseInt(document.getElementById("quantidadeProduto").value);
  var mensagemErro = document.getElementById("mensagemErro");

  mensagemErro.textContent = ""; // limpa erro anterior

  // Estrutura condicional: valida se a quantidade é válida
  if (isNaN(quantidade) || quantidade <= 0) {
    mensagemErro.textContent = "Informe uma quantidade válida (maior que zero).";
    return; // interrompe a função aqui
  }

  // Procura o produto escolhido dentro do array "produtos"
  var produtoEscolhido = null;
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id === idSelecionado) {
      produtoEscolhido = produtos[i];
      break;
    }
  }

  // Verifica se esse produto já está no carrinho, para apenas somar a quantidade
  var jaEstaNoCarrinho = false;
  for (var j = 0; j < carrinho.length; j++) {
    if (carrinho[j].id === produtoEscolhido.id) {
      carrinho[j].quantidade += quantidade;
      jaEstaNoCarrinho = true;
      break;
    }
  }

  // Se ainda não estava no carrinho, adiciona um novo item
  if (!jaEstaNoCarrinho) {
    carrinho.push({
      id: produtoEscolhido.id,
      nome: produtoEscolhido.nome,
      preco: produtoEscolhido.preco,
      quantidade: quantidade
    });
  }

  renderizarCarrinho();
}

// 4) Função que remove um item do carrinho pelo índice dele no array
function removerItem(indice) {
  carrinho.splice(indice, 1); // remove 1 elemento a partir da posição "indice"
  renderizarCarrinho();
}

// 5) Função responsável por "desenhar" a tabela do carrinho na tela
function renderizarCarrinho() {
  var corpoTabela = document.getElementById("corpoTabelaCarrinho");
  corpoTabela.innerHTML = ""; // limpa a tabela antes de redesenhar

  if (carrinho.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Carrinho vazio</td></tr>';
    document.getElementById("totalCarrinho").textContent = formatarMoeda(0);
    return;
  }

  var total = 0;

  // Percorre o carrinho e cria uma linha <tr> para cada item
  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var subtotal = item.preco * item.quantidade;
    total += subtotal; // vai somando o total geral

    var linha = document.createElement("tr");
    linha.innerHTML =
      "<td>" + item.nome + "</td>" +
      "<td>" + item.quantidade + "</td>" +
      "<td>" + formatarMoeda(item.preco) + "</td>" +
      "<td>" + formatarMoeda(subtotal) + "</td>" +
      '<td><button class="btn btn-sm btn-outline-danger" onclick="removerItem(' + i + ')">' +
      '<i class="bi bi-trash"></i></button></td>';

    corpoTabela.appendChild(linha);
  }

  document.getElementById("totalCarrinho").textContent = formatarMoeda(total);
}

// 6) Função auxiliar (usada em vários pontos) que formata número como moeda brasileira
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
