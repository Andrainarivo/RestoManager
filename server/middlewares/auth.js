import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

//lors de l'authentification, on a generé un token pour l'utilisateur (cookie & authorization)
//middleware de verification du token utilisateur
//si le token est valide, on ajoute les infos de l'utilisateur à req.user pour les prochains middlewares ou contrôleurs
export function authentificateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Accès refusé, token manquant' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            const msg = err.name === 'TokenExpiredError' ? "Session expirée" : "Token invalide";
            return res.status(403).json({ message: msg });
        }
        req.user = decoded;
        next();
    });
}
