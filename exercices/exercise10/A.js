"use strict";
let user = {};
// Créez un module A qui exporte une fonction coucou(name) et un objet user
export function coucou(name){
    alert(`Coucou, ${name} !`);
}


// Importez ce module dans une page html.

// Créez un module B. Depuis ce module créez un boutton <button> et ajoutez le à la page.
// Lorsque l'utilisateur clique sur le boutton, votre fonction coucou(user.name)
// du module A est appelée.
