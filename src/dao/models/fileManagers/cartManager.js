const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../../data/carts.json');

class CartManager {
    // Obtener todos los carritos del archivo JSON
    async getCarts() {
        const carts = JSON.parse(await fs.promises.readFile(cartsFilePath, 'utf-8'));
        return carts;
    }

    // Obtener un carrito por su ID del archivo JSON
    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id);
    }

    // Crear un nuevo carrito y agregarlo al archivo JSON
    async createCart() {
        const carts = await this.getCarts();
        // Generar un nuevo ID autoincrementable
        const newId = carts.length ? Math.max(carts.map(c => c.id)) + 1 : 1;
        const newCart = { id: newId, products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        return newCart;
    }

    // Agregar un producto al carrito
    async addProductToCart(cartId, productId, quantity) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(p => p.product === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        return cart;
    }

    // Actualizar todos los productos en un carrito
    async updateCart(cartId, newProducts) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);
        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }
        carts[cartIndex].products = newProducts;
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        return carts[cartIndex];
    }

    // Actualizar la cantidad de un producto en un carrito
    async updateProductQuantity(cartId, productId, quantity) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        const product = cart.products.find(p => p.product === productId);
        if (!product) {
            throw new Error('Producto no encontrado en el carrito');
        }
        product.quantity = quantity;
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        return cart;
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products = cart.products.filter(p => p.product !== productId);
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        return cart;
    }

    // Eliminar todos los productos de un carrito
    async clearCart(cartId) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products = [];
        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;