import ProductService from "../services/product.service.js";

async function createProduct(req, res, next) {
    try {
        let product = req.body;
        if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error("Name, Description, Value, Stock e SupplierId são campos obrigatórios")
        }

        product = await ProductService.createProduct(product);
        res.send(product);
        global.logger.info(`POST /product - ${JSON.stringify(product)}`);
    } catch (err) {
        next (err);
    }
}

async function getProducts(req, res, next) {
    try {
        res.send(await ProductService.getProducts());
        global.logger.info("Get /products")
    } catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        res.send(await ProductService.getProduct(req.params.id));
        global.logger.info(`GET /product ${req.params.id}`)
    } catch (err) {
        next(err);
    }
}

async function deleteProduct(req, res, next) {
    try {
        await ProductService.deleteProduct(req.params.id)
        res.end();
        global.logger.info(`DELETE /product ${req.params.id}`)
    } catch (err) {
        next(err);
    }
}

async function updateProduct(req, res, next) {
    try {
        let product = req.body;
        if (!product.productId || !product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
            throw new Error("Name, Description, Value, Stock e SupplierId são campos obrigatórios")
        }

        product = await ProductService.updateProduct(product);
        res.send(product);
        global.logger.info(`PUT /product - ${JSON.stringify(product)}`);
    } catch (err) {
        next(err);
    }
}

async function getProductsInfo(req, res, next) {
    try {
        res.send(await ProductService.getProductsInfo());
        global.logger.info("GET /product/info");
    } catch (err) {
        next(err);
    }
}

async function deleteProductInfo(req, res, next) {
    try {
        let { id } = req.params;
        res.send(await ProductService.deleteProductInfo(parseInt(id)));
        global.logger.info("DELETE /product/info");
    } catch (err) {
        next(err);
    }
}

async function createProductInfo(req, res, next) {
    try {
        let productInfo = req.body;
        if (!productInfo.productId) {
            throw new Error("Product ID é obrigatório!");
        }
        await ProductService.createProductInfo(productInfo);
        res.end();

        global.logger.info(`POST /product/info - ${JSON.stringify(productInfo)}`);
    } catch (err) {
        next(err);
    }
}

async function updateProductInfo(req, res, next) {
    try {
        let productInfo = req.body;
        if (!productInfo.productId) throw new Error("Product ID é obrigatório!");
        await ProductService.updateProductInfo(productInfo);
        res.end();

        global.logger.info(`PUT /product/info - ${JSON.stringify(productInfo)}`);
    } catch (err) {
        next(err);
    }
}

async function createReview(req, res, next) {
    try {
        let { review, productId } = req.body;
        if (!review || !productId) throw new Error("Product ID e review são obrigatórios");

        await ProductService.createReview(review, productId);
        res.end();

        global.logger.info("POST /product/review");
    } catch (err) {
        next(err);
    }
}

async function deleteReview(req, res, next) {
    try {
        let { id, index } = req.params;
        await ProductService.deleteReview(id, index);
        res.end();

        global.logger.info(`DELETE /product/${id}/review/${index}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}