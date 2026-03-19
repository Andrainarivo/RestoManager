// controllers /client.controller.js

import Client from '../models/client.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

// Créer un nouveau client
export async function createClient(req, res) {
    try {
        if (Object.keys(req.body).length < 3) {
            return res.status(400).json({ status: "error", message: "Renseignez tous les champs requis" });
        }

        const emailExists = await Client.is_exists(req.body.email);
        if (emailExists) {
            return res.status(400).json({ status: "error", message: "Cet email est déjà enregistré" });
        }

        const newClient = new Client(req.body);
        const salt = await bcrypt.genSalt(10);
        newClient.password = await bcrypt.hash(newClient.password, salt);

        await Client.save(newClient);

        return res.status(201).json({ status: "success", message: "Client créé avec succès" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Erreur serveur", detail: error.message });
    }
}

// Récupérer tous les clients
export async function getAllClients(req, res) {
    try {
        const clients = await Client.fetchAll();
        return res.status(200).json({ status: "success", data: clients });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Impossible de récupérer les clients" });
    }
}

// Récupérer un client par son ID
export async function getClientById(req, res) {
    try {
        const clientId = req.params.id;
        const client = await Client.findById(clientId);
        return res.status(200).json({ status: "success", data: client });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Impossible de récupérer le client" });
    }
}

// Mettre à jour les informations d'un client
export async function updateClient(req, res) {

    try {
        if (Object.keys(req.body).length < 3) {
            return res.status(400).json({ status: "error", message: "Renseignez tous les champs requis" });
        }

        const clientId = req.session.clientID;
        const updatedClient = new Client(req.body);
        await Client.update(clientId, updatedClient);
        return res.status(200).json({ status: "success", message: "Client mis à jour avec succès" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Impossible de mettre à jour le client" });
    }
}

// Supprimer un client
export async function deleteClient(req, res) {
    try {
        const clientId = req.params.id;
        const client = await Client.delete(clientId);
        if (!client) {
            return res.status(404).json({ status: "error", message: "Client non trouvé" });
        }
        return res.status(200).json({ status: "success", message: "Client supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Impossible de supprimer le client" });
    }
}

// Fonction utilitaire pour générer le token JWT avec une durée d'expiration de 1 jour
const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

export async function authenticateClient(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Validation basique des entrées
        if (!email || !password) {
            return res.status(400).json({ 
                status: "error", 
                message: "Email et mot de passe requis" 
            });
        }

        // 2. Recherche de l'utilisateur (Utilise le nouveau modèle avec Promise)
        const user = await Client.loadUser(email);

        // 3. Vérification de l'existence
        if (!user) {
            // Note de sécurité : on ne précise pas si c'est l'email ou le mdp qui est faux
            return res.status(401).json({ 
                status: "error", 
                message: "Identifiants incorrects" 
            });
        }

        // 4. Vérification du mot de passe avec bcrypt (Version await)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                status: "error", 
                message: "Identifiants incorrects" 
            });
        }

        // 5. Authentification réussie : Préparation du payload et du token
        const payload = { 
            id: user.client_id, 
            role: 'client' 
        };
        const token = generateAccessToken(payload);

        // 6. Envoi du cookie et de la réponse
        // Note : secure: process.env.NODE_ENV === 'production' est une bonne pratique
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Mettre à true en HTTPS/Production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 jour en millisecondes
        });

        return res.status(200).json({
            status: "success",
            message: "Authentification réussie",
            user: { id: user.client_id, email: email } // On évite de renvoyer le password haché
        });

    } catch (error) {
        console.error("Erreur Auth:", error);
        return res.status(500).json({ 
            status: "error", 
            message: "Erreur lors de l'authentification",
            detail: error.message 
        });
    }
}

// deconnection
export function logout(req, res) {
    // destroy the user's session to log them out
    if (req.session) {
        req.session.destroy();
    }

    // destroy the user's token
    res.clearCookie('token');

    return res.status(200).json({
        status: "success",
        message: "Successfully logged out"
    });
}