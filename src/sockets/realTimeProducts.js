module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado');

        // Emite la actualización de productos a los clientes conectados
        socket.on('updateProducts', (products) => {
            io.emit('updateProducts', products);
        });
    });
};