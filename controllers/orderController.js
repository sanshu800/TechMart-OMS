const Order = require("../models/Order");

const validTransitions = require("../config/orderStatusConfig");

//createorder function
async function createOrder(req, res) {

    try {

        console.log("Incoming Request:");
        console.log(req.body);

        const existingOrder = await Order.findOne({
            orderId: req.body.orderId
        });

        if (existingOrder) {
            return res.status(400).send({
                error: "Order already exists"
            });
        }

        await Order.create({
            ...req.body
        });

        res.send({
            message: "Order stored successfully"
        });

    }
    catch(error){

        console.log(error);

        res.status(500).send({
            error:"Internal Server Error"
        });

    }

}

//getorder function
async function getOrders(req, res) {

    try {

        const orders = await Order.find();

        res.send(orders);

    }
    catch (error) {

        console.log(error);

        res.status(500).send({
            error: "Internal Server Error"
        });

    }

}

// getorder order:id function
async function getOrderById(req, res) {

    try {

        const order = await Order.findOne({
            orderId: req.params.orderId
        });

        if (!order) {
            return res.status(404).send({
                error: "Order not found"
            });
        }

        res.send(order);

    } catch (error) {

        console.log(error);

        res.status(500).send({
            error: "Internal Server Error"
        });

    }

}

// updateorder

async function updateOrder(req, res) {

    try {

        const existingOrder = await Order.findOne({
            orderId: req.params.orderId
        });

        if (!existingOrder) {
            return res.status(404).send({
                error: "Order not found"
            });
        }

        if (existingOrder.status === "Shipped") {
            return res.status(400).send({
                error: "Cannot update shipped order"
            });
        }

        const allowedFields = [
            "product",
            "quantity"
        ];

        for (const field of allowedFields) {

            if (req.body[field] !== undefined) {
                existingOrder[field] = req.body[field];
            }

        }

        await existingOrder.save();

        res.send({
            message: "Order updated successfully",
            order: existingOrder
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            error: "Internal Server Error"
        });

    }

}

async function updateOrderStatus(req, res) {

    try {

        // Step 1: Find the order
        const existingOrder = await Order.findOne({
            orderId: req.params.orderId
        });

        // Step 2: Check if order exists
        if (!existingOrder) {
            return res.status(404).send({
                error: "Order not found"
            });
        }

        // Step 3: Read current and new status
        const currentStatus = existingOrder.status;
        const newStatus = req.body.status;


  console.log("Current Status:", currentStatus);
  console.log("New Status:", newStatus);
  console.log("Allowed:", validTransitions[currentStatus]);


        // ⬇️ ADD THE VALIDATION RIGHT HERE
        if (!validTransitions[currentStatus].includes(newStatus)) {

            return res.status(400).send({
                error: "Invalid status transition"
            });

        }

        // Step 4: Update status
        existingOrder.status = newStatus;

        // Step 5: Save to MongoDB
        await existingOrder.save();

        // Step 6: Send response
        res.send({
            message: "Order status updated successfully",
            order: existingOrder
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            error: "Internal Server Error"
        });

    }

}



module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
};