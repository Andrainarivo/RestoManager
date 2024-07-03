// routes/client.route.js

import { Router } from 'express';
import { createClient, getAllClients, getClientById, updateClient, deleteClient, authentificateClient, logout } from '../controllers/client.controller.js';
import { authorizeClient } from '../middlewares/client.auth.js';
import { Validate, loginClientValidation, signupClientValidation, updateClientValidation } from '../middlewares/validate.js';
import { authorizeEmploye } from '../middlewares/employe.auth.js';
import { authorizeAdmin } from '../middlewares/admin.auth.js';
import { authentificateToken } from '../middlewares/auth.js';

const clientRouter = Router();

//----POST----
clientRouter.post('/clients/register', signupClientValidation, Validate, createClient);
clientRouter.post('/clients/login', loginClientValidation, Validate, authentificateClient);
clientRouter.post('/clients/logout', authentificateToken, authorizeClient, logout);

//----GET-----
clientRouter.get('/clients/list', authentificateToken, authorizeEmploye || authorizeAdmin, getAllClients);
clientRouter.get('/clients/:id', authentificateToken, authorizeEmploye || authorizeAdmin, getClientById);
clientRouter.get('/clients/profile', authentificateToken, authorizeClient, (req, res) => {
    res.send('Bienvenue sur votre profile.');
});

//----PUT----
clientRouter.put('/clients/update/', authentificateToken, authorizeClient, updateClientValidation, Validate, updateClient);
//clientRouter.patch('/clients/:id', patchClient);

//---DELETE----
clientRouter.delete('/clients/del/:id', authentificateToken, authorizeAdmin, deleteClient);


export default clientRouter;
