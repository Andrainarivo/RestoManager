// Un seul middleware flexible pour remplacer les "OU"
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé : privilèges insuffisants" });
        }
        // On synchronise l'ID pour tes contrôleurs qui utilisent req.session
        if (req.user.role === 'client') req.session.clientID = req.user.id;
        else req.session.employeId = req.user.id;
        
        next();
    };
};

// Si on veux garder des fonctions spécifiques (ex: pour les serveurs)
export const authorizeServer = authorizeRoles('Serveur', 'admin'); 
export const authorizeChef = authorizeRoles('Chef-Cuisinier', 'admin');