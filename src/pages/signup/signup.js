const form = document.querySelector(".register-form");
form.addEventListener("submit", handleSubmit);

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

  if (formData.email !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      messageErrorElement.innerHTML = "O e-mail inserido é inválido";
      return;
    }
  } else {
    messageErrorElement.innerHTML = "O campo e-mail é obrigatório!";
    return;
  }

  sendData(formData);
}

async function sendData(data) {
  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const contentType = response.headers?.get("content-type");
    const responseData =
      contentType?.indexOf("application/json") !== -1 ? await response.json() : await response.text();
    window.location.href = responseData.redirect;
    displayModal(responseData.message);
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
}

function displayModal(message) {
  const modal = document.getElementById("myModal");
  const messageElement = document.getElementById("message");

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
