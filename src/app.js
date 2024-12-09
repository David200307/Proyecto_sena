import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
import taskRoutes   from "./routes/tasks.routes.js";
import cors  from "cors";

const app = express()
app.use(cors({
  origin: [
      'http://localhost:5173', // URL de desarrollo
      'https://proyecto-sena-frontend.onrender.com', // URL de producción
  ],
  credentials: true,  // Permite el envío de cookies con las solicitudes
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Bienvenido al backend de la aplicación');
  });
app.use("/api", authRoutes);
app.use("/api", taskRoutes);


export default app;