import Cart from "../models/cartSchema.js";

const cartItems = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;
        const requestedQuantity = Number(quantity);

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Product ID and quantity are required"
            });
        }

        if (!Number.isInteger(requestedQuantity) || requestedQuantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive number"
            });
        }

        if (requestedQuantity > 10) {
            return res.status(400).json({
                success: false,
                message: "You can add maximum 10 quantity of a product"
            });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: requestedQuantity
                    }
                ]
            });

            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                cart
            });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            const nextQuantity = existingItem.quantity + requestedQuantity;

            if (nextQuantity > 10) {
                return res.status(400).json({
                    success: false,
                    message: "Maximum quantity per product is 10"
                });
            }

            existingItem.quantity = nextQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: requestedQuantity
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
const decreaseCartQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        // 1. Find user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart does not exist"
            });
        }

        // 2. Find product inside cart
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!existingItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        // 3. Decrease quantity
        existingItem.quantity -= quantity;

        // 4. If quantity becomes 0 or less, remove item
        if (existingItem.quantity <= 0) {
            cart.items = cart.items.filter(
                item => item.product.toString() !== productId
            );
        }

        // 5. Save cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart quantity decreased",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
export { cartItems, addToCart, decreaseCartQuantity };