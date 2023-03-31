function loadPage(page) {
    fetch(page)
      .then(response => response.text())
      .then(html => {
        document.querySelector("#app").innerHTML = html;
      })
      .catch(error => console.log(error));
}