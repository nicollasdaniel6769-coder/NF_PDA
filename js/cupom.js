var cupons = {
  "DESCONTO10": 10,
  "DESCONTO20": 20,
  "BEMVINDO15": 15
};

function aplicarCupom() {
  var valorCompra = parseFloat(document.getElementById("valorCompra").value);
  var codigoDigitado = document.getElementById("codigoCupom").value;
  var mensagemErro = document.getElementById("mensagemErroCupom");
  var caixaResultado = document.getElementById("caixaResultadoCupom");

  mensagemErro.textContent = "";

  if (isNaN(valorCompra) || valorCompra <= 0) {
    mensagemErro.textContent = "Informe um valor de compra válido.";
    caixaResultado.classList.remove("mostrar");
    return;
  }

  var codigoPadronizado = codigoDigitado.toUpperCase().trim();

  if (!(codigoPadronizado in cupons)) {
    mensagemErro.textContent = "Cupom inválido. Confira os cupons disponíveis ao lado.";
    caixaResultado.classList.remove("mostrar");
    return;
  }

  var percentual = cupons[codigoPadronizado];
  var valorDesconto = valorCompra * (percentual / 100);
  var totalComDesconto = valorCompra - valorDesconto;

  document.getElementById("valorOriginal").textContent = formatarMoeda(valorCompra);
  document.getElementById("percentualDesconto").textContent = percentual + "%";
  document.getElementById("valorDesconto").textContent = formatarMoeda(valorDesconto);
  document.getElementById("totalComDesconto").textContent = formatarMoeda(totalComDesconto);

  caixaResultado.classList.add("mostrar");
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
