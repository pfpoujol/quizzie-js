/*

  Les objets
  ==========
  
  - Créer un objet avec des méthodes et des propriétés
  - Différence entre obj.prop et obj[vari]
  - ⚠️ Référence vs valeurs
  - Le comportement de `this`, dépend de l'appel à la méthode : obj.method() -> this == obj
  
*/

// Créer
let user = {};  // la syntaxe littérale, la plus utilisé
let user = new Object(); // La syntaxe avec un constructeur, moins utilisée

let user = {     
  name: "John",  
  age: 30        
};

// Lire
user.name; user.age
user["name"]
let prop = "name"
user[prop]
user.prop

// Modifier, ajouter propriété
user.isNice = true  // modification de la propriété si elle existe ou création si elle n'existe pas
user.unexistentProperty // "undefined" => si la propriété n'exsite pas, elle vaudra undefined

// Supprimer
delete user.age

// Computed properties
let fruit = "apple";
let bag = {
  [fruit]: 5, // le nom de la propriété est la valeur de la variable `fruit`
};
// Équivalent à
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};
bag[fruit] = 5;

// Les raccourcis (shorthand)
let age = 8
let name = "toto"
let user = {age, name}
// <=>
let user = {age: age, name: name}

// Vérifier l'existence d'une propriété
user.name === undefined;
// ou
"name" in user;

// Itérer sur les propriétés d'un objet
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};
for (let key in user) {
  alert(key) // "name",...
  alert(user[key]) // "John",...
}

//----------------------------


// Référence vs valeur

let message = "Coucou";
let phrase = message; // la valeur de message est copiée dans phrase
message = "Yo";
phrase; // Qu'affiche ce code ? -> "Coucou"
phrase === message; // false

let user = {name: "Jojo"};
let admin = user; // la référence de user est copiée dans admin
user.name = "Alphonse";
admin.name; // Qu'affiche ce code ? -> Alphonse
user === admin; // true

// const avec les objets
const user = {name: "jojo"};
user.name = "Toto"; // Marche, malgé que ça soit une const
user = {age: 18}; // Erreur, la référence doit être constante

// Comment cloner des objets ?

// À l'ancienne
let user = {name: "toto", age: 18};
let clone = {};
for (let key in user) clone[key] = user[key]

// Avec Object.assign
let user = {name: "toto", age: 18};
let clone = Object.assign({}, user, {sexe: "m"});

// Comment merger des objets ?
let defautlUser = {name: "anonymous", canEdit: false};
let jojoUser = Object.assign({}, defautlUser, {name: "Jojo"});



//---------------------------------------------

// Les méthodes et `this`

let user = {
  name: "jojo",
  age: 30,
  sayHello: function() { alert("coucou"); }
}

// En version raccourcie
let user = {
  name: "jojo",
  age: 30,
  sayHello() { alert("coucou"); }
}

// this
let user = {
  name: "jojo",
  age: 30,
  sayHello() { 
    alert("coucou, je m'appelle " + this.name);
  }
}

// la valeur de this dépend du contexte dans lequel this est appelé
// this pointe sur l'objet placé avant le `.`
let user = { name: "John" };
let admin = { name: "Admin" };
function sayName() {
  alert( this.name );
}
user.f = sayName; // this == user
admin.f = sayName; // this == admin
admin.f()
sayName() // this == undefined, donc this.name léve une erreur




// Les arrow functions n'ont pas de `this`
let user = {
  name: "jojo",
  age: 30,
  sayHello: () => alert("coucou, je m'appelle " + this.name)  
};
user.sayHello() // coucou, je m'appelle undefined

// Mais elles peuvent `capturer` le `this` qui les entoure
let user = {
  name: "jojo",
  age: 30,
  sayHello() {
    let arrowHello = () => alert("coucou, je m'appelle " + this.name);
    arrowHello();
  }
};
user.sayHello() // coucou, je m'appelle jojo



//---------------------------------------------

// Constructeurs et `new`

function User(name) {
  // let this = {}; (fait implicitement lorsque appelé par `new`)
  this.name = name;
  this.isAdmin = false;
  // return this (fait implicitement lorsque appelé par `new`)
}

let user = new User("Jack");
// Même resultat que
let user = {
  name: "Jack",
  isAdmin: false
};

// Avec des méthodes
function User(name) {
  this.name = name;
  this.isAdmin = false;
  this.sayYo = function() { alert("Yo, je suis " + this.name); }
}
let user = new User("toto")
user = User("toto") // undefined

function User(name) {
  let user = {}
  user.name = name;
  user.isAdmin = false;
  user.sayYo = function() { alert("Yo, je suis " + this.name); }
  return user
}
let user = new User("toto")
user = User("toto")