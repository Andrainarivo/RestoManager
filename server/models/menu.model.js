import dbConn from '../configs/db.config.js';

class Menu{
    constructor(menu){
        this.nom = menu.nom;
        this.prix = menu.prix;
        this.categorie = menu.categorie;
        this.description = menu.description;
    };

    // Méthode pour enregistrer un nouveau menu
    static create(newMenu, result){
        let sql = "insert into menus set ?";

        dbConn.query(sql, newMenu, (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Récuperer un menu par son ID
    static findbyId(menu_id, result){
        let sql = "select * from menus where menu_id = ?";

        dbConn.query(sql, [menu_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer tous les menus
    static findAll(result){
        let sql = "select * from menus";

        dbConn.query(sql, (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour mettre à jour les info d'un menu
    static update(menu_id, menu, result){
        let sql = "update menus set ? where menu_id = ?";

        dbConn.query(sql, [menu, menu_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

     // Méthode pour mettre à jour partialement les info d'un menu
     static patch(menu_id, menu, result){
        let sql = "update menus set ? where menu_id = ?";

        dbConn.query(sql, [menu, menu_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour supprimer un menu
    static delete(menu_id, result){
        let sql = "delete from menus where menu_id = ?";

        dbConn.query(sql, [menu_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer les menus du meme categorie
    static findByCategorie(categorie, result){
        let sql = "select * from menus where categorie = ?";

        dbConn.query(sql, [categorie], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }
}

export default Menu;