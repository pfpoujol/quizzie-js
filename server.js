// where your node app starts

// init project
const express = require("express");
const app = express();

// Le dossier qui sera public
app.use(express.static("evaluations"));

// La page web par défaut. (more on: http://expressjs.com/en/starter/basic-routing.html)
app.get("/", (request, response) =>   response.sendFile(__dirname + "/front/index.html"));

// Les web services
app.get("/hello", (_, response) => response.send("Yo !"));
app.get("/quizzie", (_, response) => {
  response.header("Access-Control-Allow-Origin", "*")
  response.send(JSON.parse(defaultQuizzieAsJSON))
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => console.log("Your app is listening on port " + listener.address().port));

// Data used by web services
const defaultQuizzieAsJSON = `
{
    "name": "Mon premier quiz sur Quizzie",
    "creationDate": "2019-11-20T08:00:59.566Z",
    "modificationDate": "2019-11-20T18:00:59.566Z",
    "record": {
        "holderName": "Jojo",
        "score": 1,
        "creationDate": "2019-11-20T12:00:59.566Z"
    },
    "questions": [
        {
            "heading": "Parmi ces languages, lesquels envoient du lourd ?",
            "propositions": [
                {
                    "content": "Python",
                    "correct": true
                },
                {
                    "content": "Visual Basic",
                    "correct": false
                },
                {
                    "content": "Java",
                    "correct": false
                },
                {
                    "content": "JavaScript",
                    "correct": true
                }
            ]
        },
        {
            "heading": "En JavaScript, laquelle de ces instructions ne doit pas apparaître dans le code du projet ?",
            "propositions": [
                {
                    "content": "const",
                    "correct": false
                },
                {
                    "content": "var",
                    "correct": true
                },
                {
                    "content": "let",
                    "correct": false
                }
            ]
        }
    ]
}
`
