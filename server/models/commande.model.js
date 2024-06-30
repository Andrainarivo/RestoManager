import dbConn from "../configs/db.config.js";

export class ServerCommande {
    constructor(commande){
        this.client_id = commande.client_id;
        this.menu_id = commande.menu_id;
        this.genre = commande.genre; //Sur place/ à emporter
        this.date = new Date();
    };

    // Méthode pour enregistrer une nouvelle commande
    static create(newCommande, result) {
        let sql = "insert into commandes set ?";

        dbConn.query(sql, newCommande, function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer toutes les commandes
    static findAll(result){
        let sql = "select * from commandes";

        dbConn.query(sql, function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer une commande par son ID
    static findById(commande_id, result){
        let sql = "select * from commandes where commande_id = ?";

        dbConn.query(sql, [commande_id], function(err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour mettre à jour les informations d'une commande
    static update(commande_id, commande, result){
        let sql = "update commandes set ? where commande_id = ?";

        dbConn.query(sql, [commande, commande_id], function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour supprimer une commande par son ID
    static delete(commande_id, result){
        let sql = "delete from commandes where commande_id = ?";

        dbConn.query(sql, [commande_id], function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer toutes commandes d'un client par son clientID
    static findByClientId(client_id, result){
        let sql = "select * from commandes where client_id = ?";

        dbConn.query(sql, [client_id], function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer toutes les commandes sur un menu
    static findByMenuId(menu_id, result){
        let sql = "select * from commandes where menu_id = ?";

        dbConn.query(sql, [menu_id], function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }
}

export class ClientCommande {
    constructor(commande) {
        this.menu_id = commande.menu_id;
        this.genre = commande.genre; // sur place/ à emporter/ à livrer
        this.date = new Date();
    };

    // Méthode pour faire une nouvelle commande
    static make(client_id, newCommande, result) {
        let sql = "insert into commandes set ? where client_id = ?";

        dbConn.query(sql, [newCommande, client_id], function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer les commandes du client par son clientID
    static findMyCommande(client_id, result){
        let sql = "select * from commandes where client_id = ?";

        dbConn.query(sql, [client_id], function (err, res){
            if (err) result(err, null);
            result(null, res);
        });
    }
}