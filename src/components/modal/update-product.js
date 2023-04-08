var cancelButton = document.getElementById("cancel-update");
var saveButton = document.getElementById("save-update");
var errorElement = document.getElementById("message-error");

cancelButton.addEventListener("click", (event) => {
  closeModalProduct();
});

var idInput = document.getElementById("idProduct");
idInput.addEventListener("change", async (event) => {
  fillProductFields();
});

saveButton.addEventListener("click", async (event) => {
  sendData();
});

// Envio os dados alterados para o backend
async function sendData() {
  var form = new FormData(document.querySelector(".form-group"));
  var data = {
    idProduct: form.get("idProduct"),
    name: form.get("name"),
    quantity: form.get("quantity"),
    unit: form.get("select"),
    price: form.get("preco"),
    provider: form.get("provider"),
  };

  if (data.idProduct == "")
    return (errorElement.innerHTML = "Preencha com um código");

  var hasData = false;
  for (var key in data) {
    if (key !== "idProduct" && data[key]) {
      hasData = true;
      break;
    }
  }

  if (!hasData) return displayModalMessage("Preencha pelo menos um campo");

  console.log(data);
  var response = await fetch("/product", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) displayModalMessage("Produto alterado com sucesso!");
}

// Preencho os campos de acordo com o id do produto
async function fillProductFields() {
  var id = idInput.value.trim();
  if (id !== "") {
    var response = await fetch(`/product/${id}`);
    var data = await response.json();
    if (response.ok) {
      var nameInput = document.getElementById("name");
      var quantityInput = document.getElementById("quantity");
      var selectInput = document.getElementsByName("select")[0];
      var precoInput = document.getElementById("preco");
      var providerInput = document.getElementById("provider");
      if (data.length > 0) {
        errorElement.innerHTML = "";
        nameInput.value = data[0].nome;
        quantityInput.value = data[0].qtdEstoque;
        selectInput.value = data[0].unidMedida;
        precoInput.value = data[0].preco;
        providerInput.value = data[0].fornecedor;
      } else {
        errorElement.innerHTML = "O produto não existe";
        nameInput.value = null;
        quantityInput.value = null;
        selectInput.value = null;
        precoInput.value = null;
        providerInput.value = null;
      }
    }
  }
}

// Fecho a modal de alterar produto
function closeModalProduct() {
  var modal = document.getElementById("updateProductModal");
  modal.innerHTML = "";

  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].getAttribute("src") !== "stock.js") {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }
}

function displayModalMessage(message) {
  const modal = document.getElementById("modal-error");
  const messageElement = document.getElementById("message-modal");

  if (modal && messageElement) {
    messageElement.innerHTML = message;

    // Faço um efeito de fadeIn e fadeOut na modal
    modal.classList.add("show");
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.remove("show");
      modal.classList.add("hide");
      setTimeout(() => {
        modal.style.display = "none";
      }, 1000);
    }, 3000);
  }
}
