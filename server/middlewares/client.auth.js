
// middleware d'autorisation pour les clients
export function authorizeClient(req, res, next) {
    if (req.session.clientID && req.session.role === 'clients') {
        // Le client est authentifié et autorisé
        console.log(req.session.clientId);
        next();
    }else{
        res.status(403).json("Vous devez etre authentifié comme un client pour à acceder à cette section");
        return;
    };
}