var deleteButton = document.getElementById("delete-update");
var inputField = document.getElementById("idProduct");
var errorElement = document.getElementById("message-error");

deleteButton.addEventListener("click", (event) => {
  sendData();
});

inputField.addEventListener("change", (event) => {
  fillInputField();
});

async function sendData() {
  var form = new FormData(document.querySelector(".form-group"));
  var data = {
    idProduct: form.get("idProduct"),
  };

  var response = await fetch(`/product/${data.idProduct}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    closeModalProduct();
    displayModalMessage("Produto excluido com sucesso!");
    emitEvent("reloadGrid");
  }
}

async function fillInputField() {
  var id = inputField.value.trim();
  if (id !== "") {
    var response = await fetch(`/product/${id}`);
    var data = await response.json();

    if (response.ok) {
      var nameInput = document.getElementById("name");
      if (data.length > 0) {
        errorElement.innerHTML = "";
        nameInput.value = data[0].nome;
      } else {
        errorElement.innerHTML = "O produto não existe";
        nameInput.value = null;
      }
    }
  }
}

function closeModalProduct() {
  var modal = document.getElementById("deleteProductModal");
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

function emitEvent(eventName, detail = null) {
  const customEvent = new CustomEvent(eventName, {
    bubbles: true,
    detail: detail,
  });

  document.dispatchEvent(customEvent);
}
