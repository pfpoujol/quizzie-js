/*

  Les bases de JavaScript
  =======================
  
*/


// Points virgules

alert('Hello')  // ; ajouté
alert('World')

// ASI

// le ; n'est pas ajouté si des parenthèses ne sont pas fermé
alert(3 +   // pas de ; ajouté
    1
    + 2)

// erreur : le ';'' n'est pas ajouté automatiquement entre les deux lignes
alert("There will be an error")
[1, 2].forEach(alert)


//---------------------------------------------

// Comments

/*
    multi-lines
*/

//---------------------------------------------

"use strict";

//---------------------------------------------


// Variables

let user = 'John', age = 25, message = 'Hello';

var doNotUse = 'ok';    // Périmé

const COLOR_RED = "#F00" // Majuscules 
const birthday = '08.11.2000'

//---------------------------------------------

// Types

// number
let n = 123;
n = 12.345

Infinity;   // 1/0
NaN;    // 'toto'/2

// string
let str = "Coucou";
let str2 = 'Simple ou double';
let phrase = `avec des variables ${str}`; // Template literal

// boolean
true; false
4 > 1;

// null & undefined
null; undefined
let x; // x est undefined
let age = null // on spécifie que age est vide

// typeof
typeof 0 // "number"
typeof Math // "object"
typeof undefined // "undefined"
typeof alert // "function". En réalité function est un object mais typeof nous l'affiche différement (c'est quand même plus pratique)
typeof('yo') // marche aussi mais rarement utilisé

//---------------------------------------------

// Conversion de types

/* 
  Si jamais un opérateur est appelé sur des types différents, alors une conversion implicite est effectué :
    - Pour l'opérateur 'x+y' : si il y a un string, alors l'autre valeur sera convertie en string
    - Pour les autres cas, (autres opérateurs ou '+' sans string) : les valeurs sont convertient en nombre
*/

// string
let bool = true;
String(bool);
"" + bool; // -> str

// number
let str = '8';
str / '4'; // number.
Number("34")
Number("toto") // NaN
+"toto"; // -> number

// On remarque que +a et a+b ne provoque pas la même conversion de type


// boolean
"3" && 85; // 85
Boolean("1"); Boolean ("hello");
!!"hello"; 

//---------------------------------------------

// Opérateurs

let sum = (a = 8) + (b = 7 + 5); // = est un opérateur

10 % 4;
2**2;
++sum; sum++; sum--; // Prefix retourne la nouvelle et postfix retourne l'ancienne
sum += 6;
sum /= 2;

// ,
let a = (1 +2, 3 + 4);  // trés faible priorité
for (a = 1, b = 2, c = a * b; a < 10; a++) {}

//---------------------------------------------

// Comparaisons

a > b; a < b;
a >= b; a <= b;
a == b;
a != b;

'2' > 1; // Conversion de '2' en number

0 == false; // true
'' == false; // true
0 === false; // strict equality: false
null == undefined // true -> seule exception, pas de conversion en number, null et undefined sont égaux.
null === undefined // false

//---------------------------------------------

// Intéraction avec l'utilisateur (dans le navigateur web)

alert("Coucou !");
let name = prompt("What's your name ?", "anonymous") // ici, "anonymous" est la valeur par défaut à utiliser
let isSure = confirm("Are you sure ?") // renvoie un booléen

//---------------------------------------------

// Les conditions

// if
if (year == 2019) alert('Nouvelle année !'); // Pas besoin d'accolade pour une instruction
if (age > 18) {
    alert('Majeur !');
}

// if else
let year = prompt('En quelle année sommes nous ?');
if (year == 2019) {
  alert( 'Vrai' );
} else {
  alert( 'Faux' ); 
}

// if else if else
let year = +prompt('En quelle année sommes nous ?');
if (year < 2019) {
  alert( 'Plus haut' );
} else if (year < 2019) {
  alert( 'Plus bas' );
} else {
  alert( 'Vrai !' ); 
}

// Le ternaire
let age = prompt('How old are you?', '');

let category = age > 18 ? 'adult' : 'minor';
// Est équivalent à 
let category;
if (age > 18) {
  category = 'adult';
} else {
  category = 'minor';
}

// Le ternaire peut être chainé
let age = prompt('age?');
let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';


//---------------------------------------------

// Les opérateurs logiques

// ||
let hour = 12;
let isWeekend = true;
if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is the weekend
}

// Court-circuit avec ||
let currentUser = null;
let defaultUser = "John";
let name = currentUser || defaultUser || "unnamed";
alert( name ) // "John"

if(currentUser) console.log("yo")
// Équivalent à 
currentUser || console.log("yo")


// &&
let hour = 12;
let minute = 30;
if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}

// Ils ne retournes pas que des booléens
2 && 3; // Retourne 3
2 || 3. // Retourne 2

