/* ===================================================
   Desafio 3 - Cálculo de Frete
   =================================================== */

// Valores fixos usados na fórmula do frete
var TAXA_FIXA = 10.00;      // valor base cobrado em qualquer entrega
var VALOR_POR_KG = 2.00;    // valor cobrado por kg do pacote

// Função chamada pelo botão "Calcular frete"
function calcularFrete() {
  var peso = parseFloat(document.getElementById("pesoPacote").value);
  var regiao = document.getElementById("regiaoEntrega").value;
  var mensagemErro = document.getElementById("mensagemErroFrete");
  var caixaResultado = document.getElementById("caixaResultadoFrete");

  mensagemErro.textContent = "";

  // Validação do peso informado
  if (isNaN(peso) || peso <= 0) {
    mensagemErro.textContent = "Informe um peso válido (maior que zero).";
    caixaResultado.classList.remove("mostrar");
    return;
  }

  // Estrutura condicional (if/else if) para definir o multiplicador
  // e o prazo de acordo com a região escolhida
  var multiplicador;
  var prazoEmDias;

  if (regiao === "sudeste") {
    multiplicador = 1.0;
    prazoEmDias = 3;
  } else if (regiao === "sul") {
    multiplicador = 1.1;
    prazoEmDias = 4;
  } else if (regiao === "centro-oeste") {
    multiplicador = 1.2;
    prazoEmDias = 5;
  } else if (regiao === "nordeste") {
    multiplicador = 1.3;
    prazoEmDias = 6;
  } else { // norte
    multiplicador = 1.5;
    prazoEmDias = 8;
  }

  // Fórmula do frete
  var valorBase = TAXA_FIXA + (peso * VALOR_POR_KG);
  var valorFinal = valorBase * multiplicador;

  document.getElementById("valorFrete").textContent = formatarMoeda(valorFinal);
  document.getElementById("prazoFrete").textContent = prazoEmDias + " dias úteis";

  caixaResultado.classList.add("mostrar");
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
