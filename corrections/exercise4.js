/*
    exercise4.js
*/

"use strict";

let sum = a => b => a + b;
// Rappel, c'est équivalent à
function sum(a) {
  return function(b) {
    return a+b
  }
}

function makeArmy() {
    let shooters = [];
    let i = 0;
    while (i < 10) {
        let j = i;
        let shooter = () => alert(j);
        shooters.push(shooter);
        i++;
    }
    return shooters;
}

function salute(name) {
  salute.names.push(name);
  console.log("Hi " + name);
}
salute.names = [];

function printNum(from, to) {
  let current = from;
  let timerId = setInterval(function() {
    console.log(current);
    if (current == to) clearInterval(timerId);
    current++;
  }, 1000);
}

let delay = (functionToDelay, delay) => {
  return (...args) => setTimeout(functionToDelay, delay, ...args);
};

function demo() {
  let army = makeArmy();
  console.log("Calling the army !")
  army[3]()

  salute("Jojo")
  salute("Alphonse")
  console.log("salutedNames", salute.names)

  printNum(2,7)

  let delayedFunc = delay(name => alert("Yo " + name), 3000)
  delayedFunc("jojo")
}

demo()