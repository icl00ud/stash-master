// Abre a modal ao clicar no botão "Criar conta"
document.getElementById("openModalBtn").addEventListener("click", function() {
  console.log("openModalBtn clicked");
  
  // Busca o conteúdo do arquivo modal.html e o insere na div "modal-container"
  fetch('../signup/signup.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modal-container').innerHTML = html;
      document.getElementById("myModal").style.display = "block";
    })
    .catch(error => console.error(error));
});

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById('modal-container').innerHTML = '';
}

window.addEventListener('click', function(event) {
  if (event.target.id === 'myModal') {
    closeModal();
  }
});
