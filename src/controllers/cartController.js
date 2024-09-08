const CartManager = require('../dao/dbManagers/cartManager');
const cartManager = new CartManager();

// Crear un nuevo carrito
exports.createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un carrito por su ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un producto al carrito
exports.addProductToCart = async (req, res) => {
    try {
        const { pid } = req.params;  // ID del producto
        const { quantity } = req.body;  // Cantidad del producto a agregar
        const result = await cartManager.addProductToCart(req.params.cid, pid, quantity);
        if (!result) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto del carrito
exports.removeProductFromCart = async (req, res) => {
    try {
        const result = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
        if (!result) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar todos los productos del carrito
exports.updateCart = async (req, res) => {
    try {
        const products = req.body;  // Arreglo de productos para actualizar
        const result = await cartManager.updateCart(req.params.cid, products);
        if (!result) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar la cantidad de un producto específico en el carrito
exports.updateProductQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;  // Nueva cantidad del producto
        const result = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
        if (!result) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar todos los productos del carrito
exports.clearCart = async (req, res) => {
    try {
        const result = await cartManager.clearCart(req.params.cid);
        if (!result) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json({ message: 'Todos los productos han sido eliminados del carrito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};