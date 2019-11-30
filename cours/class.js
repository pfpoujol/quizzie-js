/* 

  Classes
  =======
  
  - une simple surcouche sur les constructeurs et l'héritage par prototype (cf. prototype.js)
  - class, extends, propriétés, méthodes, getter/setter, propriétés statiques, propriétés computed, héritage
  - l'opérateur `instanceof`
  - les mixins avec Object.assign
  
*/

class MyClass {
  prop = "value"; // property
  ["computed" + "property"] = "value2"; // computed property

  constructor(prop1) {
    // constructor
    this.prop2 = "value3"; // Ne pas oublier d'utiliser `this` !
  }

  method(param) {} // method

  get something() {} // getter method
  set something(newValue) {} // setter method

  ["computed method name"]() {} // method with computed name (symbol here)
}

//---------------------------------------------

// Héritage
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
  stop() {
    super.stop();
    this.hide();
  }
}

let animal = new Animal("My animal");
let rabbit = new Rabbit("White Rabbit");
rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide();

// Overrider le constructeur
class Dog extends Animal {
  constructor(name, ownerName) {
    super(name); // Ne pas oublier d'appeler `super()`
    this.ownerName = ownerName;
  }
}

//---------------------------------------------

// static

class MyClass {
  static property = "value"; // Very recent, not supported by all browsers.
  static method() {
    console.log("My static method");
  }
}

//---------------------------------------------

// instanceof : vérifie si l'objet a été instancé par un constructeur (en comparant constructeur.protoype avec les chaines de protoypes de l'obj (__proto__))
class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
console.log(rabbit instanceof Rabbit);

//---------------------------------------------

// Mixin : permet de modeler des objets en "copiant" plusieurs objets en un seul 
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  }
};
class User {
  constructor(name) {
    this.name = name;
  }
}
// Copier les propriétés de sayHiMixin dans User.prototype
Object.assign(User.prototype, sayHiMixin); 
new User("Dude").sayHi();
