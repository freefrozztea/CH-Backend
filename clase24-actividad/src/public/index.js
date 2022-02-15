const socket = io();

socket.on("render", (data) => {
  renderChats();
  renderProducts();
  mainLogin();
});

function renderChats() {
  const chatTable = document.getElementById('chatsTable');
  const url = '/api/chat';

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      const schemaAutor = new normalizr.schema.Entity('author')
      const mySchema = new normalizr.schema.Array({
        author: schemaAutor
      })
      const denormalizeChat = normalizr.denormalize(data.normalizr.result, mySchema, data.normalizr.entities)

      const NormalizedLength = JSON.stringify(data.normalizr).length;
      const DenormalizedLength = JSON.stringify(denormalizeChat).length;

      document.getElementById('normalizrPorcent').innerHTML = `Compresion sizes: ${((NormalizedLength * 100) / DenormalizedLength).toFixed(2)}%`;
      document.getElementById('normalizrLength').innerHTML = `Denormalized: ${DenormalizedLength}B Normalized: ${NormalizedLength}B`;

      chatTable.innerHTML = "";
      for (const chat of denormalizeChat) {
        let row = document.createElement('tr');
        let field1 = document.createElement('td');
        field1.innerHTML = `<img src = ${chat.author.avatar} width="45"height="45">`;
        let field2 = document.createElement('td');
        field2.innerHTML = `<strong>${chat.author.id}</strong>`;
        let field3 = document.createElement('td');
        field3.innerHTML = `<strong>${chat.text}</strong>`;
        row.appendChild(field1);
        row.appendChild(field2);
        row.appendChild(field3);
        chatTable.appendChild(row);
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}

function sendchat() {
  const url = '/api/chat';
  let data = {
    author: {
      id: document.getElementById('email').value,
      nombre: document.getElementById('firstname').value,
      apellido: document.getElementById('lastname').value,
      edad: document.getElementById('age').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value
    },
    text: document.getElementById('msg').value
  }

  const request = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(url, request)
    .then(function () {
      document.getElementById('msg').value = "";
      socket.emit("NewChat");
    });

  return false;
}

function renderProducts() {
  const prodTable = document.getElementById('productsTable');
  const url = '/api/productos-test';

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      prodTable.innerHTML = "";
      for (const prod of data) {
        let row = document.createElement('tr');
        let field1 = document.createElement('td');
        field1.innerHTML = `${prod.name}`;
        let field2 = document.createElement('td');
        field2.innerHTML = `$ ${prod.price}`;
        let field3 = document.createElement('td');
        field3.innerHTML = `<img src = ${prod.picture} width="40"height="40">`;
        row.appendChild(field1);
        row.appendChild(field2);
        row.appendChild(field3);
        prodTable.appendChild(row);
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  return false;
}

function mainLogin() {
  const url = '/api/login';
  /* Funcion fetch para saber si esta logeado */
  const options = {
    method: "GET"
  }
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      if (data) {
        let x = document.getElementById("login");
        x.innerHTML = "Hola " + data.user;

      } else {
        window.location.href = "login.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}

function logout() {
  const url = '/api/login';
  //Funcion fetch para saber si esta logeado
  const options = {
    method: "GET"
  }
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      if (data) {
        console.log(data)
        let x = document.getElementById("logout");
        x.innerHTML = "Adios " + data.user;
        setTimeout(function () {
          window.location.href = "api/logout"
        }, 2000);

      } else {
        window.location.href = "login.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

