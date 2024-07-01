import dbConn from "../configs/db.config.js";

class Admin {
    constructor(admin) {
        this.Username = admin.username;
        this.Email = admin.email;
        this.Password = admin.password;
    }

    // Méthode pour verifier si un admin existe dans la base de donné
    is_exists(result){
        let sql = "SELECT Email FROM Admin WHERE Email = ?";

        dbConn.query(sql, [this.Email], (err, res) => {
            if (err) {
                result(err, null);
            }
            if (res.length == 0) {
                result(null, false);
            }
            else {
                if (this.Email === res[0].Email){
                    result(null, true);
                }
                else result(null, null)  
            };
        });
    }

    // Méthode pour enregistrer un nouveau Admin
    static save(newAdmin, result) {
        var sql = "INSERT INTO Admin SET ?";

        dbConn.query(sql, newAdmin, (error, res) => {
            if (error) {
                result(error, null);
            } else {
                result(null, res);
            };
        });
    }

    // Méthode pour récupérer tous les admins
    static fetchAll(result) {
        let sql = "SELECT * FROM Admin";

        dbConn.query(sql, (err, res) => {
            if (err){
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }

    // Méthode pour récupérer un admin par son ID
    static findById(id, result) {
        let sql = "SELECT * FROM Admin WHERE ID =?";

        dbConn.query(sql, [id], (err, res) => {
            if (err){
                result(err, null);
            }else{
                result(null, res);
            };
        });
    }

    // Méthode pour mettre à jour les informations d'un admin
    static update(id, admin, result) {
        let sql = "UPDATE Admin SET ? WHERE ID = ?";

        dbConn.query(sql, [admin, id], (err, res) => {
            if (err){
                result(err,null);
            }else{
                result(null, res);
            };
        });
    }

    // Méthode pour supprimer un admin
    static delete(id, result) {
        let sql = "DELETE FROM Admin WHERE ID = ?";

        dbConn.query(sql,[id], (err, res) => {
            if (err){
                result(err,null);
            }else result(null, res);
        });
    }

    // Méthode pour récuperer l'id et le password d'un admin pour l'authentification et la session
    static loadUser(email, result) {
        let sql = "SELECT ID, Password FROM Admin WHERE Email = ?";
        
        dbConn.query(sql, [email], (err, res) => {
            if (err) {
                result(err, null);
            }
            else{
                //console.log(res);
                result(null, res);
            }
        });
    }

}

export default Admin;