import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
// middleware d'authentification token
export function authentificateToken (req, res, next) {
    const token = req.headers['authorization'];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        //req.user = user;
        next();
    });
}

// middleware d'autorisation pour tous les employes
export function authorizeEmploye(req, res, next) {
    const poste = ['Chef-Cuisinier', 'Cuisinier', 'Server', 'Others'];

    for (let i = 0; i < poste.length; i++) {
        if (req.session.role !== poste[i]){
            return res.sendStatus(403);
        }
        break;
    }
    next();
    
}

// middleware d'autorisation pour les chef-cuisinier
export function authorizeChef(req, res, next) {
    if (req.session.role !== 'Chef-Cuisinier') {
        res.status(403).send('Non authentifié')
        return;
    }
    next();
}

// middleware d'autorisation pour les cuisiniers
export function authorizeCuisinier(req, res, next) {
    if (req.session.role !== 'Cuisinier') {
        return res.sendStatus(403);
    }
    next();
}

// middleware d'autorisation pour les serveurs
export function authorizeServer(req, res, next) {
    if (req.session.role !== 'Serveur') {
        return res.sendStatus(403);
    }
    next();
}

// middleware d'autorisation pour les autres employes (à definir plus tard)
export function authorizeOther(req, res, next) {
    if (req.session.role !== 'Others') {
        return res.sendStatus(403);
    }
    next();
}