const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../../data/products.json');

class ProductManager {
    // Obtener todos los productos del archivo JSON
    async getProducts() {
        const products = JSON.parse(await fs.promises.readFile(productsFilePath, 'utf-8'));
        return products;
    }

    // Obtener un producto por su ID
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    // Agregar un nuevo producto al archivo JSON
    async addProduct(newProduct) {
        const products = await this.getProducts();
        // Verificar si el producto ya existe
        if (products.find(product => product.code === newProduct.code)) {
            throw new Error('El código del producto ya existe');
        }
        // Generar un nuevo ID autoincrementable
        const newId = products.length ? Math.max(products.map(p => p.id)) + 1 : 1;
        newProduct.id = newId;
        products.push(newProduct);
        await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
        return newProduct;
    }

    // Actualizar un producto existente
    async updateProduct(id, updatedProduct) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Producto no encontrado');
        }
        // Actualizar el producto
        products[index] = { ...products[index], ...updatedProduct };
        await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
        return products[index];
    }

    // Eliminar un producto por su ID
    async deleteProduct(id) {
        let products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        products = products.filter(product => product.id !== id);
        await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
        return { message: 'Producto eliminado exitosamente' };
    }
}

module.exports = ProductManager;