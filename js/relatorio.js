var vendas = [];

function registrarVenda() {
  var produto = document.getElementById("nomeProdutoVenda").value.trim();
  var valorUnitario = parseFloat(document.getElementById("valorUnitarioVenda").value);
  var quantidade = parseInt(document.getElementById("quantidadeVenda").value);
  var mensagemErro = document.getElementById("mensagemErroVenda");
   mensagemErro.textContent = "";

  if (produto === "") {
    mensagemErro.textContent = "Digite o nome do produto.";
    return;
  }
  if (isNaN(valorUnitario) || valorUnitario <= 0) {
    mensagemErro.textContent = "Informe um valor unitário válido.";
    return;
  }
  if (isNaN(quantidade) || quantidade <= 0) {
    mensagemErro.textContent = "Informe uma quantidade válida.";
    return;
  }

  var subtotal = valorUnitario * quantidade;

  vendas.push({
    produto: produto,
    valorUnitario: valorUnitario,
    quantidade: quantidade,
    subtotal: subtotal
  });

  document.getElementById("nomeProdutoVenda").value = "";
  document.getElementById("valorUnitarioVenda").value = "";
  document.getElementById("quantidadeVenda").value = "";

  renderizarTabelaVendas();
}

function renderizarTabelaVendas() {
  var corpoTabela = document.getElementById("corpoTabelaVendas");
  corpoTabela.innerHTML = "";

  if (vendas.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Nenhuma venda registrada</td></tr>';
    return;
  }

  for (var i = 0; i < vendas.length; i++) {
    var venda = vendas[i];
    var linha = document.createElement("tr");
    linha.innerHTML =
      "<td>" + venda.produto + "</td>" +
      "<td>" + formatarMoeda(venda.valorUnitario) + "</td>" +
      "<td>" + venda.quantidade + "</td>" +
      "<td>" + formatarMoeda(venda.subtotal) + "</td>";
    corpoTabela.appendChild(linha);
  }
}

function gerarRelatorio() {
  var caixaResultado = document.getElementById("caixaResultadoRelatorio");

  if (vendas.length === 0) {
    document.getElementById("mensagemErroVenda").textContent = "Registre pelo menos uma venda antes de gerar o relatório.";
    return;
  }

  var totalArrecadado = 0;
  for (var i = 0; i < vendas.length; i++) {
  totalArrecadado += vendas[i].subtotal;
}

  var numeroDeVendas = vendas.length;         
  var ticketMedio = totalArrecadado / numeroDeVendas;

  var totalPorProduto = {};

  for (var j = 0; j < vendas.length; j++) {
    var nomeProduto = vendas[j].produto;
    var quantidadeVenda = vendas[j].quantidade;

    if (totalPorProduto[nomeProduto] === undefined) {
      totalPorProduto[nomeProduto] = quantidadeVenda;
    } else {
      totalPorProduto[nomeProduto] += quantidadeVenda;
    }
  }

  var nomeMaisVendido = "";
  var maiorQuantidade = -1;

  for (var nome in totalPorProduto) {
    if (totalPorProduto[nome] > maiorQuantidade) {
      maiorQuantidade = totalPorProduto[nome];
      nomeMaisVendido = nome;
    }
  }

  document.getElementById("numeroDeVendas").textContent = numeroDeVendas;
  document.getElementById("totalArrecadado").textContent = formatarMoeda(totalArrecadado);
  document.getElementById("ticketMedio").textContent = formatarMoeda(ticketMedio);
  document.getElementById("produtoMaisVendido").textContent = nomeMaisVendido + " (" + maiorQuantidade + " unidades)";

  caixaResultado.classList.add("mostrar");
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
