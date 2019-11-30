/*

  Débugger
  ========
  
  Débugger et intéragir avec la console
  
*/

function debugTest() { 
  // Logger dans la console (marche sous le nagiateur et node)
  console.log('Information')
  console.warn('Avertissement')
  console.error('Erreur')
  console.table([{name: "toto", age: 18}, {name: "lala", age: 27}]) // Pratique pour les tableaux de données
  
  console.group("Groupé")
  console.log("couou")
  console.log("yo")
  console.groupEnd("Groupé")
  
  // Ces 3 fonctions marchent uniquement dans le navigateur, pas sur node
  alert('Coucou')
  let name = prompt('Name ?')
  let ok = confirm('Ok ?')

  // Mettre un breakpoint
  debugger;
}
