import express from "express";

import {
    // Normal Products
    getProduct,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,

    // Latest Products
    getLatestProduct,
    getLatestProductById,
    addLatestProduct,
    deleteLatestProduct,
    updateLatestProduct
} from "../controller/ProductController.js";

import auth from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();


router.get("/", getProduct);

router.get("/latest", getLatestProduct);
router.get("/latest/:id", getLatestProductById);

router.post("/add", auth, isAdmin, addProduct);
router.post("/latest/add", auth, addLatestProduct);
router.put("/latest/update/:id", auth, isAdmin, updateLatestProduct);

router.put("/update/:id", auth, isAdmin, updateProduct);

router.delete("/delete/:id", auth, isAdmin, deleteProduct);
router.delete("/latest/delete/:id", auth, isAdmin, deleteLatestProduct);

router.get("/:id", getProductById);


export default router;