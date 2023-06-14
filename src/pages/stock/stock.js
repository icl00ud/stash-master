var createProductModal = document.getElementById("createProductModal");
var updateProductModal = document.getElementById("updateProductModal");
var deleteProductModal = document.getElementById("deleteProductModal");
var updateProductButton = document.getElementById("update-product");
var createProductButton = document.getElementById("create-product");
var deleteProductButton = document.getElementById("delete-product");
var stockHeaderButton = document.getElementById("stock");
var panelHeaderButton = document.getElementById("panel");
var productTab = document.getElementById("product-tab");
var stockTab = document.getElementById("stock-tab");
var movementTab = document.getElementById("movement-tab");
var categoryTab = document.getElementById("category-tab");
var stockContent = document.getElementById("stock-content");
var productContent = document.getElementById("product-content");
var movementContent = document.getElementById("movement-content");
var categoryContent = document.getElementById("category-content");
var title = document.getElementById("title");

const stockColumns = [
  "stockId",
  "productName",
  "productPrice",
  "unit",
  "stockedQuantity",
  "warehouseName",
  "warehouseAddress",
];
const productColumns = [
  "idProduct",
  "nome",
  "unidMedida",
  "preco",
  "dtCreation",
];
const movementColumns = [
  "idMovement",
  "nome",
  "quantityMoved",
  "type",
  "date",
  "description",
  "origin",
  "destination",
];
const categoryColumns = ["idCategory", "category", "description", "dtCreation"];

productTab.addEventListener("click", () => {
  productTab.classList.add("active");
  movementTab.classList.remove("active");
  categoryTab.classList.remove("active");
  stockTab.classList.remove("active");

  title.innerHTML = "Relatório de Produto";

  productContent.style.display = "block";
  movementContent.style.display = "none";
  stockContent.style.display = "none";
  categoryContent.style.display = "none";
});

stockTab.addEventListener("click", () => {
  productTab.classList.remove("active");
  movementTab.classList.remove("active");
  categoryTab.classList.remove("active");
  stockTab.classList.add("active");

  title.innerHTML = "Relatório de Estoque";

  productContent.style.display = "none";
  movementContent.style.display = "none";
  categoryContent.style.display = "none";
  stockContent.style.display = "block";
});

movementTab.addEventListener("click", () => {
  productTab.classList.remove("active");
  categoryTab.classList.remove("active");
  stockTab.classList.remove("active");
  movementTab.classList.add("active");

  title.innerHTML = "Relatório de Movimentação";

  movementContent.style.display = "block";
  productContent.style.display = "none";
  categoryContent.style.display = "none";
  stockContent.style.display = "none";
});

categoryTab.addEventListener("click", () => {
  categoryTab.classList.add("active");
  productTab.classList.remove("active");
  stockTab.classList.remove("active");
  movementTab.classList.remove("active");

  title.innerHTML = "Relatório de Categoria";

  categoryContent.style.display = "block";
  productContent.style.display = "none";
  movementContent.style.display = "none";
  stockContent.style.display = "none";
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
  await populateGrid("/product/report", productColumns, "product-items");
  await populateGrid("/category/report", categoryColumns, "category-items");
  await populateGrid("/movement/report", movementColumns, "movement-items");
  await populateGrid("/stock/report", stockColumns, "stock-items");
});

document.addEventListener("reloadGrid", async () => {
  await populateGrid("/product/report", productColumns, "product-items");
  await populateGrid("/category/report", categoryColumns, "category-items");
  await populateGrid("/movement/report", movementColumns, "movement-items");
  await populateGrid("/stock/report", stockColumns, "stock-items");
});

stockHeaderButton.addEventListener("click", (event) => {
  var urlAtual = window.location.href;
  if (urlAtual.includes("/stockPage")) {
    return;
  } else {
    window.location.href = "/stockPage";
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
  var url, modal, scriptSrc, commonScriptSrc = "commonFunctions.js";

  switch (button) {
    case "create-product":
      url = "/stockPage/create_product";
      modal = createProductModal;
      scriptSrc = "create-product.js";
      break;
    case "update-product":
      url = "/stockPage/update_product";
      modal = updateProductModal;
      scriptSrc = "update-product.js";
      break;
    case "delete-product":
      url = "/stockPage/delete_product";
      modal = deleteProductModal;
      scriptSrc = "delete-product.js";
      break;
  }

  var sources = [scriptSrc, commonScriptSrc];

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      modal.innerHTML = this.responseText;
      sources.forEach((source) => {
        var script = document.createElement("script");
        script.src = source;
        script.type = 'module';
        document.body.appendChild(script);
      });
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
