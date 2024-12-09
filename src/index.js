import app from './app.js'
import {connectDB} from './db.js'
connectDB();
const port = process.env.PORT || 3000; // Si no hay un puerto en el entorno, usa 3000.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
console.log("server on port ", 3000); 