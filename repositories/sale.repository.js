import connect from "./repository.js";
import Sale from '../models/sale.model.js';
import Product from "../models/product.model.js";
import Client from "../models/client.model.js";

async function insertSale(sale) {
    try {
        return await Sale.create(sale);
    } catch (err) {
        throw err;
    }
}

async function getSales() {
    try {
        return await Sale.findAll({
            include: [
                {
                    model: Product
                },
                {
                    model: Client
                }
            ]
        });
    } catch (err) {
        throw err;
    }
}

async function getSalesByProductId(productId) {
    try {
        return await Sale.findAll({
            where: {
                productId
            }, 
            include: [
                {
                    model: Product
                },
                {
                    model: Client
                }
            ]
        })
    } catch (err) {
        throw err;
    }
}

async function getSale(id) {
    try {
        return await Sale.findByPk(id);
    } catch (err) {
        throw err;
    }
}

async function deleteSale(id) {
    const conn = await connect();
    try {
        await conn.query("DELETE FROM sales WHERE saleId = $1", [id]);
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateSale(sale) {
    const conn = await connect();
    try {
        const sql = "UPDATE sales SET value = $1, date = $2, clientId = $3 WHERE saleId = $4 RETURNING *";
        const values = [sale.value, sale.date, sale.clientId, sale.saleId];

        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertSale,
    getSales,
    getSalesByProductId,
    getSale,
    updateSale,
    deleteSale
}
