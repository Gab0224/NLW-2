import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') // sqlite file
    },
    migrations:{
        directory : path.resolve(__dirname, 'src', 'database', 'migrations') // migrations directory
    },
    useNullAsDefault: true
}