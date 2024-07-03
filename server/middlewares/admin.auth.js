import jwt from 'jsonwebtoken';

// middleware d'autorisation d'admin
export function authorizeAdmin (req, res, next) {
    if (req.user.role === 'admin') {
        req.session.adminID = req.user.id;
        next();
    }
    return res.sendStatus(403);
}