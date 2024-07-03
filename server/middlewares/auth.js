import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();



//lors de l'authentification, on a generé un token pour l'utilisateur (cookie & authorization)
//middleware de verification du token utilisateur
export function authentificateToken(req, res, next) {
    try {
        //const authHeader = req.headers['authorization'];
        //console.log(authHeader);
        const token = req.cookies.token;

        if (token == null) {
            console.log('Provide a token');
            return res.sendStatus(401);
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err.message);
                return res.sendStatus(403);
            }
            req.user = decoded;
            next();
        })
    } catch (TokenExpiredError) {
        return res.send("Token Expired. Connectez-vous à nouveau");
    }
}
