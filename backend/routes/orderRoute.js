import express from "express"
import auth from "../middleware/authMiddleware.js"
import { getOrder, addOrder } from "../controller/orderController.js"
const router = express.Router()

router.get("/", auth, getOrder)
router.post("/addOrder", auth, addOrder)



export default router