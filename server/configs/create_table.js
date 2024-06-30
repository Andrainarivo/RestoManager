/* -- Création des tables : empoloyes, clients, reservations, menus, commandes, tables, ((timeservice, payements)), stocks et amdin -- */

import { createConnection } from 'mysql';
import { config } from 'dotenv';

config();

// configuration de la connection à la base de donnée
const dbConn = createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//requetes sql
function create_table_employe(){
    return "create table if not exists employes (employe_id bigint unsigned auto_increment primary key, nom varchar (255) not null, prenom varchar (255) not null, poste varchar(255) not null, salaire varchar(255) not null, email varchar(255) not null, personnel_key varchar(255) not null, pk_status boolean)ENGINE = InnoDB";
};

function create_table_client(){
    return "create table if not exists clients (client_id bigint unsigned auto_increment primary key, nom varchar(255) not null, prenom varchar(255) not null, email varchar(255) not null, password varchar(255) not null)ENGINE = InnoDB";
};

function create_table_reservation(){
    return "create table if not exists reservations (reservation_id bigint unsigned auto_increment, client_id bigint unsigned not null, date date not null, heure time not null, nombre_personne int not null, status boolean, primary key (reservation_id), constraint FK_ClientReservation foreign key (client_id) references gestion_resto.clients(client_id))ENGINE = InnoDB";
};

function create_table_menu(){
    return "create table if not exists menus (menu_id bigint unsigned auto_increment, nom varchar (255) not null, prix bigint unsigned not null, categorie varchar (255) not null, description varchar(255), primary key (menu_id))ENGINE = InnoDB";
};

function create_table_commande(){
    return "create table if not exists commandes (commande_id bigint unsigned auto_increment, client_id bigint unsigned not null, menu_id bigint unsigned not null, genre varchar(255) not null, date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key (commande_id), foreign key (client_id) references gestion_resto.clients(client_id), foreign key (menu_id) references gestion_resto.menus(menu_id))ENGINE = InnoDB";
};

function create_table_stock(){
    return "create table if not exists stocks (stock_id bigint unsigned auto_increment, menu_id bigint unsigned not null, quantite_dispo int unsigned not null, primary key (stock_id), foreign key (menu_id) references gestion_resto.menus(menu_id))ENGINE = InnoDB";
};

function create_table_admin(){
    return "create table if not exists Admin (ID int unsigned auto_increment primary key, Email varchar(255) not null, Username varchar(255) not null, Password varchar(255) not null)";
}

// +tard 
/*function create_table_payement(){
    return "create table if not exists payements (payement_id bigint unsigned auto_increment, client_id bigint unsigned not null, date datetime, total bigint unsigned not null, primary key (payement_id), foreign key (client_id) references gestion_resto.clients(client_id))ENGINE = InnoDB";
}*/

// connection à la base de données
dbConn.connect((error) => {
    if (error) throw error.message;
    console.log(`Database ${dbConn.state}`);

    // execution des requetes sqls
    dbConn.query(create_table_employe(), (error, result) => {
        if (error) throw  error.message;
        if (result.warningCount === 1) console.log("Table employes already exists");
        else console.log("Table employes created successfully");
    });

    dbConn.query(create_table_client(), (error, result) => {
        if (error) throw  error.message;
        if (result.warningCount === 1) console.log("Table clients already exists");
        else console.log("Table clients created successfully");
    });

    dbConn.query(create_table_reservation(), (error, result) => {
        if (error) throw  error.message;
        if (result.warningCount === 1) console.log("Table reservations already exists");
        else console.log("Table reservations created successfully");
    });

    dbConn.query(create_table_menu(), (error, result) => {
        if (error) throw error.message;
        if (result.warningCount === 1) console.log("Table menus already exists");
        else console.log("Table menus created successfully");
    });

    dbConn.query(create_table_commande(), (error, result) => {
        if (error) throw error.message;
        if (result.warningCount === 1) console.log("Table commandes already exists");
        else console.log("Table commandes created successfully");
    });

    dbConn.query(create_table_stock(), (error, result) => {
        if (error) throw error.message;
        if (result.warningCount === 1) console.log("Table stocks already exists");
        else console.log("Table stocks created successfully");
    });

    dbConn.query(create_table_admin(), (error, result) => {
        if (error) throw error.message;
        if (result.warningCount === 1) console.log("Table admin already exists");
        else console.log("Table admin created successfully");
    });

    dbConn.end();
});
