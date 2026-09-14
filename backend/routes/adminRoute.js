import express from "express";
import auth from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";
import {
  adminOverview,
  getAllUsers,
  getUserById,
  updateUserDetails,
  updateUserPassword,
  deleteUser,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controller/adminController.js";

const router = express.Router();

router.get("/", auth, isAdmin, adminOverview);
router.get("/users", auth, isAdmin, getAllUsers);
router.get("/users/:id", auth, isAdmin, getUserById);
router.patch("/users/:id", auth, isAdmin, updateUserDetails);
router.patch("/users/:id/password", auth, isAdmin, updateUserPassword);
router.delete("/users/:id", auth, isAdmin, deleteUser);

router.get("/products", auth, isAdmin, getAllProducts);
router.post("/products", auth, isAdmin, createProduct);
router.put("/products/:id", auth, isAdmin, updateProduct);
router.delete("/products/:id", auth, isAdmin, deleteProduct);

export default router;
