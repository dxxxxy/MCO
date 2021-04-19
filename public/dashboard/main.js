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
const btn = document.getElementById('submit')
btn.addEventListener('click', e => {
    e.preventDefault();
    socket.emit('connect-server', document.getElementById("host").value, document.getElementById("email").value, document.getElementById("pass").value)
})

socket.on('chat:message', msg => {

})