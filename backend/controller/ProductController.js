import mongoose from "mongoose";
import Product from "../models/productSchema.js";
import LatestProduct from "../models/LatestProduct.js";

// ==============================
// Product Controllers
// ==============================

// Get All Products
const getProduct = async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            });
        }

        return res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Get Product By ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product found",
            product
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Add Product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
            image
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            !category ||
            stock === undefined ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: deletedProduct
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            price,
            category,
            stock,
            image
        } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const updates = {};

        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (price !== undefined) updates.price = price;
        if (category !== undefined) updates.category = category;
        if (stock !== undefined) updates.stock = stock;
        if (image !== undefined) updates.image = image;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// ==============================
// Latest Product Controllers
// ==============================

// Get All Latest Products
const getLatestProduct = async (req, res) => {
    try {
        const products = await LatestProduct.find();

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No latest products found"
            });
        }

        return res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Get Latest Product By ID
const getLatestProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Latest product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid latest product ID"
            });
        }

        const product = await LatestProduct.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Latest product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Latest product found",
            product
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Add Latest Product
const addLatestProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
            image
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            !category ||
            stock === undefined ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const product = await LatestProduct.create({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Latest product added successfully",
            product
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Delete Latest Product
const deleteLatestProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Latest product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid latest product ID"
            });
        }

        const product = await LatestProduct.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Latest product not found"
            });
        }

        const deletedProduct = await LatestProduct.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Latest product deleted successfully",
            product: deletedProduct
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Update Latest Product
const updateLatestProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            price,
            category,
            stock,
            image
        } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Latest product ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid latest product ID"
            });
        }

        const product = await LatestProduct.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Latest product not found"
            });
        }

        const updates = {};

        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (price !== undefined) updates.price = price;
        if (category !== undefined) updates.category = category;
        if (stock !== undefined) updates.stock = stock;
        if (image !== undefined) updates.image = image;

        const updatedProduct = await LatestProduct.findByIdAndUpdate(
            id,
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Latest product updated successfully",
            product: updatedProduct
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
    // Product
    getProduct,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,

    // Latest Product
    getLatestProduct,
    getLatestProductById,
    addLatestProduct,
    deleteLatestProduct,
    updateLatestProduct
};