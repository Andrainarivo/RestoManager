import dbPool from "../configs/db.config.js";

class Stock {
    constructor(stock) {
        this.menu_id = stock.menu_id;
        this.quantite_dispo = stock.quantite_dispo;
    }

    static async create(newStock) {
        const [result] = await dbPool.query("INSERT INTO stocks SET ?", [newStock]);
        return result;
    }

    static async findAll() {
        const [rows] = await dbPool.query("SELECT * FROM stocks");
        return rows;
    }

    static async findById(id) {
        const [rows] = await dbPool.query("SELECT * FROM stocks WHERE stock_id = ?", [id]);
        return rows.length ? rows[0] : null;
    }

    // Récupérer les stocks par menu_id
    static async findByMenuId(menu_id) {
        const [rows] = await dbPool.query("SELECT * FROM stocks WHERE menu_id = ?", [menu_id]);
        return rows;
    }

    static async getDispo(menu_id) {
        const [rows] = await dbPool.query("SELECT quantite_dispo FROM stocks WHERE menu_id = ?", [menu_id]);
        return rows.length ? rows[0].quantite_dispo : 0;
    }

    // Mettre à jour la quantité disponible d'un stock par menu_id
    static async updateStockByMenu(menu_id, nouvelleQuantite) {
        const [result] = await dbPool.query("UPDATE stocks SET quantite_dispo = ? WHERE menu_id = ?", [nouvelleQuantite, menu_id]);
        return result;
    }

    static async increment(menu_id, nb) {
        const actuel = await this.getDispo(menu_id);
        return await this.updateStockByMenu(menu_id, actuel + parseInt(nb));
    }

    static async decrement(menu_id, nb) {
        const actuel = await this.getDispo(menu_id);
        const nouveau = actuel - parseInt(nb);
        return await this.updateStockByMenu(menu_id, nouveau < 0 ? 0 : nouveau);
    }
    
    static async delete(id) {
        return await dbPool.query("DELETE FROM stocks WHERE stock_id = ?", [id]);
    }
}

export default Stock;