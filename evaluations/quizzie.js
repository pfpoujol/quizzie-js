/******************************
 * Projet terminé le 06/12/19 *
 ******************************/

// globals variables
let dsAlreadyExist = false;
let currentQuestionIndex = 0;
let currentScore = 0;
let currentMaxScore;
// elements html
let panelRight, labelTotQuestion, labelScore, labelRecord, btnEditer, btnLancer, btnHome, btnSuite,
    helloHome, formWhatUrName;


if (!localStorage.questions || !localStorage.creationDate || !localStorage.modificationDate || !localStorage.name || !localStorage.record) {
    fetchData('https://love-js.glitch.me/quizzie');
} else {
    dsAlreadyExist = true;
}


window.addEventListener('load', function () {
    labelTotQuestion = document.getElementById("labelTotQuestion");

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

    // pour ne pas executer tant que les données ne sont pas chargées dans le localStorage
    if (dsAlreadyExist) {
        record = getRecord();
        questions = getQuestions();
        labelTotQuestion.innerText = questions.length + ' question(s)';
        if (record.creationDate) {
            labelRecord.innerText = 'Record détenu par ' + getRecord().holderName + ' avec ' + getRecord().score + ' point(s)';
        } else {
            labelRecord.innerText = 'Aucun record détenu pour le moment.';
        }
        currentMaxScore = getMaxScore();
        if (questions.length === 0) {
            btnLancer.style.display = 'none';
        }
        isQuizzPlayable();
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

function getPropositions(index) {
    return getQuestions()[index].propositions;
}

function getRecord() {
    const record = JSON.parse(localStorage.record);
    record.creationDate = new Date(record.creationDate);
    return record;
}

function getMaxScore() {
    // une proposition true = 1 point
    let questions = getQuestions();
    let propositionsTrue = [];
    questions.forEach(question => {
        if (question.propositions.length > 0) {
            propositionsTrue = propositionsTrue.concat(question.propositions.filter(proposition => proposition.correct));
        }
    });
    return propositionsTrue.length;
}

function setNewRecord(newName, newScore) {
    if (newName === '') {
        newName = 'Anonymous';
    }
    const oldRecord = getRecord();
    const newRecord = {
        holderName: newName,
        score: newScore,
        creationDate: new Date()
    };
    if (newName !== oldRecord.holderName) {
        localStorage.setItem('record', JSON.stringify(newRecord));
        labelRecord.innerText = 'Record détenu par ' + newName + ' avec ' + newScore + ' point(s)';
    }

}

/***
 *  Si plusieurs personnes obtienenent le record max
 */
function setExAequoRecord(newName) {
    const record = getRecord();
    if (!record.holderName.includes(newName) || newName !== '') {
        record.holderName += ', ' + newName;
        localStorage.setItem('record', JSON.stringify(record));
        labelRecord.innerText = 'Record détenu par ' + record.holderName + ' avec ' + record.score + ' point(s)';
    }

}

function addQuestion(newQuestion) {
    let questions = getQuestions();
    questions.push({heading: newQuestion, propositions: []});
    updateQuestions(questions);
}

function addProposition(newProposition, qIndex) {
    let questions = getQuestions();
    questions[qIndex].propositions.push({
        content: newProposition,
        correct: false
    });
    updateQuestions(questions);
}

function tooglePropositionValue(qIndex, pIndex) {
    const questions = getQuestions();
    questions[qIndex].propositions[pIndex].correct = !questions[qIndex].propositions[pIndex].correct;
    updateQuestions(questions);
}

function rmProposition(qIndex, pIndex) {
    const questions = getQuestions();
    questions[qIndex].propositions.splice(pIndex, 1);
    updateQuestions(questions);
    domRemoveAllChilds(panelRight);
    editQuiz();

}

function rmQuestion(qIndex) {
    const questions = getQuestions();
    questions.splice(qIndex, 1);
    updateQuestions(questions);
    domRemoveAllChilds(panelRight);
    editQuiz();

}

/**
 * remplace l'object "questions" dans le local storage
 */
function updateQuestions(updatedQuestions) {
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    resetRecord();
    labelTotQuestion.innerText = getQuestions().length + ' question(s)';
    if (updatedQuestions.length === 0) {
        btnLancer.style.display = "none";
    } else {
        btnLancer.style.display = "block";
    }
}

/**
 * appelé à la suite de chaque modification de question
 */
function resetRecord() {
    localStorage.setItem('record', JSON.stringify({
        holderName: "",
        score: 0,
        creationDate: null
    }));
    labelRecord.innerText = 'Aucun record détenu pour le moment.';
}

/**
 * supression de touts les l'elements enfant d'un element donné
 */
function domRemoveAllChilds(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

/***
 * Vérifie que toutes les questions ont au moins 2 propositions et si elles ne sont pas toutes fausses,
 * si au moins 1 une question ne satifait pas cette condition, on cache le bouton "lancer".
 ***/
function isQuizzPlayable() {
    let questions = getQuestions();
    if (questions.length === 0) {
        btnLancer.style.display = "none";
    } else {
        qWithFewProp = questions.some((question) => {
            return question.propositions.length <= 1 || question.propositions.every(proposition => proposition ? !proposition.correct : true);
        });
        if (qWithFewProp) {
            btnLancer.style.display = "none";
        } else {
            btnLancer.style.display = "block";
        }
    }
}

/**
 * Bouton éditer
 */
function editQuiz() {
    isQuizzPlayable();
    helloHome.style.display = "none";
    btnEditer.style.display = "none";
    btnHome.style.display = "block";

    let questions = getQuestions();
    displayAllQuestions(questions);

    let nodes = Array.prototype.slice.call(panelRight.children);
    // si changement dans les champs "ajouter propositions" et "ajouter question"
    panelRight.querySelectorAll('input[type="text"]').forEach(element => {
        element.addEventListener("change", (e) => {
            qIndex = nodes.indexOf(element.parentNode);
            // si champs "ajouter question" (dernier champ input)
            if (qIndex === questions.length) {
                addQuestion(element.value);
            } else { // si champs "ajouter propositions"
                addProposition(element.value, qIndex);
            }
            domRemoveAllChilds(panelRight);
            editQuiz();
        }, false)
    });
    // si changement changement true/false sur une proposition
    panelRight.querySelectorAll('input[type="checkbox"]').forEach(element => {
        element.addEventListener("change", (e) => {
            const indexes = element.id.split(':').map(item => parseInt(item));
            // indexes[0] -> index question
            // indexes[1] -> index proposition
            tooglePropositionValue(indexes[0], indexes[1]);
            domRemoveAllChilds(panelRight);
            currentMaxScore = getMaxScore();
            editQuiz();
        }, false)
    });
}

function displayAllQuestions(questions){
    let qIndex = 0;
    for (question of questions) {
        const qElement = document.createElement("div");
        qElement.setAttribute("id", "question" + qIndex);
        qElement.setAttribute("name", "question");
        qElement.innerHTML += `
        <legend><i class="fas fa-times" style="color: red; margin-right: 10px;" onclick="rmQuestion(${qIndex})"></i><span>${question.heading}</span></legend>
    `;
        let pIndex = 0;
        for (proposition of question.propositions) {
            qElement.innerHTML += `
        <div class="form-check form-check-inline proposition">
            <i class="fas fa-times" style="color: red; margin-right: 5px;" onclick="rmProposition(${qIndex},${pIndex})"></i>
            <input class="form-check-input" type="checkbox" name="question${currentQuestionIndex}" id="${qIndex}:${pIndex}" value="${pIndex}" ${(proposition.correct ? "checked" : "")}>
            <label class="form-check-label" for="proposition${pIndex}">${proposition.content}</label>
        </div>
    `;
            pIndex++;
        }
        qElement.innerHTML += '<input type="text" class="form-control propositions" name="question' + qIndex + '" placeholder="Ajouter une proposition">';
        panelRight.appendChild(qElement);
        qIndex++
    }
    panelRight.innerHTML += '<div><input type="text" class="form-control" style="margin-top: 20px;" name="question' + qIndex + '" placeholder="Ajouter une question"></div>';
}

function lancerQuiz() {
    domRemoveAllChilds(panelRight);
    let questions = getQuestions();
    labelTotQuestion.innerText = '1/' + questions.length + ' question(s)';
    labelScore.innerText = currentScore + '/' + currentMaxScore + 'point(s)';
    currentQuestionIndex = 0;
    helloHome.style.display = "none";
    btnLancer.style.display = "none";
    btnEditer.style.display = "none";
    btnSuite.style.display = "block";
    btnHome.style.display = "block";
    labelScore.style.display = "block";
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    // si dernière question
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

function updateCurrentScore(propositions) {
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
    updateCurrentScore(getPropositions(currentQuestionIndex));
    domRemoveAllChilds(panelRight);
    let questions = getQuestions();
    // si c'était la dernière question
    if (currentQuestionIndex === questions.length - 1) {
        terminateQuiz();
    } else {
        currentQuestionIndex++;
        labelTotQuestion.innerText = 1 + currentQuestionIndex + '/' + questions.length + ' question(s)';
        showQuestion(questions[currentQuestionIndex]);
    }
}

function terminateQuiz() {
    currentRecord = getRecord();
    btnSuite.style.display = 'none';
    btnSuite.innerText = "Suivante";

    if (currentScore >= currentRecord.score && currentScore !== 0) {
        formWhatUrName = document.createElement('div');
        formWhatUrName.classList.add('form-group');
        formWhatUrName.innerHTML += `
        <label for="name">Quel est votre nom ?</label>
        <input type="text" class="form-control propositions" name="whatUrName" id="name" placeholder="Votre nom">
        `;
        panelRight.appendChild(formWhatUrName);

        if (currentScore > getRecord().score) {
            const success = document.createElement("div");
            success.innerHTML += '<p class="h2" >Bravo ! Vous avez brisé le record !</p>';
            formWhatUrName.before(success);

        } else if (currentScore === getRecord().score) {
            const draw = document.createElement("p");
            draw.classList.add('h2');
            draw.appendChild(document.createTextNode('Bravo ! Vous détenez le record ex aequo avec ' + currentRecord.holderName + ' !'));
            formWhatUrName.before(draw);
        }

        document.querySelector('[name="whatUrName"]').addEventListener("change", (e) => {
            goBackHome();
        }, false);

    } else {
        const ulose = document.createElement("p");
        ulose.classList.add('h2');
        ulose.appendChild(document.createTextNode(currentRecord.score === 0 ? "Vous n'avez pas décroché le record" : "Dommage, le record est toujours détenu par " + currentRecord.holderName + " avec " + currentRecord.score + " point(s)"));
        panelRight.appendChild(ulose);
    }
}

function goBackHome() {
    if (formWhatUrName) {
        const name = document.querySelector('[name="whatUrName"]').value;
        if (currentScore === getRecord().score) {
            setExAequoRecord(name);
        } else {
            setNewRecord(name, currentScore);
        }
        formWhatUrName = undefined;
    }
    const questions = getQuestions();
    labelTotQuestion.innerText = questions.length + ' question(s)';
    btnSuite.innerText = "Suivante";
    isQuizzPlayable();
    helloHome.style.display = "block";
    btnEditer.style.display = "block";
    btnHome.style.display = "none";
    btnSuite.style.display = "none";
    labelScore.style.display = "none";
    domRemoveAllChilds(panelRight);
    currentQuestionIndex = 0;
    currentScore = 0;
}




