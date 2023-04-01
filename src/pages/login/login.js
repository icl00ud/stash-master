function displayMessage() {
  const queryParams = new URLSearchParams(window.location.search);
  const accountCreated = queryParams.get("account_created");

  if (accountCreated === "true") {
    const modal = document.getElementById("myModal");
    const messageElement = document.getElementById("message");

    if (modal && messageElement) {
      messageElement.innerHTML =
        accountCreated === "true" ? "Conta criada com sucesso!" : message;

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
}

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const isAccountCreated = queryParams.get("account_created") === "true";

  if (isAccountCreated) displayMessage();
});
