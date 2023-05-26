var stockHeaderButton = document.getElementById("stock");
var panelHeaderButton = document.getElementById("panel");
var userTab = document.getElementById("user-tab");
var providerTab = document.getElementById("provider-tab");
var userContent = document.getElementById("user-content");
var providerContent = document.getElementById("provider-content");

const userColumns = ["id", "user", "password", "email"];
const providerColumns = ["idProvider", "name", "address", "email", "phone"];

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

window.addEventListener("load", async () => {
  await populateGrid("/user", userColumns, "table-users");
  await populateGrid("/provider", providerColumns, "table-providers");
});

async function populateGrid(endpoint, columns, gridName) {
  const grid = document.getElementById(gridName);
  grid.innerHTML = "";

  const response = await fetch(`${endpoint}`);
  const data = await response.json();
  for (const item of data) {
    const row = grid.insertRow();

    for (const column of columns) {
      const cell = row.insertCell();
      cell.textContent = item[column];
    }
  }
}