// globals variables
let firstInitialisation= false;
let currentQuestionIndex = 0;
let currentScore = 0;
let currentMaxScore;
// elements html
let panelRight, labelCurrQuestion, labelTotQuestion, labelScore, labelRecord, btnEditer, btnLancer, btnHome, btnSuite,
    helloHome, formWhatUrName;


if (!localStorage.questions || !localStorage.creationDate || !localStorage.modificationDate || !localStorage.name || !localStorage.record) {
    fetchData('https://love-js.glitch.me/quizzie');
}


window.addEventListener('load', function () {
    labelTotQuestion = document.getElementById("labelTotQuestion");

    labelCurrQuestion = document.getElementById("labelCurrQuestion");
    // labelCurrQuestion.style.display = "none";

    labelScore = document.getElementById("labelScore");
    labelScore.style.display = "none";
    labelRecord = document.getElementById("labelRecord");

    btnEditer = document.getElementById("btnEditer");
    btnLancer = document.getElementById("btnLancer");
    btnHome = document.getElementById("btnHome");
    btnHome.style.display = "none";
    btnSuite = document.getElementById("btnSuite");
    btnSuite.style.display = "none";
    helloHome = document.getElementById("helloHome");
    panelRight = document.getElementById("panelRight");

    if(!firstInitialisation){
        labelTotQuestion.innerText = getQuestions().length + ' question(s)';
        labelRecord.innerText = 'Record détenu par ' + getRecord().holderName + ' avec ' + getRecord().score + ' point(s)';
        currentMaxScore = getMaxScore();
    }

});

async function fetchData(url) {
    async function setLocalStorage(myJson) {
        localStorage.setItem('creationDate', myJson.creationDate);
        localStorage.setItem('modificationDate', myJson.modificationDate);
        localStorage.setItem('name', myJson.name);
        localStorage.setItem('questions', JSON.stringify(myJson.questions));
        localStorage.setItem('record', JSON.stringify(myJson.record));
        labelTotQuestion.innerText = myJson.questions.length + ' question(s)';
        labelRecord.innerText = 'Record détenu par ' + myJson.record.holderName + ' avec ' + myJson.record.score + ' point(s)';
        currentMaxScore = getMaxScore();
    }

    await (async function () {
        const response = await fetch(url);
        const myJson = await response.json();
        await setLocalStorage(myJson);
    })();

    firstInitialisation=true;
}

function getQuestions() {
    return JSON.parse(localStorage.questions);
}

function getRecord() {
    return JSON.parse(localStorage.record);
}

function setNewRecord(newName, newScore){
    const oldRecord = getRecord();
    const newRecord = {
        holderName: newName,
        score: newScore,
        creationDate: new Date()
    };
    if (newName !== getRecord().holderName) {
        localStorage.setItem('record', JSON.stringify(newRecord));
        labelRecord.innerText = 'Record détenu par ' + newName + ' avec ' + newScore + ' point(s)';
    }

}

function setExAequoRecord(newName) {
    const record = getRecord();
    if (!record.holderName.includes(newName)) {
        record.holderName += ', ' + newName;
    }

}

function getMaxScore() {
    // une proposition true = 1 point
    let questions = getQuestions();
    let propositionsTrue = [];
    questions.forEach(question => propositionsTrue = propositionsTrue.concat(question.propositions.filter(proposition => proposition.correct)));
    return propositionsTrue.length;
}

function getPropositions(index) {
    return getQuestions()[index].propositions;
}

function lancerQuiz() {
    labelScore.innerText = currentScore + '/' + currentMaxScore + 'point(s)';

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
    let checkboxes = form.querySelectorAll('input[name="question' + currentQuestionIndex + '"]');
    for (checkbox of checkboxes) {
        if (checkbox.checked && propositions[checkbox.value].correct) {
            currentScore++;
        } else if (checkbox.checked && !propositions[checkbox.value].correct) {
            currentScore--;
        }
    }
    let selectedValue = checkboxes.value;
    labelScore.innerText = currentScore + '/' + currentMaxScore + 'point(s)';
}

function showNextQuestion() {
    updateScore(getPropositions(currentQuestionIndex));
    panelRight.innerHTML = "";
    if (currentQuestionIndex === getQuestions().length - 1) {
        terminateQuiz();
    } else {
        currentQuestionIndex++;
        showQuestion(getQuestions()[currentQuestionIndex]);
    }
}

function terminateQuiz() {
    currentRecord = getRecord();
    btnSuite.style.display = 'none';
    btnSuite.innerText = "Suivante";

    if (currentScore >= getRecord().score) {
        btnHome.style.display = 'none';
        formWhatUrName = document.createElement('div');
        formWhatUrName.classList.add('form-group');
        formWhatUrName.innerHTML += `
        <label for="name">Quel est votre nom ?</label>
        <input type="text" class="form-control" name="whatUrName" id="name" placeholder="Votre nom">
        `;
        panelRight.appendChild(formWhatUrName);
        document.querySelector('[name="whatUrName"]').addEventListener("input", (input) => {
            if (document.querySelector('[name="whatUrName"]').value === "") {
                btnHome.style.display = 'none';
            } else {
                btnHome.style.display = 'block';
            }
        }, false);


        if (currentScore > getRecord().score) {
            const success = document.createElement("div");
            success.innerHTML += '<p class="h2" >Bravo ! Vous avez brisé le record !</p>';
            formWhatUrName.before(success);

        } else if (currentScore === getRecord().score) {
            const draw = document.createElement("p");
            draw.classList.add('h2');
            draw.appendChild(document.createTextNode('Bravo ! Vous détenez le record ex aequo avec '+ currentRecord.holderName +' !'));
            formWhatUrName.before(draw);
        }
    } else {
        const ulose = document.createElement("p");
        ulose.classList.add('h2');
        ulose.appendChild(document.createTextNode("Dommage, le record est toujours détenu par "+ currentRecord.holderName +" avec "+ currentRecord.score +" point(s)"));
        panelRight.appendChild(ulose);
    }
}
function goBackHome() {
    if (formWhatUrName){
        const name = document.querySelector('[name="whatUrName"]').value;
        if (currentScore === getRecord().score) {
            setExAequoRecord(name);
        } else {
            setNewRecord(name, currentScore);
        }

        formWhatUrName = undefined;
    } else {


    }
    btnLancer.style.display = "block";
    helloHome.style.display = "block";
    btnHome.style.display = "none";
    btnEditer.style.display = "block";
    btnSuite.style.display = "none";
    labelScore.style.display = "none";
    panelRight.innerHTML = "";
    currentQuestionIndex=0;
    currentScore = 0;

}




