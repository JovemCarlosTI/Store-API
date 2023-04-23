import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
    try {
        let client = req.body;
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error("Name, CPF, Phone, Email e address são campos obrigatórios")
        }

        // Client Service

        res.send(await ClientService.createClient(client));
        global.logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next (err);
    }
}

async function getClients(req, res, next) {
    try {
        res.send(await ClientService.getClients());
        logger.info("Get /clients")
    } catch (err) {
        next(err);
    }
}

async function getClient(req, res, next) {
    try {
        res.send(await ClientService.getClient(req.params.id));
        logger.info(`GET /client ${req.params.id}`)
    } catch (err) {
        next(err);
    }
}

async function deleteClient(req, res, next) {
    try {
        await ClientService.deleteClient(req.params.id)
        res.end();
        logger.info(`DELETE /client ${req.params.id}`)
    } catch (err) {
        next(err);
    }
}

export default {
    createClient,
    getClients,
    getClient,
    deleteClient
}