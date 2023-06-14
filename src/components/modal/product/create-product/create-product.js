var cancelButton = document.getElementById("cancel");
var saveButton = document.getElementById("save");
var select = document.getElementById("unit-select");
var inputProvider = document.getElementById("input-provider");
 
// Event listener e eventos

cancelButton.addEventListener("click", (event) => {
  closeModalProduct();
});

saveButton.addEventListener("click", async (event) => {
  sendData();
});

select.addEventListener("click", async (event) => {
  var selectId = "unit-select";
  var apiUrl = "/unit/select";

  emitEvent("loadSelect", {selectId, apiUrl});
});

inputProvider.addEventListener("keyup", debounce(emitAutocompleteEvent, 300));

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
  var quantity = form.get("quantity").replace(",", ".");
  var data = {
    name: form.get("name"),
    quantity: quantity,
    unit: form.get("select"),
    price: price,
    provider: form.get("provider"),
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

function debounce(func, delay) {
  let timeoutId;
  
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, arguments), delay);
  };
}

function emitAutocompleteEvent() {
  var inputValue = inputProvider.value;
  var apiUrl = "/provider/autocomplete";
  var selectId = "input-provider";
  
  if (inputValue.length === 0) return;
  emitEvent("autocomplete", { apiUrl, inputValue, selectId });
}