import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://david200306:yqp80D7v1EA3jYGJ@proyectosena.0erwo.mongodb.net/?retryWrites=true&w=majority&appName=proyectosena');
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);
    }
};
