/*

  Les objets built-in
  ===================
  
  - Number, String
  - Math, Date, JSON
  - Array et ses méthodes : forEach, map, filter, reduce, etc.
  - Object et ses méthodes : values, entries, keys, freeze, etc.
  - Décomposition et le rest operator '...'
  
*/


// Les nombres

// Différentes bases arithmétiques
let billion = 1e9;
let ms = 1e-6;
let int = 255;
let hex = 0xFF;
let binary = 0b11111111;
let octal = 0o377;
int == hex && hex == binary && binary == octal; // tous valent 255

// toString(base)
let int = 255;
int.toString(); // "255"
int.toString(16); // "ff" (hexadécimal)

// Arrondir et tronquer
Math.floor, Math.ceil, Math.round, Math.trunc, Math.PI;

// toFixed
10.12345.toFixed(2) // "10.12"

// L'infinité des nombres possibles
1e500 == Infinity; // true. Pourquoi ?
0.1 + 0.2 == 0.3; // false. Pourquoi ?
// Dans le même style
9999999999999999 == 10000000000000000 // true

// Tester une valeur
isNaN(NaN);
isFinite(Infinity);

// Extraire un nombre d'une string
parseInt('100px'); // 100
parseFloat('12.5em'); // 12.5

// Autres fonctions Mathématiques
Math.random, Math.max, Math.pow


//---------------------------------------------

// Les strings

let single = 'single-quoted';
let double = "double-quoted";
let backticks = `backticks`;

let guestList = `Guests:
 * John
 * Pete
 * Mary
`;


// Gérer l'unicode et les retours à la ligne
"\u{1F60D}"; // 😍
"Bonjour\nJosé";
// équivalent à
`Bonjour
José`;

// les strings ont des similarités avec les tableaux
"coucou".length;
let hello =  "coucou";
hello[1]; 
for (let s of hello) alert(s); // parcourir la string

// Modifier la casse
hello.toUpperCase(); hello.toLowerCase()

// Rechercher
hello.indexOf("u"); hello.lastIndexOf("u")
hello.includes("ou"); hello.startsWith("cou"); hello.endsWith("ou")

// Récupérer un sous-string
hello.slice(1,3) // 'ou'

// Et d'autres : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype
hello.repeat(3); hello.trim(); hello.padStart(5)

//---------------------------------------------

// Les tableaux et leurs méthodes. Obj : limiter les boucles `for` au maximum

let arr = new Array();
let fruits = ["Apple", "Orange", "Plum"];

fruits[1]; // "Orange"
fruits.length

// Remplacer
fruits[2] = 'Pear'; 

// Ajouter
fruits[3] = 'Lemon';
fruits.push("Lemon");

// On peut mélanger les types
let mixed = [1, "couocu", {name: "toto", age: 18}, () => console.log("Yo !")];
mixed[3](); // "Yo !"

// Ajouter/Supprimer à la fin d'un tableau
let fruits = ["Apple", "Orange", "Pear"];
fruits.pop();
fruits.push("pumpkin");

// Ajouter/Supprimer au début d'un tableau
let fruits = ["Apple", "Orange", "Pear"];
fruits.shit();
fruits.unshift("pumpkin");

// Itérer sur un tableau
// à l'ancienne (on évite ! Moche et source d'erreurs)
for (let i = 0; i < fruits.length; i++) {
  alert( fruits[i] );
}
// à la cool avec for..of
for (let fruit of fruits) {
  alert( fruit );
}

// à la mega-cool avec forEach 
fruits.forEach(item => alert(item));

// Tableaux à plusieurs dimensions
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Autres méthodes

// Supprimer un ou plusieurs éléments d'un tableau
let fruits = ["Apple", "Orange", "Pear"];
delete fruits[1]; // Supprime l'élément MAIS conserve l'index -> pas top
// préférer
let arr = ["I", "study", "JavaScript"];
arr.splice(1, 1); // Supprime 1 élement à partir de l'index 1 -> top
arr; // ["I", "JavaScript"]

// Remplacer
let arr = ["I", "study", "JavaScript", "right", "now"];
arr.splice(0, 3, "Let's", "dance");
arr // ["Let's", "dance", "right", "now"]

// Ajouter
let arr = ["I", "study", "JavaScript"];
arr.splice(2, 0, "complex", "language");
arr; // ["I", "study", "complex", "language", "JavaScript"]

// Extraire une copie
let arr = ["t", "e", "s", "t"];
arr.slice(1, 3); // ["e", "s"]

