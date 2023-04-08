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
}
