const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const realTimeProductsSocket = require('./sockets/realTimeProducts');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del motor de vistas
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Configuración de WebSocket
realTimeProductsSocket(io);

// Conexión a MongoDB
const connectDB = require('./config/db');
connectDB();

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});