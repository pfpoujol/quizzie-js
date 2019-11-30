// - modifier le contenu du titre `h1`
// - ajouter lui un attribut `id`
let titre = document.getElementById("titre");
titre.innerHTML = "Bon titre";

// - changer son style (couleur, taille)
titre.style.color = "red";
titre.style.fontSize = "90px";

// - ajouter un paragraphe `<p>` juste après le titre `h1`.
let paragraphe = document.createElement("p");
paragraphe.appendChild(document.createTextNode(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
    ' dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex' +
    ' ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat' +
    ' nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit' +
    ' anim id est laborum.'
    ));
document.querySelector("body").appendChild(paragraphe);

// - Ajouter un évenement `onclick` à votre nouveau paragraphe.
// Lorsque l'on clique sur le paragraphe cela doit afficher une popup
paragraphe.onclick = function () {
    alert("coucou")
};

// - Créer un bouton "Informations"
let button = document.createElement("button");
button.appendChild(document.createTextNode("Informations"));
document.querySelector("body").appendChild(button);
// - Lorsque l'utilisateur clique dessus, afficher dans un `<p>`,
// en dessous du bouton
// - son `userAgent` (cf. `navigator`)
// - sa langue
// - est ce qu'il a activé `doNotTrack`
// - la taille de sa fenêtre (`window`)
// - la taille de son écran (`screen`)
button.onclick = function () {

}

// - Ajouter un timer : l'utilisateur clique sur votre bouton "Information", cela affiche les informations du navigateur, et au bout de 5 secondes cela les efface. (rappel : `setTimeout())`
