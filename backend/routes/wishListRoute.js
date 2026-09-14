import express from "express";

import {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    checkWishlist
} from "../controller/wishListController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/add/:productId",
    authMiddleware,
    addToWishlist
);

router.delete(
    "/remove/:productId",
    authMiddleware,
    removeFromWishlist
);

router.get(
    "/",
    authMiddleware,
    getWishlist
);

router.get(
    "/check/:productId",
    authMiddleware,
    checkWishlist
);

export default router;