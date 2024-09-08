const mongoose = require('mongoose');

// Esquema para los carritos en MongoDB
const cartSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('Cart', cartSchema);