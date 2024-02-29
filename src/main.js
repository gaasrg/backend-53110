import express from 'express';
import { __dirname } from './path.js';
import appRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';


const PORT = 8080;
const app = express();


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/api/products', appRouter);
app.use('/api/cart', cartRouter)

app.listen(PORT, () => {
    console.log(`Server on localhost:${PORT}`)
})