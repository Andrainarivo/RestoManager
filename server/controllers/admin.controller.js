import Admin from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';

config();

// ajouter un nouveau admin
// champs requis: username, email, password
export function addUserAdmin(req, result) {

    if (Object.keys(req.body).length <= 2) {
        result.status(400).json({status:"failed", message:'Please provide all required fields'});
        return;
    }else{
        let newAdmin = new Admin(req.body);

        try {
            // vérifie si l'user admin existe déjà dans la base de donnée
            newAdmin.is_exists((err, res) => {
                if (err) {
                    result.status(err.statusCode).json({
                        status: "error",
                        message: err.message
                    });
                    return;
                }
                if (res === true) {
                    result.status(400).send({
                        status: "failed",
                        data: [],
                        message: 'You already have an account, please log in instead'
                    });
                    return;
                }
                else{
                    // hacher le mot de passe
                    bcrypt.genSalt(10, async (err, salt) =>{
                        if (err) console.log(err.message);
                        await bcrypt.hash(newAdmin.Password, salt, (err, hash) => {
                            if (err) console.log(err.message);
                            newAdmin.Password = hash;

                            // enregistrement du client
                            Admin.save(newAdmin, (err, res)=>{
                                if (err) {
                                    result.status(err.statusCode).json({
                                        error: true,
                                        message: err.message
                                    });
                                    return;
                                }
                                result.status(201).json({
                                    error:false,
                                    message: 'Admin account has been successfully created'
                                });
                                return;
                            });
                        });
                    });
                }
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                code: 500,
                data: [],
                message: err.message
            });
        }       
        
    };
}

// Récupérer tous les admins
export function getAllAdmins(req, res) {
    Admin.fetchAll(function (err, admins){
        if (err) return res.json({
            error: true,
            data: [],
            message: err.message
        });
        res.status(200).json({
            error: false,
            data: admins,
            message: 'List of admin users'
        });
    });
}

// Récupérer un admin par son ID
export function getAdminById(req, res) {
    const id = req.params.id;
    Admin.findById(id, (err, admin) => {
        if (err) return res.json({
            error: true,
            message: err.message
        });
        res.status(200).json({
            error: false,
            data: admin,
            message: 'User Admin'
        });
    });
}

// Mettre à jour les informations d'un admin
// champs requis: all
export function updateAdmin(req, res) {
    const id = req.params.id;
    if (Object.keys(req.body).length <= 2) {
        res.status(400).json({
            error:true,
            message:'Please provide all required fields'
        });
        return;
    }else{
        const updatedAdmin = new Admin(req.body);

        Admin.update(id, updatedAdmin, (err) => {
            if (err) return res.json({
                error: true,
                message: err.message,
            });
            res.status(200).json({
                error: false,
                message: 'User Admin updated successfully'
            });
        });
    }
    
}

// Supprimer un admin
export function deleteAdmin(req, res) {
    const id = req.params.id;

    Admin.delete(id, (err) => {
        if (err) {
            res.json({
                error: true,
                data: [],
                message: err.message
            });
            return;
        }
        res.status(200).json({
            error: false,
            message: 'User Admin deleted successfully'
        });
        return;
    });
}

// Authentification Admin
export function Login(req, res){

    function generateAccessToken(payload) {
        const options = {expiresIn: '2h'}
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
    };

    const input = {
        email: req.body.email,
        password: req.body.password
    };

    Admin.loadUser(input.email, async (err, result) => {
        if (err) {
            res.status(err.statusCode).json({
                error: true,
                message: err.message
            });
            return;
        }

        const admin = {
            id: result[0]['ID'],
            email: input.email,
            password: result[0].Password,
            role: 'admin'
        };

        // comparaison du password
        if(await bcrypt.compare(input.password, admin.password)){
            // Authentification réussie, generation du token pour l'autorization admin
            const payload = {id: admin.id, role: admin.role};
            const token = generateAccessToken(payload);
            res.cookie('token', token, {httpOnly: true, secure: true, SameSite: 'strict'});
            res.status(200).json({
                status: 'success',
                message: 'You have successfully logged in'
            });
            return;
        }else {
                res.status(401).json({
                    status: 'failed',
                    message: 'Invalid email or password. Please try again with the correct credentials'
                });
                return;
            }
        
    });
}

// deconnection
export function Admlogout(req, res) {
    // destroy the user's session to log them out
    req.session.destroy();

    // destroy the user's token
    const token = null
    res.cookie('token', token, {httpOnly: true, secure: true, SameSite: 'strict'});
    
    res.redirect('/');
}