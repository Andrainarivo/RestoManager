import dbConn from "../configs/db.config.js";

class Stock {
    constructor(stock){
        this.menu_id = stock.menu_id;
        this.quantite_dispo = stock.quantite_dispo;
    };

    // Méthode pour enregistrer un nouveau stock
    static create(newStock, result){
        let sql = "insert into stocks values ?";

        dbConn.query(sql, newStock, (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer tous les stocks
    static findAll(result){
        let sql = "select * from stocks";
        
        dbConn.query(sql, (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer un stock par son ID
    static findById(stock_id, result){
        let sql = "select * from stocks where stock_id = ?"

        dbConn.query(sql, [stock_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Methode mettre à jour un stock
    static update(stock_id, stock, result){
        let sql = "update stocks set ?";

        dbConn.query(sql, [stock_id, stock], (err, res) =>{
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour supprimer un stock
    static delete(stock_id, result){
        let sql = "delete from stocks where stock_id = ?";

        dbConn.query(sql, [stock_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    } 

    // Methode pour récuperer les stocks sur un plat
    static findByMenuId(menu_id, result){
        let sql = "select * from stocks where menu_id = ?";

        dbConn.query(sql, [menu_id], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour récuperer la quantié dispo d'un menu en stock
    static getDispo(menu_id){
        let sql = "select quantite_dispo from stocks where menu_id = ?";

        dbConn.query(sql, [menu_id], (err, res) => {
            if (err) console.log(err.message);
            return res[0].quantite_dispo
        });
    }

    // Méthode pour incrementer la quantité dispo d'un plat
    static increment(menu_id, nb, result){
        let dispo = Stock.getDispo(menu_id);
        let sql = "update stocks set quantite_dispo = ? where menu_id = ?";
        let value = dispo + nb;

        dbConn.query(sql, [value], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }

    // Méthode pour decrementer la quantité dispo d'un plat
    static decrement(menu_id, nb, result){
        let dispo = Stock.getDispo(menu_id);
        let sql = "update stocks set quantite_dispo = ? where menu_id = ?";
        let value = dispo - nb;

        dbConn.query(sql, [value], (err, res) => {
            if (err) result(err, null);
            result(null, res);
        });
    }
}

export default Stock;