import Order from "../models/orderSchema.js"
import Cart from "../models/cartSchema.js"


const getOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId });

        if (!orders || orders.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No orders found",
                orders: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            orders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get order",
            error: error.message
        });
    }
};

const addOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        } = req.body;

        const order = await Order.create({
            user: userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } }
        );

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};

export { getOrder, addOrder }