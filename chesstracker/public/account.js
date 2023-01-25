const register = () => {
    let credentials = {
        name: document.querySelector("#username"),
        password: document.querySelector("#password")
    }
    fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: credentials
    }).then(res => {
        console.log(res);
    });
};

const login = () => {
    let credentials = {
        name: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    }
    fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: credentials
    }).then(res => {
        console.log(res);
    });
};
