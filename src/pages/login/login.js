function validateForm() {
    const username = document.forms["loginForm"]["username"].value;
    const password = document.forms["loginForm"]["password"].value;
        
    // Verificação do campo de usuário
    if (username == "") {
        alert("Por favor, preencha o campo de usuário.");
        return false;
    }
        
    // Verificação da senha
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!@#$%^&*(),.?":{}|<>a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("A senha deve conter pelo menos 8 caracteres com símbolos, letra maiúscula, letra minúscula e números.");
        return false;
    }
}

// Função para exibir a página de registro
function displaySignupPage(url) {
    const signupLink = document.querySelector('#signup-link');
    signupLink.addEventListener('click', (event) => {
        event.preventDefault();
    });

    fetch(url)
    .then(response => response.text())
    .then(html => {
        document.querySelector("#app").innerHTML = html;
    })
    .catch(error => console.log(error));

    history.pushState({}, null, 'http://localhost:3000/signup');
}
displaySignupPage();