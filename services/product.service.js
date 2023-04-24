import productRepository from "../repositories/product.repository.js";

async function createProduct(product) {
    return await productRepository.insertProduct(product);
}

async function getProducts() {
    return await productRepository.getProducts();
}

async function getProduct(id) {
    return await productRepository.getProduct(id);
}

async function deleteProduct(id) {
    await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
    return await productRepository.updateProduct(product);
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}