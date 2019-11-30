localStorageDemo()

function dom() {
  const h1 = document.querySelector("h1");
  h1.innerHTML = "<strong>Nouveau</strong> titre";
  h1.setAttribute("id", "importantTitle");
  h1.style.fontSize = "2em";
  h1.style.color = "magenta";

  const p = document.createElement("p");
  p.innerHTML = `
    Mon nouveau paragraphe : 
    <ul>
        <li>cool</li>
        <li>joli</li>
    </ul>`;
  p.append("Marche aussi avec les strings directement");
  p.style.fontFamily = "monospace";
  h1.after(p);

  p.onclick = () => alert("coucou !");
}

function bom() {
  const pInformation = document.createElement("p");
  pInformation.textContent = `
    Bonjour, votre userAgent est ${navigator.userAgent},
    vous parlez ${navigator.language},
    vous avez ${navigator.doNotTrack ? "activé" : "désactivé"} doNotTrack,
    votre fenêtre a une taille de ${window.innerWidth}:${window.innerHeight}
    et votre écran ${screen.width}:${screen.height}
    `;
  pInformation.style.display = "none";

  const button = document.createElement("button");
  button.style.display = "block";
  button.textContent = "Informations";
  button.onclick = () => {
    pInformation.style.display = "initial";
    setTimeout(() => pInformation.style.display = "none", 5000);
  };

  document.body.append(button, pInformation);
}

function network() {
  const divUsers = document.createElement("div");
  divUsers.innerHTML = "<p>Aucun utilisateur n'a été récupéré</p>";

  const button = document.createElement("button");
  button.style.display = "block";
  button.textContent = "Utilisateurs";
  button.onclick = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        const count = users.length;
        const list = users.reduce(
            (acc, user) =>  acc += `<li>Nom : ${user.name}. Entreprise : ${user.company.name}</li>`,
            ""
        );
        divUsers.innerHTML = `
                <p>Il y a ${count} utilisateurs</p>
                <ul>
                    ${list}
                </ul>
                `;
      });
  };

  document.body.append(button, divUsers);
}

function localStorageDemo() {
    let input = document.createElement("input")
    let storedValue = localStorage.getItem("userName")
    if (storedValue) {
        input.value = storedValue
        alert("Bienvenue " + storedValue)
    }
    
    input.oninput = () => localStorage.setItem("userName", input.value)

    document.body.append(input)
}