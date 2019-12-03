// where your node app starts

// init project
const express = require("express");
const app = express();

app.use(express.static("exercises"));
app.use(express.static("evaluations"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/front/index.html");
});

// Exemples de web-service
app.get("/hello", (_, response) => response.send("Yo !"));


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});