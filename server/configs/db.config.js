import mysql from 'mysql';
import { config } from 'dotenv';

config();

// configuration de la connection à la base de donnée
const dbConn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});

// connection à la base de données
dbConn.connect( (error) => {
    if (error) throw error.message;
    console.log(`Database ${dbConn.state}`);
});


//exportation du module
export default dbConn;