/*

  Le BOM : browser object model
  =============================
  
*/

/* 
  Tout se passe par `window`, dedans vous avez plein de fonctions/propriétés intéressantes pour interagir avec le navigateur.
  Il y a notamment : 
  - screen qui répresente l'écran
  - navigator qui représente le navigateur
  - history qui représente l'historique
  - etc.
*/

// ouvrir,fermer des onglets
window.open()
window.close()
window.moveTo()

// obtenir la taille de la fenêtre ou de l'écran
window.innerHeight
window.innerWidth
window.screen.height
window.screen.width
window.screen.colorDepth

// accèder à la barre d'adresse, la lire ou la changer
window.location
window.location.href    // returns the href (URL) of the current page
window.location.hostname    // returns the domain name of the web host
window.location.pathname    // returns the path and filename of the current page
window.location.protocol    // returns the web protocol used (http: or https:)


// accéder à l'historique
window.history
window.history.back()   // Aller une page en arrière
window.history.forward()   // Aller une page en avant
// Plus d'infos sur ce qu'il est possible de faire avec l'historique sur https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API

// accéder à des informations sur le navigateur utilisé
navigator
navigator.appName
navigator.appCodeName
navigator.platform

// lire/modifier les cookies (pour le site sur lequel l'utilisateur est connecté)
document.cookie = "username=Jojo; password=noSecure"; 
// Les cookies c'est "old-school"

/* 
  Et plein d'autres : 
    - canvas pour dessiner
    - storage API pour stocker plus que des simples cookies
    - vibration API pour faire vibrer le téléphone
    - etc.
    
  cf.  https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs
*/