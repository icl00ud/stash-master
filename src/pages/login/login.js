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
    return displayModal("Preencha todos os campos!", true);
  } else {
    sendData(formData);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const isAccountCreated = queryParams.get("account_created") === "true";

  if (isAccountCreated) {
    const newUrl = window.location.href.replace(/[?&]account_created=true($|&)/, '$1');
    window.history.pushState({}, '', newUrl);
    displayModal("Conta criada com sucesso!");
  }
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

    const contentType = response.headers.get("content-type");
    let responseData;

    if (contentType && contentType.indexOf("application/json") !== -1) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (response.ok) {
      window.location.href = responseData.redirect;
    } else {
      const messageErrorElement = document.getElementById("message-error");
      const errorMessage = responseData.message;
      messageErrorElement.innerHTML = errorMessage;
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function displayModal(message, isError = false) {
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modal-content");
  const messageElement = document.getElementById("message");

  if (isError) modalContent.style.border = "1px solid red";

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
