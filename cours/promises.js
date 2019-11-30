/*

  Les promises
  ============
  
  Avant : les callbacks
  Puis : les promises
  Maintenant : async/await (toujours basés sur les promises)
  
  - les callbacks, comment on fait, pourquoi c'est pas top
  - les promises, comment les créer, les chainer, et catcher les erreurs
  - les méthodes de Promise pour créer des promises (.resolve, .reject) et pour en traiter plusieurs (.all, .race, allSettled.)
  - async/await : des mots clés pour utiliser les promises différement
*/

// Callbacks

let askUserCallback = function(success, error) {
  setTimeout(() => {
    if (confirm("Error?")) error(new Error("User error"));
    else success("done!");
  }, 1000);
};

askUserCallback(
  result => console.log("succès !", result),
  error => console.error("erreur !", error)
);

//---------------------------------------------

// Promise

let askUserPromise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    if (confirm("Error?")) reject(new Error("User error"));
    else resolve("done!");
  }, 1000);
});

askUserPromise.then(
  result => console.log("succès !", result),
  error => console.error("erreur !", error)
);

// on peut "s'inscrire" autant de fois que l'on veut à une promise
askUserPromise.then(result => console.log("succès 1 !", result));
askUserPromise.then(result => console.log("succès 2 !", result));

// avec .catch() pour gérer les erreurs
askUserPromise
  .then(result => console.log("succès !", result))
  .catch(error => console.error("erreur !", error));

// .finally()
askUserPromise
  .then(result => console.log("succès !", result))
  .catch(error => console.error("erreur !", error))
  .finally(() => console.info("L'utilisateur a fait son choix"));

//---------------------------------------------

// Promise chaining

// Si une promise retourne une valeur alors elle sera passée dans le prochain resolve
new Promise(function(resolve, reject) {
  setTimeout(() => resolve("first"), 1000);
})
  .then(function(result) {
    return result + " second";
  })
  .then(function(result) {
    return result + " third";
  })
  .then(function(result) {
    return result + " fourth";
  });

// Une promise peut aussi retourner une promise directement, plutôt qu'une valeur
new Promise(function(resolve, reject) {
  setTimeout(() => resolve("first"), 1000);
})
  .then(function(result) {
    return new Promise(resolve => {
      setTimeout(() => resolve(result + " second"), 2000);
    });
  })
  .then(function(result) {
    return result + " third";
  })
  .then(function(result) {
    return result + " fourth";
  });

// Exemple avec `fetch` une fonction du navigateur qui permet de faire des appels réseaux. Elle renvoie des promises
fetch("https://reqres.in/api/users")
  .then(response => response.json())
  .then(users => console.log("Reçu !", users))
  .catch(error => console.error("Erreur !", error))
  .then(() => fetch("https://api.github.com/users/yyx990803"))
  .then(response => response.json())
  .then(coder => console.log("VueJS author", coder));

//---------------------------------------------

// Error handling

new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(console.log);
// Même chose que
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(console.log);

// Comme avec le try/catch, on peut rejeter des erreurs
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function(error) {
    // (*)
    if (error instanceof URIError) {
      // On traite l'erreur
    } else {
      console.log("Can't handle such error");
      throw error;
    }
  })
  .then(function() {
    /* ce code ne sera pas executé */
  })
  .catch(error => {
    console.error(`The unknown error has occurred: ${error}`);
  });

// Si on n'attrape pas les erreur alors une erreur 'unhandledrejection' sera affichée dans la console
new Promise(function() {
  cetteFunctionNexistePas(); // Error here (no such function)
}).then(() => {
  // Ne sera pas executé
}); // pas de catch !

//---------------------------------------------

// Les méthodes de Promises

// Promise.all() : attend que toutes les promises se terminent et une seule échoue, il arrête tout
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
]).then(console.log).catch(e => console.log("Une promise a pété", e));

// Promise.allSettled() : similaire à Promise.all, excepté qu'il ne s'arrête pas si une échoue. (attention assez récent)
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url"
];
Promise.allSettled(urls.map(url => fetch(url))).then(results => {
  results.forEach((result, index) => {
    if (result.status == "fulfilled") console.log(`${urls[index]}: ${result.value.status}`);
    if (result.status == "rejected") console.log(`${urls[index]}: ${result.reason}`);
  });
});

// Promise.race() : la première qui se termine a gagné
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then(console.log); 

// Promise.resolve() & Promise.reject() : forme raccourcie pour "wrapper" une n'importe quelle valeur dans une promise
Promise.resolve(8).then(i => console.log(i))
// <=> équivalent à 
new Promise(resolve => resolve(8))

Promise.reject(new Error("BAD")).catch(e => console.log(e))
// <=> équivalent à 
new Promise((_, reject) => reject(new Error("BAD")))

//---------------------------------------------

// async/await
// permettent d'écrire du code utilisant des promises encore plus simplement

// une function async sera "wrappée" dans une promise
async function f() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
    let result = await promise;  // await attendra que la promise se résolve
    console.log(result)
    //<=>
    promise.then(console.log) /*<=>*/ promise.then(r => console.log(r))
  }
f();

// Pour gérer les erreurs avec async/await on utilise le traditionnel try..catch
async function f() {
    try {
      let response = await fetch('/no-user-here');
      let user = await response.json();
    } catch(err) {
      console.log(err);
    }
  }
f();

// /!\ on ne peut pas utiliser await en dehors d'une fonction async

// Ne marchera pas
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

// Marchera (car dans fonction async)
(async () => {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
    console.log("Terminé !", user)
})()