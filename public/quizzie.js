// globals variables
let currentQuestionIndex = 0;
let currentScore = 0;
let currentMaxScore;
// elements html
let panelRight, labelCurrQuestion, labelTotQuestion, labelScore, labelRecord, btnEditer, btnLancer, btnHome, btnSuite, helloHome;

window.addEventListener('storage', function () {
    console.log('change');
    if (labelTotQuestion) {
        labelTotQuestion.innerText = getQuestions().length + 'question(s)';


    }
    labelRecord.innerText = 'Record détenu par '+ getRecord().holderName +' avec '+ getRecord().score +' point(s)';

});

if(!localStorage.questions || !localStorage.creationDate || !localStorage.modificationDate || !localStorage.name || !localStorage.record) {
    console.log('Récupération du quiz en appelant le webservice');
    fetchData('https://love-js.glitch.me/quizzie');
}


window.addEventListener('load', function () {
    labelTotQuestion = document.getElementById("labelTotQuestion");
    labelTotQuestion.innerText = getQuestions().length + ' question(s)';
    labelCurrQuestion = document.getElementById("labelCurrQuestion");
    // labelCurrQuestion.style.display = "none";

    labelScore = document.getElementById("labelScore");
    labelScore.style.display = "none";
    labelRecord = document.getElementById("labelRecord");
    labelRecord.innerText = 'Record détenu par '+ getRecord().holderName +' avec '+ getRecord().score +' point(s)';
    btnEditer = document.getElementById("btnEditer");
    btnLancer = document.getElementById("btnLancer");
    btnHome = document.getElementById("btnHome");
    btnHome.style.display = "none";
    btnSuite = document.getElementById("btnSuite");
    btnSuite.style.display = "none";
    helloHome = document.getElementById("helloHome");
    panelRight = document.getElementById("panelRight");
    currentMaxScore = getMaxScore();
});

async function fetchData(url){
    async function setLocalStorage(myJson) {
        localStorage.setItem('creationDate', myJson.creationDate);
        localStorage.setItem('modificationDate', myJson.modificationDate);
        localStorage.setItem('name', myJson.name);
        localStorage.setItem('questions', JSON.stringify(myJson.questions));
        localStorage.setItem('record', JSON.stringify(myJson.record));
    }
    await (async function () {
        const response = await fetch(url);
        const myJson = await response.json();
        await setLocalStorage(myJson);
    })();
}



function getQuestions() {
    return JSON.parse(localStorage.questions);
}
function getRecord () {
    return JSON.parse(localStorage.record);
}
function getMaxScore(){
    // une proposition true = 1 point
    let questions = getQuestions();
    let propositionsTrue = [];
    questions.forEach(question => propositionsTrue = propositionsTrue.concat(question.propositions.filter(proposition => proposition.correct )));
    return propositionsTrue.length;
}
function getPropositions(index){
    return getQuestions()[index].propositions;
}

function lancerQuiz(){
    labelScore.innerText = currentScore + '/' + currentMaxScore +'point(s)';

    let questions = getQuestions();
    currentQuestionIndex = 0;
    helloHome.style.display = "none";
    btnLancer.style.display = "none";
    btnEditer.style.display = "none";
    btnSuite.style.display = "block";
    btnHome.style.display = "block";
    labelCurrQuestion.style.display = "block";
    labelScore.style.display = "block";
    showQuestion(questions[currentQuestionIndex]);
}
function showQuestion(question) {
    if (currentQuestionIndex === getQuestions().length - 1) {
        btnSuite.innerText = "Terminer";
    }
    const para = document.createElement("form");
    para.innerHTML += `
        <legend>${question.heading}</legend>
    `;
    let i = 0;
    for (proposition of question.propositions) {
        para.innerHTML += `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" name="question${currentQuestionIndex}" id="proposition${i}" value="${i}">
            <label class="form-check-label" for="proposition${i}">${proposition.content}</label>
        </div>
    `;
        i++;
    }
    panelRight.appendChild(para);
}

function updateScore(propositions) {
    let form = document.querySelector('form');
    let checkboxes = form.querySelectorAll('input[name="question'+currentQuestionIndex+'"]');
    console.log(checkboxes);
    for (checkbox of checkboxes) {
        if(checkbox.checked && propositions[checkbox.value].correct){
            currentScore++;
        } else if (checkbox.checked && !propositions[checkbox.value].correct) {
            currentScore--;
        }
    }
    let selectedValue = checkboxes.value;
    console.log(selectedValue);
    labelScore.innerText = currentScore + '/' + currentMaxScore +'point(s)';
}

function showNextQuestion(){
    updateScore(getPropositions(currentQuestionIndex));
    currentScore = 0;
    panelRight.innerHTML = "";
    if (currentQuestionIndex === getQuestions().length - 1) {
        terminateQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion(getQuestions()[currentQuestionIndex]);
    }
}
function terminateQuiz() {
    btnSuite.style.display = 'none';
    btnSuite.innerText = "Suivante";

    currentQuestionIndex = 0;
    const ulose = document.createElement("p");
    ulose.appendChild(document.createTextNode("Dommage, le record est toujours détenu par X avec X point(s)"));
    panelRight.appendChild(ulose);

    const success = document.createElement("div");
    success.innerHTML += `
    <p>Bravo ! Vous avez brisé le record !</p>
    <div class="form-group">
        <label for="name">Quel est votre nom ?</label>
        <input type="text" class="form-control" id="name" placeholder="Votre nom">
    </div>
        `;
    panelRight.appendChild(success);
}


