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
  var price = form.get("preco").replace(",", ".");
  var data = {
    idProduct: form.get("idProduct"),
    categoryId: form.get("category-select"),
    providerId: form.get("provider-select"),
    unitId: form.get("unit-select"),
    name: form.get("name"),
    price: price
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

  var response = await fetch("/product", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    closeModalProduct();
    displayModalMessage("Produto alterado com sucesso!");
    emitEvent("reloadGrid");
  }
}

// Preencho os campos de acordo com o id do produto
async function fillProductFields() {
  var id = idInput.value.trim();
  if (id !== "") {
    var response = await fetch(`/product/${id}`);
    var data = await response.json();
    console.log(data)
    // TO DO: parei aqui
    if (response.ok) {
      var nameInput = document.getElementById("name");
      var precoInput = document.getElementById("preco");
      var unitInput = document.getElementById("unit-select");
      var categoryInput = document.getElementById("category-select");
      var providerInput = document.getElementById("provider-select");
      if (data.length > 0) {
        errorElement.innerHTML = "";
        nameInput.value = data[0].nome;
        precoInput.value = data[0].preco;
        unitInput.value = data[0].unidMedida;
        categoryInput.value = data[0].category;
        providerInput.value = data[0].fornecedor;
      } else {
        errorElement.innerHTML = "O produto não existe";
        nameInput.value = null;
        precoInput.value = null;
        unitInputInput.value = null;
        categoryInput.value = null;
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

// Mostro uma modal de mensagem
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

function emitEvent(eventName, detail = null) {
  const customEvent = new CustomEvent(eventName, {
    bubbles: true,
    detail: detail,
  });

  document.dispatchEvent(customEvent);
}
