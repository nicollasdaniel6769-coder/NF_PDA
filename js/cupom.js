/* ===================================================
   Desafio 2 - Aplicação de Cupons
   =================================================== */

// 1) "Banco de cupons" - um objeto onde a chave é o código do cupom
//    e o valor é o percentual de desconto.
var cupons = {
  "DESCONTO10": 10,
  "DESCONTO20": 20,
  "BEMVINDO15": 15
};

// 2) Função chamada pelo botão "Aplicar cupom"
function aplicarCupom() {
  var valorCompra = parseFloat(document.getElementById("valorCompra").value);
  var codigoDigitado = document.getElementById("codigoCupom").value;
  var mensagemErro = document.getElementById("mensagemErroCupom");
  var caixaResultado = document.getElementById("caixaResultadoCupom");

  mensagemErro.textContent = "";

  // Validação do valor da compra
  if (isNaN(valorCompra) || valorCompra <= 0) {
    mensagemErro.textContent = "Informe um valor de compra válido.";
    caixaResultado.classList.remove("mostrar");
    return;
  }

  // Deixa o código em maiúsculas para não depender de como o usuário digitou
  var codigoPadronizado = codigoDigitado.toUpperCase().trim();

  // Estrutura condicional: verifica se o cupom existe dentro do objeto "cupons"
  if (!(codigoPadronizado in cupons)) {
    mensagemErro.textContent = "Cupom inválido. Confira os cupons disponíveis ao lado.";
    caixaResultado.classList.remove("mostrar");
    return;
  }

  // Se chegou até aqui, o cupom é válido
  var percentual = cupons[codigoPadronizado];
  var valorDesconto = valorCompra * (percentual / 100);
  var totalComDesconto = valorCompra - valorDesconto;

  // Atualiza os elementos na tela com o resultado
  document.getElementById("valorOriginal").textContent = formatarMoeda(valorCompra);
  document.getElementById("percentualDesconto").textContent = percentual + "%";
  document.getElementById("valorDesconto").textContent = formatarMoeda(valorDesconto);
  document.getElementById("totalComDesconto").textContent = formatarMoeda(totalComDesconto);

  caixaResultado.classList.add("mostrar");
}

// Função auxiliar de formatação (mesma ideia usada no Desafio 1)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
