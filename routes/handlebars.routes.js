import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

function getProducts(){
    return fs.readFileSync("./data/exported_products.json","utf-8");
}

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/exported_products.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON de productos:', err);
            return res.status(500).send('Error interno del servidor');
        }
        const products = JSON.parse(data);
        res.render('home', { products });
    });
});

router.get('/realtimeproducts', (req, res) => {
    let products = getProducts();
    products = JSON.parse(products)
    res.render("realTimeProducts", { products });
});

export { router };