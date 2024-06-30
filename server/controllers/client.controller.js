// controllers /client.controller.js

import Client from '../models/client.model.js';
import bcrypt from 'bcrypt';

// Créer un nouveau client
export function createClient(req, result) {

    if (Object.keys(req.body).length < 3) {
        result.status(400).send({error:true, message:'Renseignez tous les champs requis'});
        return;
    }else{
        let newClient = new Client(req.body);

        // vérifie si le client existe déjà dans la base de donnée
        newClient.is_exists((err, res) => {
            if (err) {
                result.send(err.message);
                return;
            }
            if (res === true) {
                result.status(400).send({message: 'Cette email est déjà enregistrer dans la base de donnée'});
                return;
            }
            else{
                // Fonction pour hacher le mot de passe
                bcrypt.genSalt(10, async (err, salt) =>{
                    if (err) console.log(err.message);
                    await bcrypt.hash(newClient.password, salt, (err, hash) => {
                        if (err) console.log(err.message);
                        newClient.password = hash;

                        // enregistrement du client
                        Client.save(newClient, (err, res)=>{
                            if (err) {
                                result.send(err.message);
                                return;
                            }
                            result.status(201).json({error:false, message: 'Client créé avec succès' });
                            return;
                        });
                    });
                });
            }
        });

        
        
    };
}

// Récupérer tous les clients
export function getAllClients(req, res) {
    Client.fetchAll(function (err, clients){
        if (err) res.send(err);
        res.status(200).json(clients);
    });
}

// Récupérer un client par son ID
export function getClientById(req, res) {
    const clientId = req.params.id;
    Client.findById(clientId, (err, client) => {
        if (err) res.send(err.message);
        res.status(200).json(client);
    });
}

// Mettre à jour les informations d'un client
export function updateClient(req, res) {
    const clientId = req.params.id;
    if (Object.keys(req.body).length < 3) {
        res.status(400).send({error:true, message:'Renseignez tous les champs requis'});
    }else{
        const updatedClient = new Client(req.body);

        Client.update(clientId, updatedClient, (err) => {
            if (err) res.send(err.message);
            res.status(200).json({ message: 'Client mis à jour avec succès' });
        });
    }
    
}

// Mettre à jour partiallement les informations d'un client
/*export function patchClient(req,res) {
    const clientId = req.params.id;
    const updatedClient = new Client(req.body);

    Client.patch(clientId, updatedClient, (err) => {
        if (err) res.send(err.message);
        res.status(200).json({ message: 'Client mis à jour avec succès' });
    });
}*/

// Supprimer un client
export function deleteClient(req, res) {
    const clientId = req.params.id;

    Client.delete(clientId, (err) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.status(200).json({ message: 'Client supprimé avec succès' });
        return;
    });
}

// Authentifié un client
export function authentificateClient(req, res){
    const input = {
        email: req.body.email,
        password: req.body.password
    };

    Client.loadUser(input.email, async (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }

        const client = {
            id: result[0].client_id,
            email: input.email,
            password: result[0].password
        };

        // verification du password
        if(await bcrypt.compare(input.password, client.password)){
            // Authentification réussie, enregistrement de l'ID du client dans la session
            req.session.clientID = client.id;
            console.log(req.session);
            res.send('Authentification réussie');
            return;
        }else {
                res.status(401).send('Identifiants incorrects');
                return;
            }
        
    });
}