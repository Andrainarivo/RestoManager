import mysql from 'mysql2';
import { config } from 'dotenv';

config();

// Vérification des variables essentielles
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME'];
requiredEnv.forEach(key => {
    if (!process.env[key]) {
        console.error(`❌ Erreur : La variable ${key} est manquante dans le .env`);
        process.exit(1);
    }
});

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME, // Connexion directe à la base
    port: process.env.DB_PORT || 3306
});

const tableQueries = [
    "CREATE TABLE IF NOT EXISTS employes (employe_id bigint unsigned auto_increment primary key, nom varchar (255) not null, prenom varchar (255) not null, poste varchar(255) not null, salaire varchar(255) not null, email varchar(255) not null, personnel_key varchar(255) not null, pk_status boolean) ENGINE = InnoDB",
    "CREATE TABLE IF NOT EXISTS clients (client_id bigint unsigned auto_increment primary key, nom varchar(255) not null, prenom varchar(255) not null, email varchar(255) not null, password varchar(255) not null) ENGINE = InnoDB",
    "CREATE TABLE IF NOT EXISTS reservations (reservation_id bigint unsigned auto_increment, client_id bigint unsigned not null, date date not null, heure time not null, nombre_personne int not null, status boolean, primary key (reservation_id), constraint FK_ClientReservation foreign key (client_id) references clients(client_id)) ENGINE = InnoDB",
    "CREATE TABLE IF NOT EXISTS menus (menu_id bigint unsigned auto_increment, nom varchar (255) not null, prix bigint unsigned not null, categorie varchar (255) not null, description varchar(255), primary key (menu_id)) ENGINE = InnoDB",
    "CREATE TABLE IF NOT EXISTS commandes (commande_id bigint unsigned auto_increment, client_id bigint unsigned not null, menu_id bigint unsigned not null, genre varchar(255) not null, date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key (commande_id), foreign key (client_id) references clients(client_id), foreign key (menu_id) references menus(menu_id)) ENGINE = InnoDB",
    "CREATE TABLE IF NOT EXISTS stocks (stock_id bigint unsigned auto_increment, menu_id bigint unsigned not null, quantite_dispo int unsigned not null, primary key (stock_id), foreign key (menu_id) references menus(menu_id)) ENGINE = InnoDB",
    "CREATE TABLE IF NOT EXISTS Admin (ID int unsigned auto_increment primary key, Email varchar(255) not null, Username varchar(255) not null, Password varchar(255) not null)"
];

dbConn.connect((err) => {
    if (err) {
        console.error("❌ Erreur de connexion :", err.message);
        process.exit(1);
    }
    console.log(`✅ Connecté à la base '${process.env.DB_NAME}' en tant que '${process.env.DB_USER}'`);

    tableQueries.forEach((query) => {
        dbConn.query(query, (err) => {
            if (err) {
                console.error("❌ Erreur lors de la création d'une table :", err.message);
            } else {
                const tableName = query.match(/exists (\w+)/i)[1];
                console.log(`   - Table '${tableName}' vérifiée/créée.`);
            }
        });
    });

    setTimeout(() => {
        dbConn.end();
        console.log("\n🚀 Structure de la base de données prête.");
    }, 500);
});