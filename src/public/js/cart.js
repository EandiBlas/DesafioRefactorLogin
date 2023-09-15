// const socketClient = io()


// socketClient.on("enviodecarts", (obj) => {
//     updateCartList(obj)
// })


// function updateCartList(products) {
//     let div = document.getElementById("contenedor");
//     let productos = "";

//     products.forEach((product) => {
//         productos += `
//         <div class="card">
//             <img src ="${product.thumbnail}" class="card-img-top imgshop">
//             <div>
//                 <h5 class="card-title mytitulo">${product.title}</h5>
//                 <p class="card-text mydescripcion">Categoria: ${product.category}</p>
//                 <p class="card-text mydescripcion">ID:${product._id}</p>
//                 <p class="card-text mydescripcion">Info: ${product.description}</p>
//                 <p class="card-text mydescripcion">$${product.price}</p>
//                 <buttton class="btn mx-auto d-block mybutton" id="boton${product._id}"><i class="fas fa-cart-plus"></i> Añadir al carrito </button>
//             </div>
//         </div>
//           `;
//     });

//     div.innerHTML = productos;
// }

// const boton = document.getElementById("boton${product._id}");
// boton.addEventListener("click", () => {
//     addCart(addCart.product._id);
// })
