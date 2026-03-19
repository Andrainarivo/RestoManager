// models /employe.model.js

import dbPool from '../configs/db.config.js';

function generateRandomPassword(minLength=8, maxLength=12) {
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    };

    return password;
}

class Employe {

    constructor(employe) {
        this.nom = employe.nom;
        this.prenom = employe.prenom;
        this.poste = employe.poste;
        this.salaire = employe.salaire;
        this.email = employe.email;
        this.personnel_key = generateRandomPassword();
        this.pk_status = 0; // personnel_key status: 0 pour non-modifié et 1 dans le cas contraire
    }

    // ajouter un nouveau employe
    static async create(newEmploye){
        const sql = "insert into employes set ?";
        const [result] = await dbPool.query(sql, [newEmploye]);
        return result;
    }

    // récuperer un employe par son id
    static async findById(employe_id){
        const sql = "select * from employes where employe_id = ?";
        const [rows] = await dbPool.query(sql, [employe_id]);
        return rows.length ? rows[0] : null; // Retourne l'objet employe ou null
    }

    // récuperer tous les employés
    static async findAll(){
        const sql = "select * from employes";
        const [rows] = await dbPool.query(sql);
        return rows;
    }

    // mise à jour d'un employé
    static async update(employe_id, employe){
        const sql = "update employes set nom = ?, prenom = ?, poste = ?, salaire = ?, email = ? where employe_id = ?";
        const [result] = await dbPool.query(sql, [employe.nom, employe.prenom, employe.poste, employe.salaire, employe.email, employe_id]);
        return result;
    }

    // suppression d'un employe
    static async delete(employe_id){
        const sql = "delete from employes where employe_id = ?";
        const [result] = await dbPool.query(sql, [employe_id]);
        return result;
    }

    // récuperer l'id, le poste, le pk et le pk_status d'un employe pour l'authentification et la session
    static async loadUser(email) {
        const sql = "select employe_id, poste, personnel_key, pk_status from employes where email = ?";
        const [rows] = await dbPool.query(sql, [email]);
        return rows.length ? rows[0] : null;
    }

    // session emlpoye
    // récuperer ma clé
    static async loadKeys(employe_id) {
        const sql = "select personnel_key from employes where employe_id = ?";
        const [rows] = await dbPool.query(sql, [employe_id]);
        return rows.length ? rows[0] : null;
    }

    // mettre à jour la clé
    static async updateKey(employe_id, newKey) {
        const sql = "update employes set personnel_key = ?, pk_status = 1 where employe_id = ?";
        const [result] = await dbPool.query(sql, [newKey, employe_id]);
        return result;
    }

}

export default Employe;