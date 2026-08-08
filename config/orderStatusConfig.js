const validTransitions = {
    Created: ["Confirmed"],
    Confirmed: ["Packed"],
    Packed: ["Shipped"],
    Shipped: ["Delivered"],
    Delivered: []
};

module.exports = validTransitions;