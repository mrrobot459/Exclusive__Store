import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

const adminOverview = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin panel ready",
    options: {
      users: {
        list: "GET /api/admin/users",
        details: "GET /api/admin/users/:id",
        update: "PATCH /api/admin/users/:id",
        password: "PATCH /api/admin/users/:id/password",
        delete: "DELETE /api/admin/users/:id"
      },
      products: {
        list: "GET /api/admin/products",
        create: "POST /api/admin/products",
        update: "PUT /api/admin/products/:id",
        delete: "DELETE /api/admin/products/:id"
      }
    }
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(id, { password: 0 });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch user", error: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(409).json({ success: false, message: "Email already in use" });
      }
      user.email = email;
    }

    if (role) {
      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ success: false, message: "Role must be user or admin" });
      }
      user.role = role;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: { _id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update user details", error: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    if (!password || typeof password !== "string" || password.length < 6 || password.length > 16) {
      return res.status(400).json({ success: false, message: "Password must be between 6 and 16 characters" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return res.status(200).json({ success: true, message: "User password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update user password", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    if (req.user && req.user.id === id) {
      return res.status(400).json({ success: false, message: "You cannot delete your own admin account" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete user", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    if (!name || !description || price === undefined || !category || stock === undefined || !image) {
      return res.status(400).json({ success: false, message: "All product fields are required" });
    }

    const product = await Product.create({ name, description, price, category, stock, image });

    return res.status(201).json({ success: true, message: "Product created successfully", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
  }
};

export {
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
};
