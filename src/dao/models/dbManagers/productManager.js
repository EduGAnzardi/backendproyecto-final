const Product = require('../../models/Product');

class ProductManager {
    // Obtener productos con filtros opcionales
    async getProducts({ limit = 10, page = 1, sort = 'asc', query }) {
        const queryFilter = query ? { category: query } : {};
        const sortOrder = sort === 'asc' ? 1 : -1;

        const products = await Product.find(queryFilter)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ price: sortOrder });

        const totalProducts = await Product.countDocuments(queryFilter);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevLink = hasPrevPage ? `/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        return {
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };
    }

    // Obtener un producto por su ID
    async getProductById(id) {
        return Product.findById(id);
    }

    // Agregar un nuevo producto
    async addProduct(productData) {
        const newProduct = new Product(productData);
        return newProduct.save();
    }

    // Actualizar un producto por su ID
    async updateProduct(id, updateData) {
        return Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    // Eliminar un producto por su ID
    async deleteProduct(id) {
        return Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManager;