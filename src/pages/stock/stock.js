var createProductModal = document.getElementById("createProductModal");
var updateProductModal = document.getElementById("updateProductModal");
var deleteProductModal = document.getElementById("deleteProductModal");
var updateProductButton = document.getElementById("update-product");
var createProductButton = document.getElementById("create-product");
var deleteProductButton = document.getElementById("delete-product");
var stockHeaderButton = document.getElementById("stock");
var panelHeaderButton = document.getElementById("panel");
var stockTab = document.getElementById("stock-tab");
var movementTab = document.getElementById("movement-tab");
var categoryTab = document.getElementById("category-tab");
var stockContent = document.getElementById("stock-content");
var movementContent = document.getElementById("movement-content");
var categoryContent = document.getElementById("category-content");
var title = document.getElementById("title");

const productColumns = ["idProduct", "nome", "qtdEstoque", "unidMedida", "preco", "dtCreation"];
const movementColumns = ["idMovement", "nome", "quantityMoved", "type", "date", "description", "origin", "destination"];
const categoryColumns = ["idCategory", "category", "description", "dtCreation"];

stockTab.addEventListener("click", () => {
  stockTab.classList.add("active");
  movementTab.classList.remove("active");
  categoryTab.classList.remove("active");

  title.innerHTML = "Relatório de Estoque";

  stockContent.style.display = "block";
  movementContent.style.display = "none";
  categoryContent.style.display = "none";
});

movementTab.addEventListener("click", () => {
  stockTab.classList.remove("active");
  categoryTab.classList.remove("active");
  movementTab.classList.add("active");

  title.innerHTML = "Relatório de Movimentação";

  stockContent.style.display = "none";
  categoryContent.style.display = "none";
  movementContent.style.display = "block";
});

categoryTab.addEventListener("click", () => {
  categoryTab.classList.add("active");
  stockTab.classList.remove("active");
  movementTab.classList.remove("active");

  title.innerHTML = "Relatório de Categoria";

  categoryContent.style.display = "block";
  stockContent.style.display = "none";
  movementContent.style.display = "none";
});

createProductButton.addEventListener("click", (event) => {
  loadModal("create-product");
});

updateProductButton.addEventListener("click", (event) => {
  loadModal("update-product");
});

deleteProductButton.addEventListener("click", (event) => {
  loadModal("delete-product");
});

window.addEventListener("load", async () => {
  await populateGrid("/productTab", productColumns, "product-items");
  await populateGrid("/category", categoryColumns, "category-items");
  await populateGrid("/movement", movementColumns, "movement-items");
});

document.addEventListener("reloadGrid", async () => {
  await populateGrid("/product", productColumns, "product-items");
  await populateGrid("/category", categoryColumns, "category-items");
  await populateGrid("/movement", movementColumns, "movement-items");
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

// Functions

function loadModal(button) {
  var url, modal, scriptSrc;
  switch (button) {
    case "create-product":
      url = "/stock/create_product";
      modal = createProductModal;
      scriptSrc = "create-product.js";
      break;
    case "update-product":
      url = "/stock/update_product";
      modal = updateProductModal;
      scriptSrc = "update-product.js";
      break;
    case "delete-product":
      url = "/stock/delete_product";
      modal = deleteProductModal;
      scriptSrc = "delete-product.js";
      break;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      modal.innerHTML = this.responseText;
      var script = document.createElement("script");
      script.src = scriptSrc;
      document.body.appendChild(script);
    }
  };
  xhr.send();
}

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
