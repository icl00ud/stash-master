var cancelButton = document.getElementById("cancel");
var saveButton = document.getElementById("save");

cancelButton.addEventListener("click", (event) => {
  closeModalProduct();
});
saveButton.addEventListener("click", async (event) => {
  sendData();
});

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

  if(response.ok)
    displayModal("Produto criada com sucesso")
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
