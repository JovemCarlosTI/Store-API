import { connect } from "./repository.js";

async function insertClient(client) {
    const conn = await connect();

    try {
        const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";

        // O comando SQL não é concatenado pra evitar SQL Injection
        const values = [client.name, client.cpf, client.phone, client.email, client.address];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getClients() {
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clients");
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function getClient() {
    const conn = await connect();
    try {

    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function updateClient() {
    const conn = await connect();
    try {

    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

async function deleteClient() {
    const conn = await connect();
    try {

    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export default {
    insertClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}
