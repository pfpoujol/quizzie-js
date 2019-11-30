/*
    exercise3.js
*/

"use strict";


arrayMethods()
keysValues()
decompose()
json()

function arrayMethods() {
    let john = { name: "John", age: 7 };
    let pete = { name: "Pete", age: 29 };
    let mary = { name: "Mary", age: 20 };
    let josephine = { name: "Joséphine", age: 12 };
    let users = [john, pete, mary, josephine]

    let getNames = users => users.map(user => user.name)
    let computeAverageAge = users => users.reduce((total,user) => total += user.age, 0) / users.length
    let filterChildren = users => users.filter(user => user.age >= 18)

    console.log("getNames", getNames(users))
    console.log("average", computeAverageAge(users))
    console.log("filter", filterChildren(users))
}

function keysValues() {
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250
};
  let sumSalaries = salaries => Object.values(salaries).reduce((total, salary) => total += salary)

  let user = {
    name: 'John',
    age: 30
  };
  let count = obj => Object.keys(obj).length

  console.log("sum", sumSalaries(salaries))
  console.log("count", count(user))
}

function decompose() {
    let user = {
        name: "John",
        years: 30,
          wife : "Jessica",
          numberOfChildren: 4
      };
      
      let {name, years: age, isAdmin = false, ...otherProperties} = user

      console.group("decompose")
      console.log(name)
      console.log(age)
      console.log(isAdmin)
      console.log(otherProperties)
      console.groupEnd("decompose")
}

function json() {
    let user = {
        name: "John Smith",
        age: 35
      };
    let string = JSON.stringify(user)
    let userClone = JSON.parse(string)

    console.group("json")
    console.log(string)
    console.log(userClone)
    console.groupEnd("json")
}
