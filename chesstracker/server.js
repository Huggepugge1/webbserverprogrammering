const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();
const http = require("http").Server(app);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

let accounts = {};
let loggedIn = [];

app.get("/dashboard", (req, res) => {
    if (loggedIn.includes(req.headers.username)) {
        res.send(accounts[req.headers.username].accounts);
        res.sendStatus(200);
    } else {
        res.send("Not authorized");
        res.sendStatus(401);
    }
});

app.post("/login", (req, res) => {
    if (accounts.hasOwnProperty(req.body.name)) {
        if (accounts[req.body.name] == req.body.password) {
            loggedIn.push(req.body.name);
            res.set('username', req.body.name);
            res.sendStatus(301);
            res.redirect("/dashboard");
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.post("/register", (req, res) => {
    accounts[req.body.username] = {
        password: req.body.password,
        accounts: []
    };
    console.log(accounts);
    res.sendStatus(200);
});

http.listen(8080, () => {
    console.log("server running")
});
