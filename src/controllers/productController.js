const ProductManager = require('../dao/models/dbManagers/productManager');
const productManager = new ProductManager();

// Obtener todos los productos con filtros opcionales
exports.getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const products = await productManager.getProducts({ limit, page, sort, query });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const product = await productManager.addProduct(newProduct);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto por su ID
exports.updateProductById = async (req, res) => {
    try {
        const updatedProduct = req.body;
        const product = await productManager.updateProduct(req.params.pid, updatedProduct);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto por su ID
exports.deleteProductById = async (req, res) => {
    try {
        const result = await productManager.deleteProduct(req.params.pid);
        if (!result) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};