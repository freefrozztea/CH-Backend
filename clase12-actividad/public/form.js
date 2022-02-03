const socket = io();

socket.on("products_back", (dataProds) => {
  renderProds(dataProds);
});

const renderProds = (dataProds) => {
  document.querySelector("#prods").innerHTML = dataProds
    .map((x) => {
      return `
        <article class="card product-item" >
          <header class="card__header">
              <h1 class="product-item">${x.title}</h1>
          </header>
          <div class="card__image">
              <img src= "${x.thumbnail}" alt="Product">
          </div>
          <div class="card__content">
            <h2 class="product__price">${x.price}</h2>
          </div>
        </article>
        `;
    })
    .join(" ");
};

const addProds = () => {
  let obj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };

  socket.emit("data_products", obj);

  document.querySelector("#title").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#thumbnail").value = "";

  return false;
};
