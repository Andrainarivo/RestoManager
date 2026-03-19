import dbPool from "../configs/db.config.js";

export class ServerReservation {
    constructor(reservation) {
        this.client_id = reservation.client_id;
        this.date = reservation.date;
        this.heure = reservation.heure;
        this.nombre_personne = reservation.nombre_personne;
        this.status = reservation.status || 0; 
    }

    static async create(email, reservationData) {
        // 1. Trouver le client_id
        const [clients] = await dbPool.query("SELECT client_id FROM clients WHERE email = ?", [email]);
        
        if (clients.length === 0) {
            throw new Error("Client non trouvé avec cet email");
        }

        const clientId = clients[0].client_id;
        
        // 2. Insérer la réservation
        const newRes = { ...reservationData, client_id: clientId };
        const [result] = await dbPool.query("INSERT INTO reservations SET ?", [newRes]);
        return result;
    }

    static async findById(reservation_id) {
        const [rows] = await dbPool.query("SELECT * FROM reservations WHERE reservation_id = ?", [reservation_id]);
        return rows.length ? rows[0] : null;
    }

    static async findAll() {
        const [rows] = await dbPool.query("SELECT * FROM reservations");
        return rows;
    }

    static async update(reservation_id, data) {
        // Cette méthode gère maintenant PUT et PATCH (grâce au SET ?)
        const [result] = await dbPool.query("UPDATE reservations SET ? WHERE reservation_id = ?", [data, reservation_id]);
        return result;
    }

    static async delete(reservation_id) {
        const [result] = await dbPool.query("DELETE FROM reservations WHERE reservation_id = ?", [reservation_id]);
        return result;
    }

    static async findClientReservations(client_id) {
        const [rows] = await dbPool.query("SELECT * FROM reservations WHERE client_id = ?", [client_id]);
        return rows;
    }

    static async changeStatus(reservation_id, status = 1) {
        const [result] = await dbPool.query("UPDATE reservations SET status = ? WHERE reservation_id = ?", [status, reservation_id]);
        return result;
    }
}

export class ClientReservation {
    constructor(reservation) {
        this.client_id = reservation.client_id;
        this.date = reservation.date;
        this.heure = reservation.heure;
        this.nombre_personne = reservation.nombre_personne;
        this.status = reservation.status || 1; // Par défaut, une réservation client est confirmée (status = 1)
    }

    // La logique Client est souvent un sous-ensemble de la logique Server avec une contrainte de client_id
    static async make(newReservation) {
        const [result] = await dbPool.query("INSERT INTO reservations SET ?", [newReservation]);
        return result;
    }

    static async update(client_id, reservation_id, data) {
        const [result] = await dbPool.query(
            "UPDATE reservations SET ? WHERE client_id = ? AND reservation_id = ?", 
            [data, client_id, reservation_id]
        );
        return result;
    }

    static async delete(client_id, reservation_id) {
        const [result] = await dbPool.query(
            "DELETE FROM reservations WHERE client_id = ? AND reservation_id = ?", 
            [client_id, reservation_id]
        );
        return result;
    }

    static async findByClientId(client_id) {
        const [rows] = await dbPool.query("SELECT * FROM reservations WHERE client_id = ?", [client_id]);
        return rows;
    }

    static async changeStatus(client_id, reservation_id, status = 1) {
        const [result] = await dbPool.query(
            "UPDATE reservations SET status = ? WHERE client_id = ? AND reservation_id = ?", 
            [status, client_id, reservation_id]
        );
        return result;
    }
}