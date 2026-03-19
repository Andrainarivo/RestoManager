import dbPool from "../configs/db.config.js";

class Admin {
    constructor(admin) {
        this.Username = admin.username;
        this.Email = admin.email;
        this.Password = admin.password;
    }

    // Méthode pour verifier si un admin existe dans la base de donné
    static async is_exists(email){
        const sql = "SELECT Email FROM Admin WHERE Email = ?";

        const [rows] = await dbPool.query(sql, [email]);
        return rows.length > 0; // Retourne true si l'email existe, sinon false
    }

    // Méthode pour enregistrer un nouveau Admin
    static async save(newAdmin) {
        const sql = "INSERT INTO Admin SET ?";

        const [result] = await dbPool.query(sql, [newAdmin]);
        return result;
    }

    // Méthode pour récupérer tous les admins
    static async fetchAll() {
        const sql = "SELECT * FROM Admin";
        const [rows] = await dbPool.query(sql);
        return rows;
    }

    // Méthode pour récupérer un admin par son ID
    static async findById(id) {
        const sql = "SELECT * FROM Admin WHERE ID = ?";
        const [rows] = await dbPool.query(sql, [id]);
        return rows.length ? rows[0] : null; // Retourne l'objet admin ou null
    }

    // Méthode pour mettre à jour les informations d'un admin
    static async update(id, admin) {
        const sql = "UPDATE Admin SET ? WHERE ID = ?";
        const [result] = await dbPool.query(sql, [admin, id]);
        return result;
    }

    // Méthode pour supprimer un admin
    static async delete(id) {
        const sql = "DELETE FROM Admin WHERE ID = ?";
        const [result] = await dbPool.query(sql, [id]);
        return result;
    }

    // Méthode pour récuperer l'id et le password d'un admin pour l'authentification et la session
    static async loadUser(email) {
        const sql = "SELECT ID, Password FROM Admin WHERE Email = ?";
        const [rows] = await dbPool.query(sql, [email]);
        return rows.length ? rows[0] : null;
    }

}

export default Admin;