import { promises as fs } from 'fs';

class ProductManager {
    constructor() {
        this.path = './products.json';
    }

    async getId() {
        const productsD = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(productsD);
        const maxId = data.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }
}

class ProductoData extends ProductManager {
    constructor() {
        super();
    }

    async getProducts() {
        const product = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const pr = product.products;
        const prodActive = pr.filter((prod) => prod.status === true)
        return { success: true, message: prodActive || [] }
    }

    async getProductsById(id) {
        const product = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const idExists = product.products.filter((product) => product.id === id);

        return idExists.length > 0 ? { success: true, message: idExists } : { success: false, message: "No existente" };
    }

    async addProducts(title, description, price, thumbnail, code, stock) {
        const productsD = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(productsD);
        const codeExists = data.products.some((product) => product.code === code);

        if (codeExists) { return { success: false, message: `El código ${code} ya existe en nuestra base de datos` } }
        else if (!title || !description || !price || !thumbnail || !code || !stock) { return { success: false, message: "Es necesario completar todos los datos para agregar un producto." } }
        else {
            const newProducto = { id: await this.getId(), title, description, price, thumbnail, code, stock };
            data.products.push(newProducto);
            await fs.writeFile(this.path, JSON.stringify(data));

            return { success: true, message: `Producto ${title} creado exitosamente` }
        }
    }

    async updateProduct(id, product) {
        const productsD = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(productsD);
        const index = data.products.findIndex((prod) => prod.id === id);

        if (index != -1) {
            const productUpdate = data.products[index];

            if (product.title) productUpdate.title = product.title;
            if (product.description) productUpdate.description = product.description;
            if (product.price) productUpdate.price = product.price;
            if (product.thumbnail) productUpdate.thumbnail = product.thumbnail;
            if (product.code) productUpdate.code = product.code;
            if (product.stock) productUpdate.stock = product.stock;


            await fs.writeFile(this.path, JSON.stringify(data))

            return { success: true, message: `Producto ${product.title} actualizado` }
        } else { return { success: false, message: "Producto no encontrado." } }
    }

    async deleteProducts(id) {
        const productsD = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(productsD);
        const deleteProd = data.products.find((prods) => prods.id === id)

        if (deleteProd) {
            deleteProd.status = false;
            await fs.writeFile(this.path, JSON.stringify(data))
            return { success: true, message: "Producto eliminado." }
        } else {
            return { success: false, message: "Producto no encontrado" }
        }
    }
}

export default ProductoData;