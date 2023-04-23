import clientRepository from "../repositories/client.repository.js";

async function createClient(client) {
    return await clientRepository.insertClient(client);
}

async function getClients() {
    return await clientRepository.getClients();
}

async function getClient(id) {
    return await clientRepository.getClient(id);
}

async function deleteClient(id) {
    await clientRepository.deleteClient(id);
}

async function updateClient(client) {
    return await clientRepository.updateClient(client);
}

export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}