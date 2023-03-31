function sendData() {
  const form = document.querySelector('#register-form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = {
      name: document.querySelector('[name="username"]').value,
      password: document.querySelector('[name="password"]').value,
      email: document.querySelector('[name="email"]').value
    };

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log('Data: ', data))
    .catch(err => console.log('Erro: ', err));
  });
}

sendData();
