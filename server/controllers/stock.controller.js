import Stock from "../models/stock.model.js";

// Enregistrer un nouveau stock
// Champs requis: menu_id et qté_dispo
export function createStock(req, res) {
    const stock = {
        menu_id: req.body.menu_id,
        quantite_dispo: req.body.quantite_dispo
    };

    const newStock = new Stock(stock);

    Stock.create(newStock, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({message: 'Stock créé avec succès'});
        return;
    });
}

// Récuperer tous les stocks
export function getAllStocks(req, res) {

    Stock.findAll((err, result) => {
        if (err) {
            res.send(err.message);
            return
        }
        res.json(result);
        return;
    });
}

// Récuperer un stock par ID
export function getStockById(req, res) {
    const stockId = req.params.id;

    Stock.findById(stockId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(result);
        return;
    });
}

// Recuperer les stocks par menu_id
export function getMenuStock(req, res) {
    const menuId = req.params.menu_id;

    Stock.findById(menuId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json(result);
        return;
    });
}

// Decrementation de la qté dispo
export function decrement(req, res) {
    const menuId = req.params.menu_id;
    const nb = req.params.nb;

    Stock.decrement(menuId, nb, (err, res) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json("Stock menu " + menuId + " decrementé de " + nb);
        return;
    });
}

// Incrementation de la qté dispo
export function increment(req, res) {
    const menuId = req.params.menu_id;
    const nb = req.params.nb;

    Stock.increment(menuId, nb, (err, res) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json("Stock menu " + menuId + " decrementé de " + nb);
        return;
    });
}

// Mettre à jour un stock par son ID
// Champs requis: menu_id et qté_dispo
export function updateStock(req, res){
    const stockId = req.params.id;

    Stock.update(stockId, new Stock(req.body), (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({error: false, message: 'Stock ' +stockId +' mis à jour avec succès'});
        return;
    });
}

// Supprimé un stock par son ID
export function deleteStock(req, res) {
    const stockId = req.params.id;

    Stock.delete(stockId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({error: false, message: 'Stock supprimé avec succès'});
        return;
    });
}