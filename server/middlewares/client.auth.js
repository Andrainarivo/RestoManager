
// middleware d'autorisation pour les clients
export function authorizeClient(req, res, next) {
    if (req.session.clientID) {
        // Le client est authentifié et autorisé
        console.log(req.session.clientId);
        next();
    }else{
        res.status(403).send('Non authentifié');
        return;
    };
}