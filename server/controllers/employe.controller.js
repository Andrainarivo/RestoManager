// controllers /employe.controller.js

import Employe from '../models/employe.model.js';
import bcrypt from 'bcrypt';

// Créer un nouveau emlpoyé
export function create(request, result) {

    const newEmploye = new Employe(request.body);

    // verifie si tous les champs requis sont fournis
    if (Object.keys(request.body).length < 5) {
        result.status(400).send({error:true, message: 'Please provide all required fields'});
    } else {
        Employe.create(newEmploye, function (err, res) {
            if (err) {
                result.send(err);
                return;
            } else {
                result.status(201).json({error : false, message : 'Employe added successfully'});
                return;
            };
        });
    };
}

// Récuperer un employé par son ID
export function findById(req, res) {

    Employe.findById(req.params.id, function (err, employe) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.json(employe);
            return;
        };
    });
}

// Récuperer tous les employés
export function findAll(req, res) {

    Employe.findAll(function (err, employes) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(employes);
        return;
    });
}

// Mettre à jour les informations d'un employé
// champs requis: nom, prenom, poste, salaire, email
export function updateEmploye(req, res) {

    const employeId = req.params.id;
    const employe = {
        nom : req.body.nom,
        prenom : req.body.prenom,
        poste : req.body.poste,
        salaire : req.body.salaire,
        email : req.body.email
    };

    if (Object.keys(req.body).length < 4) {
        res.status(400).send({error : true, message : 'Renseigner tous les champs requis'});
        return;
    }
    Employe.update(employeId, employe, function (err) {
        if (err) return res.send(err.message);
        res.status(200).json({error : false, message : 'Employe mis à jour avec succès'});
        return;
    });
}

// Supprimé un employé
export function deleteEmploye(req, res) {
    Employe.delete(req.params.id, function (err) {
        if (err) return res.send(err.message);
        res.json({message : 'Employé supprimé avec succès'});
        return;
    });
}

// recuperer le personnel key
export function getMyKey(req, res) {
    Employe.loadKeys(req.session.employeId, (err, key) => {
        if (err) {
            res.send(err.message);
            return;
        }else{
            res.json(key[0].personnel_key);
            return;
        }
    })
}

// mettre à jour le personnel key
export function updateMyKey(req, res) {
    const employeId = req.session.employeId;
    let newPk = req.body.personnel_key;

    // hacher la nouvelle clé personnel
    bcrypt.genSalt(4, async (err, salt) =>{
        if (err) console.log(err.message);
        await bcrypt.hash(newPk, salt, (err, hash) => {
             if (err) console.log(err.message);
            newPk = hash;

            // maj de la clé
            Employe.updateKey(employeId, newPk, (err, result)=>{
                if (err) {
                    res.send(err.message);
                    return;
                }
                res.status(200).json({error:false, message: 'Votre clé a bien été mis à jour'});
                return;
            });
        });
    });
}

// authentifié un employé
export function authentificateEmploye(req, res) {
    const input = {
        email: req.body.email,
        personnel_key: req.body.personnel_key
    };

    Employe.loadUser(input.email, async (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }

        const employe = {
            id: result[0].employe_id,
            email: input.email,
            poste: result[0].poste,
            personnel_key: result[0].personnel_key,
            pk_status: result[0].pk_status
        };

        if (employe.pk_status === 0) {
            // verification du pk
            if (input.personnel_key === employe.personnel_key){
                // Authentification réussie, enregistrement de l'employe_id et du role(poste) de l'employe dans la session
                req.session.employeId = employe.id;
                req.session.role = employe.poste;
                console.log(req.session);
                res.send('Authentification réussie');
                return;
            }else {
                res.status(401).send('Identifiants incorrects');
                return;
            };
        
        }else{ // si le pk_status est 1 ==> le pk est haché dans la bdd
            if(await bcrypt.compare(input.personnel_key, employe.personnel_key)){
                req.session.employeId = employe.id;
                req.user.role = employe.poste;
                console.log(req.session, req.user.role);
                res.send('Authentification réussie');
                return;
            }else {
                    res.status(401).send('Identifiants incorrects');
                    return;
                };
        };
        
    });
}