const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {})
        console.log("MongoDB Connected SUccessfully")
    } catch (err) {
        console.log("Error Connecting MongoDB", err)
        process.exit(1)
    }
}

module.exports = connectDB