import Menu from "../models/menu.model.js";

// Enregistrer un nouveau menu
// champs obligatoire: nom, prix, categorie
// champ facultatif: description
export function createMenu(req, res) {
     
    if (Object.keys(req.body).length < 2) {
        res.status(400).send({error:true, message:'Reinseigner tous les champs requis'});
        return;
    }

    const newMenu = new Menu(req.body);
    Menu.create(newMenu, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.status(201).json({error: false, message: 'Menu ' + newMenu.nom + ' ajouté avec succès'});
        return;
    });
}

// Récuperer un menu par son ID
export function getMenuById(req, res){
    const menuId = req.params.id;

    Menu.findbyId(menuId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result.length == 0) {
            res.send('Menu not found !');
            return;
        }
        res.json(result);
        return;
    });
}

// Récuperer tous les menus
export function getAllMenus(req, res){

    Menu.findAll((err, menus) => {
        if (err) {
            res.send(err.message);
            return;
        }
        if (menus.length == 0) {
            res.send('No data on table menus');
            return;
        }
        res.json(menus);
        return;
     });
}

// Mettre à jour les informations d'un menu
// champs obligatoire: nom, prix, categorie
export function updateMenu(req, res){
    const menuId = req.params.id;

    if (Object.keys(req.body).length < 2) {
        res.status(400).send({error:true, message:'Reinseigner tous les champs requis'});
        return;
    }

    Menu.update(menuId, new Menu(req.body), (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.status(200).json({error:false, message: 'Menu ' + menuId + ' mis à jour avec succès'});
        return;
    });
}

// Mettre à jour partialement les informations d'un menu
/*export function patchMenu(req, res){
    const menuId = req.params.id;

    Menu.update(menuId, new Menu(req.body), (err, result) => {
        if (err) res.send(err.message);
        res.status(200).json({error:false, message: 'Menu ' + menuId + ' mis à jour avec succès'});
    });
}*/

// Supprimer un menu par son ID
export function deleteMenu(req, res){
    const menuId = req.params.id;

    Menu.delete(menuId, (err, result) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.json({message:'Menu ' + menuId + ' supprimé avec succès'});
        return;
    });
}

// Récuperer les menus du meme categorie
export function getMenuByCat(req, res){
    const categorie = req.params.categorie;

    Menu.findByCategorie(categorie, (err, menus) => {
        if (err) {
            res.send(err.message);
            return;
        }
        if (menus.length == 0) {
            res.send('Aucun menu de ce categorie');
            return;
        }
        res.json(menus);
        return;
    });
}