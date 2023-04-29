const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-link");
const form = document.querySelector(".login-form");
const messageErrorElement = document.getElementById("message-error");
const messageElement = document.getElementById("message");
const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const { username, password } = form.elements;
  const formData = { user: username.value, password: password.value };

  if (!formData.user || !formData.password) {
    return displayModal("Preencha todos os campos!", true);
  }

  sendData(formData);
});

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const isAccountCreated = queryParams.get("account_created") === "true";

  if (isAccountCreated) {
    const newUrl = window.location.href.replace(
      /[?&]account_created=true($|&)/,
      "$1"
    );
    window.history.pushState({}, "", newUrl);
    displayModal("Conta criada com sucesso!");
  }
});

signupButton.addEventListener("click", (event) => {
  window.location.href = "/signup";
});

export async function sendData({ user, password }) {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    const contentType = response.headers?.get("content-type");
    const responseData =
      contentType?.indexOf("application/json") !== -1
        ? await response.json()
        : await response.text();

    if (response.ok) {
      window.location.href = responseData.redirect;
    } else {
      messageErrorElement.innerHTML = responseData.message;
    }
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
}

export function displayModal(message, isError = false) {
  modalContent.style.border = isError ? "1px solid red" : "";
  messageElement.innerHTML = message;

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

module.exports = {
  sendData,
  displayModal
}