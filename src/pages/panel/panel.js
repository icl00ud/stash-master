var stockHeaderButton = document.getElementById("stock");
var panelHeaderButton = document.getElementById("panel");
var userTab = document.getElementById("user-tab");
var providerTab = document.getElementById("provider-tab");
var userContent = document.getElementById("user-content");
var providerContent = document.getElementById("provider-content");

userTab.addEventListener("click", () => {
  userTab.classList.add("active");
  providerTab.classList.remove("active");

  userContent.style.display = "block";
  providerContent.style.display = "none";
});

providerTab.addEventListener("click", () => {
  userTab.classList.remove("active");
  providerTab.classList.add("active");

  userContent.style.display = "none";
  providerContent.style.display = "block";
});

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