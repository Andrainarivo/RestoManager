// controllers /client.controller.js

import Client from '../models/client.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

// Créer un nouveau client
export function createClient(req, response) {

    if (Object.keys(req.body).length < 3) {
        response.status(400).send({error:true, message:'Renseignez tous les champs requis'});
        return;
    }else{
        let newClient = new Client(req.body);

        // vérifie si le client existe déjà dans la base de donnée
        newClient.is_exists((err, res) => {
            if (err) {
                response.send(err.message);
                return;
            }
            if (res === true) {
                response.status(400).send({message: 'Cette email est déjà enregistrer dans la base de donnée'});
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
                                response.send(err.message);
                                return;
                            }

                            response.status(201).json({error:false, message: 'Client créé avec succès' });
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
    const clientId = req.session.clientID;
    if (Object.keys(req.body).length < 3) {
        return res.status(400).send({error:true, message:'Renseignez tous les champs requis'});
    }else{
        const updatedClient = new Client(req.body);

        Client.update(clientId, updatedClient, (err) => {
            if (err)  return res.send(err.message);
            res.status(200).json({ message: 'Client mis à jour avec succès' });
            return;
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
    
    function generateAccessToken(payload) {
        const options = {expiresIn: '1 days'}
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
    };

    const input = {
        email: req.body.email,
        password: req.body.password
    };

    Client.loadUser(input.email, async (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result.length == 0) {
            return res.send("Email ou password invalide");
        }

        const client = {
            id: result[0].client_id,
            email: input.email,
            password: result[0].password,
            role: 'client'
        };

        // verification du password
        if(await bcrypt.compare(input.password, client.password)){
            // Authentification réussie
            // Generate a JWT with a secret key (for authorization)
            const payload = {id: client.id, role: client.role};
            const token = generateAccessToken(payload);
            res.cookie('token', token, {httpOnly: true, secure: true, SameSite: 'strict'});
            res.json({
                status: "Logged in",
                message: 'Authentification réussie'
            });
            return;
        }else {
                res.status(401).send('Identifiants incorrects');
                return;
            }
        
    });
}

// deconnection
export function logout(req, res) {
    // destroy the user's session to log them out
    req.session.destroy();

    // destroy the user's token
    const token = null
    res.cookie('token', token, {httpOnly: true, secure: true, SameSite: 'strict'});

    res.redirect('/');
}