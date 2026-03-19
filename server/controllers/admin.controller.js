import Admin from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
};

// Ajouter un nouvel admin
export async function addUserAdmin(req, res) {
    try {
        const { username, email, password } = req.body;

        // 1. Validation des champs
        if (!username || !email || !password) {
            return res.status(400).json({
                status: "failed",
                message: 'Please provide all required fields (username, email, password)'
            });
        }

        // 2. Vérification de l'existence
        const emailExists = await Admin.is_exists(email);
        if (emailExists) {
            return res.status(400).json({
                status: "failed",
                message: 'You already have an account, please log in instead'
            });
        }

        // 3. Hachage du mot de passe et sauvegarde
        const newAdmin = new Admin(req.body);
        const salt = await bcrypt.genSalt(10);
        newAdmin.Password = await bcrypt.hash(newAdmin.Password, salt);

        await Admin.save(newAdmin);

        return res.status(201).json({
            status: "success",
            message: 'Admin account has been successfully created'
        });

    } catch (err) {
        console.error("Erreur addUserAdmin:", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            detail: err.message
        });
    }
}

// Récupérer tous les admins
export async function getAllAdmins(req, res) {
    try {
        const admins = await Admin.fetchAll();
        return res.status(200).json({
            status: "success",
            message: 'List of admin users',
            data: admins
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Unable to fetch admins",
            detail: err.message
        });
    }
}

// Récupérer un admin par son ID
export async function getAdminById(req, res) {
    try {
        const id = req.params.id;
        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({
                status: "failed",
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: 'User Admin found',
            data: admin
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Error fetching admin",
            detail: err.message
        });
    }
}

// Mettre à jour les informations d'un admin
export async function updateAdmin(req, res) {
    try {
        const id = req.params.id;
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                status: "failed",
                message: 'Please provide all required fields'
            });
        }

        const updatedAdmin = new Admin(req.body);

        // Si on met à jour le mot de passe, il faut le re-hacher !
        const salt = await bcrypt.genSalt(10);
        updatedAdmin.Password = await bcrypt.hash(updatedAdmin.Password, salt);

        const result = await Admin.update(id, updatedAdmin);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Admin not found or no changes made"
            });
        }

        return res.status(200).json({
            status: "success",
            message: 'User Admin updated successfully'
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Error updating admin",
            detail: err.message
        });
    }
}

// Supprimer un admin
export async function deleteAdmin(req, res) {
    try {
        const id = req.params.id;
        const result = await Admin.delete(id);

        if (result.affectedRows === 0) {
             return res.status(404).json({
                status: "failed",
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: 'User Admin deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Error deleting admin",
            detail: err.message
        });
    }
}

// Authentification Admin
export async function Login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Email and password are required"
            });
        }

        const admin = await Admin.loadUser(email);

        if (!admin) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid email or password. Please try again with the correct credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, admin.Password);

        if (!isMatch) {
             return res.status(401).json({
                status: 'failed',
                message: 'Invalid email or password. Please try again with the correct credentials'
            });
        }

        const payload = { id: admin.ID, role: 'admin' };
        const token = generateAccessToken(payload);

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Adaptatif selon l'environnement
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000 // 2 heures
        });

        return res.status(200).json({
            status: 'success',
            message: 'You have successfully logged in'
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            status: "error",
            message: "Authentication process failed",
            detail: err.message
        });
    }
}

// Déconnexion Admin
export function Admlogout(req, res) {
    if (req.session) {
        req.session.destroy();
    }
    res.clearCookie('token');
    
    // Au lieu d'un redirect (qui est plutôt pour le front-end), on renvoie un JSON pour l'API
    return res.status(200).json({
        status: "success",
        message: "Successfully logged out"
    });
}