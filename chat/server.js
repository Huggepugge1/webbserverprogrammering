const express = require("express");
const bodyParser = require("body-parser"); 

let messages = [];

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/messages", (req, res) => {
    res.send(messages);
});

app.post("/messages", (req, res) => {
    messages.push(req.body);
    console.log(messages);
    io.emit("message", req.body);
    res.sendStatus(200);
});

http.listen(8080, () => {
    console.log("server running")
});
