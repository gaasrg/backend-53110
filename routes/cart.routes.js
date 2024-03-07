import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import __dirname from '../utils.js';
export const router = Router();
let ruta = path.join(__dirname, 'data', 'carts.json');
const productsPath = path.join(__dirname, 'data', 'exported_products.json');

function getProducts() {
    if (fs.existsSync(productsPath)) {
        return JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    } else {
        return [];
    }
}

function getCarts() {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
    } else {
        return [];
    }
}

function saveCarts(carts) {
    fs.writeFileSync(ruta, JSON.stringify(carts, null, 5));
}

function getNextCartId() {
    const carts = getCarts();
    if (carts.length === 0) {
        return 1;
    } else {
        const maxId = Math.max(...carts.map(cart => cart.id));
        return maxId + 1;
    }
}

router.post("/", (req, res) => {
    const carts = getCarts();

    const newCartId = getNextCartId();

    const newCart = {
        id: newCartId.toString(),
        products: req.body.products || []
    };

    carts.push(newCart);

    saveCarts(carts);

    res.status(201).json({ newCart });
});

router.get("/:cid", (req, res) => {
    let carts = getCarts();
    let cartId = req.params.cid.toString();
    let cart = carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json({ products: cart });
});

router.post("/:cid/product/:pid", (req, res) => {
    const carts = getCarts();
    const cartId = req.params.cid.toString();
    const productId = parseInt(req.params.pid);
    const products = getProducts();

    const cart = carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productToAdd = products.find(p => p.id === productId);
    if (!productToAdd) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    const existingProductIndex = cart.products.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
    } else {
        cart.products.push({ id: productId, quantity: 1 });
    }

    saveCarts(carts);
    res.json({ cart });
});

export default router;