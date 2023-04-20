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

export default {
    createClient
}