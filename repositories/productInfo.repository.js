import { connect } from "./mongo.db.js";
import ProductInfoSchema from '../schemas/productInfo.schema.js';

async function createProductInfo(productInfo) {
    try {
        const db = await connect();
        const ProductInfo = db.model("ProductInfo", ProductInfoSchema);
        productInfo = new ProductInfo(productInfo);
        await productInfo.save();
    } catch (err) {
        throw err;
    }
}

async function getProductInfo(productId) {
    try {
        const db = await connect();
        const ProductInfo = db.model("ProductInfo", ProductInfoSchema);

        // query.exec()
        return await ProductInfo.findOne({ productId }).exec();
    } catch (err) {
        throw err;
    }
}

async function getProductsInfo() {
    try {
        const db = await connect();
        const ProductInfo = db.model("ProductInfo", ProductInfoSchema);

        // query.exec()
        return await ProductInfo.find({}).exec();
    } catch (err) {
        throw err;
    }
}

async function updateProductInfo(productInfo) {
    try {
        const db = await connect();
        const ProductInfo = db.model("ProductInfo", ProductInfoSchema);
        await ProductInfo.findOneAndUpdate({ productId: productInfo.productId }, productInfo);
    } catch (err) {
        throw err;
    }
}

async function deleteProductInfo(productId) {
    try {
        const db = await connect();
        const ProductInfo = db.model("ProductInfo", ProductInfoSchema);

        // query.exec()
        await ProductInfo.deleteOne({ productId });
    } catch (err) {
        throw err;
    }
}

// Reviews
async function createReview(review, productId) {
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.push(review);
        await updateProductInfo(productInfo);
    } catch (err) {
        throw err;
    }
}

async function deleteReview(productId, index) {
    try {
        const productInfo = await getProductInfo(productId);
        productInfo.reviews.splice(index, 1);
        await updateProductInfo(productInfo);
    } catch (err) {
        throw err;
    }
}

export default {
    createProductInfo,
    updateProductInfo,
    getProductInfo,
    deleteProductInfo,
    getProductsInfo,
    createReview,
    deleteReview
}