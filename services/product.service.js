import productRepository from "../repositories/product.repository.js";
import supplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product) {
    if (await supplierRepository.getSupplier(product.supplier_id)) {
        return await productRepository.insertProduct(product);
    } else {
        throw new Error(`O supplier_id ${product.supplier_id} informado não existe`);
    }
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
    if (await supplierRepository.getSupplier(product.supplier_id)) {
        return await productRepository.updateProduct(product);
    } else {
        throw new Error(`O supplier_id ${product.supplier_id} informado não existe`);
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}