"use strict"
// ### Création objet
//
// Écrire une fonction qui créé un objet, lui rajoute deux propriété,
// en modifie une, supprime l'autre et retourne l'objet.

// console.log(creatObj());
function creatObj(){
    let obj = {
        prop1 : 'foo',
        prop2 : 'bar'
    };
    delete obj.prop1;
    obj.prop2 = 'foo';
    return obj;
}

// ### Parcourir les propriétés d'un objet
//
// Écrire une fonction `isEmpty(obj)`qui renvoie `true` si l'objet n'a pas de propriété.

function isEmpty(obj){
    return Object.keys(obj).length === 0;
}

// Écrire une fonction qui calcule le salaire total à payer en fonction de cet objet
//
let salaries = {
    Jojo: 100,
    Anne: 160,
    Alfred: 130
};
// console.log(salaireTotal(salaries));

function salaireTotal(obj){
    let total = 0;
    for (let key in obj) {
        total += +obj[key];
    }
    return total;
}

// Écrire une fonction doubleNumbers qui multiplie par 2 les valeurs numérique d'un objet

// avant l'appel
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

//doubleNumbers(menu);
//console.log(menu);


// après l'appel
// menu = {
//     width: 400,
//     height: 600,
//     title: "My menu"
// };

function doubleNumbers(obj){
    for (let key in obj){
        if(!isNaN(obj[key])) obj[key] *= 2;
    }
}

// ### Méthodes et `this`
//
// Créer un objet `calculator` avec trois méthodes :
//
// - `read(a,b)` prend 2 valeurs en entrée et les conserve en mémoire
// - `sum()` ajoute les 2 valeurs de `read` et retourne le résultat
// - `multiply()` multiplie les 2 valeurs de `read` et retourne le résultat

let calculator = {
    read: function (a,b) {
        this.a = a;
        this.b = b;
    },
    sum: function () {
        return this.a + this.b;
    },
    multiply: function () {
        return this.a * this.b;
    }
};

// On a un objet ladder qui représente une échelle sur laquelle on peut monter
// Refactorez le code pour que l'on puisse appeler l'objet ainsi
// ladder.up().up().down().showStep(); // 1

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;//<-- refacored
    },
    down() {
        this.step--;
        return this;//<-- refacored
    },
    showStep: function() { // shows the current step
        alert( this.step );
    }
};

// ### Constructeur et `new`
//
// Créer un constructeur `Calculator` qui permet de créer l'objet `calculator`
// de l'exercice précédent avec des propriétés par défaut pour `a` et `b`
//
// Ensuite créer un second constructeur `CalculatorAdvanced` qui fonctionne avec et sans `new`


function Calculator() {
    this.read = function (a = 0, b = 0) {
        this.a = a;
        this.b = b;
    };
    this.sum = function () {
        return this.a + this.b;
    };
    this.multiply = function () {
        return this.a * this.b;
    }
}

