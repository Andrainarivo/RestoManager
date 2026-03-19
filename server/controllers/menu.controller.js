// controllers/menu.controller.js
import Menu from "../models/menu.model.js";

// Enregistrer un nouveau menu
export async function createMenu(req, res) {
    try {
        const { nom, prix, categorie } = req.body;
        if (!nom || !prix || !categorie) {
            return res.status(400).json({ status: "error", message: 'Le nom, le prix et la catégorie sont requis' });
        }

        const newMenu = new Menu(req.body);
        await Menu.create(newMenu);

        return res.status(201).json({ status: "success", message: `Menu ${newMenu.nom} ajouté avec succès` });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// Récuperer un menu par son ID
export async function getMenuById(req, res) {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ status: "error", message: 'Menu non trouvé' });
        }
        return res.status(200).json({ status: "success", data: menu });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// Récuperer tous les menus
export async function getAllMenus(req, res) {
    try {
        const menus = await Menu.findAll();
        return res.status(200).json({ status: "success", data: menus });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// Mettre à jour (PUT) - On attend l'objet complet
export async function updateMenu(req, res) {
    try {
        const { nom, prix, categorie } = req.body;
        if (!nom || !prix || !categorie) {
            return res.status(400).json({ status: "error", message: 'Données incomplètes pour une mise à jour totale' });
        }

        const result = await Menu.update(req.params.id, new Menu(req.body));
        if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Menu non trouvé" });

        return res.status(200).json({ status: "success", message: 'Menu mis à jour avec succès' });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// Mise à jour partielle (PATCH)
export async function patchMenu(req, res) {
    try {
        const menuId = req.params.id;
        
        // On ne garde que les champs autorisés présents dans le body
        const allowedFields = ['nom', 'prix', 'categorie', 'description'];
        const updates = {};
        
        Object.keys(req.body).forEach(key => {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ status: "error", message: "Aucun champ valide à mettre à jour" });
        }

        const result = await Menu.update(menuId, updates);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "error", message: "Menu non trouvé" });
        }

        return res.status(200).json({ status: "success", message: 'Menu modifié partiellement avec succès', fieldsUpdated: Object.keys(updates) });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// Supprimer un menu
export async function deleteMenu(req, res) {
    try {
        const result = await Menu.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Menu non trouvé" });

        return res.status(200).json({ status: "success", message: 'Menu supprimé avec succès' });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}

// Récuperer par catégorie
export async function getMenuByCat(req, res) {
    try {
        const menus = await Menu.findByCategorie(req.params.categorie);
        if (menus.length === 0) {
            return res.status(404).json({ status: "success", message: 'Aucun menu dans cette catégorie', data: [] });
        }
        return res.status(200).json({ status: "success", data: menus });
    } catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}