import productRepository from "../repositories/product.repository.js";
import supplierRepository from "../repositories/supplier.repository.js";
import saleRepository from '../repositories/sale.repository.js';
import productInfoRepository from "../repositories/productInfo.repository.js";

async function createProduct(product) {
    if (await supplierRepository.getSupplier(product.supplierId)) {
        return await productRepository.insertProduct(product);
    } else {
        throw new Error(`O supplierId ${product.supplierId} informado não existe`);
    }
}

async function getProducts() {
    return await productRepository.getProducts();
}

async function getProduct(id) {
    return await productRepository.getProduct(id);
}

async function deleteProduct(id) {
    const sale = saleRepository.getSalesByProductId(id);
    if (sale.length > 0) throw new Error("Não é possível excluir o produto pois ele já tem vendas.");

    await productRepository.deleteProduct(id);
}

async function updateProduct(product) {
    if (await supplierRepository.getSupplier(product.supplierId)) {
        return await productRepository.updateProduct(product);
    } else {
        throw new Error(`O supplierId ${product.supplierId} informado não existe`);
    }
}

async function createProductInfo(productInfo) {
    await productInfoRepository.createProductInfo(productInfo);
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo
}