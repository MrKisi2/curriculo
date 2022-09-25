const experiencias = [];

// Verifica se a página foi carregada
$(document).ready(async () => {
  //Pega todas as experiências do banco de dados
  const result = await getAllExperiencia();

  document.getElementById("xpList").innerHTML = "";

  // cria uma lista html com as experências
  const text = factoryLinhaDeExperiencia(result);
  document.getElementById("xpList").innerHTML = text;
});

function factoryLinhaDeExperiencia(result) {
  let text = "";
  for (let i = 0; i < result.length; i++) {
    text +=
      `<li>
      <button style="width: 75px; height: 25px; background-color: red; border-radius: 5px;margin: 1px" onclick='removeExperiencia(${result[i].id})''>remover</button>
      <button style="width: 60px; height: 25px; background-color: aquamarine; border-radius: 5px;margin: 1px" onclick='document.getElementById("editDivInput${result[i].id}").style.display = "inline"'>editar</button>
      ` +
      result[i].experiencia +
      `</li>
      <div id="editDivInput${result[i].id}" style="display: none">
        <button style="width: 30px; height: 30px; background-color: green; border-radius: 5px;margin: 1px;" onclick='updateExperiencia(${result[i].id})''>ok</button>
        <button style="width: 30px; height: 30px; background-color: red; border-radius: 5px;margin: 1px;" onclick='document.getElementById("editDivInput${result[i].id}").style.display = "none"';''>x</button>
        <input id="editInput${result[i].id}"></input>
      </div>`;
  }
  return text;
}

// Atualiza uma experiência no banco de dados
async function updateExperiencia(id) {
  document.getElementById(`editInput${id}`).value;

  try {
    const url = `/user/${id}`;

    let response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experiencia: document.getElementById(`editInput${id}`).value,
      }),
    });
  } catch (error) {
    console.error(error);
  }

  experiencias.length = 0;

  const result = await getAllExperiencia();

  for (const xp of result) experiencias.push(xp.experiencia);

  const text = factoryLinhaDeExperiencia(result);

  document.getElementById("xpList").innerHTML = text;
}

// Remove uma experiência no banco de dados
async function removeExperiencia(id) {
  try {
    const url = `/user/${id}`;
    let response = await fetch(url, { method: "DELETE" });
  } catch (error) {
    console.error(error);
  }
  experiencias.length = 0;

  const result = await getAllExperiencia();

  for (const xp of result) experiencias.push(xp.experiencia);

  const text = factoryLinhaDeExperiencia(result);

  document.getElementById("xpList").innerHTML = text;
}

// Adiciona uma experiência no banco de dados
async function addExperiencia() {
  try {
    let url = "/user";
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experiencia: document.getElementById("addBtn").value,
      }),
    });
    document.getElementById("addBtn").value = "";
  } catch (error) {
    console.error(error);
  }
  experiencias.length = 0;

  const result = await getAllExperiencia();

  for (const xp of result) experiencias.push(xp.experiencia);

  const text = factoryLinhaDeExperiencia(result);

  document.getElementById("xpList").innerHTML = text;
}

// Pega todas as experiências no banco de dados
async function getAllExperiencia() {
  try {
    let url = "/user";
    let response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
