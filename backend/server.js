require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const incomeRoutes = require('./routes/IncomeRoutes')
const expenseRoutes = require('./routes/ExpenseRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const app = express()

const allowedOrigins = [
  "https://fin-calc-beta.vercel.app", 
  "http://localhost:5173",
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["Get", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use(express.json())

connectDB()

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/income', incomeRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`))