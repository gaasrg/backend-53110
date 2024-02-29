import { promises as fs } from 'fs';

class CartManager {
    constructor() {
        this.path = '.cart.json';
    }

    async getId() {
        const productsD = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(productsD);
        const maxId = data.carrito.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }
}

class CartProduct extends CartManager {
    constructor() {
        super();
    }
    async getCartById(id) {
        const product = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const cp = product.carrito
        const idExists = cp.filter((product) => product.id === id);

        return idExists.length > 0 ? { success: true, message: idExists } : { success: false, message: "No existente" };
    }

    async addProducts() {
        const productsD = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(productsD);

        const newCart = { id: await this.getId(), products: [] }
        data.carrito.push(newCart)
        await fs.writeFile(this.path, JSON.stringify(data));

        return { success: true, message: `Producto creado exitosamente` }

    }

    async addProductByProduct(cid, pid) {
        const productsD = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(productsD);
        const index = data.carrito.findIndex((prod) => prod.id === cid);

        if (index !== -1) {
            const dataCart = data.carrito[index]
            const productIndex = dataCart.products.findIndex((prod) => prod.product === pid);

            if (productIndex !== -1) {
                dataCart.products[productIndex].quantity++;
            } else {
                dataCart.products.push({ product: pid, quantity: 1 })
            }

            await fs.writeFile(this.path, JSON.stringify(data));

            return { success: true, message: "El producto y su cantidad se ha agragado correctamente" }
        } else {
            return { success: false, message: "No se ha creado el producto" }
        }
    }
}

export default CartProduct;