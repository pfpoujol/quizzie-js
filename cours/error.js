/*

  Gestion des erreurs
  ===================
  
*/

try {
  console.log("try");
  if (confirm("Make an error?")) BAD_CODE();
} catch (e) {
  console.log("catch");
} finally {
  console.log("finally");
}

//---------------------------------------------

// How to throw

let name = prompt("Name?");
if (name !== "Jojo") throw new SyntaxError("You typed the wrong name !");

// On peut throw tout ce qu'on veut mais il est mieux de throw des Error
if (name === "Devil") throw "je suis un string";

// how to catch specific errors

try {
  console.log("try");
  if (confirm("Make an error?")) BAD_CODE();
} catch (e) {
  if (e.name == "SyntaxError") console.log("SyntaxError");
  else if (e instanceof SyntaxError)
    console.log("Check with instanceof, better");
  else throw e; // rethrow the error
}

//---------------------------------------------

// Global catch

window.onerror = function(message, url, line, col, error) {
  console.log(`${message}\n At ${line}:${col} of ${url}`);
};

//---------------------------------------------

// Extend Error

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("This is a ValidationError");
  }
  if (err instanceof Error) {
    console.log("This is also an Error");
  }
  console.log(err.message); // Whoops!
  console.log(err.name); // ValidationError
  console.log(err.stack);
}
