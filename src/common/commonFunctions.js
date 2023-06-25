document.addEventListener("loadSelect", async (event) => {
  var selectId;
  var apiUrl;

  if (Array.isArray(event.detail)) {
    selectId = event.detail[0].selectId;
    apiUrl = event.detail[0].apiUrl;
  } else {
    selectId = event.detail.selectId;
    apiUrl = event.detail.apiUrl;
  }

  populateSelect(apiUrl, selectId);
});

async function populateSelect(endpoint, elementId) {
  const select = document.getElementById(`${elementId}`);
  select.innerHTML = "";
    
  try {
    const response = await fetch(`${endpoint}`);
    if (response.ok) {
      const data = await response.json();

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.text;
        select.appendChild(option);
      });
    } else {
      console.log("Erro na requisição: " + response.status);
    }
  } catch (error) {
    console.log("Erro na requisição:", error);
  }
}