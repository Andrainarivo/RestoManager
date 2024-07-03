import {ServerCommande, ClientCommande} from "../models/commande.model.js";


//-----------------SERVER-------------------
// Enregistrer une nouvelle commande
// Champs requis : client_id, menu_id, genre
export function createCommande(req, res){
    if (Object.keys(req.body).length < 3) {
        res.status(400).send({error:true, message:'Renseigner tous les champs requis'});
        return;
    }

    ServerCommande.create(new ServerCommande(req.body), function (err, result){
        if (err) {
            res.send(err.message);
            return;
        }
        res.status(201).json({error:false, message:'Commande créer avec succès'});
        return;
    });

}

// Récuperer toutes les commandes
export function getAllCommandes(req, res){
    ServerCommande.findAll(function (err, commandes){
        if (err) return res.send(err.message);
        res.json(commandes);
        return;
    });
}

// Récuperer une commande
export function getCommandeById(req, res){
    const commandeId = req.params.id;

    ServerCommande.findById(commandeId, function (err, commande){
        if (err) return res.send(err.message);
        res.json(commande);
        return;
    });
}

// Mettre à jour une commande
// Champs requis : client_id, menu_id, genre
export function updateCommande(req, res){
    const commandeId = req.params.id;
    if (Object.keys(req.body).length < 3) {
        res.status(400).send({error:true, message:'Renseigner tous les champs requis'});
        return;
    }

    ServerCommande.update(commandeId, new ServerCommande(req.body), function (err, result){
        if (err) return res.send(err.message);
        res.status(200).json({error:false, message:'Commande ' + commandeId + ' mise à jour avec succès'});
    });  
}

// Supprimer une commande
export function deleteCommande(req, res){
    const commandeId = req.params.id;

    ServerCommande.delete(commandeId, function (err, result){
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({message:'Commande ' + commandeId + ' supprimée avec succès'});
        return;
    });
}

// Récuperer les commandes d'un client
export function getCommandeByClientId(req, res){
    const clientId = req.params.id;

    ServerCommande.findByClientId(clientId, function(err, commandes){
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(commandes);
        return;
    });
}

// Récuperer les commandes sur un plat
export function getCommandeByMenuId(req, res){
    const menuId = req.params.id;

    ServerCommande.findByMenuId(menuId, function (err, commandes){
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(commandes);
        return;
    });
}


//--------------CLIENT---------------------
// faire une commande
// champs requis: menu_id, genre
export function makeCommande(req, res) {
    if (Object.keys(req.body).length <= 1) {
        res.status(400).send({error:true, message:'Renseigner tous les champs requis'});
        return;
    }

    ClientCommande.make(req.session.clientID, new ClientCommande(req.body), function (err, result){
        if (err) res.send(err.message);
        res.status(201).json({error:false, message:'Commande créer avec succès'});
        return;
    });
}

// recuperer mes commandes
export function getMyCommande(req, res){

    ClientCommande.findMyCommande(req.session.clientID, function(err, commandes){
        if (err) res.send(err.message);
        res.json(commandes);
        return;
    });
}