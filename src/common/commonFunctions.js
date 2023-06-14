document.addEventListener("loadSelect", async (event) => {
  var selectId = event.detail[0].selectId;
  var apiUrl = event.detail[0].apiUrl;

  populateSelect(apiUrl, selectId);
});

document.addEventListener("autocomplete", async (event) => {
  var apiUrl = event.detail[0].apiUrl;
  var inputValue = event.detail[0].inputValue;
  var selectId = event.detail[0].selectId;

  await handleAutoCompleteInput(apiUrl, inputValue, selectId);
});

async function populateSelect(endpoint, elementId) {
  const select = document.getElementById(`${elementId}`);
  select.innerHTML = "";
    // TO DO: make the select menu appears below provider input
  try {
    const response = await fetch(`${endpoint}`);
    if (response.ok) {
      const data = await response.json();
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.idMedida;
        option.text = item.nome;
        select.appendChild(option);
      });
    } else {
      console.log("Erro na requisição: " + response.status);
    }
  } catch (error) {
    console.log("Erro na requisição:", error);
  }
}

async function handleAutoCompleteInput(endpoint, data, selectId) {
  var dataObject = {
    name: data,
  };

  await makeRequest(endpoint, dataObject, selectId);
}

async function makeRequest(url, data, selectId) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro na solicitação");
    }

    const jsonResponse = await response.json();

    updateDropdownList(selectId, jsonResponse);
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
}

function updateDropdownList(elementId, data) {
  var input = document.getElementById(elementId);

  var select = document.createElement("select");
  input.appendChild(select);
  data.forEach(item => {
    console.log(item.name)
    var option = document.createElement("option");
    option.text = item.name;
    select.appendChild(option);
  });
}
