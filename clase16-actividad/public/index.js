const socket = io();

// document.getElementById("").style.background =
//   " #bbe7dd url(https://cdn.pixabay.com/photo/2013/07/12/17/41/computer-mouse-152249_960_720.png) no-repeat center";

socket.on("render_products", (data) => {
  renderProducts(data)
  socket.emit("message_cliente", "Hola servidor!")
})
socket.on("render_messages", (data) => {
  renderMessages(data)
})

const submitProduct = (e) => {
  e.preventDefault()
  let obj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value
  }
  socket.emit("data_products", obj)
}
const renderProducts = (data) => {
  let html = data.map(item => `
    <tr>
      <td>${item.title}</td>
      <td>$${item.price}</td>
      <td><img class="icon" src="${item.thumbnail}" alt="test"></td>
    </tr>`
  ).join(" ")

  document.querySelector("#caja").innerHTML = html
}

const sendMsg = (e) => {
  e.preventDefault();
  const msg = {
    user_id: socket.id,
    user: document.querySelector('#mail').value,
    msg: document.querySelector('#msg').value,
  }
  socket.emit('data_messages', msg)
}

const renderMessages = (data) => {
  let date = new Date();
  let html = data.map(item => `
      <p><span class="${userClass(item.user_id)}">${item.user}</span> <span class="timestamp">[${date.toLocaleString()}]</span>: <span class="user-msg">${item.msg}</span></p> 
    `
  );
  const body = document.querySelector('#chat-msgs')
  body.innerHTML = html.join("");
}

const userClass = (msgUser) => {
  if (msgUser === socket.id) {
    return 'my-user';
  }
  return 'user';
}

const getAllProducts = (data) => {
  let info = {
    title: data.title,
    price: data.price,
    thumbnail: data.thumbnail,
  };

  document.querySelector("#caja").innerHTML = `
    <div>
      <img src="${info.thumbnail}" alt="test">
      <h3>${info.title}</h3>
      <span>$${info.price}</span>
    </div>
  `

  return false;
}
