var cancelButton = document.getElementById("cancel");
var saveButton = document.getElementById("save");

var productSelect = document.getElementById("product-select");
var originSelect = document.getElementById("origin-warehouse-select");
var destinationSelect = document.getElementById("dest-warehouse-select");

// Event listener e eventos

cancelButton.addEventListener("click", (event) => {
    closeModalProduct();
});

saveButton.addEventListener("click", async (event) => {
    sendData();
});

productSelect.addEventListener("click", handleClick);
originSelect.addEventListener("click", handleClick);
destinationSelect.addEventListener("click", handleClick);

// Functions

function closeModalProduct() {
    var modal = document.getElementById("createMovementModal");
    modal.innerHTML = "";

    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].getAttribute("src") !== "stock.js") {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
    }
}

function emitEvent(eventName, ...detail) {
    const customEvent = new CustomEvent(eventName, {
        bubbles: true,
        detail: detail,
    });

    document.dispatchEvent(customEvent);
}

function handleClick(event) {
    var selectId;
    var apiUrl;

    if (event.target === productSelect) {
        selectId = "product-select";
        apiUrl = "/product/select";
    } else if (event.target === originSelect) {
        selectId = "origin-warehouse-select";
        apiUrl = "/warehouse/select";
    } else if (event.target === destinationSelect) {
        selectId = "dest-warehouse-select";
        apiUrl = "/warehouse/select";
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

async function sendData() {
    var form = new FormData(document.querySelector(".form-group"));
    var quantity = form.get("quantity").replace(",", ".");
    var data = {
        idProduct: form.get("product-select"),
        idOriginWH: form.get("origin-warehouse-select"),
        idDestinationWH: form.get("dest-warehouse-select"),
        type: form.get("movtype-select"),
        date: "",
        quantityMoved: quantity,
        description: form.get("description")
    };

    var response = await fetch("/movement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        closeModalProduct();
        displayModal("Movimentação criada com sucesso");
        emitEvent("reloadGrid");
    } else {
        displayModal("Erro ao criar a movimentação");
    }
}
