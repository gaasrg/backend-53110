class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
        const prod = this.products.find(prod => prod.code === product.code)

        if (prod) {
            console.log("Producto encontrado")
        } else {
            this.products.push(product)
        }
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const prod = this.products.find(prod => prod.id === id)

        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no encontrado")
        }
    }
}

class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.incrementarId()
    }

    static incrementarId() {

        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const producto1 = new Product("Iphone", "14", 700, "A2632", 10, [])
const producto2 = new Product("Iphone", "14 Pro", 1000, "A2642", 10, [])
const producto3 = new Product("Iphone", "14 pro Max", 1100, "A2652", 10, [])

const productManager = new ProductManager()

productManager.addProduct(producto1)
productManager.addProduct(producto2)
productManager.addProduct(producto3)

productManager.getProducts()

productManager.getProductById(2)