/*

   Protoypes et héritage
   =====================
   
   - l'héritage par prototype permet d'avoir un héritage beaucoup plus dynamique qu'un héritage "classique" avec des classes
   - __proto__, Constructeur.prototype, obj.constructor
   - hasOwnProperty
   - les prototypes natifs : Array.prototype, Object.prototype
   - Object.create
   
*/

let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};
rabbit.__proto__ = animal;

// Ou en plus court
let rabbit = {
  jumps: true,
  __proto__: animal
};

// Contrairement à un héritage par classe, on peut changer dynamiquement les propriétés et la hiérarchie
animal.eats = false;
console.log(rabbit.eats); // false
let human = { talks: true };
rabbit.__proto__ = human;
rabbit.talks; // true

// Lorsqu'on ajoute une propriété elle est directement ajouté sur l'objet, pas sur le prototype

let animal = {
  eats: true,
  walk() {
    console.log("Animal is walking");
  }
};
let rabbit = {
  __proto__: animal
};
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
rabbit.walk();

// Rappel : 'this' pointe toujours sur l'objet placé avant le '.' !
let animal = {
  walk() {
    if (!this.isSleeping) console.log(`I walk`);
  },
  sleep() {
    this.isSleeping = true;
  }
};
let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};
rabbit.sleep();
console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined

// Attention lors des itérations, for..in parcourt les propriétés cachées, alors que Object.keys/.values ne prend que les propriétés sur l'objet
Object.keys(rabbit); // Seulement les props sur `rabbit`
for (let prop in rabbit) console.log(prop); // Props de `rabbit` ET de son protoype `animal`

// hasOwnProperty() permet de filtrer les propriétés
for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);
  if (isOwn) {
    alert(`On rabbit: ${prop}`);
  } else {
    alert(`Inherited: ${prop}`);
  }
}

//---------------------------------------------

// F.prototype
let animal = {
  eats: true
};
function Rabbit(name) {
  //this = {}
  //this.__proto__ = Rabbit.prototype
  //this.constructor = Rabbit
  this.name = name;
  // return this
}
Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
console.log(rabbit.eats); // true

// Par défault le prototype est { constructor: `Constructor`}
// ex: Rabbit.prototype = { constructor: Rabbit }
function Rabbit(name) {
  this.name = name;
  alert(name);
}
let rabbit = new Rabbit("White Rabbit");
let rabbit2 = new rabbit.constructor("Black Rabbit");

//---------------------------------------------

// Prototypes natifs

// On peut rajouter des fonctions à n'importe quel prototype et impacter tous les objets concernés
String.prototype.log = function() {
  console.log(this)
}
"Coucou".log()

//---------------------------------------------

// Modern methods to work with the prototypes
let animal = {
  eats: true
};
// Object.create() : créer un nouvel objet en utilisant pour prototype `animal`
let rabbit = Object.create(animal);
// Object.getPrototypeOf()
Object.getPrototypeOf(rabbit) === animal;
// Object.setPrototypeOf()
Object.setPrototypeOf(rabbit, {});
// équivalent à
rabbit.__proto__

//---------------------------------------------

// `super.prop` peut être utilisé pour accéder aux propriétés/méthodes du prototype, lors des définitions de méthodes
let parent = { name: 'parent' }
let child = {
  __proto__: parent,
  name: 'child',
  get parentName() { return super.name },
  get childName() { return this.name }

}
child.name // 'child'
child.childName // 'child'
child.parentName // 'parent'
