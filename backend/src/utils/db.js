const { Pool } = require('pg');

// Create a pool of connections
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'myblogdb',
    port: 5432 // Default port for PostgreSQL
});

pool.connect((error, client, release) => {
    if (error) {
        throw error;
    }
    console.log('Successfully connected to the database.');
    release(); // Release the client back to the pool
});

module.exports = pool; // Export the pool for shared use
