import Employe from '../models/employe.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2d' });
};

// Créer un nouvel employé
export async function create(req, res) {
    try {
        if (Object.keys(req.body).length < 5) {
            return res.status(400).json({ 
                status: "error", 
                message: 'Please provide all required fields' 
            });
        }

        const newEmploye = new Employe(req.body);
        await Employe.create(newEmploye);

        return res.status(201).json({ 
            status: "success", 
            message: 'Employe added successfully',
            // Optionnel : on peut renvoyer la clé générée pour que l'admin la donne à l'employé
            personnel_key: newEmploye.personnel_key 
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Error creating employe", detail: err.message });
    }
}

// Récupérer un employé par son ID
export async function findById(req, res) {
    try {
        const employe = await Employe.findById(req.params.id);
        if (!employe) {
            return res.status(404).json({ status: "failed", message: "Employé non trouvé" });
        }
        return res.status(200).json({ status: "success", data: employe });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Error fetching employe", detail: err.message });
    }
}

// Récupérer tous les employés
export async function findAll(req, res) {
    try {
        const employes = await Employe.findAll();
        return res.status(200).json({ status: "success", data: employes });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Error fetching employes", detail: err.message });
    }
}

// Mettre à jour les informations d'un employé
export async function updateEmploye(req, res) {
    try {
        const employeId = req.params.id;

        if (Object.keys(req.body).length < 4) {
            return res.status(400).json({ status: "error", message: 'Renseigner tous les champs requis' });
        }

        const employeData = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            poste: req.body.poste,
            salaire: req.body.salaire,
            email: req.body.email
        };

        const result = await Employe.update(employeId, employeData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "failed", message: "Employé non trouvé" });
        }

        return res.status(200).json({ status: "success", message: 'Employe mis à jour avec succès' });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Error updating employe", detail: err.message });
    }
}

// Supprimer un employé
export async function deleteEmploye(req, res) {
    try {
        const result = await Employe.delete(req.params.id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "failed", message: "Employé non trouvé" });
        }

        return res.status(200).json({ status: "success", message: 'Employé supprimé avec succès' });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Error deleting employe", detail: err.message });
    }
}

// Récupérer la clé du personnel (Nécessite session ou token)
export async function getMyKey(req, res) {
    try {
        // Attention: Si vous passez au JWT, il vaudra mieux utiliser req.user.id (issu du token) au lieu de req.session
        const employeId = req.session.employeId; 
        
        const keyData = await Employe.loadKeys(employeId);
        
        if (!keyData) {
            return res.status(404).json({ status: "failed", message: "Clé introuvable" });
        }

        return res.status(200).json({ status: "success", personnel_key: keyData.personnel_key });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Error fetching key", detail: err.message });
    }
}

// Mettre à jour la clé du personnel (changement de mot de passe)
export async function updateMyKey(req, res) {
    try {
        const employeId = req.session.employeId; // Idem ici : à adapter si utilisation 100% JWT
        let newPk = req.body.personnel_key;

        if (!newPk) {
            return res.status(400).json({ status: "error", message: "Nouvelle clé requise" });
        }

        // Hachage avec async/await (tellement plus propre !)
        const salt = await bcrypt.genSalt(10); // Je suis passé de 4 à 10, 4 est trop faible pour la sécurité
        const hashedPk = await bcrypt.hash(newPk, salt);

        await Employe.updateKey(employeId, hashedPk);

        return res.status(200).json({ status: "success", message: 'Votre clé a bien été mise à jour' });
    } catch (err) {
         return res.status(500).json({ status: "error", message: "Error updating key", detail: err.message });
    }
}

// Authentifier un employé
export async function authentificateEmploye(req, res) {
    try {
        const { email, personnel_key } = req.body;

        if (!email || !personnel_key) {
             return res.status(400).json({ status: "error", message: "Email et clé requis" });
        }

        const employe = await Employe.loadUser(email);

        if (!employe) {
            return res.status(401).json({ status: "error", message: 'Identifiants incorrects' });
        }

        let isMatch = false;

        // Logique conditionnelle selon le statut de la clé
        if (employe.pk_status === 0) {
            // Comparaison en texte clair (1ère connexion)
            isMatch = (personnel_key === employe.personnel_key);
        } else {
            // Comparaison hachée
            isMatch = await bcrypt.compare(personnel_key, employe.personnel_key);
        }

        if (!isMatch) {
            return res.status(401).json({ status: "error", message: 'Identifiants incorrects' });
        }

        // Succès !
        const payload = { id: employe.employe_id, role: employe.poste };
        const token = generateAccessToken(payload);

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict' 
        });

        return res.status(200).json({ 
            status: "success", 
            message: 'Authentification réussie',
            requireKeyUpdate: employe.pk_status === 0 // Astuce pour le front-end !
        });

    } catch (err) {
        console.error("Erreur Auth Employé:", err);
        return res.status(500).json({ status: "error", message: "Erreur d'authentification", detail: err.message });
    }
}

// Déconnexion
export function Emplogout(req, res) {
    if (req.session) {
        req.session.destroy();
    }
    
    res.clearCookie('token');
    
    return res.status(200).json({ status: "success", message: "Déconnexion réussie" });
}