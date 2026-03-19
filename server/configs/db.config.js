// configs/db.config.js
import mysql from 'mysql2/promise'; // <-- Ajout de /promise
import { config } from 'dotenv';

config();

// Création d'un pool de connexions (plus performant)
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test rapide de la connexion
try {
    const connection = await dbPool.getConnection();
    console.log(`✅ Pool de base de données connecté ! (Base: ${process.env.DB_NAME})`);
    connection.release(); // On libère la connexion pour qu'elle retourne dans le pool
} catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error.message);
}

export default dbPool;