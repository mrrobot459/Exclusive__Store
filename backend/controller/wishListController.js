import mongoose from "mongoose";
import Wishlist from "../models/WishListSchema.js";
import Product from "../models/productSchema.js";

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                wishlist: [productId]
            });

            return res.status(201).json({
                success: true,
                message: "Product added to wishlist",
                wishlist
            });
        }

        const alreadyExists = wishlist.wishlist.some(
            (id) => id.toString() === productId
        );

        if (alreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        wishlist.wishlist.push(productId);
        await wishlist.save();

        return res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        const productExists = wishlist.wishlist.some(
            (id) => id.toString() === productId
        );

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product is not in wishlist"
            });
        }

        wishlist.wishlist = wishlist.wishlist.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const wishlist = await Wishlist.findOne({ user: userId }).populate("wishlist");

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                message: "Wishlist is empty",
                wishlist: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Wishlist fetched successfully",
            wishlist: wishlist.wishlist
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const checkWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                exists: false,
                message: "Product is not in wishlist"
            });
        }

        const exists = wishlist.wishlist.some(
            (id) => id.toString() === productId
        );

        return res.status(200).json({
            success: true,
            exists,
            message: exists ? "Product is in wishlist" : "Product is not in wishlist"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    checkWishlist,
};