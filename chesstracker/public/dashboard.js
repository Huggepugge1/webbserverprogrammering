const logout = () => {
    $.post("/logout")
        .then(res => {
            alert("Logged out");
            window.location.href = "index.html";
        });
}

const addAccount = () => {
    $.post("/chess_account", {account: $("#account-name").val()})
        .then(res => {
            console.log("Added account");
    });
}

const getChess = () => {
    $("#ratings").empty();
    $.get("/chess_account")
        .then(res => {
            $("#ratings").append(res);
        }, err => {
            console.log(err);
        });
}

const checkLogin = () => {
    $.get("/logged_in")
        .fail(res => {
            if (!(res === "OK")) {
                window.location.href = "index.html";
            }
        });
};

checkLogin();