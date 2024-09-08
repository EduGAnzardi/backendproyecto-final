// Función para obtener y mostrar todos los productos
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const result = await response.json();
        if (response.ok) {
            displayProducts(result.payload);
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// Función para mostrar productos en la vista
function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Limpiar contenedor de productos

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Categoría: ${product.category}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="viewProductDetails('${product._id}')">Ver detalles</button>
            <button onclick="addProductToCart('${cartId}', '${product._id}', 1)">Agregar al carrito</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Función para mostrar detalles de un producto
async function viewProductDetails(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        const result = await response.json();
        if (response.ok) {
            displayProductDetails(result);
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
    }
}

// Función para mostrar detalles del producto en la vista
function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <p>Categoría: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        <button onclick="addProductToCart('${cartId}', '${product._id}', 1)">Agregar al carrito</button>
    `;
}