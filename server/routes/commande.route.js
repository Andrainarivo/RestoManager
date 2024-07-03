import {Router} from 'express';
import { createCommande, deleteCommande, getAllCommandes, getCommandeByClientId, getCommandeById, getCommandeByMenuId, getMyCommande, makeCommande, updateCommande } from '../controllers/commande.controller.js';
import { authorizeClient } from '../middlewares/client.auth.js';
import { authorizeEmploye, authorizeServer } from '../middlewares/employe.auth.js';
import { authentificateToken } from '../middlewares/auth.js';


const commandeRouter = Router();

//--------------SERVER----------------
commandeRouter.post('/commandes/new', authentificateToken, authorizeServer, createCommande);
commandeRouter.get('/commandes/list', authentificateToken, authorizeEmploye, getAllCommandes);
commandeRouter.get('/commandes/get/:id', authentificateToken, authorizeEmploye, getCommandeById);
commandeRouter.get('/commandes/clients/:id', authentificateToken, authorizeEmploye, getCommandeByClientId);
commandeRouter.get('/commandes/menus/:id', authentificateToken, authorizeEmploye, getCommandeByMenuId);
commandeRouter.put('/commandes/maj/:id', authentificateToken, authorizeServer, updateCommande);
commandeRouter.delete('/commandes/del/:id', authentificateToken, authorizeServer, deleteCommande);

//-------------CLIENT----------------
commandeRouter.post('/clients/commandes/post', authentificateToken, authorizeClient, makeCommande);
commandeRouter.get('/clients/commandes/get', authentificateToken, authorizeClient, getMyCommande);

export default commandeRouter;