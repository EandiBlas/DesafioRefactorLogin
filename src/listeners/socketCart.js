import CartManager from '../dao/managers/cartManagerMongo.js';
import ProductManager from '../dao/managers/productManagerMongo.js';
const cm = new CartManager();
const pm = new ProductManager();

const socketCart = (socketServer) => {
  socketServer.on('connection', async (socket) => {
    console.log('client connected con ID:', socket.id);
    const carts = await cm.getCarts();
    socketServer.emit('enviodecarts', carts);

    socket.on('addCart', async (obj) => {
      if (!obj._id) {
        const product = await pm.getProductById(obj.products[0]._id);
        const newcart = await cm.addCart([product]);
        const carts = await cm.getCartById(newcart._id);
        socketServer.emit('enviodecarts', carts);
      } else {
        const product = await pm.getProductById(obj.products[0]._id);
        const cart = await cm.getCartById(obj._id);
        const carts = await cm.addProductInCart(cart._id, product);
        socketServer.emit('enviodecarts', carts);
      }
    });

    socket.on('nuevousuario', (usuario) => {
      console.log('usuario', usuario);
      socket.broadcast.emit('broadcast', usuario);
    });
    socket.on('disconnect', () => {
      console.log(`Usuario con ID : ${socket.id} esta desconectado `);
    });
  });
};

export default socketCart;