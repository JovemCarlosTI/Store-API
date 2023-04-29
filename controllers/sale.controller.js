import SaleService from "../services/sale.service.js";

async function createSale(req, res, next) {
    try {
        let sale = req.body;
        if (!sale.value || !sale.date || !sale.clientId || !sale.productId) {
            throw new Error("Value, Date, ClientId e ProductId são campos obrigatórios")
        }

        sale = await SaleService.createSale(sale);
        res.send(sale);
        global.logger.info(`POST /sale - ${JSON.stringify(sale)}`);
    } catch (err) {
        next (err);
    }
}

async function getSales(req, res, next) {
    try {
        res.send(await SaleService.getSales(req.query.productId, req.query.supplierId));
        global.logger.info("Get /sales")
    } catch (err) {
        next(err);
    }
}

async function getSale(req, res, next) {
    try {
        res.send(await SaleService.getSale(req.params.id));
        global.logger.info(`GET /sale ${req.params.id}`)
    } catch (err) {
        next(err);
    }
}

async function deleteSale(req, res, next) {
    try {
        await SaleService.deleteSale(req.params.id)
        res.end();
        global.logger.info(`DELETE /sale ${req.params.id}`)
    } catch (err) {
        next(err);
    }
}

async function updateSale(req, res, next) {
    try {
        let sale = req.body;
        if (!sale.saleId || !sale.value || !sale.date || !sale.clientId || !sale.productId) {
            throw new Error("Sale ID, Value, Date, ClientId e ProductId são campos obrigatórios")
        }

        sale = await SaleService.updateSale(sale);
        res.send(sale);
        global.logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}