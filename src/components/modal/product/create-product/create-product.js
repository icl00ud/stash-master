var cancelButton = document.getElementById("cancel");
var saveButton = document.getElementById("save");
var unitSelect = document.getElementById("unit-select");
var categorySelect = document.getElementById("category-select");
var providerSelect = document.getElementById("provider-select");

// Event listener e eventos

cancelButton.addEventListener("click", (event) => {
  closeModalProduct();
});

saveButton.addEventListener("click", async (event) => {
  sendData();
});

unitSelect.addEventListener("click", handleClick);
categorySelect.addEventListener("click", handleClick);
providerSelect.addEventListener("click", handleClick);


// Functions

function closeModalProduct() {
  var modal = document.getElementById("createProductModal");
  modal.innerHTML = "";

  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].getAttribute("src") !== "stock.js") {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
  }
}

async function sendData() {
  var form = new FormData(document.querySelector(".form-group"));
  var price = form.get("preco").replace(",", ".");
  var data = {
    categoryId: form.get("category-select"),
    unitId: form.get("unit-select"),
    providerId: form.get("provider-select"),
    price: price,
    name: form.get("name"),
  };

  var response = await fetch("/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    closeModalProduct();
    displayModal("Produto criado com sucesso");
    emitEvent("reloadGrid");
  } else {
    displayModal("Erro ao criar o produto");
  }
}

function emitEvent(eventName, ...detail) {
  const customEvent = new CustomEvent(eventName, {
    bubbles: true,
    detail: detail
  });

  document.dispatchEvent(customEvent);
}

function handleClick(event) {
  var selectId;
  var apiUrl;

  if (event.target === unitSelect) {
    selectId = "unit-select";
    apiUrl = "/unit/select";
  } else if (event.target === categorySelect) {
    selectId = "category-select";
    apiUrl = "/category/select";
  } else if (event.target === providerSelect) {
    selectId = "provider-select";
    apiUrl = "/provider/select";
  }

  emitEvent("loadSelect", { selectId, apiUrl });

  // Remover o ouvinte de evento após a primeira execução
  event.target.removeEventListener(event.type, handleClick);
}

function displayModal(message) {
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