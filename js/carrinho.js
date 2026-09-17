var produtos = [
  { id: 1, nome: "Notebook",     preco: 3200.00 },
  { id: 2, nome: "Mouse",        preco: 45.00 },
  { id: 3, nome: "Teclado",      preco: 89.90 },
  { id: 4, nome: "Monitor",      preco: 750.00 },
  { id: 5, nome: "Headset",      preco: 120.00 }
];

var carrinho = [];

window.onload = function () {
  var select = document.getElementById("selecaoProduto");

  for (var i = 0; i < produtos.length; i++) {
    var produtoAtual = produtos[i];

    var opcao = document.createElement("option");
    opcao.value = produtoAtual.id;
    opcao.textContent = produtoAtual.nome + " - " + formatarMoeda(produtoAtual.preco);

    select.appendChild(opcao);
  }
};

function adicionarAoCarrinho() {
  var idSelecionado = parseInt(document.getElementById("selecaoProduto").value);
  var quantidade = parseInt(document.getElementById("quantidadeProduto").value);
  var mensagemErro = document.getElementById("mensagemErro");

  mensagemErro.textContent = ""; 

  if (isNaN(quantidade) || quantidade <= 0) {
    mensagemErro.textContent = "Informe uma quantidade válida (maior que zero).";
    return; 
  }

  var produtoEscolhido = null;
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id === idSelecionado) {
      produtoEscolhido = produtos[i];
      break;
    }
  }

  var jaEstaNoCarrinho = false;
  for (var j = 0; j < carrinho.length; j++) {
    if (carrinho[j].id === produtoEscolhido.id) {
      carrinho[j].quantidade += quantidade;
      jaEstaNoCarrinho = true;
      break;
    }
  }

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

function removerItem(indice) {
  carrinho.splice(indice, 1); 
  renderizarCarrinho();
}

function renderizarCarrinho() {
  var corpoTabela = document.getElementById("corpoTabelaCarrinho");
  corpoTabela.innerHTML = ""; 

  if (carrinho.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Carrinho vazio</td></tr>';
    document.getElementById("totalCarrinho").textContent = formatarMoeda(0);
    return;
  }

  var total = 0;

  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var subtotal = item.preco * item.quantidade;
    total += subtotal; 

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

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
