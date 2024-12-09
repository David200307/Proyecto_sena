import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
import taskRoutes   from "./routes/tasks.routes.js";
import cors  from "cors";

const app = express()
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://tu-frontend.com'  // URL de tu frontend en producción
    : 'http://localhost:3000',   // URL de tu frontend en desarrollo
  credentials: true, // Permite enviar cookies
};

app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Bienvenido al backend de la aplicación');
  });
app.use("/api", authRoutes);
app.use("/api", taskRoutes);


export default app;