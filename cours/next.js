/*

    ES.next
    =======

    ES.next représente les features en cours d'élaboration, à venir pour la prochaine version de JS
    Pour voir si elles sont supportées par votre navigateur vous pouvez vous référez à https://kangax.github.io/compat-table/esnext/
    Si elles ne sont pas supportées, vous pouvez utiliser Babel, qui convertira le code pour vous : https://babeljs.io/

*/

// Sur les classes
class A {
    field = "déclaration à la Java"
    #private = "déclaration d'un champ privé"

    static staticField = "Champ de classe"
    static #privateStaticField = "version privée"
}

//---------------------------------------------

// Optional chaining avec '?' (À la Swift ❤️)
let toto = { jojo: { lolo: { popo: "fin !" } } }
toto?.jojo?.lolo?.popo // Si une des propriétés est `undefined`, pas d'erreur

// Nullish coalescing avec '??' (À la Swift ❤️)
let name
let current = name ?? "Default" // Retourne une valeur par défaut si la variables est undefined/null

//---------------------------------------------

// Numeric separators
let budget = 1_000_000_000_000;

//---------------------------------------------

// 'String.replaceAll'
const queryString = 'q=query+string+parameters'.replaceAll('+', ' ');

//---------------------------------------------

// Promise.any (pour compléter .all, .allSettled, .race)
Promise.any(promises)
    .then(() => 'Une des promises est fulfilled')
    .catch(()  => 'Toutes les promises sont rejected')
/*
    Récapitulatif

    Promise.allSettled 	does not short-circuit
    Promise.all 	    short-circuits when an input value is rejected
    Promise.race    	short-circuits when an input value is settled
    Promise.any 	    short-circuits when an input value is fulfilled
*/