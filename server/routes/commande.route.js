import {Router} from 'express';
import { createCommande, deleteCommande, getAllCommandes, getCommandeByClientId, getCommandeById, getCommandeByMenuId, getMyCommande, makeCommande, updateCommande } from '../controllers/commande.controller.js';
import { authorizeClient } from '../middlewares/client.auth.js';
import { authorizeEmploye, authorizeServer } from '../middlewares/employe.auth.js';


const commandeRouter = Router();

//--------------SERVER----------------
commandeRouter.post('/commandes/new', authorizeServer, createCommande);
commandeRouter.get('/commandes/list', authorizeEmploye, getAllCommandes);
commandeRouter.get('/commandes/get/:id', authorizeEmploye, getCommandeById);
commandeRouter.get('/commandes/clients/:id', authorizeEmploye, getCommandeByClientId);
commandeRouter.get('/commandes/menus/:id', authorizeEmploye, getCommandeByMenuId);
commandeRouter.put('/commandes/maj/:id', authorizeServer, updateCommande);
commandeRouter.delete('/commandes/del/:id', authorizeServer, deleteCommande);

//-------------CLIENT----------------
commandeRouter.post('/clients/commandes/post', authorizeClient, makeCommande);
commandeRouter.get('/clients/commandes/get', authorizeClient, getMyCommande);

export default commandeRouter;