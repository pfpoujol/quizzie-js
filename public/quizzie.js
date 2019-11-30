window.addEventListener('load', function () {
    let nbQuestions = document.getElementById("nbQuestions");
    nbQuestions.style.display = "none";
    let score = document.getElementById("score");
    score.style.display = "none";
    let record = document.getElementById("record");
    let btnEditer = document.getElementById("btnEditer");
    let btnLancer = document.getElementById("btnLancer");
    let btnHome = document.getElementById("btnHome");
    btnHome.style.display = "none";
    let btnSuite = document.getElementById("btnSuite");
    btnSuite.style.display = "none";
    let helloHome = document.getElementById("helloHome");
});



if(localStorage.length < 5) {
    console.log('Récupération du quiz en appelant le webservice');
/*    fetch("https://love-js.glitch.me/quizzie")
        .then(response => localStorage.setItem('creationDate',JSON.stringify(response.json())))
        .then(creationDate => creationDate)
        .then(modificationDate => console.log(modificationDate))
        .then(name => console.log(name))
        .then(questions => console.log(questions))
        .then(record => console.log(record))
        .catch(error => console.error("Erreur !", error));*/
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://love-js.glitch.me/quizzie');
    xhr.responseType = 'json';
    xhr.onload = function(e) {
        if (this.status === 200) {
            localStorage.setItem('creationDate', this.response.creationDate);
            localStorage.setItem('modificationDate', this.response.modificationDate);
            localStorage.setItem('name', this.response.name);
            localStorage.setItem('questions', JSON.stringify(this.response.questions));
            localStorage.setItem('record', JSON.stringify(this.response.record));
            // penser à convertir à nouveau les objets stringuifiés par la suite
            // https://stackoverflow.com/a/2010948
        }
    };
    xhr.send();
}

function jouer(){
    console.log('jouer');
    helloHome.style.display = "none";
}