const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    addProduct, 
    updateProductById, 
    deleteProductById 
} = require('../controllers/productController');

// Obtener todos los productos con parámetros de consulta opcionales
router.get('/', getProducts);

// Obtener un producto por su ID
router.get('/:pid', getProductById);

// Crear un nuevo producto
router.post('/', addProduct);

// Actualizar un producto por su ID
router.put('/:pid', updateProductById);

// Eliminar un producto por su ID
router.delete('/:pid', deleteProductById);

module.exports = router;