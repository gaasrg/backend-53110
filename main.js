import { promises as fs } from 'fs';

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

    addProduct(product) {
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
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.thumbnail = thumbnail;
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

const addProduct = async (product) => {
    await productManager.initialize();
    productManager.addProduct(product);
};

const getProducts = async () => {
    await productManager.initialize();
    productManager.getProducts();
};

const getProductById = async (id) => {
    await productManager.initialize();
    productManager.getProductById(id);
};

const deleteProduct = async (id) => {
    await productManager.initialize();
    productManager.deleteProduct(id);
};

const product1 = new Product("Iphone", "14", 700, "A2632", 10, []);
const product2 = new Product("Iphone", "14 Pro", 1000, "A2642", 10, []);
const product3 = new Product("Iphone", "14 Pro Max", 1100, "A2652", 10, []);

addProduct(product1);
addProduct(product2);
addProduct(product3);

getProducts();

getProductById(2);

deleteProduct(4);