// Concatener
let arr = [1, 2];
arr.concat([3, 4]); // 1,2,3,4

// Chercher dans un tableau
let arr = [1, 0, false];
arr.indexOf(0); // 1
arr.includes(1); // true

// Recherche plus poussée avec find
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];
let user = users.find(item => item.id == 2);
user.name; // John

// Filtrer
let users = [
  {id: 1, name: "John", sexe: "M"},
  {id: 2, name: "Pete", sexe: "M"},
  {id: 3, name: "Mary", sexe: "F"}
];
let someUsers = users.filter(user => user.sexe === "M" );
someUsers.length; // 2

// Transformer un tableau

// map
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
lengths; // [5,7,6]

// Trier avec `sort`
let arr = [ 1, 2, 15 ];
arr.sort(); // Modifie le tableau directement
arr;  // [1, 15, 2] /!\ le tri est effectué sur des strings
// Avec une fonction
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
let arr = [ 1, 2, 15 ];
arr.sort(compareNumeric);
arr;  // [1, 2, 15] Le tri est bon
// En version courte
arr.sort( (a, b) => a - b );

// Inverser avec `reverse`
let arr = [1, 2, 3, 4, 5];
arr.reverse();
arr; // 5,4,3,2,1

// string -> array: `split`
let names = 'Bilbo, Gandalf, Nazgul';
let arr = names.split(', ');
arr; // [ 'Bilbo', 'Gandalf', 'Nazgul' ]

// Array -> String : `join`
let arr = [ 'Bilbo', 'Gandalf', 'Nazgul' ]
let names = arr.join(';')
names; // "Bilbo;Gandalf;Nazgul"

// Transformer un tableau en une seule valeur : reduce
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((a, b) =>  sum + current);
result; // 15

// Tester si il s'agit d'un tableau : isArray
typeof []; // object -> pas top
Array.isArray([]); // true -> top

// Autres fonctions des tableaux en bonus
arr.some(); arr.every(); arr.fill()

//---------------------------------------------

/* Les méthodes d'Object (le constructeur pour les objets) 
  .keys, .values, .entries/fromEntries
*/

// On Object
let user = {
  name: "John",
  age: 30
};
for (let value of Object.values(user)) {
  alert(value); 
}

// On Array
let arr = [ 'Bilbo', 'Gandalf', 'Nazgul' ]
for (let value of arr.values()) {
  alert(value); 
}

// Object.fromEntries pour transformer des objets
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};
let doublePrices = Object.fromEntries(
  Object
    .entries(prices)
    .map(([key, value]) => [key, value * 2])
);
doublePrices.meat; // 8

//---------------------------------------------

// Décomposition : extraire des valeurs des tableaux et objets

// Array destructuring
let arr = ["Ilya", "Kantor"]
let [firstName, surname] = arr;
//<=>
let firstName = arr[0]; let surname = arr[1]
firstName; // Ilya

// The rest operator: '...' 
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
name1; // "Julius"
rest[0]; // "Consul"

// Valeurs par défaut
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
name; // "Julius"
surname; // "Anonymous"

// Object destructuring
let options = {
  title: "Menu",
  width: 100,
  height: 200
};
let {title, width, height} = options;

// Object destructuring en changeant le nom des propriétés et avec des valeurs par défaut
let options = {
  width: 100,
  height: 200
};
let {width: w, height: h, title = "unknown"} = options;

// Extraire uniquement ce qui nous intéresse
let options = {
  title: "Menu",
  width: 100,
  height: 200
};
let { title } = options
// <=>
let title = options.title

// Le rest operator: '...' 
let options = {
  title: "Menu",
  width: 100,
  height: 200
};
let { title, ...useless } = options
useless.height // 200

// On peut faire des décomposition plus complexes
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

let {
  size: { 
    width,
    height
  },
  items: [item1, item2], 
  title = "Menu" 
} = options;
width; // 100
size; // undefined


//---------------------------------------------

// JSON : transformer un objet JS en string et vice-versa

let jsonAsString = `
{
  "squadName": "Super hero squad",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
    },
    {
      "name": "Fire Woman",
      "age": 18,
      "secretIdentity": "Selena Gomez",
    },
  ]
} `;

// Transformer un text contenant du JSON en object JavaScript
let superHeroes = JSON.parse(jsonAsString);
let moleculeMan = superHeroes.members[0];
moleculeMan.fired = true; // On peut modifier notre object JS

// Le transformer en JSON
moleculeManAsString = JSON.stringify(moleculeMan);
/*
      {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "fired": true
  },
*/
