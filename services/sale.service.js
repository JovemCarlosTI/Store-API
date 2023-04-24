import saleRepository from "../repositories/sale.repository.js";
import clientRepository from '../repositories/client.repository.js';
import productRepository from '../repositories/product.repository.js';

async function createSale(sale) {
    // Validação de client_id e product_id
    if (!await clientRepository.getClient(sale.client_id)) {
        throw new Error("O client_id não existe")
    }

    const product = await productRepository.getProduct(sale.product_id)

    if (!product) {
        throw new Error("O product_id não existe")
    }

    if (product.stock > 0) {
        sale = await saleRepository.insertSale(sale);

        // Redução no estoque
        product.stock--;
        await productRepository.updateProduct(product);

        return sale;
    } else {
        throw new Error("Produto indisponível no estoque")
    }
}

async function getSales() {
    return await saleRepository.getSales();
}

async function getSale(id) {
    return await saleRepository.getSale(id);
}

async function deleteSale(id) {
    await saleRepository.deleteSale(id);
}

async function updateSale(sale) {
    // Validação de client_id e product_id
    if (!await clientRepository.getClient(sale.client_id)) {
        throw new Error("O client_id não existe")
    }
    if (!await productRepository.getProduct(sale.product_id)) {
        throw new Error("O product_id não existe")
    }

    return await saleRepository.updateSale(sale);
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}