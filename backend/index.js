import express from "express"
import dotenv from "dotenv"
import conDb from "./db/connectDB.js"
import user from "./routes/userRoute.js"
import Product from "./routes/productRoute.js"
import cart from "./routes/cartRoute.js"
import order from "./routes/orderRoute.js"
import wishlist from "./routes/wishListRoute.js"
import cors from "cors"

// Tempory code 
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
// Tempory code 

const app = express()
dotenv.config()
const PORT = process.env.PORT
conDb()
app.use(cors())
app.use(express.json())

app.use("/api/", user)
app.use("/api/product", Product)
app.use("/api/cart", cart)
app.use("/api/order", order)
app.use("/api/wishlist", wishlist)


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})