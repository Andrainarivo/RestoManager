import Stock from "../models/stock.model.js";

// Enregistrer un nouveau stock
// Champs requis: menu_id et qté_dispo
export async function createStock(req, res) {
    try {
        const { menu_id, quantite_dispo } = req.body;
        if (!menu_id) return res.status(400).json({ message: "menu_id manquant" });
        
        await Stock.create({ menu_id, quantite_dispo: quantite_dispo || 0 });
        res.status(201).json({ status: "success", message: "Stock initialisé" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

// Récuperer tous les stocks
export async function getAllStocks(req, res) {
    try {
        const data = await Stock.findAll();
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

// Récuperer un stock par ID
export async function getStockById(req, res) {
    try {
        const stockId = req.params.id;
        const data = await Stock.findById(stockId);
        if (!data) return res.status(404).json({ status: "error", message: "Stock non trouvé" });
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

// Recuperer les stocks par menu_id
export async function getMenuStock(req, res) {
    try {
        const menuId = req.params.menu_id;
        const data = await Stock.findByMenuId(menuId);
        res.status(200).json({ status: "success", data });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

export async function decrement(req, res) {
    try {
        const { menu_id, nb } = req.params;
        await Stock.decrement(menu_id, nb);
        res.status(200).json({ status: "success", message: `Stock du menu ${menu_id} décrémenté de ${nb}` });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

export async function increment(req, res) {
    try {
        const { menu_id, nb } = req.params;
        await Stock.increment(menu_id, nb);
        res.status(200).json({ status: "success", message: `Stock du menu ${menu_id} incrémenté de ${nb}` });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

export async function updateStock(req, res) {
    try {
        const menuId = req.params.menu_id;
        const { quantite_dispo } = req.body;
        await Stock.updateStockByMenu(menuId, quantite_dispo);
        res.status(200).json({ status: "success", message: `Stock du menu ${menuId} mis à jour` });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

// Supprimé un stock par son ID
export async function deleteStock(req, res) {
    try {
        const stockId = req.params.id;
        await Stock.delete(stockId);
        res.status(200).json({ status: "success", message: "Stock supprimé" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}