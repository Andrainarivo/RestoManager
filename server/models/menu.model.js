import dbPool from '../configs/db.config.js';

class Menu {
    constructor(menu) {
        // On ne définit que si les valeurs existent pour éviter d'écraser par du "undefined"
        if (menu.nom) this.nom = menu.nom;
        if (menu.prix) this.prix = menu.prix;
        if (menu.categorie) this.categorie = menu.categorie; // Ex: "entrée", "plat", "dessert"
        if (menu.description) this.description = menu.description;
    };

    static async create(newMenu) {
        const [result] = await dbPool.query("INSERT INTO menus SET ?", [newMenu]);
        return result;
    }

    static async findById(menu_id) {
        const [rows] = await dbPool.query("SELECT * FROM menus WHERE menu_id = ?", [menu_id]);
        return rows.length ? rows[0] : null;
    }

    static async findAll() {
        const [rows] = await dbPool.query("SELECT * FROM menus");
        return rows;
    }

    // Une seule méthode pour PUT et PATCH suffit grâce à l'objet dynamique
    static async update(menu_id, menuData) {
        const [result] = await dbPool.query("UPDATE menus SET ? WHERE menu_id = ?", [menuData, menu_id]);
        return result;
    }

    static async delete(menu_id) {
        const [result] = await dbPool.query("DELETE FROM menus WHERE menu_id = ?", [menu_id]);
        return result;
    }

    static async findByCategorie(categorie) {
        const [rows] = await dbPool.query("SELECT * FROM menus WHERE categorie = ?", [categorie]);
        return rows;
    }
}

export default Menu;