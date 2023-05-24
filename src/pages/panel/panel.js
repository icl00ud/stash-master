var stockHeaderButton = document.getElementById("stock");
var panelHeaderButton = document.getElementById("panel");

stockHeaderButton.addEventListener("click", (event) => {
  var urlAtual = window.location.href;
  if (urlAtual.includes("/stock")) {
    return;
  } else {
    window.location.href = "/stock";
  }
});

panelHeaderButton.addEventListener("click", (event) => {
  var urlAtual = window.location.href;
  if (urlAtual.includes("/panel")) {
    return;
  } else {
    window.location.href = "/panel";
  }
});