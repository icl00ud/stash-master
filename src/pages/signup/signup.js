const form = document.querySelector(".register-form");
form.addEventListener("submit", handleSubmit);

document.addEventListener("DOMContentLoaded", () => {
  const queryParams = new URLSearchParams(window.location.search);
  const isAccountCreated = queryParams.get("account_created") === "false";

  if (isAccountCreated) displayMessage();
});

function handleSubmit(event) {
  event.preventDefault();

  const messageErrorElement = document.getElementById("message-error");
  const { username, password, email } = form.elements;
  const formData = {
    user: username.value,
    password: password.value,
    email: email.value,
  };

  if (formData.user.length < 3) {
    messageErrorElement.innerHTML = "O nome de usuário deve ter pelo menos 3 caracteres";
    return;
  }

  if (formData.password.length < 8) {
    messageErrorElement.innerHTML = "A senha deve ter pelo menos 8 caracteres";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    messageErrorElement.innerHTML = "O e-mail inserido é inválido";
    return;
  }

  sendData(formData);
}

async function sendData(data) {
  try {
    const response = await fetch('/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
      console.log("Data: ", responseData);
    }
  } catch (err) {
    console.log("Erro: ", err);
  }
}

function displayMessage() {
  const queryParams = new URLSearchParams(window.location.search);
  const accountCreated = queryParams.get("account_created");

  if (accountCreated === "false") {
    const modal = document.getElementById("myModal");
    const messageElement = document.getElementById("message");

    if (modal && messageElement) {
      messageElement.innerHTML =
        accountCreated === "false" ? "Falha ao criar a conta" : message;

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
