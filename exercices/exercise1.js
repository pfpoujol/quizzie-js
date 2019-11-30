//a();
//alert(b());
//operateurs();
//aLoop();
//bLoop();
alert(isEven(prompt("Donnez un nombre pair ou impair svp")));
/*
a) En utilisant `if..else`, écrire un code qui récupére un nombre avec `prompt` et ensuite affiche dans un  `alert`:

- `1`, si la valeur est supérieure à zéro.
- `-1`, si inférieure à zéro
- `0`, si égale à zéro.*/
function a() {
  let nbr = prompt("Ecrire un nombre svp");
  let retour;
  while (isNaN(nbr)) {
    nbr = prompt("Ecrire un nombre svp");
  }
  if (nbr > 0) retour = 1;
  else if (nbr < 0) retour = -1;
  else retour = 0;
  alert(retour);
}

/*  b) Réecrire le code suivant avec une ternaire (ternary)
   let result;

    if (a + b < 4) {
       result = 'Insuffisant';
    } else {
      result = 'Pas mal';
    }
* */
function b() {
  let result;
  let a = prompt("Value de a");
  let b = prompt("valeur de b");
  if (isNaN(a) || isNaN(b)) return "il faut donner des nombres";
  else return a + b < 4 ? "Insuffisant" : "Pas mal";
}

/*### Opérateurs

Écrire un code qui demande un login avec `prompt`:

- Si l'utilisateur entre `"Admin"`, alors passer à l'étape suivante (demander avec `prompt` un mot de passe).
- Si il n'entre rien, afficher `"Annulé"`
- Si il rentre autre chose qu'`"Admin"`, afficher `"Je ne te connais pas !"`

Si il est "Admin", on lui demande son mot de passe :

    - Si il est égal à `"BigBoss"` alors afficher `"Bienvenue maître"`
- Sinon afficher `"Mauvais mot de passe"`
*/

function operateurs() {
  let login = prompt("Votre login svp");
  if (login == "Admin") {
    let password = prompt("Votre mot de passe svp");
    if (password == "BigBoss") {
      alert("Bienvenue maître");
    } else {
      alert("Mauvais mot de passe");
    }
  } else if (login == "" || login == undefined) {
    alert("Annulé");
  } else {
    alert("Je ne te connais pas !");
  }
}

/*
### Loops & Switch

a) Écrire une boucle qui demande à l'utilisateur de rentrer un nombre plus grand que 100.
Tant qu'il n'entre pas un nombre correct, lui en redemander un nouveau.
*/
function aLoop() {
  let nbr;
  while (nbr < 100 || isNaN(nbr)) {
    nbr = prompt("Entrez un nombre plus grand que 100 svp");
  }
  alert("Merci !");
}

/*
b) Réecrire ce code avec un `switch`
let a = +prompt('a?', '');

if (a == 0) {
    alert( 0 );
}
if (a == 1) {
    alert( 1 );
}

if (a == 2 || a == 3) {
    alert( '2,3' );
}
*/
function bLoop() {
  let a = +prompt("a?", "");
  switch (a) {
    case 0: {
      alert(0);
      break;
    }
    case 1: {
      alert(1);
      break;
    }
    case 2:
    case 3: {
      alert("2,3");
      break;
    }
  }
}

/*Écrire une fonction `isEven(num)`  qui renvoie true si le nombre fourni est pair.
Écrivez cette fonction en utilisant la récusivité, pas avec l'opérateur `%`.*/

function isEven(num) {
  if (!isNaN(num)) {
    if (num % 2) {
      return false;
    } else {
      return true;
    }
  }
}
