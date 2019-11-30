/*

  Les modules
  ===========
  
  Par défaut les modules :
  - sont `defer` par défaut
  - ont leur propres scopes
  - sont en mode "strict"
  - sont exécutés une seule fois, même si importés à plusieurs endroits
  
*/

// Dans le fichier sayHi.js
export function sayHi(user) {
    alert(`Hello, ${user}!`);
}

//---------------------------------------------

// Dans le fichier main.js
import {sayHi} from './sayHi.js';
alert(sayHi); // function...
sayHi('John'); // Hello, John!

//---------------------------------------------

// Dans le fichier index.html
/*
    <script type="module" src="main.js"></script>
*/