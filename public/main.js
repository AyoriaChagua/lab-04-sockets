const socket = io()

let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', 'Someome')
})

btn.addEventListener('click', () => {
    socket.emit('chat:message', {
        socket: socket.id,
        message: message.value
    })
})

socket.on('chat:message', (data) => {
    actions.innerHTML = 'left'
    let classStyle = ''
    if(socket.id == data.socket) {
        classStyle = 'right'
        output.innerHTML += `
        <div class="chat-message ${classStyle}">
        <img class="message-avatar" src="img/a2.jpg" alt="" >
            <div class="message bg-message" >
                <a class="message-author"> Me </a>
                <P class="message-content" style="color:white">
                ${data.message}
                </P>
            </div>
        </div>`
    } else {
        classStyle = 'left'
        output.innerHTML += `
        <div class="chat-message ${classStyle}">
        <img class="message-avatar" src="img/a3.jpg" alt="" >
            <div class="message">
                <a class="message-author"> ${data.socket} </a>
                <span class="message-content">
                ${data.message}
                </span>
            </div>
        </div>`
    }

    message.value = ''
})

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<p>
        <em>${data} is typing a message</em>
    </p>`
})