import express from 'express';
import { promises as fs } from 'fs';

const PORT = 4000;

const app = express();
app.use(express.json());

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
    }

    async initialize() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    async saveProducts() {
        await fs.writeFile(this.filePath, JSON.stringify(this.products));
    }

    async addProduct(product) {
        await this.initialize();

        const prod = this.products.find((prod) => prod.code === product.code);
        if (prod) {
            console.log("Producto encontrado");
        } else {
            this.products.push(product);
            this.saveProducts();
        }
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const prod = this.products.find((prod) => prod.id === id);

        if (prod) {
            console.log(prod);
        } else {
            console.log("Producto no encontrado");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex((prod) => prod.id === id);

        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log("Producto eliminado");
        } else {
            console.log("Producto no encontrado");
        }
    }

    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement;
    }
}

class Product {
    constructor(title, description, price, code, stock, thumbnail, categoria) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.thumbnail = thumbnail;
        this.categoria = categoria;
        this.id = Product.incrementarId();
    }

    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement;
    }
}

const path = './productos.json';
const productManager = new ProductManager(path);

app.get('/', (req, res) => {
    res.send("Hola, buenos días");
});

app.get('/products', async (req, res) => {
    await productManager.initialize();
    const { categoria } = req.query;

    if (categoria) {
        const products = productManager.products.filter(prod => prod.categoria.toLowerCase() === categoria.toLowerCase());
        res.send(products);
    } else {
        res.send(productManager.products);
    }
});


app.get('/products/:id', async (req, res) => {
    await productManager.initialize();
    const prod = productManager.products.find(prod => prod.id === parseInt(req.params.id));

    if (prod) {
        res.send(prod);
    } else {
        res.send("Producto no existente");
    }
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});


const product1 = new Product("Iphone", "14", 700, "A2632", 10, [], "Smartphones");
const product2 = new Product("Iphone", "14 Pro", 1000, "A2642", 10, [], "Smartphones");
const product3 = new Product("MacBook", "M2", 1100, "A2652", 10, [], "Computadora");


addProduct(product1);
addProduct(product2);
addProduct(product3);

async function addProduct(product) {
    await productManager.initialize();
    productManager.addProduct(product);
}