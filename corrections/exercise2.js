/*
    exercise2.js
*/

"use strict";

// Création d'un objet

function creationObjet() {
  let obj = {};
  obj.name = "toto";
  obj.age = 18;
  delete obj.name;
  obj.age = 20;
  return obj;
}

//---------------------------------------------

//  a) Parcourir les propriétés d'un objet

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
// Alternative
function isEmpty2(obj) {
  return !Object.keys(obj).length;
}

//  b) Parcourir les propriétés d'un objet
function doubleNumbers(obj) {
  for (let key in obj) {
    if (typeof obj[key] == "number") {
      obj[key] *= 2;
    }
  }
}


//---------------------------------------------

// Méthode et `this`

function createCalculator() {
  // On note qu'il est pas nécessaire de créer les propriétés
  return {
    sum() {
      return this.a + this.b;
    },
    multiply() {
      return this.a * this.b;
    },
    read(a, b) {
      this.a = +a;
      this.b = +b;
    }
  };
}

// Ladder
function ladder() {
  let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() {
      // shows the current step
      alert(this.step);
    }
  };
}

//---------------------------------------------

// Constructeur et `new`

function Calculator(a, b) {
  this.a = a;
  this.b = b;
  this.sum = function() {
    return this.a + this.b;
  };
  this.multiply = function() {
    return this.a * this.b;
  };
  this.read = function(a, b) {
    this.a = +a;
    this.b = +b;
  };
}

function CalculatorAdvanced(a,b) {
  if (!new.target) { // Est ce que ça été appelé avec new ?
    return new CalculatorAdvanced(a,b); // Si non, je l'appelle pour toi
  }
  this.a = a;
  this.b = b;
  this.sum = function() {
    return this.a + this.b;
  };
  this.multiply = function() {
    return this.a * this.b;
  };
  this.read = function(a, b) {
    this.a = +a;
    this.b = +b;
  };
}

// Avec 'instanceof' ça ne marche pas (enfin, presque pas)
function Person(name) {
  if (!(this instanceof Person)) {
    return new Person(name);
  }
  this.name = name; 
}
let person1 = new Person("Nicholas"); // Ça marche
let person2 =  Person("Jojo"); // Ça marche
let notAPerson = Person.call(person, "Michael"); // Échec, rien n'est retourné

// Attention, si vous retournez un obj dans votre constructeur c'est lui qui sera pris en compte et pas le this
function PersonObj() {
  this.name = "toto"
  return {name: "alphonse"}
}
let person3 = new PersonObj() // {name: "alphonse"}

//---------------------------------------------

// Les fonctions sont des valeurs
// Cette technique s'appelle le currying

let sum = a => b => a + b 
// ou
function sum2(a,b) {
  return function(c) {
    return a + b +c
  }
}