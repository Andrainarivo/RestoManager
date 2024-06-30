import dbConn from "../configs/db.config.js";

// ServerReservation (pour les employes) et ClientReservation (pour les clients)

export class ServerReservation {
    constructor(reservation){
        this.client_id = reservation.client_id;
        this.date = reservation.date;
        this.heure = reservation.heure;
        this.nombre_personne = reservation.nombre_personne;
        this.status = 0 // zero pour en attente et 1 pour confirmé (en cas d'annulation utiliser la methode delete)
    }

    

    // Méthode pour enregistrer une nouvelle reservation
    static create(email, newReservation, result){
        let sql = "insert into reservations set ?";
        let client_sql = "select client_id from clients where email = ?";
        let clientId = 0;

        dbConn.query(client_sql, [email], (err, res) => {
            try {
                if (err){
                    console.log(err.message);
                } else {
                    clientId += res[0].client_id;
                    newReservation.client_id = clientId;
                    
                    dbConn.query(sql, newReservation, (err, res) => {
                        if (err) result(err, null);
                        result(null, res);
                    });
                };
            } catch (TypeError) {
                err = 'Veuillez renseigner tous les champs correctement et entrer une adresse mail valide';
                try {
                    result(err, null);
                } catch (error) {
                    console.log(error.message);
                };
            };
        });

        
    }

    // Méthode pour récuperer  une reservation par son ID
    static findById(reservation_id, result){
        let sql = "select * from reservations where reservation_id = ?";

        dbConn.query(sql, [reservation_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour recuperer toutes les reservations
    static findAll(result){
        let sql = "select * from reservations";

        dbConn.query(sql, (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour mettre à jour les informations d'une reseravation
    static update(reservation_id, reservation, result){
        let sql = "update reservations set ?";

        dbConn.query(sql, [reservation, reservation_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour supprimer une reservation
    static delete(reservation_id, result){
        let sql = "delete from reservations where reservation_id = ?";

        dbConn.query(sql, [reservation_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour recuperer toutes les reservations d'un client par son clientId
    static findClientReservation(client_id, result){
        let sql = "select * from reservations where client_id = ?";

        dbConn.query(sql, [client_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour changer la status à 1 si le client a confirrmé
    static changeStatus(reseravation_id, result){
        let sql = "update reservations set status = 1 where reservation_id = ?";

        dbConn.query(sql, [reseravation_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }
}

export class ClientReservation {
    constructor(reservation) {
        this.client_id = reservation.client_id;
        this.date = reservation.date;
        this.heure = reservation.heure;
        this.nombre_personne = reservation.nombre_personne;
        this.status = 1;
    };

    // Méthode pour faire une nouvelle reservation
    static make(newReservation, result){
        let sql = "insert into reservations set ?";

        dbConn.query(sql, newReservation, (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour mettre à jour les informations d'une reseravation
    static update(client_id, reservation_id, reservation, result){
        let sql = "update reservations set ?";

        dbConn.query(sql, [client_id, reservation, reservation_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour supprimer une reservation
    static delete(client_id, reservation_id, result){
        let sql = "delete from reservations where client_id = ? and reservation_id = ?";

        dbConn.query(sql, [client_id, reservation_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour recuperer toutes les reservations d'un client par son clientId
    static findClientReservation(client_id, result){
        let sql = "select * from reservations where client_id = ?";

        dbConn.query(sql, [client_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }
}
