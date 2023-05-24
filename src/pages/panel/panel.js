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

window.addEventListener("load", async () => {
  await populateGrid();
});

async function populateGrid() {
  const grid = document.getElementById("table-users");
  grid.innerHTML = "";

  const response = await fetch("/user");
  const users = await response.json();

  for (const user of users.users[0]) {
    const row = grid.insertRow();

    const idCell = row.insertCell();
    idCell.textContent = user.id;

    const nameCell = row.insertCell();
    nameCell.textContent = user.user;

    const unitCell = row.insertCell();
    unitCell.textContent = user.password;

    const stockCell = row.insertCell();
    stockCell.textContent = user.email;
  }
}