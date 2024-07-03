
// middleware d'autorisation pour les clients
export function authorizeClient(req, res, next) {
    if (req.user.role === 'client') {
        // Le client est authentifié et autorisé, enregistrement de l'id dans la session
        req.session.clienID = req.user.id;
        next();
    }else{
        return res.sendStatus(403);
    };
}