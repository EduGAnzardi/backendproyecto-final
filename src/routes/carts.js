const express = require('express');
const router = express.Router();
const { 
    createCart, 
    getCartById, 
    addProductToCart, 
    updateCartProducts, 
    updateProductQuantity, 
    deleteProductFromCart, 
    clearCart 
} = require('../controllers/cartController');

// Crear un nuevo carrito
router.post('/', createCart);

// Obtener un carrito por su ID
router.get('/:cid', getCartById);

// Agregar un producto al carrito
router.post('/:cid/product/:pid', addProductToCart);

// Actualizar todos los productos del carrito
router.put('/:cid', updateCartProducts);

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', updateProductQuantity);

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', deleteProductFromCart);

// Eliminar todos los productos del carrito
router.delete('/:cid', clearCart);

module.exports = router;