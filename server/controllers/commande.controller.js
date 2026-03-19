import {ServerCommande, ClientCommande} from "../models/commande.model.js";

// --- SERVER SIDE ---
export async function createCommande(req, res) {
    try {
        const { client_id, menu_id, genre } = req.body;
        if (!client_id || !menu_id || !genre) {
            return res.status(400).json({ status: "error", message: "Champs requis manquants" });
        }
        await ServerCommande.create(new ServerCommande(req.body));
        res.status(201).json({ status: "success", message: "Commande créée avec succès" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

export async function getAllCommandes(req, res) {
    try {
        const data = await ServerCommande.findAll();
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
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


// --- CLIENT SIDE ---
export async function makeCommande(req, res) {
    try {
        const { menu_id, genre } = req.body;
        const client_id = req.session.clientID;

        if (!menu_id || !genre) {
            return res.status(400).json({ status: "error", message: "Menu et genre requis" });
        }

        const newCommande = { client_id, menu_id, genre, date: new Date() };
        await ClientCommande.make(newCommande);
        
        res.status(201).json({ status: "success", message: "Votre commande est enregistrée" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

// recuperer mes commandes
export async function getMyCommande(req, res){
    try {
        const commandes = await ClientCommande.findMyCommande(req.session.clientID);
        res.status(200).json({ status: "success", data: commandes });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}