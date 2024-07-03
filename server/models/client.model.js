// models /client.model.js

import dbConn from '../configs/db.config.js';


class Client {
    constructor(client) {
        this.nom = client.nom;
        this.prenom = client.prenom;
        this.email = client.email;
        this.password = client.password;
    };

    // Méthode pour verifier si un client existe déjà dans la base de donné
    is_exists(result){
        let sql = "select email from clients where email = ?";

        dbConn.query(sql, [this.email], (err, res) => {
            if (err) {
                result(err, null);
            }
            if (res.length == 0) {
                result(null, false);
            }
            else {
                if (this.email === res[0].email){
                    result(null, true);
                }
                else result(null, null)  
            };
        });
    }

    // Méthode pour enregistrer un nouveau client
    static save(newClient, result) {
        var sql = "insert into clients set ?";

        dbConn.query(sql, newClient, (error, res) => {
            if (error) {
                result(error, null);
            } else {
                result(null, res);
            };
        });
    }

    // Méthode pour récupérer tous les clients
    static fetchAll(result) {
        let sql = "select * from clients";

        dbConn.query(sql, (err, res) => {
            if (err){
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }

    // Méthode pour récupérer un client par son ID
    static findById(client_id, result) {
        let sql = "select * from clients where client_id = ?";

        dbConn.query(sql, [client_id], (err, res) => {
            if (err){
                result(err, null);
            }else{
                result(null, res);
            };
        });
    }

    // Méthode pour mettre à jour les informations d'un client
    static update(client_id, client, result) {
        let sql = "update clients set ? where client_id = ?";

        dbConn.query(sql, [client, client_id], (err, res) => {
            if (err){
                result(err,null);
            }else{
                result(null, res);
            };
        });
    }

    // Méthode pour mettre à jour partiallement les informations d'un client
    static patch(client_id, client, result) {
        let sql = "update clients set ? where client_id = ?";

        dbConn.query(sql, [client, client_id], (err, res) => {
            if (err){
                result(err,null);
            }else{
                result(null, res);
            };
        });
    }

    // Méthode pour supprimer un client
    static delete(client_id, result) {
        let sql = "delete from clients where client_id = ?";

        dbConn.query(sql,[client_id], (err, res) => {
            if (err){
                result(err,null);
            }else result(null, res);
        });
    }

    // Méthode pour récuperer l'id et le password d'un client pour l'authentification et la session
    static loadUser(email, result) {
        let sql = "select client_id, password from clients where email = ?";
        
        dbConn.query(sql, [email], (err, res) => {
            if (err) {
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }

}

export default Client;
