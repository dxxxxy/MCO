const inputs = document.querySelectorAll(".input");


function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

const login = () => {
    let user = document.getElementById("user").value
    let pass = document.getElementById("pass").value
    console.log(user, pass)
}


inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

const socket = io()
const submit = document.getElementById('submit')
submit.addEventListener('click', e => {
    e.preventDefault();
    socket.emit('connect-server', document.getElementById("host").value, document.getElementById("email").value, document.getElementById("pass").value)
})

const send = document.getElementById("send")
send.addEventListener('click', e => {
    e.preventDefault();
    socket.emit('send-message', document.getElementById("msg").value)
})

const chatBox = document.getElementById("chatBox")

socket.on('receive-message', msg => {
    console.log("calling")
        // Prior to getting your messages.
    shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
    const message = document.getElementsByClassName('message')[0];
    const newMessage = message.cloneNode(true);
    newMessage.innerHTML = msg
    messages.appendChild(newMessage);
    if (!shouldScroll) {
        scrollToBottom();
    }
    //chatBox.innerHTML += `${msg}<br>`
})

const messages = document.getElementById('chat-content');

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}

scrollToBottom();