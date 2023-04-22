import { connect } from "./repository.js";

async function insertClient(client) {
    const conn = await connect();
    const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    // O comando SQL não é concatenado pra evitar SQL Injection
    const values = [client.name, client.cpf, client.phone, client.email, client.address];
    const res = await conn.query(sql, values);

    return res.rows[0];
}

export default {
    insertClient
}
