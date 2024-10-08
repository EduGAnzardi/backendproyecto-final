Hola soy Eduardo Anzardi y este es mi proyecto de Backend para el curso de Coderhouse.
Gestión de Productos:

Operaciones CRUD: Permite realizar operaciones de Crear, Leer, Actualizar y Eliminar productos mediante una API RESTful.

Endpoints Actualizados:

GET /api/products: Lista productos con parámetros de consulta para paginación, filtrado por categoría y disponibilidad, y ordenamiento por precio.
Parámetros de Consulta:
limit: Número máximo de elementos a devolver (por defecto 10).
page: Página actual a retornar (por defecto 1).
query: Filtro para buscar por categoría o disponibilidad.
sort: Ordenamiento por precio (asc o desc).
Respuesta del Servidor:
status: Estado de la solicitud.
payload: Resultado de los productos solicitados.
totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink.
GET /api/products/:pid: Obtiene un producto por su ID.
POST /api/products: Crea un nuevo producto.
PUT /api/products/:pid: Actualiza un producto existente.
DELETE /api/products/:pid: Elimina un producto por su ID.
Incluye una Guía de Usuario, con Parámetros de Consulta como:

Parámetro limit:
Podrás consultar el valor máximo de productos a devolver, cuenta con ejemplo en Código.
Parámetro page:
Con page podrás acceder a una página en concreto, cuenta con ejemplo en Código y Live Web.
Nota: Si no hay productos en la página solicitada, se mostrará un mensaje indicando que no hay productos.
Parámetro sort:
Podrás consultar productos por ordenamiento ascendente, cuenta con ejemplo en Código y Live Web.
Podrás consultar productos por ordenamiento descendente, cuenta con ejemplo en Código y Live Web.
Parámetro query:
Podrás consultar productos filtrando por categorías, cuenta con ejemplo en Código y Live Web.
Gestión de Carritos:

Nuevos Endpoints:
DELETE /api/carts/:cid/products/:pid: Elimina un producto específico del carrito.
PUT /api/carts/:cid: Actualiza el carrito con un nuevo arreglo de productos.
PUT /api/carts/:cid/products/:pid: Actualiza la cantidad de un producto en el carrito.
DELETE /api/carts/:cid: Elimina todos los productos del carrito.
Modelo de Carts:
Los IDs de productos deben hacer referencia al modelo de Products y utilizar populate para obtener detalles completos de los productos en el carrito.
Frontend
Interactividad en Tiempo Real:

Socket.io: Actualiza la lista de productos en tiempo real en la interfaz de usuario sin necesidad de refrescar la página.
Eventos de WebSocket: Emisión de eventos dentro de las peticiones POST para la creación y eliminación de productos.
Vistas Actualizadas:

Página de Inicio: http://localhost:8080 - Contiene botones para acceder a las vistas de productos, productos en tiempo real, y agregar productos. Incluye una guía de usuario con ejemplos de cómo utilizar los parámetros de consulta.
Página de Productos: http://localhost:8080/products - Muestra una lista de productos con opción para comprar y paginación.
Página de Productos en Tiempo Real: http://localhost:8080/realtimeproducts - Actualización en tiempo real de los productos.
Formulario de Agregar Productos: http://localhost:8080/products/add - Permite añadir nuevos productos manualmente o importando un backup de stock.
Vista de Detalles del Producto: http://localhost:8080/products/:pid - Detalles completos del producto.
Vista de Carritos: http://localhost:8080/carts/:cid - Visualiza un carrito específico con los productos correspondientes.
Estilos Personalizados:

CSS: Estilización mejorada para una experiencia de usuario más atractiva, incluyendo una nueva sombra blanca para los botones.
Tecnologías Utilizadas
Node.js: Plataforma de desarrollo backend.
Express: Framework de Node.js para construir aplicaciones web y APIs.
Handlebars: Motor de plantillas para el frontend.
Socket.io: Biblioteca para comunicación en tiempo real.
CSS: Estilización personalizada para el diseño del proyecto.
Postman: Herramienta para probar y documentar APIs.
Ejecución del Proyecto
Clonar el repositorio.
Instalar las dependencias con npm install.
Ejecutar el servidor con node src/app.js.
Acceder a la interfaz web en http://localhost:8080.
Utilizar Postman u otro cliente API para probar los diferentes endpoints.
