import { Router } from 'express';
import { createClient, getAllClients, getClientById, updateClient, deleteClient, authenticateClient, logout } from '../controllers/client.controller.js';
import { authorizeRoles } from '../middlewares/roles.auth.js';
import { Validate, loginClientValidation, signupClientValidation, updateClientValidation } from '../middlewares/validate.js';
import { authentificateToken } from '../middlewares/auth.js';

const clientRouter = Router();

// On crée un groupe de rôles pour le staff
const allStaff = ['admin', 'Chef-Cuisinier', 'Cuisinier', 'Serveur', 'Others'];

// ---- POST ----
clientRouter.post('/register', signupClientValidation, Validate, createClient);
clientRouter.post('/login', loginClientValidation, Validate, authenticateClient);
clientRouter.post('/logout', authentificateToken, authorizeRoles('client'), logout);

// ---- GET -----
clientRouter.get('/list', authentificateToken, authorizeRoles(...allStaff), getAllClients);
clientRouter.get('/profile', authentificateToken, authorizeRoles('client'), (req, res) => {
    res.send('Bienvenue sur votre profil.');
});
// Les routes avec des paramètres dynamiques (/:id) doivent toujours être à la fin !
clientRouter.get('/:id', authentificateToken, authorizeRoles(...allStaff), getClientById);

// ---- PUT ----
clientRouter.put('/update', authentificateToken, authorizeRoles('client'), updateClientValidation, Validate, updateClient);

// --- DELETE ----
clientRouter.delete('/del/:id', authentificateToken, authorizeRoles('admin'), deleteClient);

export default clientRouter;
