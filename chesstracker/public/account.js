const register = () => {
    let credentials = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.post("/register", credentials)
        .then(res => {
            console.log(res, credentials);
        });
};

const login = () => {
    let credentials = {
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.post("/login", credentials)
        .then(res => {
            window.location.href = "dashboard.html";
            $.get("/dashboard")
        }, err => {
            alert("Invalid credentials!")
        });
};