// !
!true; // false
!!"coucou"; // true

//---------------------------------------------

// Les boucles

let i = 0;
while (i < 3) { 
  alert( i );
  i++;
}

let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);

for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
    alert(i);
}

// Chaque partie du for est optionelle
for (;;) {
    // Créé une boucle infinie. À reproduire uniquement sous la supervision d'un adulte
}

// break
let sum = 0;
while (true) {
  let value = +prompt("Enter a number", ''); // '+' convertit automatiquement le résultat en nombre
  if (!value) break; 
  sum += value;
}
alert( 'Sum: ' + sum );

// continue

for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) continue; // si la condition est vraie on passe directement à l'itération suivante
    alert(i); // 1, then 3, 5, 7, 9
}

// les labels
outer: for (let i = 0; i < 3; i++) {  // On donne un `label` à la boucle
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i},${j})`, "");
    if (!input) break outer; // Si le string est vide on quitte la boule `outer`
  }
}
alert("Done!");

//---------------------------------------------

// Le switch

let a = 2 + 2;
switch (a) {
  case 3:
    alert( 'Trop petit' );
    break;
  case 4:
    alert( 'Correct' );
    break;
  case 5:
    alert( 'Trop grand' );
    break;
  default:
    alert( "Je ne comprends pas" );
}

// Regrouper plusieurs cas
switch (a) {
  case 3:
    alert( 'Trop petit' );
    break;
  case 4:
  case 5:
    alert( 'Correct' );
    break;
  case 6:
    alert( 'Trop grand' );
    break;
  default:
    alert( "Je ne comprends pas" );
}

//---------------------------------------------

// Les fonctions

function name(parameters) {
    //...body...
  }

function showMessage() {    // Déclaration de la fonction
    alert("Hello world !");
}
showMessage()   // Appel de la fonction

//  variables locales et non locales
let userName = 'John';  // non locales
function showMessage() {
  let message = 'Hello, ' + userName; // locale
  alert(message);
}
showMessage(); // Hello, John
alert(message)  // Erreur car message est une varialbe locale à showMessage

// Shadowing
let userName = 'John';  // non locales
function showMessage() {
  let userName = 'Alphonse';
  let message = 'Hello, ' + userName; // Alphonse
  alert(message);
}
username; 'John'

// Paramètres
function showMessage(from, text) { // paramètres : from, text
    alert(from + ': ' + text);
}
showMessage('Jojo', 'Hello!'); // Jojo: Hello!
showMessage('Jojo', "What's up?");
showMessage('Jojo');
showMessage('Jojo', 1 , 2);



// Paramètres par défaut
showMessage('Jojo'); // Rien ne nous oblige à fournir tous les paramètres
function showMessage(from, text="Coucou !") { // On met un paramètre par défaut
    alert(from + ': ' + text);
}
showMessage('Jojo'); // Jojo: Coucou !

// Retourner une valeur avec `return`
function sum(a, b) {
  return a + b;
}
let result = sum(1, 2);

// return peut être utilisé avant la fin de la fonction. Il n'est pas obligé de retourner une valeur (il retournera alors `undefined`)
function showMovie(age) {
  if (!checkAge(age)) {
    console.log("Bad age")
    return;
  }
  alert("Showing you the movie");
  
  
  if (checkAge(age)) {
    alert("Showing you the movie");
  } else {
    console.log("Bad age")
  }
}

// Faire attention à garder ses fonctions courtes et bien nommées. Cela peut remplacer des commentaires
// 1ère version = grosse fonction
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) break nextPrime;
    }
    alert(i); // a prime
  }
}
// VS
// 2ème version = deux petites fonctions
function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;
    alert(i); // a prime
  }
}
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}

//---------------------------------------------

// Les fonctions sont des valeurs & les arrow fonctions

function sayHi() {
  alert("Hello");
}
// Peut aussi être écrit avec une `Function expression`
let sayHi = function() {
  alert("Hello");
};  // On met un ';'
// Dans les deux cas, on l'appelle
sayHi()
// On peut copier la fonction
let direBonjour = sayHi // On copie la fonction, pas de ()
direBonjour()

// callback functions
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}
function showOk() {
  alert("You agreed.");
}
function showCancel() {
  alert("You canceled the execution.");
}
ask("Do you agree?", showOk, showCancel);   // On passe en paramètre les deux fonctions

// function declaration vs function expression
sayHi("John"); // On peut appeler la fonction avant sa déclaration
function sayHi(name) {  // function declaration
  alert( `Hello, ${name}` );
}
// VS
sayHi("John"); // Erreur !
let sayHi = function(name) {  // function expression
  alert( `Hello, ${name}` );
};

// Arrow functions
// syntax: let func = (arg1, arg2, ...argN) => expression
/* Et: let func = function(arg1, arg2, ...argN) {
  return expression;
};*/
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