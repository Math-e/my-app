import knex from 'knex';
import path from 'path';
// Knex migrations: historico do BD

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default connection;

