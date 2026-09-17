/* ===================================================
   Desafio 5 - Relatório de Vendas
   =================================================== */

// Vetor que guarda cada venda registrada: { produto, valorUnitario, quantidade, subtotal }
var vendas = [];

// Função chamada pelo botão "Registrar venda"
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

  // Limpa os campos
  document.getElementById("nomeProdutoVenda").value = "";
  document.getElementById("valorUnitarioVenda").value = "";
  document.getElementById("quantidadeVenda").value = "";

  renderizarTabelaVendas();
}

// Desenha a tabela com todas as vendas já registradas
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

// Função chamada pelo botão "Gerar relatório"
function gerarRelatorio() {
  var caixaResultado = document.getElementById("caixaResultadoRelatorio");

  if (vendas.length === 0) {
    document.getElementById("mensagemErroVenda").textContent = "Registre pelo menos uma venda antes de gerar o relatório.";
    return;
  }

  // 1) Total arrecadado: soma o subtotal de todas as vendas (laço de repetição)
  var totalArrecadado = 0;
  for (var i = 0; i < vendas.length; i++) {
    totalArrecadado += vendas[i].subtotal;
  }

  // 2) Número de vendas registradas e ticket médio (média = total / quantidade de vendas)
  var numeroDeVendas = vendas.length;
  var ticketMedio = totalArrecadado / numeroDeVendas;

  // 3) Produto mais vendido em QUANTIDADE.
  //    Como o mesmo produto pode ter sido registrado em vendas separadas,
  //    primeiro somamos a quantidade total por nome de produto usando um objeto
  //    (o objeto funciona como uma "tabela" nome -> quantidade acumulada).
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

  // Agora percorremos o objeto "totalPorProduto" para achar quem tem a maior quantidade
  var nomeMaisVendido = "";
  var maiorQuantidade = -1;

  for (var nome in totalPorProduto) {
    if (totalPorProduto[nome] > maiorQuantidade) {
      maiorQuantidade = totalPorProduto[nome];
      nomeMaisVendido = nome;
    }
  }

  // Exibe tudo na tela
  document.getElementById("numeroDeVendas").textContent = numeroDeVendas;
  document.getElementById("totalArrecadado").textContent = formatarMoeda(totalArrecadado);
  document.getElementById("ticketMedio").textContent = formatarMoeda(ticketMedio);
  document.getElementById("produtoMaisVendido").textContent = nomeMaisVendido + " (" + maiorQuantidade + " unidades)";

  caixaResultado.classList.add("mostrar");
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
