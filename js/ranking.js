var produtosVendidos = [];

function adicionarProdutoRanking() {
  var nome = document.getElementById("nomeProdutoRanking").value.trim();
  var quantidade = parseInt(document.getElementById("quantidadeVendidaRanking").value);
  var mensagemErro = document.getElementById("mensagemErroRanking");

  mensagemErro.textContent = "";

  if (nome === "") {
    mensagemErro.textContent = "Digite o nome do produto.";
    return;
  }
  if (isNaN(quantidade) || quantidade <= 0) {
    mensagemErro.textContent = "Informe uma quantidade válida.";
    return;
  }

  produtosVendidos.push({ nome: nome, quantidade: quantidade });

  document.getElementById("nomeProdutoRanking").value = "";
  document.getElementById("quantidadeVendidaRanking").value = "";

  renderizarTabelaProdutos();
}

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

function gerarRanking() {
  var caixaResultado = document.getElementById("caixaResultadoRanking");
  var lista = document.getElementById("listaRanking");
  lista.innerHTML = "";

  if (produtosVendidos.length === 0) {
    document.getElementById("mensagemErroRanking").textContent = "Cadastre pelo menos um produto antes de gerar o ranking.";
    return;
  }

  var ranking = produtosVendidos.slice();  

  ranking.sort(function (produtoA, produtoB) {
    return produtoB.quantidade - produtoA.quantidade;
  });

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
