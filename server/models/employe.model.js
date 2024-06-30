// models /employe.model.js

import dbConn from '../configs/db.config.js';

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
    static create(newEmploye, result){
        let sql = "insert into employes set ?";
        dbConn.query(sql, newEmploye, (err, res) => {
            if (err) {
                console.log(err.message);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, res);
            };
        });
    }

    // récuperer un employe par son id
    static findById(employe_id, result){
        let sql = "select * from employes where employe_id = ?";
        dbConn.query(sql, employe_id, (err, res) => {
            if (err) {
                console.log(err.message);
                result(err, null);
            } else {
                console.log(res);
                result(null, res);
            };
        });
    }

    // récuperer tous les employés
    static findAll(result){
        let sql = "select * from employes";

        dbConn.query(sql, function (err, res) {
            if (err) {
                console.log(err.message);
                result(err, null);
            } else {
                console.log("EMPLOYES : ", res);
                result(null, res);
            };
        });
    }

    // mise à jour d'un employé
    static update(employe_id, employe, result){
        let sql = "update employes set nom = ?, prenom = ?, poste = ?, salaire = ?, email = ? where employe_id = ?";

        dbConn.query(sql, [employe.nom, employe.prenom, employe.poste, employe.salaire, employe.email, employe_id], function (err, res){
            if (err) {
                console.log(err.message);
                result(err, null);
            } else {
                console.log(res);
                result(null, res);
            };
        });
    }

    // suppression d'un employe
    static delete(employe_id, result) {
        let sql = "delete from employes where employe_id = ?";

        dbConn.query(sql, [employe_id], function (err, res) {
            if (err) {
                console.log(err.message);
                result(err, null);
            } else {
                console.log(res);
                result(null, res);
            };
        });
    }

    // récuperer l'id, le poste, le pk et le pk_status d'un employe pour l'authentification et la session
    static loadUser(email, result) {
        let sql = "select employe_id, poste, personnel_key, pk_status from employes where email = ?";
        
        dbConn.query(sql, [email], (err, res) => {
            if (err) {
                result(err, null);
            }
            else{
                console.log(res);
                result(null, res);
            }
        });
    }

    // session emlpoye
    // récuperer ma clé
    static loadKeys(employe_id, result) {
        let sql = "select personnel_key from employes where employe_id = ?";
        
        dbConn.query(sql, [employe_id], (err, res) => {
            if (err) {
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }

    // mettre à jour la clé
    static updateKey(employe_id, newKey, result) {
        let sql = "update employes set personnel_key = ?, pk_status = 1 where employe_id = ?";

        dbConn.query(sql, [newKey, employe_id], (err, res) => {
            if (err) result(err,  null);
            result(null, res);
        });
    }

}

export default Employe;