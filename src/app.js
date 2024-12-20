import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
import taskRoutes   from "./routes/tasks.routes.js";
import cors  from "cors";

const app = express()
app.use(cors({
  origin: [
    'https://proyecto-sena-frontend.onrender.com'
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
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