import { Router } from 'express';
import { createCommande, deleteCommande, getAllCommandes, getCommandeByClientId, getCommandeById, getCommandeByMenuId, getMyCommande, makeCommande, updateCommande } from '../controllers/commande.controller.js';
import { authentificateToken } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/roles.auth.js'; // nouveau middleware unifié
import { Validate, serverCommandeValidation, clientCommandeValidation } from '../middlewares/validate.js';

const commandeRouter = Router();

// On définit un groupe pour "tous les employés" pour raccourcir le code
const allEmployes = ['Chef-Cuisinier', 'Cuisinier', 'Serveur', 'admin'];

// -------------- SERVER ----------------
commandeRouter.post('/new', authentificateToken, authorizeRoles('Serveur', 'admin'), serverCommandeValidation, Validate, createCommande);
commandeRouter.get('/list', authentificateToken, authorizeRoles(...allEmployes), getAllCommandes);
commandeRouter.get('/get/:id', authentificateToken, authorizeRoles(...allEmployes), getCommandeById);
commandeRouter.get('/clients/:id', authentificateToken, authorizeRoles(...allEmployes), getCommandeByClientId);
commandeRouter.get('/menus/:id', authentificateToken, authorizeRoles(...allEmployes), getCommandeByMenuId);
commandeRouter.put('/maj/:id', authentificateToken, authorizeRoles('Serveur', 'admin'), serverCommandeValidation, Validate, updateCommande);
commandeRouter.delete('/del/:id', authentificateToken, authorizeRoles('Serveur', 'admin'), deleteCommande);

// ------------- CLIENT ----------------
commandeRouter.post('/clients/post', authentificateToken, authorizeRoles('client'), clientCommandeValidation, Validate, makeCommande);
commandeRouter.get('/clients/get', authentificateToken, authorizeRoles('client'), getMyCommande);

export default commandeRouter;