import express from "express"
import { login, register, getAllUsers, updateUser, deleteUser, createUser, getCurrentUser } from "../controller/userController.js"
import auth from "../middleware/authMiddleware.js"
import isAdmin from "../middleware/adminMiddleware.js"

const router = express.Router()

router.get("/me", auth, getCurrentUser)
router.get("/user/me", auth, getCurrentUser)
router.get("/user", auth, isAdmin, getAllUsers)
router.get("/users", auth, isAdmin, getAllUsers)
router.post("/user/create", auth, isAdmin, createUser)
router.post("/users/create", auth, isAdmin, createUser)
router.put("/user/update/:id", auth, isAdmin, updateUser)
router.delete("/user/delete/:id", auth, isAdmin, deleteUser)

router.post("/login", login)
router.post("/register", register)

export default router