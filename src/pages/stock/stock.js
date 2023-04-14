var createProductModal = document.getElementById("createProductModal");
var updateProductModal = document.getElementById("updateProductModal");
var deleteProductModal = document.getElementById("deleteProductModal");

var updateProductButton = document.getElementById("update-product");
var createProductButton = document.getElementById("create-product");

// Event listeners

createProductButton.addEventListener("click", (event) => {
  loadModal("create-product");
});

updateProductButton.addEventListener("click", (event) => {
  loadModal("update-product");
});

window.addEventListener("load", async () => {
  await populateGrid();
});

document.addEventListener("reloadGrid", async () => {
  await populateGrid();
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

async function populateGrid() {
  const grid = document.getElementById("table-items");
  grid.innerHTML = "";

  const response = await fetch("/product");
  const products = await response.json();

  for (const product of products[0]) {
    const row = grid.insertRow();

    const idCell = row.insertCell();
    idCell.textContent = product.idProduct;

    const nameCell = row.insertCell();
    nameCell.textContent = product.nome;

    const stockCell = row.insertCell();
    stockCell.textContent = product.qtdEstoque;

    const unitCell = row.insertCell();
    unitCell.textContent = product.unidMedida;

    const priceCell = row.insertCell();
    priceCell.textContent = product.preco;

    const supplierCell = row.insertCell();
    supplierCell.textContent = product.fornecedor;

    const creationDateCell = row.insertCell();
    creationDateCell.textContent = product.dtCreation;
  }
}