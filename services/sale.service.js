import saleRepository from "../repositories/sale.repository.js";
import clientRepository from '../repositories/client.repository.js';
import productRepository from '../repositories/product.repository.js';

async function createSale(sale) {
    // Validação de clientId e productId
    if (!await clientRepository.getClient(sale.clientId)) {
        throw new Error("O clientId não existe")
    }

    const product = await productRepository.getProduct(sale.productId)

    if (!product) {
        throw new Error("O productId não existe")
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

async function getSales(productId, supplierId) {
    if (productId) {
        return await saleRepository.getSalesByProductId(productId);
    } 
    if (supplierId) {
        return await saleRepository.getSalesBySupplierId(supplierId);
    } else {
        return await saleRepository.getSales();
    }
}

async function getSale(id) {
    return await saleRepository.getSale(id);
}

async function deleteSale(id) {
    const sale = await saleRepository.getSale(id);

    // Validação de venda
    if (sale) {
        const product = await productRepository.getProduct(sale.productId);
        await saleRepository.deleteSale(id);

        // Incremento no estoque
        product.stock++;
        await productRepository.updateProduct(product);
    } else {
        throw new Error("Venda inexistente");
    }
}

async function updateSale(sale) {
    // Validação de clientId e productId
    if (!await clientRepository.getClient(sale.clientId)) {
        throw new Error("O clientId não existe")
    }
    if (!await productRepository.getProduct(sale.productId)) {
        throw new Error("O productId não existe")
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