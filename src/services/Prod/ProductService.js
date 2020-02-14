
class ProductService {

    constructor(networkingService) {
        this.networkingService = networkingService
    }

    createProduct(name, price, seller, description, photoUrl, productLink) {
        let post = {
            name,
            price,
            seller: seller.name,
            sellerUrl: seller.url,
            description,
            productLink,
            photoUrl
        }
        return this.networkingService.networkCall('post', 'products', post)
    }

    fetchProducts = () => {
        return this.networkingService.networkCall("get", "products")
    }

    fetchProductById = id => {
        return this.networkingService.networkCall("get", `products/${id}`)
    }

    updateProduct = (id, updates) => {
        return this.networkingService.networkCall("put", `products/${id}`, updates)
    }

    deleteProductWithId = id => {
        return this.networkingService.networkCall("delete", `products/${id}`)
    }
}

export default ProductService