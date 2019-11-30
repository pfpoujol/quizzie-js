/*
    exercise1.js
*/

"use strict";

// a) if-else

function ifElse() {
  let value = +prompt("Entrer un nombre");
  if (isNaN(value)) {
    alert("Ceci n'est pas un nombre, échec");
    return;
  }

  if (value > 0) {
    alert(1);
  } else if (value < 0) {
    alert(-1);
  } else {
    alert(0);
  }
}

// b) ternaire

function ternary(a,b) {
    return a + b < 4 ? 'Insuffisant' : "Pas mal"
}

// Opérateurs

function login() {
  let userName = prompt("Login ?");
  if (userName == "Admin") {
    let pass = prompt("Mot de passe ?");
    if (pass == "BigBoss") {
      alert("Bienvenue maître");
    } else if (pass) {
      alert("Mauvais mot de passe");
    } else {
      alert("Annulé");
    }
  } else if (userName) {
    alert("Je ne te connais pas !");
  } else {
    alert("Annulé");
  }
}

// a) Loops & switch

function loopsAndSwitch1() {
    let num;
    do {
    num = prompt("Enter a number greater than 100?", 0);
    } while (num && num <= 100 || isNaN(+num));
}

// b) Loops & switch - réecriture

function loopsAndSwitch2() {
  switch (+prompt('a ?')) {
    case 0:
      alert(0);
      break;

    case 1:
      alert(1);
      break;

    case 2:
    case 3:
      alert("2,3");
      break;
  }
}

// Récursion

function isEven(n) {
  if (n == 0) return true;
  else if (n == 1) return false;
  else if (n < 0) return isEven(-n);
  else return isEven(n - 2);
}

// Paramètres par défaut

let salute = ({name} = {name: "anonymous"}) => {
  console.log(`Bonjour ${name}`);
}