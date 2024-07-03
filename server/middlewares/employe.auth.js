// middleware d'autorisation pour tous les employes
export function authorizeEmploye(req, res, next) {
    const poste = ['Chef-Cuisinier', 'Cuisinier', 'Serveur', 'Others'];

    for (let i = 0; i < poste.length; i++) {
        if (req.user.role !== poste[i]){
            return res.sendStatus(403);
        }
        break;
    }
    req.session.employeId = req.user.id;
    next();
    
}

// middleware d'autorisation pour les chef-cuisinier
export function authorizeChef(req, res, next) {
    if (req.user.role !== 'Chef-Cuisinier') {
        res.status(403).send('Accessible seulement aux Chefs-Cuisinier')
        return;
    }
    req.session.employeId = req.user.id;
    next();
}

// middleware d'autorisation pour les cuisiniers
export function authorizeCuisinier(req, res, next) {
    if (req.user.role !== 'Cuisinier') {
        return res.sendStatus(403);
    }
    req.session.employeId = req.user.id;
    next();
}

// middleware d'autorisation pour les serveurs
export function authorizeServer(req, res, next) {
    if (req.user.role !== 'Serveur') {
        return res.sendStatus(403);
    }
    req.session.employeId = req.user.id;
    next();
}

// middleware d'autorisation pour les autres employes (à definir plus tard)
export function authorizeOther(req, res, next) {
    if (req.user.role !== 'Others') {
        return res.sendStatus(403);
    }
    req.session.employeId = req.user.id;
    next();
}