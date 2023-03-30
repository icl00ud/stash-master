document.getElementById("openModalBtn").addEventListener("click", function() {
  console.log("openModalBtn clicked");

  fetch('../signup/signup.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modal-container').innerHTML = html;
      var modal = document.getElementById("myModal");
      var loginPage = document.getElementById("loginPage");
      loginPage.style.opacity = 0.1;
      modal.classList.add("modal-fadein");
      modal.style.display = "block";
    })
    .catch(error => console.error(error));
});

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById('modal-container').innerHTML = '';
  document.getElementById("loginPage").style.opacity = 1;
}

window.addEventListener('click', function(event) {
  if (event.target.id === 'myModal') {
    closeModal();
  }
});
