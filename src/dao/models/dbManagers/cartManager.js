const Cart = require('../models/Cart');

class CartManager {
    // Crear un nuevo carrito
    async createCart() {
        const newCart = new Cart({ products: [] });
        return newCart.save();
    }

    // Obtener un carrito por su ID con productos poblados
    async getCartById(id) {
        return Cart.findById(id).populate('products.product');
    }

    // Agregar un producto al carrito
    async addProductToCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productIndex = cart.products.findIndex(p => p.product.equals(productId));
        if (productIndex > -1) {
            // Incrementar la cantidad si el producto ya está en el carrito
            cart.products[productIndex].quantity += 1;
        } else {
            // Agregar nuevo producto al carrito
            cart.products.push({ product: productId, quantity: 1 });
        }

        return cart.save();
    }

    // Actualizar todos los productos del carrito
    async updateCart(cartId, products) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = products.map(p => ({ product: p.product, quantity: p.quantity }));
        return cart.save();
    }

    // Actualizar la cantidad de un producto específico en el carrito
    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const productIndex = cart.products.findIndex(p => p.product.equals(productId));
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            return cart.save();
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = cart.products.filter(p => !p.product.equals(productId));
        return cart.save();
    }

    // Eliminar todos los productos del carrito
    async clearCart(cartId) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = [];
        return cart.save();
    }
}

module.exports = CartManager;