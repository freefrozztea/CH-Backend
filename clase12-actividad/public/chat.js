const socket = io();

let nom = prompt("Cual es tu Mail?");
let time = new Date().toLocaleString();

socket.on("message_back", (data) => {
  render(data);
});

const render = (data) => {
  document.querySelector("#caja").innerHTML = data
    .map((x) => {
      return `
        <p class="text"> <strong class="text-mail"> ${x.name} </strong> ${x.time} : <i class="text-msg">${x.msg}</i> </p>
        `;
    })
    .join(" ");
};

const addMsg = () => {
  let obj = {
    name: nom,
    time: time,
    msg: document.querySelector("#msg").value,
  };

  socket.emit("data_client", obj);

  document.querySelector("#msg").value = "";

  return false;
};
