const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const session = require("express-session");
const chessWebAPI = require("chess-web-api");
const chessAPI = new chessWebAPI();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: "Hello World" }));

let accounts = {};

app.get("/", (req, res) => {
    if (req.session.login === undefined) {
        req.session.login = false;
    }
    res.send(`<p>${req.session.login}</p>`)
});

app.get("/dashboard", (req, res) => {
    if (req.session.login) {
        res.sendFile(__dirname + "/public/dashboard.html");
    } else {
        res.send("You have not logged in");
    }
});

app.post("/login", (req, res) => {
    if (!accounts[req.body.username]) {
        return res.send("Not a registered user");
    }
    if (accounts[req.body.username].password === req.body.password) {
        req.session.login = true;
        req.session.username = req.body.username;
    } else {
        return res.sendStatus(401);
    }
    return res.sendStatus(200);
});

app.post("/register", (req, res) => {
    accounts[req.body.username] = {
        password: req.body.password,
        accounts: []
    };
    console.log(accounts);
    res.sendStatus(200);
});

app.post("/logout", (req, res) => {
    req.session.login = false;
    res.sendStatus(200);
});

app.get("/logged_in", (req, res) => {
    if (req.session.login) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
})

app.post("/chess_account", (req, res) => {
    accounts[req.session.username].accounts.push(req.body.account);
    console.log(accounts);
    res.sendStatus(200);
});

app.get("/chess_account", async (req, res) => {
    let info = "";
    for (const acc of accounts[req.session.username].accounts) {
        info += `<h3>${acc}</h3>`;
        let worked = true;
        await chessAPI.getPlayerStats(acc)
            .then(res => {
                for (const typ of Object.keys(res.body)) {
                    if (typ.includes("chess")) {
                        info += `<p>${typ}: ${res.body[typ].last.rating}</p>`
                    }
                }
            }, err => {
                worked = false;
            });
        if (!worked) {
            accounts[req.session.username].accounts = accounts[req.session.username].accounts.filter(e => e !== acc);
            return res.send(`Account \"${acc}\" not found`);
        }
    }
    return res.send(info);
});

app.listen(8080, () => {
    console.log("server running");
});
