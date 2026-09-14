import mongoose from "mongoose"
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, role, password } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (email !== undefined) {
            if (!email.includes("@")) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email"
                });
            }

            const existingUser = await User.findOne({ email, _id: { $ne: id } });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "User with this email already exists"
                });
            }

            user.email = email;
        }

        if (role !== undefined) {
            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: "Role must be user or admin"
                });
            }
            user.role = role;
        }

        if (password !== undefined && String(password).trim() !== "") {
            if (String(password).length < 6 || String(password).length > 16) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be between 6 and 16 characters"
                });
            }

            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                _id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, role = "user" } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        if (typeof password !== "string" || password.length < 6 || password.length > 16) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 6 and 16 characters"
            });
        }

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role must be user or admin"
            });
        }

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const login = async function (req, res) {

    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.json({ sucess: false, message: "email and password is Invalid ! " })
        }

        const isExist = await User.findOne({ email });

        // 2. Find user
        if (!isExist) {
           return  res.status(400).json({
                sucess: false,
                message: "user is not Exist"
            })
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, isExist.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 4. generate jwt
        const token = jwt.sign({
            id: isExist._id,
            role: isExist.role
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        // 5. Success response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                userId: isExist._id,
                email: isExist.email,
                role: isExist.role
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}
const register = async function (req, res) {
    try {
        const { email, password } = req.body;

        // 1. Empty field check
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // 2. Email validation
        if (!email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        // 3. Password validation
        if (typeof password != "string" || password.length < 6 || password.length > 16) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 6 and 16 characters or must be a string ! "
            });
        }

        // 4. Check existing user
        const isExist = await User.findOne({ email });

        if (isExist) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // 5. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // 6. Create user
        const user = await User.create({
            email,
            password: hashedPassword
        });

        // 7. Success response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                userId: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export { login, register, getAllUsers, updateUser, deleteUser, createUser, getCurrentUser }
