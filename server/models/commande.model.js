import dbPool from "../configs/db.config.js";

export class ServerCommande {
    constructor(commande) {
        this.client_id = commande.client_id;
        this.menu_id = commande.menu_id;
        this.genre = commande.genre;
        this.date = new Date();
    }

    static async create(newCommande) {
        const [result] = await dbPool.query("INSERT INTO commandes SET ?", [newCommande]);
        return result;
    }

    static async findAll() {
        const [rows] = await dbPool.query("SELECT * FROM commandes");
        return rows;
    }

    static async findById(id) {
        const [rows] = await dbPool.query("SELECT * FROM commandes WHERE commande_id = ?", [id]);
        return rows.length ? rows[0] : null;
    }

    static async update(id, commandeData) {
        const [result] = await dbPool.query("UPDATE commandes SET ? WHERE commande_id = ?", [commandeData, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await dbPool.query("DELETE FROM commandes WHERE commande_id = ?", [id]);
        return result;
    }

    static async findByClientId(client_id) {
        const [rows] = await dbPool.query("SELECT * FROM commandes WHERE client_id = ?", [client_id]);
        return rows;
    }

    static async findByMenuId(menu_id) {
        const [rows] = await dbPool.query("SELECT * FROM commandes WHERE menu_id = ?", [menu_id]);
        return rows;
    }
}

export class ClientCommande {
    // Le client_id est passé lors de la création pour être inclus dans l'objet SQL
    static async make(newCommande) {
        const [result] = await dbPool.query("INSERT INTO commandes SET ?", [newCommande]);
        return result;
    }

    static async findMyCommande(client_id) {
        const [rows] = await dbPool.query("SELECT * FROM commandes WHERE client_id = ?", [client_id]);
        return rows;
    }
}