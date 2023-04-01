const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-link");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const form = document.querySelector(".login-form");
  const { username, password } = form.elements;

  const formData = {
    user: username.value,
    password: password.value,
  };

  if (formData.user == "" || formData.password == "") {
    const messageElement = document;
    return displayMessage("Preencha todos os campos!", true);
  } else {
    sendData(formData);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const isAccountCreated = queryParams.get("account_created") === "true";

  if (isAccountCreated) displayMessage();
});

signupButton.addEventListener("click", (event) => {
  window.location.href = "/signup";
});

async function sendData(data) {
  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Erro ao enviar dados");

    const contentType = response.headers.get("content-type");
    let responseData;

    if (contentType && contentType.indexOf("application/json") !== -1) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (responseData.redirect) {
      window.location.href = responseData.redirect;
    } else {
      return;
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function displayMessage(message, isError) {
  const queryParams = new URLSearchParams(window.location.search);
  const accountCreated = queryParams.get("account_created");

  if (accountCreated === "true") {
    const modal = document.getElementById("myModal");
    const messageElement = document.getElementById("message");

    if (modal && messageElement) {
      messageElement.innerHTML =
        accountCreated === "true" ? "Conta criada com sucesso!" : message;
      displayModal();
    }
  } else {
    const modal = document.getElementById("myModal");
    const messageElement = document.getElementById("message");
    messageElement.innerHTML = message;
    displayModal(isError);
  }
}

function displayModal(isError) {
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content");

  if (isError) modalContent.style.border = "1px solid red";

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
