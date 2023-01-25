const messages = $("#messages");
const nameArea = $("#name");
const messageArea = $("#message");

let messageLen = 0;
let socket = io();


const addMessage = (message) => {
    messages.prepend(`<h4>${message.name}</h4> <p>${message.message} </p>`);
};

socket.on("message", addMessage);

const getMessages = () => {
    $.get("http://192.168.1.50:8080/messages", (data) => {
        for (let message = 0; message < data.length; message++) {
            if (messageLen <= message) {
                addMessage(data[message]);
                messageLen += 1;
            }
        }
    });
}

const postMessage = () => {
    message = {
        name: nameArea.val(),
        message: messageArea.val()
    }
    $.post("http://192.168.1.50:8080/messages", message);
}

getMessages();
