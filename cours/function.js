/*

  Les fonctions
  =============
  
  - rest parameter '...' et spread operator '...'
  - les closures
  - var :  pourquoi c'est naze (hoisting, son lien avec window)
  - l'objet global : window dans le nav
  - les fonctions sont des objets et les NFE : Named Function Expression,
  - scheduling avec setInterval et setTimeout
  - les décorateurs
  - les getters/setters sur les objets
  
*/

// Rappels

// Paramètres par défaut
showMessage('Jojo'); // Rien ne nous oblige à fournir tous les paramètres
function showMessage(from, text="Coucou !") { // On met un paramètre par défaut
    alert(from + ': ' + text);
}
showMessage('Jojo'); 

// Arrow functions
let sum = (a, b) => a + b;  // Le `return` et les {} sont implicites !
// Équivalent à
let sum = function(a, b) {
  return a + b;
};
sum(1,3) // 4

// 1 seul argument
let double = n => n * 2;// Si un seul argument, on peut oublier les ()
double(6) // 12

// 0 argument
let sayHi = () => alert("Hello!");
sayHi();

//---------------------------------------------

function sum(a, b) {
    return a + b;
  }
  
// Une fonction peut être appelée avec autant d'arguments que voulu
alert( sum(1, 2, 3, 4, 5) );

// les rest parameters permet de les stocker dans un tableau
function sumAll(...args) {
    let sum = 0;
    for (let arg of args) sum += arg;
    return sum;
  }
alert( sumAll(1) ); // 1
alert( sumAll(1, 2, 3) ); // 6

function computeFullName(firstName, lastName, ...features) {
    return `${firstName} ${lastName} with ${features.length} features`
}
computeFullName("Jojo", "Dupont", "red hair", "angry", 333)

// avant, on utilisait `arguments`
function showName() {
    alert( arguments.length );
    alert( arguments[0] );
    alert( arguments[1] );
  }
showName("Julius", "Caesar");

// Le spread operator permet aussi d'éclater les tableaux
let arr = [3, 5, 1];
// Pour les passer à une fonction
alert( Math.max(...arr) )


// Pour merger deux tableaux
let arr2 = [8,2,3]
let mergedArr = [...arr, ...arr2, 1, 2]

// Marche aussi avec les strings
let stringArr = [..."coucou"]


//---------------------------------------------

// Closures, lexical environment : simplement un fonction qui "capture" les variables qui l'entourent

let name = "John";
function sayHi() {
  alert("Hi, " + name);
}
name = "Pete";
sayHi();  // Qu'affiche ce code ?

function makeWorker() {
  let name = "Pete";
  return function() {
    alert(name);
  };
}
let name = "John";
let work = makeWorker();
work();   // Qu'affiche ce code


//---------------------------------------------

// var vs const/let : pourquoi var c'est outdated

// Pas de block scope
if (true) {
  var test = true; 
}
console.log(test); 

// Les declaration `var` sont "hoistées" (hoisting)
function sayHi() {
  phrase = "Hello";
  alert(phrase);
  var phrase;
}
sayHi();

// dans le scope global une déclaration `var` ajoute une propriété à `window
var toto = "n'importenawak"
window.toto == toto // true

//---------------------------------------------

// global object

alert("Hello");
// <=>
window.alert("Hello");

// Attention en mode non-strict : this == window dans le scope global

//---------------------------------------------

// Function object & Named Function Expression (NFE)

// name & length property
function coucou(name, age) {}
console.log(coucou.name)
console.log(coucou.length)

// On peut rajouter/supprimer des propriétés
function coucouCount() {
  console.log("Coucou")
  coucouCount.counter++
}
coucouCount.counter = 0

// NFE
let sayHello = function sayHelloInternal(name) {
  if (name) {
    alert(`Hello, ${name}`);
  } else {
    sayHelloInternal("Guest");
  }
};
let sayHi = sayHello
sayHello(); // Marche, normal
sayHello = null
sayHi(); // Marche aussi !

//---------------------------------------------

// new Function

// Utile pour créer des fonctions dynamiquement
let sum = new Function('a', 'b', 'return a + b');

//---------------------------------------------

// Scheduling

// setTimeout
function salute(salutation, name) {
  alert( salutation + ', ' + name );
}
setTimeout(salute, 1000, "Yo", "Alphonse");

// annuler un timeout avec clearTimeout
let timer = setTimeout(salute, 1000, "Yo", "Alphonse");
clearTimeout(timer)

// setInterval
let timerIdTick = setInterval(() => console.log('tick'), 1000);
let timerIdTack = setInterval(() => console.log('tack'), 2000);
// annuler un interval avec clearInterval
setTimeout(() => {
  clearInterval(timerIdTack)
  clearInterval(timerIdTick)
}, 5000)

// Zero delay avec setTimeout
setTimeout(() => console.log("World"));
console.log("Hello"); // Hello World

//---------------------------------------------

// Decorator: une fonction qui en modifie une autre

function slow(x) {
  alert(`Called with ${x}`);
  return x;
}
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }
    let result = func(x);  // otherwise call func
    cache.set(x, result);  // and cache (remember) the result
    return result;
  };
}
slow = cachingDecorator(slow);
alert( slow(1) ); // slow(1) is cached
alert( "Again: " + slow(1) ); // the same

//---------------------------------------------

// Modifier la valeur de `this` lors de l'appel des fonctions

// .call() pour changer `this`
function sayHi() {
  alert(this.name);
}
let user = { name: "John" };
let admin = { name: "Admin" };
sayHi.call( user ); // this = John
sayHi.call( admin )

// .call() peut aussi passer des paramètres
function say(phrase) {
  alert(this.name + ': ' + phrase);
}
let user = { name: "John" };
say.call( user, "Hello" )

// .apply() similaire à .call() mais en avec un tableau : "Apply for array and Call for comma."
// func.call(this, ...arguments) <=> func.apply(this, arguments)
say.apply(user, ["Hello"])

// Call forwarding
let wrapper = function(...args) {
  return original.call(this, ...args); 
};
let wrappedSayHi = wrapper(sayHi)
wrappedSayHi("Toto")

// Method borrowing
function hash(...args) {
  alert([].join.call(args));
}
hash(1, 2);

//---------------------------------------------

// Function binding : forcer la valeur du `this`

// With a wrapper
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);

// Même chose mais avec .bind()
setTimeout(user.sayHi.bind(user), 1000);

// bind() avec des arguments
function multiply(a, b) {
  return a * b;
}
let double = multiply.bind(null, 2);
double(3) // 6

//---------------------------------------------

// Getters/Setters

// Lors de la création de l'objet
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

// Ou, une fois l'objet créé avec Object.defineProperty
let user = {
  name: "John",
  surname: "Smith"
};
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});
