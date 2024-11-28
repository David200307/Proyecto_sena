import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect ('mongodb://localhost/merndb')
        console.log("dbconect")
    } catch (error) {
        console.log("Error");
    }
}