import pg from 'pg';

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    } else {
        const pool = new pg.Pool({
            connectionString: "postgres://zzkfaepg:Hv9H6mjjirpJih4907FfwwAnjCthHTVN@lallah.db.elephantsql.com/zzkfaepg"
        });
        global.connection = pool;
        return pool.connect();
    }
}

export {
    connect
}