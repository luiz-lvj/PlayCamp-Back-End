import pg from 'pg';

const { Pool } = pg;

const user = "playcampadmin";
const password = "123";
const host = 'localhost';
const port_database = 5432;
const database = 'playcamp';

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default connection;