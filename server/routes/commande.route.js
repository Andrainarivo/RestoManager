import {Router} from 'express';
import { createCommande, deleteCommande, getAllCommandes, getCommandeByClientId, getCommandeById, getCommandeByMenuId, getMyCommande, makeCommande, updateCommande } from '../controllers/commande.controller.js';
import { authorizeClient } from '../middlewares/client.auth.js';


const commandeRouter = Router();

//--------------SERVER----------------
commandeRouter.post('/commandes/new', createCommande);
commandeRouter.get('/commandes/get', getAllCommandes);
commandeRouter.get('/commandes/get/:id', getCommandeById);
commandeRouter.get('/commandes/clients/:id', getCommandeByClientId);
commandeRouter.get('/commandes/menus/:id', getCommandeByMenuId);
commandeRouter.put('/commandes/maj/:id', updateCommande);
commandeRouter.delete('/commandes/del/:id', deleteCommande);

//-------------CLIENT----------------
commandeRouter.post('/clients/commandes/post', authorizeClient, makeCommande);
commandeRouter.get('/clients/commandes/get', authorizeClient, getMyCommande);

export default commandeRouter;