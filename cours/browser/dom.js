/* 

  Le DOM : document object model
  ==============================
  
  Le DOM c'est toutes les méthodes/propriétés de l'objet JS `document`.
  Elles vous permettent d'intéragir avec la page HTML affichée
  
*/


/*
  Trouver des noeuds/éléments : chacune de ces fonctions retourne des objets JS de type Element
*/

// Les principales
document.querySelectorAll(query) // Tous les éléments dans un tableau
document.querySelector(query) // Le premier éléments qui correspond

/* 
  `query` représente les sélecteurs CSS. Toutes la liste est sur https://www.w3schools.com/cssref/css_selectors.asp
  Vous pouvez les tester sur https://www.w3schools.com/cssref/trysel.asp
*/

// Les autres (plus anciens, querySelector/querySelectorAll les remplacent largement)
document.getElementById(id)   // Find an element by element id
document.getElementsByTagName(name)   // Find elements by tag name
document.getElementsByClassName(name) // Find elements by class name

//------------------------------------

/* 
  Modifier des  éléments
*/

let element = document.querySelector("h1")

element.innerHTML   // Change the inner HTML of an element
element.innerText   // similaire à textContent
element.textContent   // Change the text content of an element
element.classList   // Add or remove class to an element
element.setAttribute(attribute, value) // Change the attribute value of an HTML element <p id="oucou""> -> "id" est un attribut
element.attribute   // get/set the attribute value of an HTML element 
element.style.property  // Change the style of an HTML element
getComputedStyle(element) // Récupérer le style *complet* d'un élèment

//------------------------------------

/* 
  Naviguer entre les noeuds
*/

element.nodeType    // Peut être de type element (Node.ELEMENT_NODE, ex: <p>, <h1>, etc.) ou de type texte (Node.TEXT_NODE, ex: le texte dans vos nodes)
element.parentNode
element.childNodes
element.closest("h1")  // Trouve le parent le plus proche correspondant
element.firstChild
element.nextSibling

//------------------------------------


/*
  Créer/ajouter/supprimer éléments
*/

// Les méthodes actuelles

// Pour créer
document.createElement("h1")	// Create an HTML element
document.createTextNode("coucou")	// Create an text element
element.cloneNode(deep)  // cloner un élement si deep=true, ses descendants seront clonés aussi

// Pour ajouter/enlever (toutes ces méthodes peuvent prendre un ou plusieurs éléments en paramètres)
document.body.append(child) // Insérer le child à la fin du body
parent.append(child) // insérer à la fin
parent.prepend(child)  // insérer au début
sista.before(brother) // insérer à coté
sista.after(brother)
oldOne.replaceWith(newOne) // remplacer
element.remove() // supprimer


// Les méthodes à l'ancienne (vous pouvez vous en passer)
element.appendChild(element)	// Add an HTML element
element.insertBefore(node, nextSibling)
element.removeChild(element)	// Remove an HTML element
element.replaceChild(newChild, oldChild)	// Replace an HTML element
document.write(html)  // Écrire du HTML directement dans le document

//------------------------------------

/* 
  S'inscrire aux évènements de la page
*/

document.querySelector("#myP").onclick = function(){ /*code*/ }	// Adding event handler code to an onclick event
element.addEventListener(event, e => {}) // attaches an event handler to an element without overwriting existing event handlers.
element.removeEventListener(event, e => {}) // Sa sista

/* 
Exemples d'événements :
- focus, blur, change
- submit
- click, contextmenu, mouseover/mouseout, mousedown/mouseup, mousemove 
- load, beforeunload
- keypress, keydown, keyup

Il y en a pour tous les goûts, vous pouvez consulter la liste complète sur https://developer.mozilla.org/en-US/docs/Web/Events
*/