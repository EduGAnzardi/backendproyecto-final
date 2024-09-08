// Función para agregar un producto al carrito
async function addProductToCart(cartId, productId, quantity) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Producto agregado al carrito');
            fetchCartById(cartId); // Actualizar vista del carrito
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
    }
}

// Función para actualizar la cantidad de un producto en el carrito
async function updateProductQuantity(cartId, productId, quantity) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Cantidad actualizada');
            fetchCartById(cartId); // Actualizar vista del carrito
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al actualizar cantidad del producto:', error);
    }
}

// Función para eliminar un producto del carrito
async function deleteProductFromCart(cartId, productId) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Producto eliminado del carrito');
            fetchCartById(cartId); // Actualizar vista del carrito
        } else {
            const result = await response.json();
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
    }
}

// Función para vaciar el carrito
async function clearCart(cartId) {
    try {
        const response = await fetch(`/api/carts/${cartId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Carrito vaciado');
            fetchCartById(cartId); // Actualizar vista del carrito
        } else {
            const result = await response.json();
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
    }
}

// Función para obtener y mostrar el carrito
async function fetchCartById(cartId) {
    try {
        const response = await fetch(`/api/carts/${cartId}`);
        const result = await response.json();
        if (response.ok) {
            displayCart(result);
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error al obtener carrito:', error);
    }
}

// Función para mostrar el carrito en la vista
function displayCart(cart) {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Limpiar contenedor del carrito

    cart.products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-product');
        productElement.innerHTML = `
            <h4>${product.product.title}</h4>
            <p>Precio: $${product.product.price}</p>
            <p>Cantidad: ${product.quantity}</p>
            <button onclick="updateProductQuantity('${cart._id}', '${product.product._id}', ${product.quantity + 1})">Incrementar cantidad</button>
            <button onclick="updateProductQuantity('${cart._id}', '${product.product._id}', ${product.quantity - 1})">Decrementar cantidad</button>
            <button onclick="deleteProductFromCart('${cart._id}', '${product.product._id}')">Eliminar producto</button>
        `;
        cartContainer.appendChild(productElement);
    });

    // Botón para vaciar el carrito
    const clearCartButton = document.createElement('button');
    clearCartButton.textContent = 'Vaciar carrito';
    clearCartButton.onclick = () => clearCart(cart._id);
    cartContainer.appendChild(clearCartButton);
}

// Añadir eventos a los formularios
document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    const clearCartButton = document.getElementById('clear-cart-button');

    if (addProductForm) {
        addProductForm.addEventListener('submit', event => {
            event.preventDefault();
            const cartId = addProductForm.dataset.cartId;
            const productId = addProductForm.querySelector('input[name="productId"]').value;
            const quantity = parseInt(addProductForm.querySelector('input[name="quantity"]').value);
            addProductToCart(cartId, productId, quantity);
        });
    }

    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            const cartId = clearCartButton.dataset.cartId;
            clearCart(cartId);
        });
    }
});