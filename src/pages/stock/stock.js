var createProductModal = document.getElementById("createProductModal");
var updateProductModal = document.getElementById("updateProductModal");
var deleteProductModal = document.getElementById("deleteProductModal");

var createProductButton = document.getElementById("create-product");
createProductButton.addEventListener("click", (event) => {
  loadModal("create-product");
});

var updateProductButton = document.getElementById("update-product");
updateProductButton.addEventListener("click", (event) => {
  loadModal("update-product");
});

window.addEventListener("load", async () => {
  await populateGrid();
});

document.addEventListener("reloadGrid", async () => {
  await populateGrid();
});

function loadModal(button) {
  switch (button) {
    case "create-product":
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/stock/create_product", true);
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          createProductModal.innerHTML = this.responseText;
          var script = document.createElement("script");
          script.src = "create-product.js";
          document.body.appendChild(script);
        }
      };
      xhr.send();
      break;
    case "update-product":
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/stock/update_product", true);
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          updateProductModal.innerHTML = this.responseText;
          var script = document.createElement("script");
          script.src = "update-product.js";
          document.body.appendChild(script);
        }
      };
      xhr.send();
      break;
    case "delete-product":
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/stock/delete_product", true);
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          deleteProductModal.innerHTML = this.responseText;
          var script = document.createElement("script");
          script.src = "delete-product.js";
          document.body.appendChild(script);
        }
      };
      xhr.send();
      break;
  }
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
