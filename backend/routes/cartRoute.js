import express from "express"
import auth from "../middleware/authMiddleware.js"
import { cartItems, addToCart, decreaseCartQuantity } from "../controller/cartController.js"
const router = express.Router()

router.get("/", auth, cartItems)
router.post("/addToCart", auth, addToCart)
router.patch("/decreaseCartQuantity", auth, decreaseCartQuantity)



export default router