// models/client.model.js
import dbPool from '../configs/db.config.js';

class Client {
    constructor(client) {
        this.nom = client.nom;
        this.prenom = client.prenom;
        this.email = client.email;
        this.password = client.password;
    }

    // Plus de paramètre "result" (callback) ! On retourne la valeur directement.
    static async is_exists(email) {
        const sql = "SELECT email FROM clients WHERE email = ?";
        const [rows] = await dbPool.query(sql, [email]);
        return rows.length > 0; // Retourne true si l'email existe, sinon false
    }

    static async save(newClient) {
        const sql = "INSERT INTO clients SET ?";
        const [result] = await dbPool.query(sql, [newClient]);
        return result;
    }

    static async fetchAll() {
        const sql = "SELECT * FROM clients";
        const [rows] = await dbPool.query(sql);
        return rows;
    }

    static async findById(client_id) {
        const sql = "SELECT * FROM clients WHERE client_id = ?";
        const [rows] = await dbPool.query(sql, [client_id]);
        return rows.length ? rows[0] : null; // Retourne l'objet client ou null
    }

    static async update(client_id, clientData) {
        const sql = "UPDATE clients SET ? WHERE client_id = ?";
        const [result] = await dbPool.query(sql, [clientData, client_id]);
        return result;
    }

    static async delete(client_id) {
        const sql = "DELETE FROM clients WHERE client_id = ?";
        const [result] = await dbPool.query(sql, [client_id]);
        return result;
    }

    static async loadUser(email) {
        const sql = "SELECT client_id, password FROM clients WHERE email = ?";
        const [rows] = await dbPool.query(sql, [email]);
        return rows.length ? rows[0] : null;
    }
}

export default Client;