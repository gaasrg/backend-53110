import { Router } from 'express';
import ProductoData from '../ProductManager.js';

const appRouter = Router();
const productsNews = new ProductoData();

appRouter.get('/', async (req, res) => {
    const product = await productsNews.getProducts();


    if (product.success) {
        const prod = product.message;
        const limit = req.query.limit ? parseInt(req.query.limit) : product.length;
        const productLimit = prod.slice(0, limit);
        res.status(200).send(productLimit)
    }
    else { res.status(400).send("Error al cargar datos") }
})

appRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await productsNews.getProductsById(parseInt(pid));

    if (product.success) {
        res.status(200).send(product.message)
    } else {
        res.status(400).send(product.message)
    }
});

appRouter.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    const product = await productsNews.addProducts(title, description, price, thumbnail, code, stock);

    if (product.success) {
        res.status(200).send(product.message)
    } else {
        res.status(400).send(product.message)
    }
});

appRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const proData = req.body;
    const product = await productsNews.updateProduct(parseInt(pid), proData);

    if (product.success) {
        res.status(200).send(product.message)
    } else { res.status(400).send(product.message) }
})

appRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await productsNews.deleteProducts(parseInt(pid));

    if (product.success) {
        res.status(200).send(product.message)
    } else { res.status(400).send(product.message) }
})

export default appRouter
