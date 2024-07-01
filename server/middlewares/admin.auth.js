import jwt from 'jsonwebtoken';

// middleware d'autorisation d'admin
export function authorizeAdmin (req, res, next) {
    if (req.session.adminID && req.session.role === 'admin') {
        next();
    }
    return res.status(403).json({
        status: "Failed",
        message: "Authorization refused !!!"
    });
}