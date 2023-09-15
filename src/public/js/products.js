const socketClient = io();
let cartId = 0;
socketClient.on('enviodeproducts', (obj) => {
  updateProductList(obj);
});
socketClient.on('enviodecarts', (obj) => {
  cartId = obj._id;
});
function updateProductList(products) {
  let div = document.getElementById('contenedor');
  let productos = '';
  products.forEach((product) => {
    productos += `
        <div class="card">
            <img src ="${product.thumbnail}" class="card-img-top imgshop">
            <div>
                <h5 class="card-title mytitulo">${product.title}</h5>
                <p class="card-text mydescripcion">Categoria: ${product.category}</p>
                <p class="card-text mydescripcion">ID:${product._id}</p>
                <p class="card-text mydescripcion">Info: ${product.description}</p>
                <p class="card-text mydescripcion">$${product.price}</p>
                <button class="btn mx-auto d-block mybutton" id="${product._id}" onclick="addToCart('${product._id}')">
                    <i class="fas fa-cart-plus"></i> Añadir al carrito
                </button>
            </div>
        </div>
    `;
  });

  // Set the innerHTML after the loop
  div.innerHTML = productos;
}

function addToCart(productId) {
  socketClient.emit('addCart', {
    _id: cartId,
    products: [{ _id: productId }],
  });
}