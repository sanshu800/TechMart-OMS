const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    product: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Created"
    }

});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;