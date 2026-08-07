const validTransitions = {

    Created: ["Packed"],

    Packed: ["Shipped"],

    Shipped: ["Delivered"],

    Delivered: []

};

module.exports = validTransitions;