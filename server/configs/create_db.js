// Création de la base donnée

import { createConnection } from 'mysql';
import { config } from 'dotenv';

config();

let db_name = process.env.DATABASE;
let request = "create database if not exists " + db_name;

const dbConn = createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD
});

dbConn.connect((error) => {
    if (error) throw error;
    console.log("MySQL Access Granted");

    dbConn.query(request, (error, result) => {
        if (error) throw error.message;
        if (result.warningCount === 1) console.log(`Database ${db_name} already exist`);
        else console.log(`Database ${db_name} created successfully`);
    });

    dbConn.end();
});
