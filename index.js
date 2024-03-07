const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.path = './products.json';
        this.loadProductsFromFile();
    }

    getProducts() {
        console.log(this.products);
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeExists = this.products.some((product) => product.code === code);

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("todos los campos son necesarios");
        } else if (codeExists) {
            console.log("el codigo ya existe");
        } else {
            const newProduct = {
                id: this.getNewID(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            this.products.push(newProduct);
            this.saveProductsToFile();
            console.log("Producto guardado");
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProductsToFile();
            console.log("Producto actualizado");
        } else {
            console.log("Producto no encontrado");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProductsToFile();
            console.log("Producto eliminado");
        } else {
            console.log("Producto para eliminar no encontrado");
        }
    }

    getNewID() {
        if (this.products.length === 0) {
            return 1;
        } else {
            const maxID = Math.max(...this.products.map((product) => product.id));
            return maxID + 1;
        }
    }

    saveProductsToFile() {
        const productsJSON = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, productsJSON, 'utf-8');
    }

    loadProductsFromFile() {
        try {
            const fileExists = fs.existsSync(this.path);
            if (fileExists) {
                const productsJSON = fs.readFileSync(this.path, 'utf8');
                this.products = JSON.parse(productsJSON);
            } else {
                console.log("el JSON fue creado");
                fs.writeFileSync(this.path, '[]', 'utf-8');
            }
        } catch (err) {
            console.log("hay un error", err.message);
            this.products = [];
        }
    }

    getProductById(id) {
        const productFound = this.products.find((product) => product.id === id);
        if (productFound) {
            console.log(productFound);
        } else {
            console.log("no encontrado");
        }
    }

    exportProductsToFile(filePath) {
        try {
            const productsJSON = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(filePath, productsJSON, 'utf-8');
            console.log("Productos exportados correctamente al archivo:", filePath);
        } catch (err) {
            console.error("Error al exportar productos:", err);
        }
    }
}

let pr = new ProductManager('products.json');
pr.exportProductsToFile('/data/exported_products.json');

module.exports = ProductManager;
