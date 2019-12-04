// globals variables
let dsAlreadyExist = false;
let currentQuestionIndex = 0;
let currentScore = 0;
let currentMaxScore;
// elements html
let panelRight, labelCurrQuestion, labelTotQuestion, labelScore, labelRecord, btnEditer, btnLancer, btnHome, btnSuite,
    helloHome, formWhatUrName;


if (!localStorage.questions || !localStorage.creationDate || !localStorage.modificationDate || !localStorage.name || !localStorage.record) {
    fetchData('https://love-js.glitch.me/quizzie');
} else {
    dsAlreadyExist = true;
}


window.addEventListener('load', function () {
    labelTotQuestion = document.getElementById("labelTotQuestion");

    labelCurrQuestion = document.getElementById("labelCurrQuestion");

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

    if(dsAlreadyExist){
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
}

function getQuestions() {
    return JSON.parse(localStorage.questions);
}

function getRecord() {
    const record = JSON.parse(localStorage.record);
    record.creationDate = new Date(record.creationDate);
    return record;
}

function setNewRecord(newName, newScore){
    if(newName === ''){
        newName = 'Anonymous';
    }
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
    if (!record.holderName.includes(newName) || newName !== '') {
        record.holderName += ', ' + newName;
        localStorage.setItem('record', JSON.stringify(record));
        labelRecord.innerText = 'Record détenu par ' + record.holderName + ' avec ' + record.score + ' point(s)';
    }

}
function updateQuestions(updatedQuestions){
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
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

function editQuiz () {
    helloHome.style.display = "none";
    btnEditer.style.display = "none";
    btnHome.style.display = "block";
    let questions = getQuestions();

    let j = 0;
    for (question of questions) {
        const qElement = document.createElement("div");
        qElement.setAttribute("id", "question"+j);
        qElement.setAttribute("name", "question");
        qElement.innerHTML += `
        <legend><i class="fas fa-times" style="color: red; margin-right: 10px;"></i><span>${question.heading}</span></legend>
    `;
        let i = 0;
        for (proposition of question.propositions) {
            qElement.innerHTML +=`
        <div class="form-check form-check-inline proposition">
            <i class="fas fa-times" style="color: red; margin-right: 5px;" onclick="rmProposition(${j},${i})"></i>
            <input class="form-check-input" type="checkbox" name="question${currentQuestionIndex}" id="proposition${i}" value="${i}">
            <label class="form-check-label" for="proposition${i}">${proposition.content}</label>
        </div>
    `;
            i++;
        }
        qElement.innerHTML += '<input type="text" name="question'+j+'">';
        panelRight.appendChild(qElement);
        j++
    }
    panelRight.innerHTML += '<div><input type="text" name="question'+j+'"></div>';
    // document.querySelectorAll("div[name='question']")
}

function rmProposition(qIndex, pIndex){
    const questions = getQuestions();
    questions[qIndex].propositions.splice(pIndex,1);
    updateQuestions(questions);
    domRemoveAllChilds(panelRight);
    editQuiz();

}
function domRemoveAllChilds(parent){
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}
function lancerQuiz() {
    domRemoveAllChilds(panelRight);
    labelTotQuestion.innerText = '1/' + getQuestions().length + ' question(s)';
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
    if (currentScore < 0) {
        currentScore = 0;
    }
    labelScore.innerText = currentScore + '/' + currentMaxScore + 'point(s)';
}

function showNextQuestion() {
    updateScore(getPropositions(currentQuestionIndex));
    domRemoveAllChilds(panelRight);
    if (currentQuestionIndex === getQuestions().length - 1) {
        terminateQuiz();
    } else {
        currentQuestionIndex++;
        labelTotQuestion.innerText = 1 + currentQuestionIndex + '/' + getQuestions().length + ' question(s)';
        showQuestion(getQuestions()[currentQuestionIndex]);
    }
}

function terminateQuiz() {
    currentRecord = getRecord();
    btnSuite.style.display = 'none';
    btnSuite.innerText = "Suivante";

    if (currentScore >= getRecord().score) {
        formWhatUrName = document.createElement('div');
        formWhatUrName.classList.add('form-group');
        formWhatUrName.innerHTML += `
        <label for="name">Quel est votre nom ?</label>
        <input type="text" class="form-control" name="whatUrName" id="name" placeholder="Votre nom">
        `;
        panelRight.appendChild(formWhatUrName);
        /* ça fonctionne mais je péfère passer le record en tant qu'anonymous si l'input n'est pas rempli
        document.querySelector('[name="whatUrName"]').addEventListener("input", (input) => {
                    if (document.querySelector('[name="whatUrName"]').value === "") {
                        btnHome.style.display = 'none';
                    } else {
                        btnHome.style.display = 'block';
                    }
                }, false);*/


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
    labelTotQuestion.innerText = getQuestions().length + ' question(s)';
    btnSuite.innerText = "Suivante";
    btnLancer.style.display = "block";
    helloHome.style.display = "block";
    btnEditer.style.display = "block";
    labelCurrQuestion.style.display = "none";
    btnHome.style.display = "none";
    btnSuite.style.display = "none";
    labelScore.style.display = "none";
    domRemoveAllChilds(panelRight);
    currentQuestionIndex=0;
    currentScore = 0;

}




