/*

  Network
  =======
  
  Comment réaliser des appels réseaux
  
*/

// On utilise la fonction fetch()

fetch("https://reqres.in/api/users")
  .then(response => response.json())
  .then(users => console.log("I've got my users !", users))
  .catch(error => console.error("Erreur !", error));

/* 
  fetch() renvoie un objet réponse. 
  Il faut ensuite appeler dessus `.json()`ou `.text()` en fonction de ce qu'on reçoit
*/

//----------------------------

// Avant on utilisait XMLHttpRequest, mais ça c'était avant. Comme `var`, plus de raisons de l'utiliser à part pour certains cas précis.

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://reqres.in/api/users");
xhr.responseType = "json";  // Pour forcer la converstion text->json
xhr.onload = () => console.log("I've got my users !", xhr.response);
xhr.onerror = error => console.log("Erreur !", error)
xhr.send();