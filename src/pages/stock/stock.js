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
  var grid = document.getElementById("table-items");
  await fetch("/product")
    .then((response) => response.json())
    .then((products) => {
      products[0].forEach((product) => {
        grid.innerHTML += `
        <tr>
          <td>${product.idProduct}</td>
          <td>${product.nome}</td>
          <td>${product.qtdEstoque}</td>
          <td>${product.unidMedida}</td>
          <td>${product.preco}</td>
          <td>${product.fornecedor}</td>
          <td>${product.dtCreation}</td>
        </tr>
        `;
      });
    });
}
