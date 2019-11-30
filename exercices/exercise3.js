"use strict";

// Méthodes des tableaux

let john = { name: "John", age: 7 };
let pete = { name: "Pete", age: 18 };
let mary = { name: "Mary", age: 20 };
let josephine = { name: "Joséphine", age: 12 };

let users = [ john, pete, mary, josephine ];

console.log(getNames(users));
console.log(computeAverageAge(users));
console.log(filterChildren(users));
// 1 : Écrire la fonction getNames qui permet d'extraire un tableau de nom à partir d'un tableau
// d'utilisateurs
 // ["John", "Pete", "Mary"]
function getNames(arr) {
    return arr.map(obj => obj.name);
}

// 2 : Écrire la fonction computeAverageAge qui permet de calculer l'age moyen des utilisateurs
// à partir d'un tableau d'utilisateurs
function computeAverageAge(arr) {
    return arr.map(arr => arr.age).reduce((sum, current) => sum + current) / arr.length;
}

// 3 : Écrire la fonction filterChildren qui permet de virer les utilisateurs qui ne sont pas majeurs
//  [ pete, mary ]
function filterChildren(arr) {
    return arr.filter(user => user.age >= 18)
}

// .keys(), .values(), .entries()

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

let user = {
    name: 'John',
    age: 30
};

console.log(sumSalaries(salaries));
console.log(count(user));

// 4 : Écrire une fonction sumSalaries() qui permet de trouver la somme des salaires
function sumSalaries(obj) {
    return Object.values(salaries).reduce((sum, current) => sum + current);
}

// 5 : Écrire une fonction count() qui permet de compter le nombre de propriétés d'un objet
function count(obj){

    return Object.entries(obj);
}
